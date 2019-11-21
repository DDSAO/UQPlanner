from html.parser import HTMLParser
import urllib
import urllib.request
import time
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

db = SQLAlchemy(app)

MASTER_OF_IT_COURSE_LIST = 'https://my.uq.edu.au/programs-courses/program_list.html?acad_prog=5581&year=2020'


class CourseEntity(db.Model):
    code = db.Column(db.String(8), primary_key=True)
    type = db.Column(db.String(1), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    unit = db.Column(db.Integer, nullable=False)
    link = db.Column(db.String(150), nullable=False)
    prereq = db.Column(db.String(200))
    incompatible = db.Column(db.String(200))
    semester = db.Column(db.String(50), nullable = Flask)

    def __repr__(self):
        return f"Course('{self.code}','{self.name}', '{self.type}','{self.unit}'\
        ,'{self.link}','{self.prereq}','{self.incompatible}','{self.semester}')"


class LinkParser(HTMLParser):

    def __init__(self):
        super().__init__()
        self._urls = []

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            for name, value in attrs:
                if name == 'href':
                    if 'course_code' in value:
                        self._urls.append(value)

    def get_urls(self):
        return self._urls


def find_content(url):
    user_agent = 'Chrome(Windows 10 x64)'
    headers = {'User-Agent': user_agent}

    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        text = response.read()

    return text


def find_links(text):
    parser = LinkParser()
    parser.feed(text)

    return parser.get_urls()


def find_course(course_links):
    courses = {}
    for course_link in course_links:
        _, course_info = course_link.split("=", 1)
        course_code = course_info[:8]
        #print(course_code)
        courses[course_code] = "https://my.uq.edu.au"+course_link
    return courses


def find_course_unit(text, code):
    current_position = text.find(code)
    unit_starting_position = text.find('td', current_position)
    unit = text[unit_starting_position+12]

    return unit


def find_course_name(text, code):
    current_position = text.find(code)
    name_starting_position = text.find('td', current_position)+27
    end_tag = text.find("<", name_starting_position)
    name = text[name_starting_position:end_tag].strip()

    return name


def find_course_type(text, code):
    part_a_index = text.find("<h2>Part A - Compulsory</h2>")
    part_b_index = text.find("<h2>Part B - Research</h2>")
    part_c_index = text.find("<h2>Part C - Electives</h2>")
    part_d_index = text.find("<h2>Part D - Other Electives</h2>")
    code_position = text.find(code)
    if part_a_index < code_position < part_b_index:
        return "Part A"
    elif part_b_index < code_position < part_c_index:
        return "Part B"
    elif part_c_index < code_position < part_d_index:
        return "Part C"
    elif code_position > part_d_index:
        return "Part D"


def find_prereq(course_page):
    current_position = course_page.find("course-prerequisite")
    if current_position == -1:
        return 'None'
    else:
        end_tag = course_page.find(">", current_position)
        start_tag = course_page.find("<", end_tag)
        prereqs = course_page[end_tag+1: start_tag]
        return prereqs


def find_incompatible(course_page):
    current_position = course_page.find("course-incompatible")
    if current_position == -1:
        return "None"
    else:
        end_tag = course_page.find(">", current_position)
        start_tag = course_page.find("<", end_tag)
        incompatible = course_page[end_tag + 1: start_tag]
        return incompatible


def find_offering_sem(course_page):
    offering_sem = []
    start_position = course_page.find('id="course-current-offerings"')
    if start_position == -1:
        return "Not Offered"
    else:
        end_position = course_page.find('Course description')
        count = course_page.count('course-offering-year', start_position, end_position)
        if count == 0:
            return "Not Offered"
        else:
            for i in range(count):
                current_position = course_page.find('course-offering-'+str(i+1)+'-sem', start_position)
                #print(i, current_position)
                end_tag = course_page.find('>', current_position)
                start_tag = course_page.find('<', end_tag)
                offering_sem.append(course_page[end_tag+1:start_tag])
            return offering_sem

def load_data():
    db.create_all()
    text = str(find_content(MASTER_OF_IT_COURSE_LIST))
    course_links = find_links(text)
    courses = find_course(course_links)

    for code in courses:
        unit = int(find_course_unit(text, code))
        name = find_course_name(text, code)
        type = find_course_type(text, code)

        course_link = courses[code]
        course_page = str(find_content(course_link))
        prereqs = find_prereq(course_page)
        incompatible = find_incompatible(course_page)
        offerings = ';'.join(find_offering_sem(course_page))
        time.sleep(3)

        course = CourseEntity(code=code, type=type, name=name, unit=unit, link=course_link, prereq=prereqs,
                              incompatible=incompatible, semester=offerings)

        db.session.add(course)
        db.session.commit()

        course = CourseEntity.query.filter_by(code=code).all()
        print(course)


def main():
    #load_data() data already loaded to database
    course = CourseEntity.query.filter_by(code='TIMS7301').all()
    print(course)


if __name__ == "__main__":
    main()
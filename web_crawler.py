from html.parser import HTMLParser
import urllib
import urllib.request
import time

MASTER_OF_IT_COURSE_LIST = 'https://my.uq.edu.au/programs-courses/program_list.html?acad_prog=5581&year=2020'


class Course(object):

    def __init__(self, code):
        self._code = code
        self._type = None
        self._name = None
        self._weight = None
        self._link = None
        self._prereq = None
        self._incompatible = None
        self._semester = []

    def get_code(self):
        return self._code

    def set_name(self, name):
        self._name = name

    def get_name(self):
        return self._name

    def set_unit(self, unit):
        self._weight = unit

    def get_unit(self):
        return self._weight

    def set_link(self, link):
        self._link = link

    def get_link(self):
        return self._link

    def set_type(self, type):
        self._type = type

    def get_type(self):
        return self._type

    def set_prereq(self, prereqs):
        self._prereq = prereqs

    def get_prereq(self):
        return self._prereq

    def set_incompatible(self, incompatible):
        self._incompatible = incompatible

    def get_incompatible(self):
        return self._incompatible


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
        return "A"
    elif part_b_index < code_position < part_c_index:
        return "B"
    elif part_c_index < code_position < part_d_index:
        return "C"
    elif code_position > part_d_index:
        return "D"


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


def main():
    text = str(find_content(MASTER_OF_IT_COURSE_LIST))
    course_links = find_links(text)
    courses = find_course(course_links)

    for code in courses:
        unit = find_course_unit(text, code)
        name = find_course_name(text, code)
        type = find_course_type(text, code)

        course_link = courses[code]
        course_page = str(find_content(course_link))
        prereqs = find_prereq(course_page)
        incompatible = find_incompatible(course_page)
        offerings = find_offering_sem(course_page)



        #print(courses[code])
        course = Course(code)
        course.set_link(courses[code])
        course.set_unit(unit)
        course.set_name(name)
        course.set_type(type)
        course.set_prereq(prereqs)
        course.set_incompatible(incompatible)

        print(code, 'Unit: '+course.get_unit(), 'Course Name: '+course.get_name(),
              'Course Type: '+course.get_type(), 'Course Link: '+course.get_link(),
              'Prereq: '+course.get_prereq(), 'Incompatible: '+course.get_incompatible(),
              'Offering Semester'+str(offerings))

        time.sleep(3)




if __name__ == "__main__":
    main()
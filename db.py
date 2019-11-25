from flask import Flask,jsonify
from flask_sqlalchemy import SQLAlchemy

import json


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'


db = SQLAlchemy(app)

class CourseEntity(db.Model):
    code = db.Column(db.String(8), primary_key=True)
    type = db.Column(db.String(1), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    unit = db.Column(db.Integer, nullable=False)
    link = db.Column(db.String(150), nullable=False)
    prereq = db.Column(db.String(200))
    incompatible = db.Column(db.String(200))
    semester = db.Column(db.String(50), nullable = False)

    def __repr__(self):
        return f"Course('{self.code}','{self.name}', '{self.type}','{self.unit}'\
        ,'{self.link}','{self.prereq}','{self.incompatible}','{self.semester}')"

    @property
    def serialize(self):
        return {
            'code':self.code,
            'type':self.type,
            'name':self.name,
            'unit':self.unit,
            'link':self.link,
            'prereq':self.prereq,
            'incompatible':self.incompatible,
            'semester':self.semester
        }


db.create_all()

@app.route('/helloworld')
def hello_world():
    return "hello world!"

@app.route('/getCourses',methods=['GET'])
def get_courses():
    courses = CourseEntity.query.with_entities(
        CourseEntity.type,
        CourseEntity.code,
        CourseEntity.name,
        CourseEntity.prereq,
        CourseEntity.semester).all()
    courses_handled = [{
        'type':course[0],
        'code':course[1],
        'name':course[2],
        'prereq':course[3],
        'semester':course[4]
    } for course in courses]
    return jsonify(courses_handled)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  return response

if __name__ == '__main__':
    app.run(debug=True)

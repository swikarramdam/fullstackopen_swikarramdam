import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({course}) => {
  return (
    <div>
      <Header courseName = {course.name}/>
      <Content courseParts = {course.parts} />
    </div>
  )
}

export default Course

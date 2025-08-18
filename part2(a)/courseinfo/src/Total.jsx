import React from 'react'

const Total = ({parts}) => {
  return (
    <div>
      <h3>total of {parts.reduce((sum, item)=>{
        return sum += item.exercises;
},0)} exercises</h3>
    </div>
  )
}

export default Total

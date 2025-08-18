import React from 'react'

const Part = ({parts}) => {
  return (
    <div>
      {parts.map(obj=>{
        return <p key={obj.id}>{obj.name} {obj.exercises}</p>
      })}
    </div>
  )
}

export default Part

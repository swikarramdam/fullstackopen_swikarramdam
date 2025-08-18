import React from 'react'
import Part from './Part'
import Total from './Total'

const Content = ({courseParts}) => {
  return (
    <div>
      <Part parts = {courseParts}/>
      <Total parts = {courseParts}/>
    </div>
  )
}

export default Content

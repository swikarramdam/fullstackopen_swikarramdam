import React from 'react'

const Button = ({onClickFunc, label}) => {
  return (
    <div>
      <button onClick={onClickFunc}>{label}</button>
    </div>
  )
}

export default Button

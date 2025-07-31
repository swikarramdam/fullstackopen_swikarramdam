import React from 'react'

const Statistics = ({good, neutral, bad}) => {
    const all = good + bad + neutral;
    const average = all > 0 ? (good-bad)/all : 0;
    const positive = all>0? good/all : 0;
  return (
    <div>
    <p>good : {good}</p>
      <p>neutral : {neutral}</p>
      <p>bad : {bad}</p>
      <p>all : {all}</p>
      <p>average : {average.toFixed(2)}</p>
      <p>positive : {positive.toFixed(2)}</p>
    </div>
  )
}

export default Statistics

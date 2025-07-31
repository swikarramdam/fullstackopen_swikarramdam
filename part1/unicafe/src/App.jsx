import { useState } from 'react'
import Statistics from './Statistics'
import Button from './Button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClickFunc={()=>setGood(prev=>prev+1)} label = "good"/>
      <Button onClickFunc={()=>setBad(prev=>prev+1)} label = "bad"/>
      <Button onClickFunc={()=>setNeutral(prev=>prev+1)} label = "neutral"/>
      <h1>Statistics</h1>
      <Statistics good = {good} neutral={neutral} bad = {bad}/>
    </div>
  )
}

export default App
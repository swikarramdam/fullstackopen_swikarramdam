import React from 'react'
import StatisticLine from './StatisticLine';

const Statistics = ({good, neutral, bad}) => {
    const all = good + bad + neutral;
    const average = all > 0 ? (good-bad)/all : 0;
    const positive = all>0? good/all : 0;
     if(all===0) return <p>No feedback given</p>

  return (
    <div>
      <table>
        <tbody>
      <tr>
        <td>good  </td>
        <td>{good}</td>
      </tr>
      <tr>
        <td>neutral  </td>
        <td>{neutral}</td>
      </tr>
      <tr>
        <td>bad  </td>
        <td>{bad}</td>
      </tr>
      <tr>
        <td>all  </td>
        <td>{all}</td>
      </tr>
      <tr>
        <td>average  </td>
        <td>{average}</td>
      </tr>
      <tr>
        <td>positive  </td>
        <td>{positive}</td>
      </tr>
        </tbody>
      </table>

    {/* Modified for 1.11 */}
       {/* <StatisticLine text = "good" value = {good}/>
       <StatisticLine text = "bad" value = {bad}/>
       <StatisticLine text = "neutral" value = {neutral}/>
       <StatisticLine text = "all" value = {all}/>
       <StatisticLine text = "average" value = {average.toFixed(2) + "%"}/>
       <StatisticLine text = "positive" value = {positive.toFixed(2)}/> */}
    </div>
  )
}

export default Statistics

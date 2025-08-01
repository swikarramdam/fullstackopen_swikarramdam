import { useState } from 'react'

const App = () => {
  // const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0})
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
     
  // const max = Math.max(...votes);
  // let index;
  // for(let i = 0; i<votes.length; i++){
  //   if(votes[i]===max){
  //     index = i;
  //   }
  // }
      
   const index = votes.indexOf(Math.max(...votes));
  const [selected, setSelected] = useState(0)

  const handleRandom=()=>{
    let rand = Math.floor(Math.random()*anecdotes.length);
    setSelected(rand)
  }
  const handleVotes=(selected)=>{
    // let newVote = {...votes, [selected]: votes[selected]+1 }
    let newVote = [...votes]
    newVote[selected]+=1;
    setVotes(newVote);
  }

  return (
    <div>
      {anecdotes[selected]}
      <button onClick={handleRandom}>next anecdotes</button>
      <button onClick={()=>handleVotes(selected)}>vote</button>
      {/* <p>has {votes[selected]} vote</p> */}
      <p>has {votes[selected]} votes</p>
      <h1>Anecdote with most votes</h1>
      {anecdotes[index]}
   
      {/* In object if the argument is variable, always use [] and dot only if you are passing that as value */}
    </div>
  )
}

export default App
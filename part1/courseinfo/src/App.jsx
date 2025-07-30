const Header = (props)=>{
  return <h1>{props.coursePart.name}</h1> //2 renders course title passed as props //here props.parts === course
}

const Content = (props) =>{
  return (
    <div>
      {/* props is an object which contains an array called parts inside which lies our object elements so props.parts[0] gives first index of parts array inside props object */}
      <Part part = {props.contentPart.parts[0]}/>  
      {/* part(name and exercise) with value of part1 which is in obtained from props = {name:, exercises} is again passed into the Part component below */}
      <Part part = {props.contentPart.parts[1]}/>
      <Part part = {props.contentPart.parts[2]} />
    </div>
  )
}

const Total = (props)=>{
  return <p>The total number of exercises is {props.exercisePart.parts[0].exercises + props.exercisePart.parts[1].exercises + props.exercisePart.parts[2].exercises}</p>
}

const Part = (props)=>{
  return (
  <p>
      {props.part.name} {props.part.exercises}
  </p>
  )
}

const App = () => 
  // const course = 'Half Stack application development'
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

  //Modified for 1.3
// {
  // const course = 'Half Stack application development'
  // const part1 = {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }
  // const part2 = {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // }
  // const part3 = {
  //   name: 'State of a component',
  //   exercises: 14
  // }

//Modified for 1.4
// {
//   const course = 'Half Stack application development'
//   const parts = [
//     {
//       name: 'Fundamentals of React',
//       exercises: 10
//     },
//     {
//       name: 'Using props to pass data',
//       exercises: 7
//     },
//     {
//       name: 'State of a component',
//       exercises: 14
//     }
//   ]
{
//Modified for 1.5
const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  // JSX component returned by the App
  return (
    <div>
      {/* 1. renders header and passes course as a prop */}
      <Header coursePart = {course}/> 
      <Content
      contentPart = {course}
      />
      <Total exercisePart= {course}/>
    </div>
  )
}

export default App //exports as default so that it can be rendered in main.jsxpart3




/* 
App()=>{
  const obj = {
  
  }
  return
<Header callingName = {obj}/> obj-> passed to child
}
When called in the child,
Here,
props.callingName = {obj}
*/
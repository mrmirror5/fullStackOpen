import { useState } from 'react'
import "./app.css";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>

}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  ) 
}


const Statistics = ({good, neutral, bad}) => {

  const calcAverage = () => {
    const total = good + neutral + bad
    if (total === 0) return 0
    return ((good*1+bad*(-1))/total).toFixed(1)
  }

  const calcPositive = () => {
    const total = good + neutral + bad
    if (total === 0) return 0
    return ((good/total)*100).toFixed(1) + " %"
  }

  if ((good+neutral+bad)=== 0){
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p> 
      </> 
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="average" value={calcAverage()} />
          <StatisticLine text="positive" value={calcPositive()} />
        </tbody>
      </table>
    </>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good+1)
  }
  
  const handleNeutral = () => {
    setNeutral(neutral+1)
  }

  const handleBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />


      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App
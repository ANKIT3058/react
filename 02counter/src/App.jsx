import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(15)

  const addCount = () => {
    if(count<20)
      setCount(count+1)
  }
  const removeCount = () => {
    if(count>0)
      setCount(count - 1)
  }

  return (
    <>
      <h1>Chai aur react {count}</h1>
      <button onClick={addCount}>Add {count}</button>
      <br />
      <button onClick={removeCount}>Remove {count}</button>
    </>
  )
}

export default App

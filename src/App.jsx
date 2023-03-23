import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

fetch("/api")
  .then((response) => response.json())
  .then((data) => console.log(data));

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
<h1>MERN</h1>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const[tittle,setTittle]=useState(null)
  const [count, setCount] = useState(0)
  async function getData(){
    let response=await axios.get("http://localhost:3000/");
    console.log(response.data)
    setTittle(response.data)
  }

  useEffect(function(){
    getData()
  },[])
  return (
   <div>
      <h1>{tittle && tittle.message}</h1>
   </div>
  )
}

export default App

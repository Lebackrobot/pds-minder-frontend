import { useState, useContext, useEffect } from 'react'
import { useNavigate  } from "react-router-dom";
import './App.css'
// outros


//  Imports
import Header from './Components/Header'
import MainBusca from './Components/MainBusca'
import MainCard from './Components/MainCard'

//  import context
import { CounterContext } from './Components/CounterContext'

function App() {
  // variaveis

  const navigate = useNavigate();

  // fucao que verifica no cache
  const isUserLoggedIn = () => {
    return localStorage.getItem('user') === null;
  };

  
  


  console.log(localStorage.getItem('user'))

  
  console.log(isUserLoggedIn())
  
  useEffect(()=>{
    if (isUserLoggedIn()) navigate('/login');
  })
  

  return (
    <>
      <Header nome={'lopes'} />
      <div className='container_main'>
        <MainBusca />
        <MainCard />
      </div>
    </>
  )
}

export default App

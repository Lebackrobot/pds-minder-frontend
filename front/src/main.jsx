import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider,  Navigate } from 'react-router-dom'
import Login from './rotas/login/Login'
import App from './App'

import { CounterContextProvider } from './Components/CounterContext'

const router = createBrowserRouter([
  {
  path: "/login",
  element: <Login />
  },
  {
    path: "/",
    element: <App />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CounterContextProvider>
    <RouterProvider router={router}/>
    </CounterContextProvider>
  </React.StrictMode>,
)

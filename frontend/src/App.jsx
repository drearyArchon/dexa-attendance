import { useState } from 'react'
import './App.css'
import router from './router'
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/AuthProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App

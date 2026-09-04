import { useState } from 'react'
import './App.css'
import router from './router'
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App

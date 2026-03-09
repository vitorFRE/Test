import { useState } from 'react'
import { getStoredUsername, clearStoredUsername } from './utils/storage'
import { Login } from './pages/Login/Login'
import { Home } from './pages/Home/Home'
import './App.css'

function App() {
  const [username, setUsername] = useState<string | null>(getStoredUsername)

  function handleLoginSuccess() {
    setUsername(getStoredUsername())
  }

  function handleLogout() {
    clearStoredUsername()
    setUsername(null)
  }

  if (!username?.trim()) {
    return <Login onSuccess={handleLoginSuccess} />
  }

  return <Home onLogout={handleLogout} />
}

export default App

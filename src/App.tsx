import { useState } from 'react'
import { getStoredUsername } from './utils/storage'
import { Login } from './pages/Login/Login'
import { Home } from './pages/Home/Home'
import './App.css'

function App() {
  const [username, setUsername] = useState<string | null>(getStoredUsername)

  function handleLoginSuccess() {
    setUsername(getStoredUsername())
  }

  if (!username?.trim()) {
    return <Login onSuccess={handleLoginSuccess} />
  }

  return <Home />
}

export default App

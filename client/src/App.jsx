import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from '@/components/chat'
import Login from './components/login';

const App = () => {
  const [user, setUser] = useState(null);
  const [secret, setSecret] = useState(null)
  const isAuth = Boolean(user) && Boolean(secret)
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={isAuth ? (<Navigate to="/chat" />)
          : <Login setSecret={setSecret} setUser={setUser} />} />
        <Route path='/chat' element={isAuth ? <Chat user={user} secret={secret} />
          : <Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App

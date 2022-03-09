import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route, Link } from 'react-router'
import { useState, useEffect } from 'react' 
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Social from './pages/Social'
import Home from './pages/Home'

function App() {
  const [ user, setUser ] = useState()

  console.log(user)

  useEffect(() => {
    fetch('/me')
    .then(res => res.json())
    .then(setUser)
  }, [])

  function handleLogout() {
    fetch('/logout', { method: 'DELETE'})
    .then(res => res.json())
    .then(setUser)
  }

  return (
    <Router >
      <Navbar user={user} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/social" element={<Social currentUser={user}/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home user={user} handleSetUser={setUser} handleLogout={handleLogout}/>}/>
      </Routes>
    </Router>
  );
}

export default App;

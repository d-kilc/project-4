import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import { Routes, Route, Link } from 'react-router'
import { useState, useEffect } from 'react' 
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import NewItem from './pages/NewItem'
import EditUser from './pages/EditUser'
import ItemDetails from './pages/ItemDetail'
import Social from './pages/Social'
import Home from './pages/Home'

function App() {
  const [ user, setUser ] = useState()

  useEffect(() => {
    fetch('/me')
    .then(res => res.json())
    .then(setUser)
  }, [])


  function handleLogin(data) {
    fetch('/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json", accept: 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) {
            res.json().then(data => {
                setUser(data)
            })
        } else {
            res.json().then(data => {
                alert(data.error)
            })
        }
    })
}

  function handleLogout() {
    fetch('/logout', { method: 'DELETE'})
    .then(res => res.json())
    .then(data => {
      setUser(data)
    })
  }

  function handleCreateItem(item, userItem) {
    fetch(`/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(item)
    })
    .then(res => {
        if (res.ok) {
            res.json().then(data => {
                handleCreateUserItem(userItem, data.id)
            })
        } else {
            res.json().then(data => {
                alert('There was a problem creating the item: ' + data.errors)
            })
        }
    })
}

function handleCreateUserItem(item, itemId) {
    const newItem = {...item, item_id: itemId, usage_frequency: 0, }

    fetch('/user_items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(newItem)
    })
    .then(res => {
        if (res.ok) {
            res.json().then(data => {
                alert('Item created!')
                setUser({...user, user_items: [...user.user_items, newItem]})
            })
        } else {
            res.json().then(data => {
                alert('There was a problem adding the item to your profile: ' + data.errors)
            })
        }
    })
}

  return (
    <Router >
      <Navbar user={user} handleLogout={handleLogout}/>
      <Routes>
        <Route path='/new-item' element={<NewItem user={user} handleCreateItem={handleCreateItem}/>}/>
        <Route path="/social" element={<Social currentUser={user}/>}/>
        <Route path="/signup" element={<Signup handleSetUser={setUser}/>} />
        <Route path='/edit-user' element={<EditUser/>}/>
        <Route path={`/user-items/:id`} element={<ItemDetails/>}/>
        <Route path="/" element={<Home user={user} handleLogin={handleLogin} handleSetUser={setUser} handleLogout={handleLogout}/>}/>
      </Routes>
    </Router>
  );
}

export default App;

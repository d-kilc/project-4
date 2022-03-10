import Dashboard from './Dashboard'
import Login from './Login'

export default function Home({user, handleSetUser, handleLogout}) {
    
    if (user && user.name === "Unauthorized") return <Login handleSetUser={handleSetUser}/>

    return (
        <div>
            { user && user.name !== "Unauthorized" ? <Dashboard user={user} handleLogout={handleLogout}/> : <h1></h1>}
        </div>
    )
}
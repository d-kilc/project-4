export default function Dashboard({user, handleLogout}) {
    
    return (
        <div>
            <h1>Welcome {user.username}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
} 
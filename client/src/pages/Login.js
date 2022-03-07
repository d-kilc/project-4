import { Link } from 'react-router-dom'
import { useState } from 'react'
export default function Login({handleSetUser}) {

    const [ formData, setFormData ] = useState({
        username: '',
        password: ''
    })

    function handleUpdateInput(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleLogin() {
        fetch('/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json", accept: 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(handleSetUser)
    }

    return (
        <div>
            <h1>Login</h1>
            <table>
                <tr>
                    <td>
                        <label>Username: </label>
                    </td>
                    <td>
                        <input name="username" value={formData.username} onChange={handleUpdateInput}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Password: </label>
                    </td>
                    <td>
                        <input type="password" name="password" value={formData.password} onChange={handleUpdateInput}/>
                    </td>
                </tr>
            </table>
            <button onClick={() => handleLogin()}>
                Login
            </button>
            <div><Link to="/signup">Sign up</Link></div>

        </div>
    )
} 
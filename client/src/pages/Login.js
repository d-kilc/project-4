import { Link } from 'react-router-dom'
import { useState } from 'react'
import { TextField, Button, Grid, Typography } from '@mui/material'
export default function Login({handleLogin, handleSetUser}) {

    const [ formData, setFormData ] = useState({
        username: '',
        password: ''
    })

    function handleUpdateInput(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <Grid container xs={'auto'} spacing={2} direction={'column'} alignItems='center' justifyContent="center" margin="auto">
                <Grid item alignSelf="center">
                    <Typography variant="h4">Login</Typography>
                </Grid>
                <Grid item xs={1}>
                    <TextField label="Username" name="username" value={formData.username} onChange={handleUpdateInput}/>
                </Grid>
                <Grid item>
                    <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleUpdateInput}/>
                </Grid>
                <Grid item >
                    <Button variant="contained" onClick={() => handleLogin(formData)}>
                        Log In
                    </Button>
                    <Button variant="text">
                        <Link to="/signup">Sign up</Link>
                    </Button>
                </Grid >
            </Grid>

        </div>
    )
} 
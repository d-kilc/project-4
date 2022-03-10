import { useState } from 'react'
import { Grid, Button, Typography, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup({ handleSetUser }) {

    const [ formData, setFormData ] = useState({
        username: '',
        password: '',
        password_confirmation: '',
    })
    const navigate = useNavigate()

    console.log(formData)
    function handleUpdateInput(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleSignUp() {
        console.log('hello world')

        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    alert('Success! Account created.')
                    handleSetUser(data)
                    navigate('/')
                })
            } else {
                res.json().then(data => {
                    alert('Please check your entries and try again. Errors: ' + data.errors)
                })
            }
        })
    }

    return (
        <div className="container">
            <Grid container xs={'auto'} spacing={2} direction={'column'} alignItems='center' justifyContent="center" margin="auto">
                <Grid item alignSelf="center">
                    <Typography variant="h4">Sign Up</Typography>
                </Grid>
                <Grid item xs={1}>
                    <TextField label="Username" name="username" value={formData.username} onChange={handleUpdateInput}/>
                </Grid>
                <Grid item>
                    <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleUpdateInput}/>
                </Grid>
                <Grid item>
                    <TextField label="Confirm Password" type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleUpdateInput}/>
                </Grid>
                <Grid item >
                    <Button variant="contained" onClick={() => handleSignUp()}>
                        Sign Up
                    </Button>
                    <Button variant="text">
                        <Link to="/">Log In</Link>
                    </Button>
                </Grid >
            </Grid>

        </div>
    )
}
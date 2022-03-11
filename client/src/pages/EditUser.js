import { useState } from 'react'
import { Grid, Typography, TextField, Button } from '@mui/material'

export default function EditUser({ handleLogin }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password_confirmation: ''
    })

    function handleUpdateInput(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return(
        <>
    <Grid container xs={'auto'} spacing={2} direction={'column'} alignItems='center' justifyContent="center" margin="auto">
        <Grid item alignSelf="center">
            <Typography variant="h4">Edit User Details</Typography>
        </Grid>
        <Grid item xs={1}>
            <TextField label="Username" name="username" value={formData.username} onChange={handleUpdateInput}/>
        </Grid>
        <Grid item>
            <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleUpdateInput}/>
        </Grid>
        <Grid item>
            <TextField label="Password Confirmation" type="password" name="password_confirmation" value={formData.password} onChange={handleUpdateInput}/>
        </Grid>
        <Grid item >
            <Button variant="contained" onClick={() => handleLogin(formData)}>
                Log In
            </Button>
        </Grid >
    </Grid>
    </>
    )
    
}
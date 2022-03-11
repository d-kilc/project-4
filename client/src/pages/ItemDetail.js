import { useState, Suspense, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom' 
import { Grid, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

export default function ItemDetail({  }) {
    const [userItem, setUserItem] = useState()
    const location = useLocation()
    
    const navigate = useNavigate()

    function goBack() {
      navigate(-1)
    }

    useEffect(() => {
        fetch(`/user_items/${location.state.userItemId}`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setUserItem(data)
                })
            } else {
                res.json().then(data => {
                    alert('There was a problem fetching data: ' + data.errors)
                })
            }
        })
    }, [])

    if (userItem) return(
        <div className="details-container">
            <Suspense fallback={<h2>Loading...</h2>}>
                <Grid container flexDirection="row">
                    <Grid item xs={12} sm={6} my={4}>
                        <Typography variant="h4">{userItem.item.name}</Typography>
                        <Typography my={2} variant="h5">by {userItem.item.brand}</Typography>
                        <Typography my={2} variant="body1">from {userItem.user.username}'s profile</Typography>
                        <Button onClick={goBack}>Go Back</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} my={4}>
                        <img src={userItem.item.image_url}/>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table>
                        <TableRow>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">{userItem.item.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">Original cost</TableCell>
                            <TableCell align="right">${userItem.item.original_cost}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">Usage</TableCell>
                            <TableCell align="right">{userItem.usage_frequency || 'None yet'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">Value</TableCell>
                            <TableCell align="right">{userItem.usage_frequency ? '$' + (userItem.item.original_cost / userItem.usage_frequency).toFixed(2) : '$' + userItem.item.original_cost}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">User notes</TableCell>
                            <TableCell align="right">{userItem.notes}</TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
            </Suspense>
        </div>
    )
    return <></>
    
}
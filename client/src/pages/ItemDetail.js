import { useState, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom' 
import { Grid, Typography, TextField, Button } from '@mui/material'

export default function ItemDetail({  }) {
    const [userItem, setUserItem] = useState()
    const location = useLocation()
    console.log(location)

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

    return(
        <div className="container">
            {/* <Suspense fallback={<h2>Loading...</h2>}>
                <div>{userItem.name}</div>
            </Suspense> */}
        </div>
    )
    
}
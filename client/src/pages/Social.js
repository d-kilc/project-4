import ItemTable from '../components/ItemTable'
import { Grid, Button } from '@mui/material'
import { useState, useEffect } from 'react'
export default function Social({currentUser}) {
    
    const [users, setUsers] = useState()
    const [following, setFollowing] = useState()

    useEffect(() => {
        fetch('/users')
        .then(res => res.json())
        // .then(console.log)
        .then(setUsers)
        .catch(err => alert('There was a problem fetching users: ' + err))
    }, [])

    useEffect(() => {
        if (currentUser) fetchFollowing()
    }, [currentUser])

    function handleFollowUser(follower_id, followed_id) {
        console.log(`${follower_id} followed ${followed_id}`)
        fetch(`/follows`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({
                user_id: parseInt(follower_id),
                followed_id: parseInt(followed_id)
            })
        })
        .then(res => res.json())
        // .then(console.log)
        .then(fetchFollowing)
        .catch(err => alert('There was a problem following the user: ' + err))
    }

    function handleUnfollowUser(follower_id, unfollowed_id) {
        fetch(`/users/${follower_id}/follows/${unfollowed_id}`, {
            method: 'DELETE'
        })
        .then(fetchFollowing)
        .catch(err => alert('There was a problem unfollowing the user: ' + err))
    }

    function fetchFollowing() {
        fetch(`/users/${currentUser.id}/follows`)
        .then(res => res.json())
        .then(setFollowing)
        .catch(err => 'There was a problem fetching your followed users: ' + err)
    }

    function isFollowing(user) {
        if (following) return !!following.find(following => following.id === user.id)
        return false
    }

    if (!users) return <></>

    return (
        <>
        <h1>Social</h1>
        <h3>All users</h3>
        <Grid container spacing={2} justifyContent="space-evenly">
            {users.map(user => {
                if (user.id === currentUser.id) return <></>

                return (
                    <Grid container xs={5} md={4} direction="row" alignItems="center" justifyContent="space-between">
                        <Grid item >{user.username}</Grid>
                        <Grid item>
                            {isFollowing(user) ? (
                                <Button variant="outlined" color="error" onClick={() => handleUnfollowUser(currentUser.id, user.id)}>Unfollow</Button>
                            ) : (
                                <Button variant="outlined" color="success" onClick={() => handleFollowUser(currentUser.id, user.id)}>Follow</Button>
                            )}
                        </Grid>

                    </Grid>
                )
            })}
        </Grid>
        {following && following.map(user => <ItemTable user={user} />)}
        </>
    )
}
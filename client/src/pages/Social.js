import ItemTable from '../components/ItemTable'
import { Grid, Button, TextField, Typography } from '@mui/material'
import UserSearch from '../components/UserSearch'
import { useState, useEffect } from 'react'
export default function Social({currentUser}) {
    
    const [users, setUsers] = useState()
    const [following, setFollowing] = useState()

    useEffect(() => {
        fetch('/users')
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setUsers(data)
                })
            } else {
                res.json().then(data => {
                    alert('There was a problem fetching users.')
                })
            }
        })
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
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    fetchFollowing()
                })
            } else {
                res.json().then(data => {
                    alert('There was a problem following the user: ' + data.errors)
                })
            }
        })
    }

    function handleUnfollowUser(follower_id, unfollowed_id) {
        fetch(`/users/${follower_id}/follows/${unfollowed_id}`, {
            method: 'DELETE'
        })
        .then(fetchFollowing)
        .catch(err => alert('There was a problem unfollowing the user.'))
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
        <div className="container">
            <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="h2" my={4}>Social</Typography>
                <UserSearch currentUser={currentUser} users={users} following={following} isFollowing={isFollowing} handleFollowUser={handleFollowUser} handleUnfollowUser={handleUnfollowUser}/>
            </Grid>
            <Typography variant="h4" my={4}>Your friends</Typography>
            {following && following.map(user => {
                return (
                    <>
                    <Typography variant="h6" my={4}>{user.username}</Typography>
                    <ItemTable user={user} /> 
                    </>
                )
            })}
            {following.length === 0 ? (
                <Grid container sx={{height: '40%'}} justifyContent="center" alignItems="center">
                <Typography variant="h6">Looks like you're not following anyone. Follow other users to get started.</Typography>
                </Grid>
            ) : <></>}
        </div>
    )
}
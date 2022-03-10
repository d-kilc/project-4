import ItemList from '../components/ItemList'
import ItemTable from '../components/ItemTable'
import { Typography } from '@mui/material'
export default function Dashboard({user, handleLogout}) {

    return (
        <div className="container">
            <Typography variant="h2" my={4}>Welcome, {user.username}</Typography>
            <div>
                <Typography variant="h4" my={4}>Your items</Typography>
                <ItemTable user={user}/>
            </div>
        </div>
    )
}
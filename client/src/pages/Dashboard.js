import ItemList from '../components/ItemList'
import ItemTable from '../components/ItemTable'
export default function Dashboard({user, handleLogout}) {

// console.log(user.user_items.map((obj) => console.log(obj.item)))
    return (
        <>
        <div>
            <h1>Welcome {user.username}</h1>
            <ItemList user = {user}/>
        </div>
        <div>
            <ItemTable user={user}/>
        </div>
        </>
    )
}
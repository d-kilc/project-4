import { useState, useEffect } from 'react'
import ItemCard from './ItemCard'

export default function ItemList({user}) {
    
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [user])
    
    if (!loaded) return <></>
    return(
        <div>
            {user.user_items && user.user_items.map(item => (
                <ItemCard {...item}/>
            ))}
        </div>
    )
}
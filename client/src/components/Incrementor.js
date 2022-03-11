import {useEffect} from 'react'
import { TextField } from '@mui/material'


export default function Incrementor ({row, setIncrementorValue, incrementorValue}) {
    useEffect(() => {
        setIncrementorValue(row.numberOfUses)
    },[])
    
    const handleChange = (event) => {
        setIncrementorValue(event.target.value);
      };

    return(
        <TextField  
        value={incrementorValue} 
        type="number" 
        min="0"
        onChange={(e) => handleChange(e)}
        />
    )
}
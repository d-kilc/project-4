import {useEffect} from 'react'


export default function Incrementor ({row, setIncrementorValue, incrementorValue}) {
    useEffect(() => {
        setIncrementorValue(row.numberOfUses)
    },[])
    
    const handleChange = (event) => {
        setIncrementorValue(event.target.value);
      };

    return(
        <input 
        value={incrementorValue} 
        type="number" 
        min="0"
        onChange={(e) => handleChange(e)}
        />
    )
}
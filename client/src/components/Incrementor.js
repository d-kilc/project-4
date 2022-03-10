import {useState, useEffect} from 'react'


export default function Incrementor ({row}) {

    const [incrementorValue, setIncrementorValue] = useState(0)
    console.log(incrementorValue)

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
    // <input value={props.tickerValue} type="number"/>
}
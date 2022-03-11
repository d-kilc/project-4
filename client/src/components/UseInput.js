import {useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function UseInput({inputValue, setInputValue, row}) {

  
  const handleChange = (event) => {
    setInputValue(event.target.value);
    // console.log(inputValue)
    console.log(event.target.value)
  };


useEffect(() => {
  setInputValue(row.description)

},[])

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          placeholder="Comments"
          id="standard-multiline-static"
          multiline
          rows={4}
          defaultValue={inputValue}
          onChange={(e) => handleChange(e)}
          variant="standard"
        />
      </div>
    </Box>
  );
}
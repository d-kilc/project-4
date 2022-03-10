import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function UseInput({row}) {
  const [value, setValue] = useState(row.description);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

useEffect(() => {
  console.log(value)
},[value])

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
          defaultValue={value}
          onChange={(e) => handleChange(e)}
          variant="standard"
        />
      </div>
    </Box>
  );
}
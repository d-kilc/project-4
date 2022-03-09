import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function UseInput({row}) {
  const [value, setValue] = useState();
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '125ch' },
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
          defaultValue={row.description}
          variant="standard"
        />
      </div>
    </Box>
  );
}
import * as React from 'react';
import '../App.css'
import { Button, TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function UserSearch({currentUser, users, following, isFollowing, handleFollowUser, handleUnfollowUser}) {
  const [value, setValue] = React.useState(null);

  return (
    <Autocomplete
      
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        // const { inputValue } = params;
        // Suggest the creation of a new value
        // const isExisting = options.some((option) => inputValue === option.title);
        // if (inputValue !== '' && !isExisting) {
        //   filtered.push({
        //     inputValue,
        //     title: `Add "${inputValue}"`,
        //   });
        // }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="user-search"
      options={users}
      getOptionLabel={(option) => option.username}
      renderOption={(props, option) => {
        if (option.id === currentUser.id) return <></>
        return (
            <li {...props} className="user-search-result">
                {option.username}
                {isFollowing(option) ? (
                    <Button sx={{width: '100px', marginRight: '10px'}} variant="outlined" color="error" onClick={() => handleUnfollowUser(currentUser.id, option.id)}>Unfollow</Button>
                ) : (
                    <Button sx={{width: '100px', marginRight: '10px'}}variant="contained" color="success" onClick={() => handleFollowUser(currentUser.id, option.id)}>Follow</Button>
                )}
            </li>
        )
      }}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Search all users" />
      )}
    />
  );
}
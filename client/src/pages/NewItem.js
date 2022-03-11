import { TextField, Select, InputLabel, MenuItem, Grid, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function NewItem({user, handleCreateItem}) {

    const [userItemData, setUserItemData] = useState({
        notes: '',
        item_type: '',
    })

    const [itemData, setItemData] = useState({
        name: '',
        original_cost: null,
        brand: '',
        year_manufactured: null,
        image_url: '',
        description: ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) return
        setUserItemData({...userItemData, user_id: user.id})
    }, [user])

    function handleUpdateItemData(e) {
        setItemData({...itemData, [e.target.name]: e.target.value})
    }

    function handleUpdateUserItemData(e) {
        setUserItemData({...userItemData, [e.target.name]: e.target.value})
    }

    return(
        <div className="container">
            <Typography variant="h2" my={4}>Create New Item</Typography>
            <Typography variant="h5" my={4}>Item details</Typography>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <TextField required name="name" value={itemData.name} onChange={handleUpdateItemData} label="Item name" fullWidth></TextField>
                </Grid>
                <Grid item xs={4}>
                    <TextField name="year_manufactured" value={itemData.year_manufactured} onChange={handleUpdateItemData} label="Year manufactured" type="number" fullWidth></TextField>
                </Grid>
                <Grid item xs={4}>
                    <TextField required name="original_cost" value={itemData.original_cost} onChange={handleUpdateItemData} label="Original cost" type="number" fullWidth></TextField>
                </Grid>
                <Grid item xs={4}>
                    <TextField name="brand" value={itemData.brand} onChange={handleUpdateItemData} label="Brand" fullWidth></TextField>
                </Grid>
                <Grid item xs={4}>
                    <TextField name="image_url" value={itemData.image_url} onChange={handleUpdateItemData} label="Image URL" fullWidth></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField name="description" value={itemData.description} onChange={handleUpdateItemData} label="Description" multiline rows={4} fullWidth></TextField>
                </Grid>
            </Grid>
            <Typography variant="h5" my={4}>Ownership details</Typography>
            <Grid container spacing={2} mb={2}>
                {/* <Grid item xs={8} display="flex" alignItems="center">
                    <Typography textAlign="center">Is usage of this item tracked by <strong>frequency</strong> (# of times used) or <strong>time</strong> (amount of time used)?</Typography>
                </Grid>
                <Grid item xs={4}>
                    <InputLabel id="select-label">Item Type</InputLabel>
                    <Select required label="Item Type" labelId="select-label" name="item_type" value={userItemData.item_type} onChange={handleUpdateUserItemData} fullWidth>
                        <MenuItem value={'Frequency'}>Frequency</MenuItem>
                        <MenuItem value={'Time'}>Time</MenuItem>
                    </Select>
                </Grid> */}
                <Grid item xs={12}>
                    <TextField label="Notes" name="notes" value={userItemData.notes} onChange={handleUpdateUserItemData} multiline rows={4} fullWidth ></TextField>
                </Grid>
            </Grid>
            <Grid item xs={12} m={2} align="center">
                <Button sx={{marginBottom: '16px'}} variant="contained" onClick={() => {
                    navigate('/')
                    handleCreateItem(itemData, userItemData)
                }}>Submit Item</Button>
            </Grid>
        </div>
    )
}
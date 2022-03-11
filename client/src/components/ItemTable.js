import * as React from 'react';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Incrementor from './Incrementor';

import UseInput from './UseInput'


function createData(name, ppu, numberOfUses, original_cost, year_manufactured, description, id) {
  return {
    name,
    ppu,
    numberOfUses,
    original_cost,
    year_manufactured,
    description,
    id
  };
}

const currencies = [
  {
    value: 'Uses',
    label: 'Total Uses',
  },
  {
    value: 'Minutes',
    label: 'Minutes',
  },
  {
    value: 'Days',
    label: 'Days',
  },
  {
    value: 'Months',
    label: 'Months',
  },  
];  

export default function ItemTable({user}) {
  const [loading, setLoading] = useState(true)
  const [tickerValue, setTickerValue] = useState(0)

  useEffect(() => {
      setLoading(false)
  }, [user])

if(!loading){
    let rows = user && user.user_items.map((U_I) => {
      return(
        createData(
          `${U_I.item.name}`, 
          `${(U_I.item.original_cost / U_I.usage_frequency  ).toFixed(2)}`,
          `${U_I.usage_frequency}`,
          `${U_I.item.original_cost.toFixed(2)}`,
          `${U_I.item.year_manufactured}`,
          `${U_I.item.description}`,
          `${U_I.item.id}`
        )
      )
    })
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Item Name</TableCell>
            <TableCell align="right">Price per use</TableCell>
            <TableCell align="right">Number of uses</TableCell>
            <TableCell align="right">Initial price</TableCell>
            <TableCell align="right">Year manufactured</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row tickerValue={tickerValue} setTickerValue={setTickerValue} key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
} else return <></>

}

function Row(props) {
  
  function saveClick(){
    console.log(incrementorValue)
    console.log(inputValue)
    console.log("save me")
    
    const config = {
      headers: {"Content-Type": "application/json"},
      method: "PATCH",
      body: JSON.stringify({
        notes: inputValue,
        usage_frequency: incrementorValue
      })
    }
    fetch(`/user_items/${props.row.id}`, config)
    .then(r => r.json())
    .then((data) => console.log(data))
    window.location.reload()
  }

  const [incrementorValue, setIncrementorValue] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const { row } = props;
  const [open, setOpen] = useState(false);

  const [currency, setCurrency] = useState('Uses');
  
  function handleChange(event) {
    setCurrency(event.target.value);
  }

  function deleteItemUser(user){
    console.log(user.row.id)

    fetch(`/user_item/${props.row.id}`, {method: "DELETE"})
    .then(res => res.json())

    window.location.reload()
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.ppu}</TableCell>
        <TableCell align="right">
               {row.numberOfUses}
        </TableCell>
        <TableCell align="right">{row.original_cost}</TableCell>
        <TableCell align="right">{row.year_manufactured}</TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                For your custom page!
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <UseInput inputValue={inputValue} setInputValue={setInputValue} row={row}/>
                    </TableCell>
                    <TableCell>
                      <Incrementor setIncrementorValue={setIncrementorValue} incrementorValue={incrementorValue} row={row}/>
                    </TableCell>
                    <TableCell>
                    <h3>Save your updated data!</h3>
                      <button onClick={() => saveClick()}>
                        save
                      </button>
                    </TableCell>
                    <TableCell align="right">
                      <button>
                        New
                      </button>
                    </TableCell>
                    <TableCell align="right">
                      <Link to={`/user-items/${row.id}`} state={{userItemId: row.id}}>
                        <button>
                          Details
                        </button>  
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <button onClick={() => deleteItemUser({row})}>Delete</button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
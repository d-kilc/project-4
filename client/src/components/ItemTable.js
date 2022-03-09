import * as React from 'react';
import { useState } from 'react'
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

import UseInput from './UseInput'



function createData(name, ppu, numberOfUses, original_cost, year_manufactured, description,) {
  return {
    name,
    ppu,
    numberOfUses,
    original_cost,
    year_manufactured,
    description,
    // history: [
    //   {
    //     date: '2020-01-05',
    //     customerId: '11091700',
    //     amount: 3,
    //   },
    //   {
    //     date: '2020-01-02',
    //     customerId: 'Anonymous',
    //     amount: 1,
    //   },
    // ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const [currency, setCurrency] = useState('Uses');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

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
                    {/* <TableCell>
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                       }}
                      noValidate
                      autoComplete="off"
                    >
                       <div>
                        <TextField
                          id="outlined-select-currency"
                          select
                          label="Select"
                          value={currency}
                          onChange={handleChange}
                          helperText="Please select your currency"
                        >
                          {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                          </MenuItem>
                          ))}
                        </TextField>
                        </div>
                      </Box>

                    </TableCell> */}
                    <TableCell>
                      <UseInput row={row}/>
                    </TableCell>
                    <TableCell align="right">
                      {row.numberOfUses}
                    </TableCell>
                    <TableCell align="right">
                      <button>
                        New
                      </button>
                    </TableCell>
                    <TableCell align="right">
                      <button> Archive</button>  
                    </TableCell>
                    <TableCell align="right">
                            <button>Delete</button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* // {row.history.map((historyRow) => ( */}
                  {/* //   <TableRow key={historyRow.date}>
                  //     <TableCell component="th" scope="row">
                  //       {historyRow.date}
                  //     </TableCell>
                  //     <TableCell>{historyRow.customerId}</TableCell>
                  //     <TableCell align="right">{historyRow.amount}</TableCell>
                  //     <TableCell align="right">
                  //       {Math.round(historyRow.amount * row.price * 100) / 100}
                  //     </TableCell>
                  //   </TableRow>
                  // ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     // history: PropTypes.arrayOf(
//     //   PropTypes.shape({
//     //     amount: PropTypes.number.isRequired,
//     //     customerId: PropTypes.string.isRequired,
//     //     date: PropTypes.string.isRequired,
//     //   }),
//     // ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

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


    let rows = user.user_items.map((U_I) => {
      return(
        createData(
          `${U_I.item.name}`, 
          `${(U_I.item.original_cost / U_I.usage_frequency  ).toFixed(2)}`,
          `${U_I.usage_frequency}`,
          `${U_I.item.original_cost.toFixed(2)}`,
          `${U_I.item.year_manufactured}`,
          `${U_I.item.description}`
      ))
      })
    // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),

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
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
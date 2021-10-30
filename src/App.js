import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { green, orange } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

function Currency({values,label, defaultValue = 0, ...props}) {
    const [currency, setCurrency] = React.useState('');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };




    return (
            <FormControl sx = {{minWidth: 100}}>
                <InputLabel id="demo-simple-select-label" sx = {{}}>{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currency}
                    label= {label}
                    onChange={handleChange}
                    autoWidth = "true"

                >

                    {
                        values.map(e =>
                            {
                                return(
                                <MenuItem sx={{color:"#fff"}} value={e.value}>{e.name}</MenuItem>
                                );
                            }
                        )

                    }



                </Select>

            </FormControl>
    );
}

function App() {
    const values = [
        {name:"BTC", value:10},
        {name:"ETH", value:20},
        {name:"ETC", value:30},
        {name:"LTS", value:40},
        {name:"USD", value:50},

    ];



  return (

      <ThemeProvider theme={theme}>

    <div className="wrapper t-wrapper">
        <h1>Calc</h1>
        <div className="form">
            <input type="text" style ={{backgroundColor:"#4d4d4d"}}/>
            <Currency values = {values} label = "Currency" defaultValue = {50}/>
            <input style ={{backgroundColor:"#4d4d4d"}} type="text"/>
            <Currency values = {values} label = "Currency" defaultValue = {10}/>
        </div>
    </div>
      </ThemeProvider>

  );
}

export default App;

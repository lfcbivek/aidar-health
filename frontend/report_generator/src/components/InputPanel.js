import './InputPanel.css'
import React from "react";
import {InputLabel, MenuItem, FormHelperText, FormControl, Select, Button } from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ShareIcon from '@mui/icons-material/Share';

const InputPanel = () => {
    return (
        <div className="input-panel">
            <div className='patient-selector'>
                <FormControl sx={{ minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-helper-label">Patient Name</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={"None"}
                    label="Patient Name"
                    // onChange={handleChange}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'John'}>John</MenuItem>
                    <MenuItem value={'Jack'}>Jack</MenuItem>
                    <MenuItem value={'Sam'}>Samantha</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className='dates'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Report From"
                            value={dayjs('2022-04-17')}
                            // onChange={(newValue) => setValue(newValue)}
                        />
                        <DatePicker
                            label="Report To"
                            value={dayjs('2022-04-17')}
                            // onChange={(newValue) => setValue(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
            <div className='search'>
                <Button className='search-button' variant="contained" size="small">
                    Search
                </Button>
            </div>
            <div className='share'>
                <ShareIcon />
            </div>
        </div>
    );
}

export default InputPanel;
import './InputPanel.css'
import React, {useState} from "react";
import {InputLabel, MenuItem, FormControl, Select, Button, CircularProgress, Box, Modal,Typography, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import { sendEmail } from '../utils';


const InputPanel = (props) => {
    const selectedPatientId = props.selectedPatientId;
    const patientsInfo = props.patientsInfo
    const loading = props.loading;
    const fromDate = props.fromDate;
    const toDate = props.toDate;
    const isRequestSubmitted = props.isRequestSubmitted;

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        console.log(event.target.value)
        setEmail(event.target.value)
    }

    const handleSendEmail = async () => {
        const response = await sendEmail(selectedPatientId, email, fromDate, toDate);
        if(response.ok) {
            handleClose();
        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const downloadPdf = async () => {
        const formdata = new FormData();
        formdata.append("patient_id", `${selectedPatientId}`);
        formdata.append("from_date", fromDate);
        formdata.append("to_date", toDate);
    
        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };
    
        try {
            const response = await fetch("http://127.0.0.1:5000/generate-pdf", requestOptions);
    
            // Check if the response is OK
            if (!response.ok) {
                const errorBody = await response.text(); // Get error details
                throw new Error('Failed to download PDF: ' + response.statusText + ' - ' + errorBody);
            }
    
            const blob = await response.blob(); // Get the response as a Blob
            const url = window.URL.createObjectURL(blob); // Create a blob URL
            const link = document.createElement('a'); // Create a link element
            link.href = url;
            link.setAttribute('download', 'report.pdf'); // Set the filename for download
            document.body.appendChild(link); // Append link to the body
            link.click(); // Trigger the download
            link.remove(); // Clean up
            window.URL.revokeObjectURL(url); // Release the blob URL
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };
    

    return (
        <div className="input-panel">
            <div className='patient-selector'>
                <FormControl sx={{ minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-helper-label">Patient Name</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedPatientId || ''}
                        label="Patient Name"
                        onChange={props.onPatientChange}
                    >
                        {loading ? (
                            <MenuItem disabled>
                                <CircularProgress size={24} />
                            </MenuItem>
                        ) : (
                            patientsInfo.map(patient => (
                                <MenuItem key={patient.patient_id} value={patient.patient_id}>
                                  {patient.first_name} {patient.last_name}
                                </MenuItem>
                              ))
                        )}
                    </Select>
                </FormControl>
            </div>
            <div className='dates'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Report From"
                            value={fromDate}
                            onChange={(newValue) => props.onFromDateChange(newValue)}
                        />
                        <DatePicker
                            label="Report To"
                            value={toDate}
                            onChange={(newValue) => props.onToDateChange(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
            <div className='search'>
                <Button className='search-button' variant="contained" size="small" onClick={props.onSearch}>
                    Search
                </Button>
            </div>
            {isRequestSubmitted &&
                <div class="icons">
                    <div className='download-icon'>
                        <DownloadIcon onClick={downloadPdf}/>
                    </div>
                    <div className='share'>
                        <Button onClick={handleOpen}>
                            <ShareIcon />
                        </Button>
                        <Modal
                            open={openModal}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Email
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <TextField id="outlined-basic" label="Email" variant="outlined" onChange={handleEmailChange}/>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <Button onClick={handleSendEmail}>
                                            Send Email
                                    </Button>
                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                </div>
            }   
        </div>
    );
}

export default InputPanel;
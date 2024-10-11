import './ContentContainer.css';
import React, {useState, useEffect} from 'react';
import { Alert } from '@mui/material';

import InputPanel from './InputPanel';
import ReportContainer from './ReportContainer';
import { getPatientsInfo, getReportData } from '../utils';
import dayjs from 'dayjs';

const ContentContainer = () => {
    // State to hold patients information
    const [patientsInfo, setPatientsInfo] = useState([]);
    // State hook to hold the information of the selected patient
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [loading, setLoading] = useState(true);

    // States to hold the selected dates. Default values are today's date
    const[fromDate, setFromDate] = useState(dayjs());
    const[toDate, setToDate] = useState(dayjs());

    const[isRequestSubmitted, setIsRequestSubmitted] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const [report, setReport] = useState([]);


    useEffect(() => {
        const fetchPatientsInfo = async () => {
            try {
                const data = await getPatientsInfo();
                setPatientsInfo(data.patients);
            } catch (error) {
                console.error('Error fetching patient names:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPatientsInfo();
    }, []);

    // useEffect(() => {
    //     setReport([]);
    //     setIsRequestSubmitted(false);
    // }, [selectedPatientId]);

    const handlePatientChange = (event) => {
        setErrorMessage('');
        setSelectedPatientId(event.target.value);
    };

    const handleSearch = async () => {
        if (!selectedPatientId) {
            setErrorMessage('Patient not selected');
            return;
        }
        // Set back error message to empty if any errors were previously reported
        setErrorMessage('');
        setIsRequestSubmitted(true);

        // Get the report of the patient within the date range selected
        const patient_report = await getReportData(selectedPatientId, fromDate, toDate);
        setReport(patient_report.reports);
        
    }

    const handleFromDateChange = (newFromDate) => {
        setFromDate(newFromDate);
    }

    const handleToDateChange = (newToDate) => {
        if (newToDate.isBefore(fromDate)) {
            setErrorMessage('To date is greater than from date');
            return;
        }
        setErrorMessage('');
        setToDate(newToDate);
    }

    return(
        <div className='content-container'>
            <div className='user-options'>
                <InputPanel 
                    patientsInfo={patientsInfo}
                    selectedPatientId={selectedPatientId}
                    loading={loading}
                    fromDate={fromDate}
                    toDate={toDate}
                    isRequestSubmitted={isRequestSubmitted}
                    onPatientChange={handlePatientChange}
                    onSearch={handleSearch}
                    onFromDateChange={handleFromDateChange}
                    onToDateChange={handleToDateChange}
                />
            </div>
            {errorMessage !== '' &&
            <div className='error-message'>
                <Alert severity="error">{errorMessage}</Alert>
            </div>}
            {isRequestSubmitted && 
                <div className='patient-report'>
                    { report.length > 0 &&
                        <ReportContainer 
                            report={report}
                        />
}                   
                </div>
            }
        </div>
    );
}


// ContentContainer.prototype({

// });
export default ContentContainer;
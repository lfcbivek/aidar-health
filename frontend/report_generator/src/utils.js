/*
The utils.js file contains all the utils functions as well as the functions that make API calls to the backend
*/

// Grab all the patients information from the backend endpoint
export const getPatientsInfo = async () => {
    const response = await fetch(`${process.env.REACT_APP_GET_PATIENTS_URL}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

export const getReportData = async (patientId, fromDate, toDate) => {
    const formdata = new FormData();
    formdata.append("patient_id", patientId);

    const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    const response = await fetch(`${process.env.REACT_APP_GET_REPORT_URL}`, requestOptions);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}

export const generateBloodPressureChartData = (report) => {
    const data = [];
    report.forEach(r => {
        data.push({
            'diastolic': r.diastolic_blood_pressure,
            'systolic': r.systolic_blood_pressure,
            'timestamp': new Date(r.timestamp)
        });
    });
    return data;
}

export const generatePulseRateChartData = (report) => {
    const data = [];
    report.forEach(r => {
        data.push({
            'pulse_rate': r.heart_rate,
            'timestamp': new Date(r.timestamp)
        });
    });
    return data;
}


// Function to format date to YYYY-MM-DD
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;
};

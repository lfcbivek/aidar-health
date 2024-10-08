import './ReportContainer.css'
import React from "react";

import { Card, CardContent, Typography } from '@mui/material';
import BloodPressureChart from './BloodPressureChart';
import ReportsTable from './ReportsTable';

const ReportContainer = () => {
    return (
        <div className="report-container">
            <div className="card-data">
                <div>
                    <Card variant="outlined" sx={{ width: 275 }}>
                        <CardContent>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                Pulse Rate
                            </Typography>
                            <Typography variant="h5" component="div">
                                90
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card variant="outlined" sx={{ width: 275 }}>
                        <CardContent>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                BMI
                            </Typography>
                            <Typography variant="h5" component="div">
                                27
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className='charts'>
                <div className='line-chart'>
                    <BloodPressureChart />
                </div>
                <div className='line-chart'>
                    <BloodPressureChart />
                </div>
            </div>
            <div className='reports-table'>
                <ReportsTable />
            </div>
        </div>
    );
}

export default ReportContainer;
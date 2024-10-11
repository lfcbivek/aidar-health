import './ReportContainer.css'
import React, {useEffect, useState} from "react";

import { Card, CardContent, Typography } from '@mui/material';
import BloodPressureChart from './BloodPressureChart';
import ReportsTable from './ReportsTable';
import PulseRateChart from './PulseRateChart';

const ReportContainer = (props) => {
    const report = props.report;
    
    const getMaxPulseRate = () => {
        const pulseRates = [];
        report.forEach(r => {
            pulseRates.push(r.heart_rate);
        })
        return Math.max(...pulseRates);
    } 

    const getMaxOxygenSaturation = () => {
        const saturations = [];
        report.forEach(r => {
            saturations.push(r.oxygen_saturation);
        })
        return Math.max(...saturations);
    }

    const getMaxTemperature = () => {
        const bodyTemperatures = [];
        report.forEach(r => {
            bodyTemperatures.push(r.body_temperature);
        })
        return Math.max(...bodyTemperatures);
    }

    const getMaxBodyWeight = () => {
        const bodyWeights = [];
        report.forEach(r => {
            bodyWeights.push(r.body_weight);
        })
        return Math.max(...bodyWeights);
    }

    return (
        <div className="report-container">
            <div className="card-data">
                <div>
                    <Card variant="outlined" sx={{ width: 275 }}>
                        <CardContent>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                Max Pulse Rate
                            </Typography>
                            <Typography variant="h5" component="div">
                                {getMaxPulseRate()}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card variant="outlined" sx={{ width: 275 }}>
                        <CardContent>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                Max Oxygen Saturation Level
                            </Typography>
                            <Typography variant="h5" component="div">
                                {getMaxOxygenSaturation()}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card variant="outlined" sx={{ width: 275 }}>
                        <CardContent>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                Max Body Temperature (in C)
                            </Typography>
                            <Typography variant="h5" component="div">
                                {getMaxTemperature()}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card variant="outlined" sx={{ width: 275 }}>
                        <CardContent>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                Max Body Weights
                            </Typography>
                            <Typography variant="h5" component="div">
                                {getMaxBodyWeight()}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className='charts'>
                <div className='line-chart'>
                    <BloodPressureChart 
                        report={report}
                    />
                </div>
                <div className='line-chart'>
                    <PulseRateChart 
                        report={report}/>
                </div>
            </div>
            <div className='reports-table'>
                <ReportsTable 
                    report={report}
                />
            </div>
        </div>
    );
}

export default ReportContainer;
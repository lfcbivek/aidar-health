import React from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import { generatePulseRateChartData } from "../utils";

const PulseRateChart = (props) => {
    const chartData = generatePulseRateChartData(props.report);
    console.log(chartData)
    return (
        <div>
            <LineChart
                xAxis={[{ 
                    dataKey: "timestamp", 
                    scaleType: 'time',
                    valueFormatter: (timestamp) => {
                        const year = timestamp.getFullYear().toString();
                        const month = (timestamp.getMonth() + 1).toString().padStart(2, '0');
                        const day = timestamp.getDate().toString().padStart(2, '0');
                        return `${year}-${month}-${day}`;
                    }
                    }]
                }
                dataset={chartData}
                series={[
                    {
                        id: 'Pulse',
                        label:'Pulse Rate', 
                        dataKey:'pulse_rate',
                        
                    }
                ]}
                width={600}
                height={600}
/>
        </div>
    );
}

export default PulseRateChart;
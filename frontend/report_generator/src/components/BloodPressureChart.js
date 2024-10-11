import { BarChart } from '@mui/x-charts/BarChart';
import { generateBloodPressureChartData } from '../utils';

const BloodPressureChart = (props) => {
    console.log(props.report)
    const chartData = generateBloodPressureChartData(props.report);
    // const xAxisData = generateBloodPressureXAxisData(props.report)
    return (
        <BarChart
            xAxis={[{ 
                dataKey: "timestamp", 
                scaleType: 'band',
                valueFormatter: (timestamp) => {
                    const year = timestamp.getFullYear().toString();
                    const month = (timestamp.getMonth() + 1).toString().padStart(2, '0');
                    const day = timestamp.getDate().toString().padStart(2, '0');
                    return `${year}-${month}-${day}`;
                }
                }]
            }
            // xAxis={[{data: xAxisData}]}
            dataset={chartData}
            series={[
                {
                    // type: 'line', 
                    label:'Systolic Blood Pressure', 
                    dataKey:'systolic',
                    
                },
                {
                    // type: 'line', 
                    label:'Diastolic Blood Pressure', 
                    dataKey:'diastolic',
                }
            ]}
            width={600}
            height={600}
        />
    );
}

export default BloodPressureChart;
import { createTheme } from '@mui/material/styles';

import DashboardIcon from '@mui/icons-material/Dashboard';

// Constants defining elements in the Navbar Section
export const NAVBAR_INFO = [
    {
        kind: 'header',
        title: 'Patients',
    },
    {
        segment: 'report_generator',
        title: 'Report',
        icon: <DashboardIcon />,
    },
];

export const DEMO_THEME = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  export const TABLE_COLUMNS = [
    { field: 'report_id', headerName: 'Report ID', width: 100 },
    { field: 'systolic_blood_pressure', headerName: 'Systolic Blood Pressure', width: 100 },
    { field: 'diastolic_blood_pressure', headerName: 'Diastolic Blood Pressure', width: 100 },
    { field: 'body_temperature', headerName: 'Body Temperature', width: 100 },
    { field: 'body_weight', headerName: 'Body Weight', width: 100 },
    { field: 'heart_rate', headerName: 'Heart Rate', width: 100},
    {
      field: 'oxygen_saturation',
      headerName: 'Oxygen Saturation',
      type: 'number',
      width: 100,
    },
    {
      field: 'physician_note',
      headerName: 'Physician Note',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
    },
    {
      field: 'patient_note',
      headerName: 'Patient Note',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
    },
  ];

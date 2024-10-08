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

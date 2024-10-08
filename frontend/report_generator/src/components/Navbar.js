import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';


import { NAVBAR_INFO, DEMO_THEME } from '../constants';
import ContentContainer from './ContentContainer';

// function DemoPageContent({ pathname }) {
//     return (
//       <Box
//         sx={{
//           py: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           textAlign: 'center',
//         }}
//       >
//         <Typography>Dashboard content for {pathname}</Typography>
//       </Box>
//     );
// }

/*

*/
const Navbar = () => {

    const [pathname, setPathname] = React.useState('/reports');

    const router = React.useMemo(() => {
        return {
          pathname,
          searchParams: new URLSearchParams(),
          navigate: (path) => setPathname(String(path)),
        };
      }, [pathname]);;

    return(
        <AppProvider
            navigation= {NAVBAR_INFO}
            router={router}
            theme={DEMO_THEME}
        >
            <DashboardLayout>
                <ContentContainer />
            </DashboardLayout>
        </AppProvider>
    );
}

export default Navbar;
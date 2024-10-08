import './ContentContainer.css';
import React from 'react';

import InputPanel from './InputPanel';
import ReportContainer from './ReportContainer';

const ContentContainer = () => {

    return(
        <div className='content-container'>
            <div className='user-options'>
                <InputPanel />
            </div>
            <div className='patient-report'>
                <ReportContainer />
            </div>
        </div>
    );
}


// ContentContainer.prototype({

// });
export default ContentContainer;
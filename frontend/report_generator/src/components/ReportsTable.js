import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { TABLE_COLUMNS } from '../constants';

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable(props) {
  const report = props.report;
  return (
    <Paper sx={{ overflowX: 'auto' }}>
      <DataGrid
        rows={report}
        columns={TABLE_COLUMNS}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        sx={{ border: 0 }}
        getRowId={(row) => row.report_id}
      />
    </Paper>
  );
}
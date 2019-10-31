import React from 'react';
import ActionMenu from './action-menu';
import DataGrid from './data-grid';

const AdminList = (props) => {
    return (
        <React.Fragment>
            <ActionMenu />
            <DataGrid />
        </React.Fragment>
    );
};

export default AdminList;
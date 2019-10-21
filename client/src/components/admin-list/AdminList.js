import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  } from 'semantic-ui-react';
import ActionMenu from './action-menu';
import DataGrid from './data-grid';

class AdminList extends Component {
    render () {
        
        return (
            <React.Fragment>
                <ActionMenu />
                <DataGrid />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminList);
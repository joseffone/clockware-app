import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  } from 'semantic-ui-react';
//import {  } from '../../store/actions';
import DataGrid from './data-grid';

class List extends Component {
    render () {
        
        return (
            <DataGrid />
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
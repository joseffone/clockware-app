import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import AdminForm from '../components/admin-form';
import DatePicker from '../components/date-picker';
import DataFilter from '../components/admin-list/action-menu/data-filter';

class ClientContainer extends Component {
    render () {
        return (
            <Grid 
                textAlign='center'
                verticalAlign='middle' 
                style={{height: '100%', widtn: '100%', margin: 0}}
            >
                <Grid.Column>

                </Grid.Column>
            </Grid>
        );
    }
}

export default ClientContainer;
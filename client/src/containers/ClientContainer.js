import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import DatePicker from '../components/date-picker/DatePicker';
import InputForm from '../components/input-form/InputForm';
import { getFormConfig } from '../util/util';

class ClientContainer extends Component {
    render () {
        return (
            <Grid 
                textAlign='center'
                verticalAlign='middle' 
                style={{height: '100%', widtn: '100%', margin: 0}}
            >
                <Grid.Column>
                    {/*<h1>This is Client Container!</h1>*/}
                    {/*<DatePicker mobile fluid error />*/}
                    {<InputForm model={'users'} />}
                    {/*<Container>{JSON.stringify(getFormConfig('agents'))}</Container>*/}
                </Grid.Column>
            </Grid>
        );
    }
}

export default ClientContainer;
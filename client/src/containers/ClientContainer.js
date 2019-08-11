import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import InputForm from '../components/input-form';


class ClientContainer extends Component {
    render () {
        return (
            <Grid 
                textAlign='center'
                verticalAlign='middle' 
                style={{height: '100%', widtn: '100%', margin: 0}}
            >
                <Grid.Column>
                    {<InputForm 
                        trigger={
                            (props) => 
                                <Button
                                    icon='edit'
                                    {...props}
                                />
                        }
                        model='orders'
                        mobile={false}
                        update={false}
                    />}
                </Grid.Column>
            </Grid>
        );
    }
}

export default ClientContainer;
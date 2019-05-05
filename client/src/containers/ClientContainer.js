import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';


class ClientContainer extends Component {
    render () {
        return (
            <Grid 
                textAlign='center'
                verticalAlign='middle' 
                style={{height: '100%', widtn: '100%', margin: 0}}
            >
                <Grid.Column>
                    {<h1>This is Client Container!</h1>}
                </Grid.Column>
            </Grid>
        );
    }
}

export default ClientContainer;
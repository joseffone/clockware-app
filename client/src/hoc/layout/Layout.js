import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import NavBar from '../../components/navbar/NavBar';

class Layout extends Component {
    render () {
        return(
            <React.Fragment>
                <NavBar fixed='top' />
                <Segment
                    loading={false}
                    style={{
                        border: 0, 
                        boxShadow: 'none', 
                        marginTop: '4.603em', 
                        minHeight: '100%'
                    }}
                >
                    {this.props.children}
                </Segment>
            </React.Fragment>
        );
    }
}

export default Layout;

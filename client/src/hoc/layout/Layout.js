import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Container } from 'semantic-ui-react';
import NavBar from '../../components/navbar/NavBar';

class Layout extends Component {
    render () {
        return(
            <React.Fragment>
                <NavBar fixed='top' />
                <Segment
                    loading={this.props.isLoading}
                    style={{
                        margin: 0,
                        padding: 0,
                        border: 0,
                        borderRadius: 0, 
                        boxShadow: 'none', 
                        paddingTop: '3.603em',
                        height: '100%'
                    }}
                >
                    {this.props.children}
                </Segment>
                <Segment
                        inverted
                        style={{
                            margin: 0,
                            padding: 0,
                            border: 0,
                            borderRadius: 0, 
                            boxShadow: 'none'
                        }}
                    >
                        <Container textAlign='center'>
                            © 2019 Clockwise Clockware. All rights reserved.
                        </Container>
                    </Segment>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading || state.admin.isLoading || state.client.isLoading
    }
}

export default connect(mapStateToProps)(Layout);

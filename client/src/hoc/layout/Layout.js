import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { refreshTokensRequest } from '../../store/actions';
import { Segment, Container } from 'semantic-ui-react';
import NavBar from '../../components/navbar';

class Layout extends Component {

    componentDidMount () {
        if (localStorage.getItem('pathToAutoRedirect')) {
            this.props.onRefreshTokensHandler(localStorage.getItem('refresh_token'));
            this.props.history.replace(localStorage.getItem('pathToAutoRedirect'));
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.auth.pathToAutoRedirect !== this.props.auth.pathToAutoRedirect) {
            this.props.history.replace(this.props.auth.pathToAutoRedirect);
        }
    }

    render () {
        return(
            <React.Fragment>
                <NavBar fixed='top' />
                <Segment
                    loading={this.props.auth.isLoading}
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
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRefreshTokensHandler: (refreshToken) => dispatch(refreshTokensRequest(refreshToken))
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));

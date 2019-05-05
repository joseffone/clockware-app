import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Header, Button } from 'semantic-ui-react';
import InputForm from '../input-form';
import { logoutRequest } from '../../store/actions'

class NavBar extends Component {
    render () {
        return(
            <Menu
                borderless
                inverted
                fixed={this.props.fixed}
            >
                <Menu.Item
                    content={
                        <Header
                            inverted
                            as='h3'
                            icon='clock outline'
                            content='Clockwise Clockware'
                        />
                    }
                />
                <Menu.Item
                    position='right'
                    content={
                        this.props.accessToken === null ?
                            <InputForm 
                                trigger={
                                    (props) => 
                                        <Button
                                            as='a'
                                            inverted
                                            content='Log in'
                                            {...props}
                                        />
                                }
                                model='authentication'
                            />
                        :
                            <Button 
                                as='a'
                                inverted
                                content='Log out'
                                onClick={() => this.props.onUserLogoutHandler(this.props.accessToken)}
                            />
                    }
                />
            </Menu>
        );
    }
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserLogoutHandler: (accessToken) => dispatch(logoutRequest(accessToken))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Header, Button, Icon, Popup } from 'semantic-ui-react';
import InputForm from '../input-form';
import { logoutRequest, toggleSidebar } from '../../store/actions';

class NavBar extends Component {
    render () {
        return(
            <Menu
                borderless
                inverted
                style={{boxShadow: '1px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'}}
                fixed={this.props.fixed}
            >
                <Menu.Item
                    content={
                        <Header
                            inverted
                            as='h3'
                            icon='clock outline'
                            content='Clockware'
                        />
                    }
                />
                <Menu.Menu
                    position='right'
                >
                    <Menu.Item
                        style={this.props.global.ui.mobile || this.props.auth.accessToken ? {padding: 0} : null}
                        content={
                            this.props.auth.accessToken === null ?
                                <InputForm 
                                    trigger={
                                        (props) => 
                                            <Button
                                                as='a'
                                                inverted
                                                icon={this.props.global.ui.mobile}
                                                circular={this.props.global.ui.mobile}
                                                content={this.props.global.ui.mobile ? <Popup trigger={<Icon name='sign-in' />} content='Log in' /> : 'Log in'}
                                                style={{borderRadius: '30px'}}
                                                {...props}
                                            />
                                    }
                                    model='authentication'
                                />
                            :
                                <Button 
                                    as='a'
                                    inverted
                                    icon={this.props.global.ui.mobile}
                                    circular={this.props.global.ui.mobile}
                                    content={this.props.global.ui.mobile ? <Popup trigger={<Icon name='sign-out' />} content='Log out' /> : 'Log out'}
                                    style={{borderRadius: '30px'}}
                                    onClick={() => this.props.onUserLogoutHandler(this.props.auth.accessToken)}
                                />
                        }
                    />
                    {this.props.auth.accessToken ? 
                        <Menu.Item 
                            style={{paddingRight: 0}}
                            content={
                                <Button 
                                    as='a'
                                    icon
                                    inverted
                                    circular
                                    content={
                                        <Popup 
                                            trigger={<Icon name='sync' />}
                                            content='Refresh'
                                         />
                                    }
                                />
                            }
                        />
                    :
                        null
                    }
                    {this.props.global.ui.mobile || this.props.auth.accessToken ? 
                        <Menu.Item 
                            content={
                                <Button 
                                    as='a'
                                    icon
                                    inverted
                                    circular
                                    content={
                                        <Popup 
                                            trigger={<Icon name={this.props.global.ui.isSidebarOpen ? 'x' : 'sidebar'} />} 
                                            content={this.props.global.ui.isSidebarOpen ? 'Hide sidebar' : 'Show sidebar'} 
                                        />
                                    }
                                    onClick={this.props.onToggleSidebarHandler}
                                />
                            }
                        />
                    :
                        null
                    }
                </Menu.Menu>
            </Menu>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        global: state.global
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserLogoutHandler: (accessToken) => dispatch(logoutRequest(accessToken)),
        onToggleSidebarHandler: () => dispatch(toggleSidebar())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Header, Button, Icon, Popup } from 'semantic-ui-react';
import InputForm from '../input-form';
import { logoutRequest, toggleSidebar, toggleSidebarButtonPress, setReloadDataTrigger } from '../../store/actions';

class NavBar extends Component {

    onClickSideBarButtonHandler = () => {
        if (this.props.global.ui.mobile && this.props.global.ui.isSideBarButtonPressed) {
            return this.props.onToggleSideBarButtonPressHandler();
        }
        this.props.onToggleSideBarHandler();
        this.props.onToggleSideBarButtonPressHandler();
    }

    onLogoutButtonClickHandler = () => {
        this.props.onUserLogoutHandler(this.props.auth.accessToken);
        window.location.reload(true);
    }

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
                                    onClick={this.onLogoutButtonClickHandler}
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
                                        this.props.global.ui.mobile ?
                                            <Icon name='sync alternate' loading={this.props.admin.ui.reloadDataCounter > 0}/>
                                        :
                                            <Popup 
                                                trigger={<Icon name='sync alternate' loading={this.props.admin.ui.reloadDataCounter > 0}/>}
                                                content='Refresh'
                                            />
                                    }
                                    onClick={() => this.props.onSetReloadDataTriggerHandler(this.props.admin.ui.currentModel, true)}
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
                                        this.props.global.ui.mobile ?
                                            <Icon name={this.props.global.ui.isSideBarOpen ? 'x' : 'sidebar'} />
                                        :
                                            <Popup 
                                                trigger={<Icon name={this.props.global.ui.isSideBarOpen ? 'x' : 'sidebar'} />} 
                                                content={this.props.global.ui.isSideBarOpen ? 'Hide sidebar' : 'Show sidebar'} 
                                            />
                                    }
                                    onClick={this.onClickSideBarButtonHandler}
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
        global: state.global,
        admin: state.admin
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onUserLogoutHandler: (accessToken) => dispatch(logoutRequest(accessToken)),
        onToggleSideBarHandler: () => dispatch(toggleSidebar()),
        onToggleSideBarButtonPressHandler: () => dispatch(toggleSidebarButtonPress()),
        onSetReloadDataTriggerHandler: (model, flag) => dispatch(setReloadDataTrigger(model, flag))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
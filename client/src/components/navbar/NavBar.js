import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Menu, Header, Button, Icon, Popup} from 'semantic-ui-react';
import AdminForm from '../admin-form';
import {adminActionCreator, authActionCreator, globalActionCreator} from '../../store/actions';
import styles from './styles.module.css';

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
                fixed='top'
                className={styles.navBar}
            >
                <Menu.Item
                    content={
                        <Header
                            inverted
                            as='h3'
                            icon='clock outline'
                            content={this.props.auth.pathToAutoRedirect === '/' ? 'Clockware' : this.props.admin.ui.currentModel.split('')[0].toUpperCase() + this.props.admin.ui.currentModel.split('').slice(1).join('')}
                        />
                    }
                />
                <Menu.Menu
                    position='right'
                >
                    <Menu.Item
                        className={`${this.props.global.ui.mobile || this.props.auth.accessToken ? 'inOutItem' :''}`}
                        content={
                            this.props.auth.accessToken === null ?
                                <AdminForm 
                                    trigger={
                                        (props) => 
                                            <Button
                                                as='a'
                                                inverted
                                                icon={this.props.global.ui.mobile}
                                                circular
                                                content={this.props.global.ui.mobile ? <Popup trigger={<Icon name='sign-in' />} content='Log in' /> : 'Log in'}
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
                                    circular
                                    content={this.props.global.ui.mobile ? <Popup trigger={<Icon name='sign-out' />} content='Log out' /> : 'Log out'}
                                    onClick={this.onLogoutButtonClickHandler}
                                />
                        }
                    />
                    {this.props.auth.accessToken ? 
                        <Menu.Item
                            className={'refreshItem'}
                            content={
                                <Button 
                                    as='a'
                                    icon
                                    inverted
                                    circular
                                    content={
                                        this.props.global.ui.mobile ?
                                            <Icon name='sync alternate' loading={this.props.admin.ui.fetchRequestsCounter.length > 0}/>
                                        :
                                            <Popup 
                                                trigger={<Icon name='sync alternate' loading={this.props.admin.ui.fetchRequestsCounter.length > 0}/>}
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
        onUserLogoutHandler: (accessToken) => dispatch(authActionCreator.logoutRequest(accessToken)),
        onToggleSideBarHandler: () => dispatch(globalActionCreator.toggleSidebar()),
        onToggleSideBarButtonPressHandler: () => dispatch(globalActionCreator.toggleSidebarButtonPress()),
        onSetReloadDataTriggerHandler: (model, flag) => dispatch(adminActionCreator.setReloadDataTrigger(model, flag))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
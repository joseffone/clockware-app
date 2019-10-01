import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { changeCurrentModel, toggleSidebar, toggleSidebarButtonPress } from '../../store/actions';
import styles from './styles.module.css';

class SideBar extends Component {
    render () {

        let menuItems = [];

        this.props.admin.ui.models.map((item, index) => menuItems.push(
            <Menu.Item
                key={index}
                name={item.name}
                active={this.props.admin.ui.currentModel === item.name}
                onClick={this.props.onChangeCurrentModelHandler}
            >
                <Icon name={item.icon} />
                {item.name.split('')[0].toUpperCase() + item.name.split('').slice(1).join('')}
            </Menu.Item>
        ));
        
        return (
            <Sidebar
                id={styles.adminSideBar}
                className={`${this.props.global.ui.mobile ? styles.adminSideBarMobile : styles.adminSideBarPC}`}
                animation='overlay'
                direction={this.props.global.ui.mobile ? 'top' : 'left'}
                visible={this.props.global.ui.isSideBarOpen}
                width='thin'
                onHide={this.props.global.ui.mobile ? this.props.onToggleSideBarHandler : null}
                onHidden={this.props.global.ui.mobile &&  this.props.global.ui.isSideBarButtonPressed ? this.props.onToggleSideBarButtonPressHandler : null}
            >
                <Menu 
                    icon={this.props.global.ui.mobile ? null : 'labeled'}
                    fluid
                    vertical
                    secondary={!this.props.global.ui.mobile}
                >
                    {menuItems}
                </Menu>
            </Sidebar>
        );
    }
}

const mapStateToProps = state => {
    return {
        global: state.global,
        admin: state.admin
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeCurrentModelHandler: (event, { name }) => dispatch(changeCurrentModel(name)),
        onToggleSideBarHandler: () => dispatch(toggleSidebar()),
        onToggleSideBarButtonPressHandler: () => dispatch(toggleSidebarButtonPress())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
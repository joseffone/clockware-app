import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { changeCurrentModel, toggleSidebar, toggleSidebarButtonPress } from '../../store/actions';
import './AdminSideBar.css';

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
                id='adminSideBar'
                animation='overlay'
                direction={this.props.global.ui.mobile ? 'top' : 'left'}
                visible={this.props.global.ui.isSideBarOpen}
                width='thin'
                style={{
                    border: 'none', 
                    boxShadow: 'none', 
                    paddingLeft: this.props.global.ui.mobile ? 0 : '1em', 
                    paddingTop: this.props.global.ui.mobile ? 0 : '1em'
                }}
                onHide={this.props.global.ui.mobile ? this.props.onToggleSideBarHandler : null}
                onHidden={this.props.global.ui.mobile &&  this.props.global.ui.isSideBarButtonPressed ? this.props.onToggleSideBarButtonPressHandler : null}
            >
                <Menu 
                    icon={this.props.global.ui.mobile ? null : 'labeled'}
                    fluid
                    vertical
                    secondary={!this.props.global.ui.mobile}
                    style={{padding: 0, margin: 0, borderRadius: 0}}
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
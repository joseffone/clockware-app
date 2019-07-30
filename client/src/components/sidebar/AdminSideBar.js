import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { changeCurrentModel, finishSideBarAnimation } from '../../store/actions';

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
                {item.name}
            </Menu.Item>
        ));
        
        return (
            <Sidebar
                animation='overlay'
                visible={this.props.global.ui.isSideBarOpen}
                width='thin'
                style={{border: 'none', boxShadow: 'none', paddingLeft: '1em', paddingTop: '1em'}}
            >
                <Menu 
                    icon='labeled'
                    vertical
                    secondary
                    style={{width: '100%', padding: 0, margin: 0}}
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
        onChangeCurrentModelHandler: (event, { name }) => dispatch(changeCurrentModel(name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
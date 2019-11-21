import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Sidebar} from 'semantic-ui-react';
import {adminActionCreator, globalActionCreator} from '../../store/actions';
import AdminModelsMenu from '../admin-models-menu';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

class SideBar extends Component {
    render () {
        return (
            <Sidebar
                id={styles.sideBar}
                className={`${this.props.global.ui.mobile ? styles.sideBarMobile : styles.sideBarPC}`}
                animation='overlay'
                direction={this.props.global.ui.mobile ? 'top' : 'left'}
                visible={this.props.global.ui.isSideBarOpen}
                width='thin'
                onHide={this.props.global.ui.mobile ? this.props.toggleSideBar : null}
                onHidden={this.props.global.ui.mobile &&  this.props.global.ui.isSideBarButtonPressed ? this.props.toggleSideBarButtonPress : null}
            >
                {this.props.admin ?
                    <AdminModelsMenu 
                        mobile={this.props.global.ui.mobile}
                        currentModel={this.props.admin.ui.currentModel}
                        options={this.props.admin.ui.models}
                        itemClicked={this.props.changeCurrentModel}
                    />
                :
                    null
                }
            </Sidebar>
        );
    }
}

SideBar.propTypes = {
    admin: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        global: state.global,
        admin: state.admin
    };
}

const mapDispatchToProps = dispatch => {
    return {
        changeCurrentModel: (event, {name}) => dispatch(adminActionCreator.changeCurrentModel(name)),
        toggleSideBar: () => dispatch(globalActionCreator.toggleSidebar()),
        toggleSideBarButtonPress: () => dispatch(globalActionCreator.toggleSidebarButtonPress())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
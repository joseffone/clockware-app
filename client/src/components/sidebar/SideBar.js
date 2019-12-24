import React, {Component} from 'react';
import {Sidebar} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {globalActionCreator} from '../../store/actions';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

class SideBar extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.global.ui.mobile !== this.props.global.ui.mobile) {
            if (this.props.global.ui.isSideBarOpen) {
                this.props.toggleSideBar();
                this.props.toggleSideBarButtonPress();
            }
        }
    }

    render() {
        return (
            <Sidebar
                id={styles.sideBar}
                className={`${this.props.global.ui.mobile ? styles.sideBarMobile : styles.sideBarPC}`}
                animation='overlay'
                direction={this.props.global.ui.mobile ? 'top' : 'left'}
                visible={this.props.global.ui.isSideBarOpen}
                width='thin'
                onHide={this.props.global.ui.mobile ? this.props.toggleSideBar : null}
                onHidden={this.props.global.ui.mobile && this.props.global.ui.isSideBarButtonPressed ? this.props.toggleSideBarButtonPress : null}
            >
                {this.props.content}
            </Sidebar>
        );
    }
}

SideBar.propTypes = {
    content: PropTypes.node.isRequired
};

const mapStateToProps = state => {
    return {
        global: state.global,
        admin: state.admin
    };
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSideBar: () => dispatch(globalActionCreator.toggleSidebar()),
        toggleSideBarButtonPress: () => dispatch(globalActionCreator.toggleSidebarButtonPress())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
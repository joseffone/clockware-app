import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Responsive, Segment} from 'semantic-ui-react';
import NavBar from '../../components/navbar';
import {connect} from 'react-redux';
import {authActionCreator, globalActionCreator} from '../../store/actions';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

class Layout extends Component {

    componentDidMount () {
        this.props.onRefreshTokensHandler(localStorage.getItem('refresh_token'));
    }

    componentDidUpdate (prevProps) {
        if (prevProps.auth.pathToAutoRedirect !== this.props.auth.pathToAutoRedirect || 
            (this.props.location.pathname !== this.props.auth.pathToAutoRedirect && 
            this.props.location.pathname === '/admin')) {
            this.props.history.replace(this.props.auth.pathToAutoRedirect);
            if (this.props.global.ui.isSideBarOpen) {
                this.props.toggleSideBar();
                this.props.toggleSideBarButtonPress();
            }
        }
    }

    render () {
        return(
            <React.Fragment>
                <NavBar />
                <Responsive
                    as={Segment}
                    className={styles.layout}
                    fireOnMount
                    loading={this.props.auth.isLoading}
                    onUpdate={(e, {width}) => this.props.onChangeDisplayViewHandler(width <= Responsive.onlyMobile.maxWidth)}
                >
                    {this.props.children}
                </Responsive>
            </React.Fragment>
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
        onRefreshTokensHandler: (refreshToken) => dispatch(authActionCreator.refreshTokensRequest(refreshToken)),
        onChangeDisplayViewHandler: (mobile) => dispatch(globalActionCreator.changeDisplayView(mobile)),
        toggleSideBar: () => dispatch(globalActionCreator.toggleSidebar()),
        toggleSideBarButtonPress: () => dispatch(globalActionCreator.toggleSidebarButtonPress())
    };
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));

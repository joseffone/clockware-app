import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { refreshTokensRequest, changeDisplayView } from '../../store/actions';
import { Responsive, Segment } from 'semantic-ui-react';
import NavBar from '../../components/navbar';
import styles from './styles.module.css';

class Layout extends Component {

    componentDidMount () {
        this.props.onRefreshTokensHandler(localStorage.getItem('refresh_token'));
        this.props.history.replace(this.props.auth.pathToAutoRedirect);
    }

    componentDidUpdate (prevProps) {
        if (prevProps.auth.pathToAutoRedirect !== this.props.auth.pathToAutoRedirect) {
            this.props.history.replace(this.props.auth.pathToAutoRedirect);
        }
    }

    render () {
        return(
            <React.Fragment>
                <NavBar fixed='top'/>
                <Responsive
                    as={Segment}
                    className={styles.layout}
                    fireOnMount
                    loading={this.props.auth.isLoading}
                    onUpdate={(e, { width }) => this.props.onChangeDisplayViewHandler(width <= Responsive.onlyMobile.maxWidth)}
                >
                    {this.props.children}
                </Responsive>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRefreshTokensHandler: (refreshToken) => dispatch(refreshTokensRequest(refreshToken)),
        onChangeDisplayViewHandler: (mobile) => dispatch(changeDisplayView(mobile))
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));

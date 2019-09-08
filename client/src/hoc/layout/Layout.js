import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { refreshTokensRequest, changeDisplayView } from '../../store/actions';
import { Responsive, Segment } from 'semantic-ui-react';
import NavBar from '../../components/navbar';

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
                    fireOnMount
                    onUpdate={(e, { width }) => this.props.onChangeDisplayViewHandler(width <= Responsive.onlyMobile.maxWidth)}
                    loading={this.props.auth.isLoading}
                    style={{
                        margin: 0,
                        padding: 0,
                        border: 0,
                        borderRadius: 0, 
                        boxShadow: 'none', 
                        paddingTop: '3.603em',
                        height: '100%'
                    }}
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

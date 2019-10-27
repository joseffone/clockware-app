import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Layout from './hoc/layout';
import AdminContainer from './containers/admin-container';
import ClientContainer from './containers/client-container';

class App extends Component {

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/admin" component={AdminContainer} />
                    <Route path="/" exact component={ClientContainer} />
                    <Redirect to="/" />
                </Switch>
            </Layout>
        );
    };
};

export default App;

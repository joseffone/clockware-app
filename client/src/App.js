import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Layout from './hoc/layout';
import AdminView from './components/admin-view';
import ClientView from './components/client-view';

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/admin" component={AdminView} />
                    <Route path="/" exact component={ClientView} />
                    <Redirect to="/" />
                </Switch>
            </Layout>
        );
    };
};

export default App;

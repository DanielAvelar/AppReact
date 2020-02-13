import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Navigator from './components/Navigator';

export default () => (
    <Layout>
        <Route exact path='/' component={Navigator} />
    </Layout>
);

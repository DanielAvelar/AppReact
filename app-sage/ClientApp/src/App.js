import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Person from './components/Person';

export default () => (
    <Layout>
        <Route exact path='/' component={Person} />
    </Layout>
);

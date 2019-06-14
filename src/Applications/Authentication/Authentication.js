import React from 'react';

import { Navigator } from '../../components';

import Login from './Login';

export default function Authentication() {
    return (
        <Navigator
            routes={{
                Login,
            }}
        />
    );
}

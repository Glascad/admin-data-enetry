import React from 'react';

import Statics from '../Statics/Statics';

import Login from './Login';

export default function Authentication() {
    return (
        <Statics
            routes={{
                Login,
            }}
        />
    );
}

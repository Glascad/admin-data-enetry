import React from 'react';

import Statics from '../Statics/Statics';

export default function Login() {
    return (
        <Statics
            routes={{
                Login: () => "Login",
            }}
        />
    );
}

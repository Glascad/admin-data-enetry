import React from 'react';
import { withRouter } from 'react-router-dom';

function ViewportHeader({ location: { pathname } }) {
    return (
        <header id="ViewportHeader">
            {pathname.split('/').filter(Boolean).map(str => str.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')).join(' > ')}
        </header>
    );
}

export default withRouter(ViewportHeader)

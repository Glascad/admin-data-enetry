import React from 'react';
import { withRouter } from 'react-router-dom';

function ViewportHeader({ location: { pathname } }) {
    return (
        <header id="ViewportHeader">
            {pathname.replace(/\//g, ' ').toUpperCase()}
        </header>
    );
}

export default withRouter(ViewportHeader)

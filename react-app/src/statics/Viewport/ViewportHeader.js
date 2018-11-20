import React from 'react';
import { withRouter } from 'react-router-dom';

function ViewportHeader({
    location: {
        pathname,
    },
    right,
}) {
    console.log(arguments[0]);
    return (
        <header id="ViewportHeader">
            <span>
                {pathname.split('/')
                    .filter(Boolean)
                    .map(str => str.split(' ')
                        .map(s => s[0].toUpperCase() + s.slice(1))
                        .join(' '))
                    .join(' > ') || 'Home'}
            </span>
            <span>
                {right}
            </span>
        </header>
    );
}

export default withRouter(ViewportHeader)

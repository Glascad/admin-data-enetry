import React from 'react';

import './Viewport.scss';

import {
    Navigator,
} from '../../components';

import routes from '../../routes/routes';

export default function Viewport() {
    return (
        <div id="Viewport">
            <Navigator
                routes={routes}
            />
        </div>
    );
}

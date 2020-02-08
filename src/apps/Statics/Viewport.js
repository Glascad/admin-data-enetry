import React from 'react';
import { Navigator } from '../../components';
import './Statics.scss';

export default function Viewport({
    viewportRef,
    initialRoute,
    routes,
}) {
    return (
        <div
            id="viewport"
            ref={viewportRef}
        >
            <Navigator
                initialRoute={initialRoute}
                routes={routes}
            />
        </div>
    );
}

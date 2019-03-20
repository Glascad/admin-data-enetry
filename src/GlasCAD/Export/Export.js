import React from 'react';

import {
    Navigator,
    TitleBar,
} from '../../components';

function _Export() {
    return (
        "Export"
    );
}

const subroutes = {
    _Export,
};

Export.navigationOptions = {
    subroutes,
};

export default function Export() {
    return (
        <>
            <TitleBar
                title="Export"
            />
            <div className="card">
                <Navigator
                    routes={subroutes}
                />
            </div>
        </>
    );
}

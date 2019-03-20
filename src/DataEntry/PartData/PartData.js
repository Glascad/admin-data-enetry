import React from 'react';

import {
    Navigator,
    TitleBar,
} from '../../components';

function _PartData() {
    return (
        "Part Data"
    );
}

const subroutes = {
    _PartData,
};

PartData.navigationOptions = {
    subroutes,
};

export default function PartData() {
    return (
        <>
            <TitleBar
                title="Part Data"
            />
            <div className="card">
                <Navigator
                    routes={subroutes}
                />
            </div>
        </>
    );
}

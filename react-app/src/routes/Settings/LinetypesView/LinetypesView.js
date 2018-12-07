import React from 'react';
import './Linetypes.scss';

import Linetypes from './Linetypes/Linetypes';
import LineWeights from './LineWeights/LineWeights';

export default function LinetypesView() {
    return (
        <div>
            <Linetypes />
            <LineWeights />
        </div>
    )
}
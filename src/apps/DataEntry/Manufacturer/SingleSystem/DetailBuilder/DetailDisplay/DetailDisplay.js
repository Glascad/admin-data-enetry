import React, { useContext } from 'react';
import { TransformBox } from '../../../../../../components';
import { StaticContext } from '../../../../../Statics/Statics';

export default function DetailDisplay({

}) {
    const { Viewport } = useContext(StaticContext);
    console.log(arguments[0]);
    // need to get configurations within selected detail or parts within selected configuration
    return (
        <TransformBox
            viewportRef={Viewport}
        >

        </TransformBox>
    );
}

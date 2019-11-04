import React, { useContext } from 'react';
import { TransformBox } from '../../../../../../components';
import { StaticContext } from '../../../../../Statics/Statics';

export default function DetailDisplay({

}) {
    const { Viewport } = useContext(StaticContext);
    return (
        <TransformBox
            viewportRef={Viewport}
        >

        </TransformBox>
    );
}

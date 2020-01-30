import React from 'react';
import { SVG } from '../../../../../components';
import './ElevationPreview.scss';
import generatePreview from './generate-preview';

export default function ElevationPreview({
    preview,
    recursiveElevation,
    dataCy,
}) {
    console.log(arguments);

    return (
        <div
            className='ElevationPreview'
        >
            <SVG
                paths={preview || generatePreview(recursiveElevation)}
                dataCy={dataCy}
            />
        </div>
    )
}

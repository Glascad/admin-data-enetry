import React from 'react';
import { getDetailOrConfigurationOrPartExtremities } from '../../../../../../app-logic/system';
import Detail from '../../../../../../modules/Detail/Detail';
import { getViewBox } from '../../../../../../utils/functions/svg-utils';

export default function DetailPreview({
    systemMap,
    detailOptionValuePath,
    systemDetailPath,
    configurationPaths,
}) {
    return (
        <svg
            viewBox={getViewBox(
                getDetailOrConfigurationOrPartExtremities(
                    systemMap[systemDetailPath || detailOptionValuePath.replace(/(\.__DT__\.\w+).*/, '*1')],
                    configurationPaths,
                    systemMap,
                ),
            )}
            transform="scale(1, -1)"
            className="DetailPreview"
        >
            <Detail
                detail={systemMap[detailOptionValuePath || systemDetailPath]}
                systemMap={systemMap}
                configurationPaths={configurationPaths}
            />
        </svg>
    );
}

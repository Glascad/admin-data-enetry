import React from 'react';
import DetailDisplay from '../../../../DetailBuilder/DetailDisplay/DetailDisplay';
import { getDefaultPath } from '../../../../../../../app-logic/system-utils';
import { match } from '../../../../../../../utils';
import { getViewBox } from '../../../../../../../utils/functions/svg-utils';
import { TransformProvider } from '../../../../../../../components';

export default function DetailSidebarView({
    systemMap,
    children,
    // selectItem,
    selectedItem,
    selectedItem: {
        path = '',
        _part: {
            paths = [],
        } = {},
    },
}) {

    console.log(getViewBox(paths));

    return match(path)
        .regex(/__(C|P)T/i, (
            <TransformProvider>
                <DetailDisplay
                    systemMap={systemMap}
                    children={children}
                    selectedConfigurationPaths={''}
                    selectItem={() => console.log("hey")}
                    selectedItem={getDefaultPath(selectedItem)}
                />
            </TransformProvider>
        ))
        .regex(/__DT__/i, children.map(child => (
            <TransformProvider>
                <DetailDisplay
                    systemMap={systemMap}
                    children={children}
                    selectedConfigurationPaths={''}
                    selectItem={() => console.log("hey")}
                    selectedItem={getDefaultPath(child)}
                />
            </TransformProvider>
        )))
        .otherwise(null);
};
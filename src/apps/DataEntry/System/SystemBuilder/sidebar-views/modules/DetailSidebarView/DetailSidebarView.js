import React from 'react';
import Configuration from '../../../../../../../modules/Detail/Configuration';
import Detail from '../../../../../../../modules/Detail/Detail';
import Part from '../../../../../../../modules/Detail/Part';
import { match } from '../../../../../../../utils';
import { getDefaultPath } from '../../../../../../../app-logic/system';

export default function DetailSidebarView({
    systemMap,
    selectedItem,
    selectedItem: {
        path = '',
    },
}) {

    return (
        <svg
            id="detail-display"
            viewBox="0 0 5 2"
            transform="scale(1, -1)"
        >
            {match(path)
                .regex(/__PT/i, (
                    <Part
                        {...{
                            part: selectedItem,
                        }}
                    ></Part>))
                .regex(/__CT/i, (
                    <Configuration
                        systemMap={systemMap}
                        detailConfiguration={selectedItem}
                        configurationOptionValue={systemMap[getDefaultPath(selectedItem, systemMap)]}
                    ></Configuration>
                ))
                .regex(/__DT/i, (
                    <Detail
                        systemMap={systemMap}
                        detail={selectedItem}
                    />
                ))
                .otherwise(null)}
        </svg>
    );
};
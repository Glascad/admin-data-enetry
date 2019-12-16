import React from 'react';
import { getDetailTypeFromPath, getOptionListFromPath } from '../../../../../../app-logic/system';
import { CollapsibleTitle, GroupingBox } from '../../../../../../components';
import { match } from '../../../../../../utils';
import Configurations from './Configurations';
import DetailOptions from './DetailOptions';
import DetailDisplay from './DetailDisplay';

export default function Details({
    _systemSetDetails = [],
    _systemSetConfigurations = [],
    _detailConfigurations,
    _optionGroups,
    dispatch,
    systemMap,
}) {
    console.log(arguments);
    return (
        <CollapsibleTitle
            title="Details"
        >
            {_systemSetDetails.map(({ detailOptionValuePath, systemDetailPath }, i) => {
                const detailType = getDetailTypeFromPath(detailOptionValuePath || systemDetailPath || '');
                const configurations = _detailConfigurations
                    .filter(({ path }) => path.startsWith(detailOptionValuePath || systemDetailPath || ''))
                    .map(detailConfiguration => ({
                        detailConfiguration,
                        selection: _systemSetConfigurations = []
                            // need the '.' to prevent confusion between configs like SILL and SILL_FLASHING
                            .find(({ configurationOptionValuePath }) => configurationOptionValuePath.startsWith(`${detailConfiguration.path}.`)),
                    }))
                    .sort(({
                        detailConfiguration: {
                            optional: a,
                        },
                    }, {
                        detailConfiguration: {
                            optional: b,
                        },
                    }) => match()
                        .case(a && b, 0)
                        .case(a && !b, 1)
                        .case(!a && b, -1)
                        .otherwise(-1)
                    );
                const optionList = getOptionListFromPath(detailOptionValuePath || systemDetailPath);
                return (
                    <GroupingBox
                        data-cy={detailType}
                        key={detailOptionValuePath || systemDetailPath}
                        title={detailType}
                        className="full-width"
                    >
                        {/* DETAIL OPTIONS */}
                        <DetailOptions
                            {...{
                                optionList,
                                _optionGroups,
                                detailType,
                                detailOptionValuePath: detailOptionValuePath || systemDetailPath,
                                systemMap,
                                dispatch,
                            }}
                        />
                        {/* Detail CONFIGURATIONS */}
                        <Configurations
                            {...{
                                _optionGroups,
                                configurations,
                                detailType,
                                dispatch,
                                systemMap,
                            }}
                        />
                        {/* DETAIL DISPLAY */}
                        <DetailDisplay
                            {...{
                                detailType,
                                detailOptionValuePath: detailOptionValuePath || systemDetailPath,
                                configurations,
                            }}
                        />
                    </GroupingBox>
                );
            })}
        </CollapsibleTitle>
    );
}

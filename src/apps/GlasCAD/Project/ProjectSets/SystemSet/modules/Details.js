import React from 'react';
import { getDetailTypeFromPath, getOptionListFromPath } from '../../../../../../app-logic/system-utils';
import { CollapsibleTitle, GroupingBox } from '../../../../../../components';
import { match } from '../../../../../../utils';
import Configurations from './Configurations';
import DetailOptions from './DetailOptions';
import DetailDisplay from './DetailDisplay';

export default function Details({
    _systemSetDetailOptionValues,
    _systemSetConfigurationOptionValues,
    _detailConfigurations,
    _optionGroups,
    dispatch,
    systemMap,
}) {
    return (
        <CollapsibleTitle
            title="Details"
        >
            {_systemSetDetailOptionValues.map(({ detailOptionValuePath }, i) => {
                const detailType = getDetailTypeFromPath(detailOptionValuePath);
                const configurations = _detailConfigurations
                    .filter(({ path }) => path.startsWith(detailOptionValuePath))
                    .map(detailConfiguration => ({
                        detailConfiguration,
                        selection: _systemSetConfigurationOptionValues
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
                const optionList = getOptionListFromPath(detailOptionValuePath);
                return (
                    <GroupingBox
                        data-cy={detailType}
                        key={detailOptionValuePath}
                        title={detailType}
                        className="full-width"
                    >
                        {/* DETAIL OPTIONS */}
                        <DetailOptions
                            {...{
                                optionList,
                                _optionGroups,
                                detailType,
                                detailOptionValuePath,
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
                                detailOptionValuePath,
                                configurations,
                            }}
                        />
                    </GroupingBox>
                );
            })}
        </CollapsibleTitle>
    );
}

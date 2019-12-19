import React from 'react';
import { getConfigurationTypeFromPath, getDetailTypeFromPath, getOptionListFromPath } from '../../../../../../app-logic/system';
import { CollapsibleTitle, GroupingBox } from '../../../../../../components';
import { match } from '../../../../../../utils';
import Configurations from './Configurations';
import './Details.scss';
import DetailOptions from './DetailOptions';
import DetailPreview from './DetailPreview';

export default function Details({
    _systemSetDetails = [],
    _systemSetConfigurations = [],
    _detailConfigurations,
    _optionGroups,
    dispatch,
    systemMap,
}) {
    return (
        <CollapsibleTitle
            title="Details"
        >
            {_systemSetDetails.map(({ detailOptionValuePath, systemDetailPath }, i) => {
                const detailType = getDetailTypeFromPath(detailOptionValuePath || systemDetailPath);
                const configurations = _detailConfigurations
                    .filter(({ path }) => path.startsWith(detailOptionValuePath || systemDetailPath))
                    .map(detailConfiguration => ({
                        detailConfiguration,
                        selection: _systemSetConfigurations.find(({ configurationOptionValuePath, detailConfigurationPath, }) => (
                            detailConfigurationPath || configurationOptionValuePath || ''
                        ).match(new RegExp(`^${detailConfiguration.path}\\b`))),
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
                const configurationPaths = configurations
                    .map(({
                        selection: {
                            configurationOptionValuePath,
                            detailConfigurationPath,
                        } = {},
                    }) => configurationOptionValuePath || detailConfigurationPath)
                    .filter(Boolean)
                    .reduce((paths, path) => ({
                        ...paths,
                        [getConfigurationTypeFromPath(path)]: path,
                    }), {});
                // console.log({ configurations, configurationPaths });
                const optionList = getOptionListFromPath(detailOptionValuePath || systemDetailPath);
                return (
                    <GroupingBox
                        data-cy={detailType}
                        key={detailOptionValuePath || systemDetailPath}
                        title={detailType}
                        className="system-set-detail full-width horizontally-divided"
                    >
                        <div>
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
                                    _systemSetConfigurations,
                                    _optionGroups,
                                    configurations,
                                    detailType,
                                    dispatch,
                                    systemMap,
                                }}
                            />
                        </div>
                        {/* DETAIL DISPLAY */}
                        <DetailPreview
                            {...{
                                systemMap,
                                detailOptionValuePath,
                                systemDetailPath,
                                configurationPaths,
                            }}
                        />
                    </GroupingBox>
                );
            })}
        </CollapsibleTitle>
    );
}

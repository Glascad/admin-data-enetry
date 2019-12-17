import React from 'react';
import { getDetailTypeFromPath, getOptionListFromPath, getConfigurationTypeFromPath } from '../../../../../../app-logic/system';
import { CollapsibleTitle, GroupingBox } from '../../../../../../components';
import Detail from '../../../../../../modules/Detail/Detail';
import { match } from '../../../../../../utils';
import Configurations from './Configurations';
import DetailOptions from './DetailOptions';

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
                console.log({ configurations, configurationPaths });
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
                                _systemSetConfigurations,
                                _optionGroups,
                                configurations,
                                detailType,
                                dispatch,
                                systemMap,
                            }}
                        />
                        {/* DETAIL DISPLAY */}
                        {/* <DetailDisplay
                            {...{
                                detailType,
                                detailOptionValuePath: detailOptionValuePath || systemDetailPath,
                                configurations,
                            }}
                        /> */}
                        <svg
                            // id="detail-display"
                            viewBox="0 0 5 2"
                            transform="scale(1, -1)"
                        >
                            <Detail
                                detail={systemMap[detailOptionValuePath || systemDetailPath]}
                                systemMap={systemMap}
                                configurationPaths={configurationPaths}
                            />
                        </svg>
                        {`${detailOptionValuePath || systemDetailPath}`}
                    </GroupingBox>
                );
            })}
        </CollapsibleTitle>
    );
}

import React, { useState, useEffect } from 'react';
import {
    GroupingBox,
    useQuery,
    CollapsibleTitle,
    Select,
    Input,
    TitleBar,
} from '../../../../../components';
import {
    getOptionListFromPath,
    getChildren,
    SystemMap,
    getLastItemFromPath,
    getDetailTypeFromPath,
    getConfigurationTypeFromPath,
    getOptionGroupValuesFromOptionName,
} from '../../../../../app-logic/system-utils';
import F from '../../../../../schemas';
import gql from 'graphql-tag';

const query = gql`query SystemById($systemId: Int!) {
    systemById(id: $systemId) {
        ...EntireSystem
    }
}
${F.SYS.ENTIRE_SYSTEM}
`;

export default function SystemSetOptions({
    systemSet,
    systemSet: {
        systemId,
        systemOptionValuePath = '',
        _optionGroupValues = [],
        _systemSetDetailOptionValues = [],
        _systemSetConfigurationOptionValues = [],
    } = {},
    dispatch,
}) {

    const [fetchQuery, queryResult, fetching] = useQuery({ query }, true);

    useEffect(async () => {
        if (systemId) {
            const {
                _system,
                _system: {
                    id: newSystemId,
                } = {},
            } = await fetchQuery({ systemId });
            console.log(_system);
            if (newSystemId) {
                // dispatch();
            }
        }
    }, [systemId])

    const {
        _system = {},
        _system: {
            _systemConfigurations = [],
        } = {},
    } = queryResult;

    const systemMap = new SystemMap(_system);

    console.log({
        queryResult,
        systemSet,
        fetching,
        systemMap,
    });

    return (
        <>
            {/* SYSTEM OPTIONS */}
            <CollapsibleTitle
                title="Options"
            >
                {getOptionListFromPath(systemOptionValuePath)
                    .map(({ name, value }) => (
                        <Select
                            label={name}
                            value={value}
                            options={getChildren({
                                path: systemOptionValuePath
                                    .replace(new RegExp(`${name}\\.${value}.*$`), name)
                            }, systemMap
                            ).map(({ path }) => getLastItemFromPath(path))}
                        />
                    ))}
                {_optionGroupValues.map(({ optionName, name }) => (
                    <Select
                        label={optionName}
                        value={name}
                        options={getOptionGroupValuesFromOptionName(optionName, systemMap)}
                    />
                ))}
            </CollapsibleTitle>
            {/* SYSTEM DETAILS */}
            <CollapsibleTitle
                title="Details"
            >
                {_systemSetDetailOptionValues.map(({ detailOptionValuePath }) => (
                    <GroupingBox
                        title={getDetailTypeFromPath(detailOptionValuePath)}
                    >
                        {/* DETAIL OPTIONS */}
                        {getOptionListFromPath(detailOptionValuePath)
                            .map(({ name, value }) => (
                                <Select
                                    label={name}
                                    value={value}
                                    options={getChildren({
                                        path: detailOptionValuePath
                                            .replace(new RegExp(`${name}\\.${value}.*$`), name)
                                    }, systemMap
                                    ).map(({ path }) => getLastItemFromPath(path))}
                                />
                            ))}
                        {/* SYSTEM CONFIGURATIONS */}
                        <TitleBar
                            title="Configurations"
                        />
                        {_systemConfigurations
                            .filter(({ path }) => path.startsWith(detailOptionValuePath))
                            .map(({ path }) => _systemSetConfigurationOptionValues
                                .find(({ configurationOptionValuePath }) => configurationOptionValuePath.startsWith(path))
                                ||
                                { path }
                            )
                            .map(({ configurationOptionValuePath, path }) => (
                                <>
                                    <Input
                                        type="switch"
                                        label={getConfigurationTypeFromPath(configurationOptionValuePath || path)}
                                        checked={!!configurationOptionValuePath}
                                    />
                                    {/* CONFIGURATION OPTIONS */}
                                    {configurationOptionValuePath ? (
                                        <div className="nested">
                                            {getOptionListFromPath(configurationOptionValuePath)
                                                .map(({ name, value }) => (
                                                    <Select
                                                        label={name}
                                                        value={value}
                                                        options={getChildren({
                                                            path: configurationOptionValuePath
                                                                .replace(new RegExp(`${name}\\.${value}.*$`), name),
                                                        }, systemMap
                                                        ).map(({ path }) => getLastItemFromPath(path))}
                                                    />
                                                ))}
                                        </div>
                                    ) : null}
                                </>
                            ))}
                    </GroupingBox>
                ))}

            </CollapsibleTitle>
        </>
    );
}

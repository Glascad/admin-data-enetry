import React, { useState, useEffect, Fragment } from 'react';
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
    getOptionGroupValuesByOptionName,
    getDefaultPath,
} from '../../../../../app-logic/system-utils';
import F from '../../../../../schemas';
import gql from 'graphql-tag';
import { SELECT_SYSTEM_SET_OPTION_VALUE } from './ducks/actions';

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

    useEffect(() => {
        if (systemId) fetchQuery({ systemId });
    }, [systemId]);

    const {
        _system = {},
        _system: {
            id: newSystemId,
            _systemConfigurations = [],
        } = {},
    } = queryResult;

    const systemMap = new SystemMap(_system);

    useEffect(() => {
        if (systemId === newSystemId) {
            if (!systemOptionValuePath) {
                const newSystemOptionValuePath = getDefaultPath(systemMap);
                if (newSystemOptionValuePath) {
                    console.log({ systemOptionValuePath, newSystemOptionValuePath });
                    dispatch(SELECT_SYSTEM_SET_OPTION_VALUE, {
                        systemOptionValuePath: newSystemOptionValuePath,
                        systemMap,
                    });
                }
            }
        }
    });

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
                            key={name}
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
                        key={optionName}
                        label={optionName}
                        value={name}
                        options={getOptionGroupValuesByOptionName(optionName, systemMap)}
                    />
                ))}
            </CollapsibleTitle>
            {/* SYSTEM DETAILS */}
            <CollapsibleTitle
                title="Details"
            >
                {_systemSetDetailOptionValues.map(({ detailOptionValuePath }) => {
                    const detailOptions = getOptionListFromPath(detailOptionValuePath);
                    const configurations = _systemConfigurations
                        .filter(({ path }) => path.startsWith(detailOptionValuePath))
                        .map(({ path }) => _systemSetConfigurationOptionValues
                            .find(({ configurationOptionValuePath }) => configurationOptionValuePath.startsWith(path))
                            ||
                            { path }
                        );
                    return (
                        <GroupingBox
                            key={detailOptionValuePath}
                            title={getDetailTypeFromPath(detailOptionValuePath)}
                        >
                            {/* DETAIL OPTIONS */}
                            {detailOptions.map(({ name, value }) => (
                                <Select
                                    key={name}
                                    label={name}
                                    value={value}
                                    options={getChildren({
                                        path: detailOptionValuePath
                                            .replace(new RegExp(`${name}\\.${value}.*$`), name)
                                    }, systemMap
                                    ).map(({ path }) => getLastItemFromPath(path))}
                                />
                            ))}
                            {/* DIVIDER */}
                            {detailOptions.length && configurations.length ? (
                                <TitleBar
                                    title="Configurations"
                                />
                            ) : null}
                            {/* SYSTEM CONFIGURATIONS */}
                            {configurations.length ?
                                configurations.map(({ configurationOptionValuePath, path }) => (
                                    <Fragment
                                        key={configurationOptionValuePath || path}
                                    >
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
                                                            key={name}
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
                                    </Fragment>
                                ))
                                :
                                null}
                        </GroupingBox>
                    );
                })}
            </CollapsibleTitle>
        </>
    );
}

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
    replaceOptionValue,
} from '../../../../../app-logic/system-utils';
import F from '../../../../../schemas';
import gql from 'graphql-tag';
import { SELECT_SYSTEM_SET_OPTION_VALUE } from './ducks/actions';
import { normalCase, match } from '../../../../../utils';

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
        _systemSetOptionGroupValues = [],
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
            _optionGroups = [],
        } = {},
    } = queryResult;

    const systemMap = new SystemMap(_system);

    useEffect(() => {
        const newSystemOptionValuePath = getDefaultPath(systemMap);
        if (
            (systemId === newSystemId)
            &&
            !systemOptionValuePath
            &&
            newSystemOptionValuePath
        ) {
            console.log({ systemOptionValuePath, newSystemOptionValuePath });
            dispatch(SELECT_SYSTEM_SET_OPTION_VALUE, {
                systemOptionValuePath: newSystemOptionValuePath,
                systemMap,
            });
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
                    .filter(({ name }) => name !== 'VOID')
                    .map(({ name, value }) => (
                        <Select
                            key={name}
                            label={name}
                            value={value}
                            options={getChildren({
                                path: systemOptionValuePath.replace(new RegExp(`${name}\\.${value}.*$`), name)
                            }, systemMap).map(({ path }) => getLastItemFromPath(path))}
                            onChange={newValue => dispatch(SELECT_SYSTEM_SET_OPTION_VALUE, {
                                systemOptionValuePath: replaceOptionValue(systemOptionValuePath, name, newValue),
                                systemMap,
                            })}
                        />
                    ))}
                {_systemSetOptionGroupValues.map(({ optionName, name }) => (
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
                    const detailOptions = getOptionListFromPath(detailOptionValuePath)
                        .filter(({ name }) => (
                            name !== 'VOID'
                            &&
                            !_optionGroups.some(og => og.name === name)
                        ));

                    const configurations = _systemConfigurations
                        .filter(({ path }) => path.startsWith(detailOptionValuePath))
                        .map(sc => _systemSetConfigurationOptionValues
                            .find(({ configurationOptionValuePath }) => configurationOptionValuePath.startsWith(sc.path))
                            ||
                            sc
                        )
                        .sort(({ optional: a }, { optional: b }) => match()
                            .case(a && b, 0)
                            .case(a && !b, 1)
                            .case(!a && b, -1)
                            .otherwise(-1)
                        );
                    console.log({ configurations });
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
                                        path: detailOptionValuePath.replace(new RegExp(`${name}\\.${value}.*$`), name)
                                    }, systemMap).map(({ path }) => getLastItemFromPath(path))}
                                />
                            ))}
                            {/* DIVIDER */}
                            {/* {detailOptions.length && configurations.length ? (
                                <TitleBar
                                    title="Configurations"
                                />
                            ) : null} */}
                            {/* SYSTEM CONFIGURATIONS */}
                            {configurations.length ?
                                configurations.map(({ configurationOptionValuePath, path, optional }) => {
                                    const options = getOptionListFromPath(configurationOptionValuePath)
                                        .filter(({ name }) => (
                                            name !== 'VOID'
                                            &&
                                            !_optionGroups.some(og => og.name === name)
                                        ));
                                    return (
                                        <Fragment
                                            key={configurationOptionValuePath || path}
                                        >
                                            {optional ? (
                                                <Input
                                                    type="switch"
                                                    label={getConfigurationTypeFromPath(configurationOptionValuePath || path)}
                                                    checked={!!configurationOptionValuePath}
                                                />
                                            ) : options.length ? (
                                                <div>
                                                    {normalCase(getConfigurationTypeFromPath(configurationOptionValuePath || path))}
                                                </div>
                                            ) : null}
                                            {/* CONFIGURATION OPTIONS */}
                                            {configurationOptionValuePath && options.length ? (
                                                <div className="nested">
                                                    {options.map(({ name, value }) => (
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
                                    );
                                })
                                :
                                null}
                        </GroupingBox>
                    );
                })}
            </CollapsibleTitle>
        </>
    );
}

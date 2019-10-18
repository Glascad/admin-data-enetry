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
${F.MNFG.ENTIRE_SYSTEM}
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
                    .map(({ name, value }) => name !== 'VOID' ? (
                        <Select
                            data-cy={name}
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
                    ) : null)}
                {/* GROUPED OPTIONS */}
                {_systemSetOptionGroupValues.map(({ optionName, name }) => (
                    <Select
                        data-cy={`GROUP.${optionName}`}
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
                    const detailType = getDetailTypeFromPath(detailOptionValuePath);

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
                            data-cy={detailType}
                            key={detailOptionValuePath}
                            title={detailType}
                            className="full-width"
                        >
                            {/* DETAIL OPTIONS */}
                            {getOptionListFromPath(detailOptionValuePath)
                                .map(({ name, value }) => (
                                    name !== 'VOID'
                                    &&
                                    !_optionGroups.some(og => og.name === name)
                                ) ? (
                                        <Select
                                            data-cy={`${detailType}.${name}`}
                                            key={name}
                                            label={name}
                                            value={value}
                                            options={getChildren({
                                                path: detailOptionValuePath.replace(new RegExp(`${name}\\.${value}.*$`), name)
                                            }, systemMap).map(({ path }) => getLastItemFromPath(path))}
                                        />
                                    ) : null)}
                            {/* SYSTEM CONFIGURATIONS */}
                            {configurations.length ?
                                configurations.map(({ configurationOptionValuePath, path, optional }) => {
                                    const configurationType = getConfigurationTypeFromPath(configurationOptionValuePath || path);

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
                                                    data-cy={`${detailType}.${configurationType}`}
                                                    type="switch"
                                                    label={configurationType}
                                                    checked={!!configurationOptionValuePath}
                                                />
                                            ) : options.length ? (
                                                <div
                                                    data-cy={`${detailType}.${configurationType}`}
                                                >
                                                    {normalCase(configurationType)}
                                                </div>
                                            ) : null}
                                            {/* CONFIGURATION OPTIONS */}
                                            {configurationOptionValuePath && options.length ? (
                                                <div className="nested">
                                                    {options.map(({ name, value }) => (
                                                        <Select
                                                            data-cy={`${detailType}.${configurationType}.${name}`}
                                                            key={name}
                                                            label={name}
                                                            value={value}
                                                            options={getChildren({
                                                                path: configurationOptionValuePath.replace(new RegExp(`${name}\\.${value}.*$`), name),
                                                            }, systemMap).map(({ path }) => getLastItemFromPath(path))}
                                                        />
                                                    ))}
                                                </div>
                                            ) : null}
                                        </Fragment>
                                    );
                                }) : null}
                            {/* DETAIL DISPLAY */}
                            <div className="system-set-detail">
                                <div
                                    data-cy={`DETAIL.${
                                        detailType
                                        }${
                                        detailOptionValuePath
                                            .replace(/.*__DT__\.\w+\./, '.')
                                            .replace(/\.?VOID\.?/g, '')
                                        }`}
                                >
                                    DETAIL.{
                                        detailType
                                    }{
                                        detailOptionValuePath
                                            .replace(/.*__DT__\.\w+\./, '.')
                                            .replace(/\.?VOID\.?/g, '')
                                    }
                                </div>
                                {configurations.map(({ configurationOptionValuePath, path, optional }) => !optional || configurationOptionValuePath ? (
                                    <div
                                        key={configurationOptionValuePath || path}
                                        data-cy={`CONFIGURATION.${
                                            detailType
                                            }.${
                                            getConfigurationTypeFromPath(configurationOptionValuePath || path)
                                            }${
                                            (configurationOptionValuePath || path)
                                                .replace(/.*__CT__\.\w+\.?/, '.')
                                                .replace(/\.?VOID\.?/g, '')
                                            }`}
                                    >
                                        CONFIGURATION.{
                                            detailType
                                        }.{
                                            getConfigurationTypeFromPath(configurationOptionValuePath || path)
                                        }{
                                            (configurationOptionValuePath || path)
                                                .replace(/.*__CT__\.\w+\.?/, '.')
                                                .replace(/\.?VOID\.?/g, '')
                                        }
                                    </div>
                                ) : null)}
                            </div>
                        </GroupingBox>
                    );
                })}
            </CollapsibleTitle>
        </>
    );
}

import React, { Fragment } from 'react';
import { getChildren, getConfigurationTypeFromPath, getDetailTypeFromPath, getLastItemFromPath, getOptionListFromPath } from '../../../../../../app-logic/system-utils';
import { CollapsibleTitle, GroupingBox, Input, Select } from '../../../../../../components';
import { match, normalCase } from '../../../../../../utils';
import { SELECT_CONFIGURATION_OPTION_VALUE, SELECT_DETAIL_OPTION_VALUE, UNSELECT_CONFIGURATION } from '../ducks/actions';

export default function DetailOptions({
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
                return (
                    <GroupingBox
                        data-cy={detailType}
                        key={detailOptionValuePath}
                        title={detailType}
                        className="full-width"
                    >
                        {/* DETAIL OPTIONS */}
                        {getOptionListFromPath(detailOptionValuePath)
                            .map(({ name, value }, i) => (
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
                                        onChange={newValue => dispatch(SELECT_DETAIL_OPTION_VALUE, [
                                            newValue,
                                            systemMap,
                                        ])}
                                    />
                                ) : null)}
                        {/* Detail CONFIGURATIONS */}
                        {configurations.map(({
                            detailConfiguration: {
                                path,
                                optional,
                            },
                            selection: {
                                configurationOptionValuePath,
                            } = {},
                        }, i) => {
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
                                            onChange={() => !!configurationOptionValuePath ?
                                                dispatch(UNSELECT_CONFIGURATION, configurationOptionValuePath)
                                                :
                                                dispatch(SELECT_CONFIGURATION_OPTION_VALUE, [
                                                    path.replace(/(__CT__\.\w+)\..*/g, '$1'),
                                                    systemMap,
                                                ])}
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
                                                    onChange={newValue => dispatch(SELECT_CONFIGURATION_OPTION_VALUE, [
                                                        configurationOptionValuePath.replace(new RegExp(`${name}\\.${value}.*$`), `${name}.${newValue}`),
                                                        systemMap,
                                                    ])}
                                                />
                                            ))}
                                        </div>
                                    ) : null}
                                </Fragment>
                            );
                        })}
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
                                {detailOptionValuePath}
                                {/* DETAIL.{
                                        detailType
                                    }{
                                        detailOptionValuePath
                                            .replace(/.*__DT__\.\w+\./, '.')
                                            .replace(/\.?VOID\.?/g, '')
                                    } */}
                            </div>
                            {configurations.map(({
                                detailConfiguration: {
                                    path,
                                    optional,
                                },
                                selection: {
                                    configurationOptionValuePath,
                                } = {},
                            }, i) => !optional || configurationOptionValuePath ? (
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
                                    {configurationOptionValuePath}
                                    {/* CONFIGURATION.{
                                            detailType
                                        }.{
                                            getConfigurationTypeFromPath(configurationOptionValuePath || path)
                                        }{
                                            (configurationOptionValuePath || path)
                                                .replace(/.*__CT__\.\w+\.?/, '.')
                                                .replace(/\.?VOID\.?/g, '')
                                        } */}
                                </div>
                            ) : null)}
                        </div>
                    </GroupingBox>
                );
            })}
        </CollapsibleTitle>
    );
}

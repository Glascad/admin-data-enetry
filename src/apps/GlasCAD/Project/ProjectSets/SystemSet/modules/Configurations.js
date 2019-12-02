import React, { Fragment } from 'react';
import { getChildren, getConfigurationTypeFromPath, getLastItemFromPath, getOptionListFromPath } from '../../../../../../app-logic/system-utils';
import { Input, Select } from '../../../../../../components';
import { normalCase } from '../../../../../../utils';
import { SELECT_CONFIGURATION_OPTION_VALUE, UNSELECT_CONFIGURATION } from '../ducks/actions';

export default function Configurations({
    _optionGroups,
    configurations,
    detailType,
    dispatch,
    systemMap,
}) {
    return configurations.map(({
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
    });
}

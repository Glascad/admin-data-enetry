import React, { Fragment } from 'react';
import { getChildren, getConfigurationTypeFromPath, getLastItemFromPath, getOptionListFromPath } from '../../../../../../app-logic/system';
import { Input, Select } from '../../../../../../components';
import { normalCase } from '../../../../../../utils';
import { SELECT_CONFIGURATION_OPTION_VALUE, UNSELECT_CONFIGURATION } from '../ducks/actions';

export default function Configurations({
    _systemSetConfigurations,
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
            detailConfigurationPath,
        } = {},
    }, i) => {
        // const optional = true;
        const configurationType = getConfigurationTypeFromPath((configurationOptionValuePath || detailConfigurationPath) || path);
        const options = getOptionListFromPath((configurationOptionValuePath || detailConfigurationPath || path))
            .filter(({ name }) => !_optionGroups.some(og => og.name === name));
        
        return (
            <Fragment
                key={(configurationOptionValuePath || detailConfigurationPath) || path}
            >
                {optional ? (
                    <Input
                        data-cy={`${detailType}.${configurationType}`}
                        type="switch"
                        label={configurationType}
                        checked={!!(configurationOptionValuePath || detailConfigurationPath)}
                        onChange={() => !!(configurationOptionValuePath || detailConfigurationPath) ?
                            dispatch(UNSELECT_CONFIGURATION, (configurationOptionValuePath || detailConfigurationPath))
                            :
                            dispatch(SELECT_CONFIGURATION_OPTION_VALUE, [
                                path,
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
                {(configurationOptionValuePath || detailConfigurationPath) && options.length ? (
                    <div className="nested">
                        {options.map(({ name, value }) => (
                            <Select
                                data-cy={`${detailType}.${configurationType}.${name}`}
                                key={name}
                                label={name}
                                value={value}
                                options={getChildren({
                                    path: (configurationOptionValuePath || detailConfigurationPath).replace(new RegExp(`${name}\\.${value}.*$`), name),
                                }, systemMap).map(({ path }) => getLastItemFromPath(path))}
                                onChange={newValue => dispatch(SELECT_CONFIGURATION_OPTION_VALUE, [
                                    (configurationOptionValuePath || detailConfigurationPath).replace(new RegExp(`${name}\\.${value}.*$`), `${name}.${newValue}`),
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

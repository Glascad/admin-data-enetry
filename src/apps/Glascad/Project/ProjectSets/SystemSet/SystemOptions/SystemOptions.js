import React from 'react';
import { getChildren, getLastItemFromPath, getOptionGroupValuesByOptionName, getOptionListFromPath, replaceOptionValue } from '../../../../../../app-logic/system';
import { CollapsibleTitle, Select } from '../../../../../../components';
import { SELECT_OPTION_GROUP_VALUE, SELECT_SYSTEM_OPTION_VALUE } from '../ducks/actions';

export default function SystemOptions({
    systemOptionValuePath,
    systemMap,
    dispatch,
    _systemSetOptionGroupValues,
}) {

    const optionList = getOptionListFromPath(systemOptionValuePath);

    return (
        <CollapsibleTitle
            title="Options"
        >
            {optionList.map(({ name, value }) => (
                <Select
                    data-cy={name}
                    key={name}
                    label={name}
                    value={value}
                    options={getChildren({
                        path: systemOptionValuePath.replace(new RegExp(`${name}\\.${value}.*$`), name)
                    }, systemMap).map(({ path }) => getLastItemFromPath(path))}
                    onChange={newValue => dispatch(SELECT_SYSTEM_OPTION_VALUE, [
                        replaceOptionValue(systemOptionValuePath, name, newValue),
                        systemMap,
                    ])}
                />
            ))}
            {/* GROUPED OPTIONS */}
            {_systemSetOptionGroupValues.map(({ optionName, name }) => (
                <Select
                    data-cy={`GROUP.${optionName}`}
                    key={optionName}
                    label={optionName}
                    value={name}
                    options={getOptionGroupValuesByOptionName(optionName, systemMap)}
                    onChange={newValue => dispatch(SELECT_OPTION_GROUP_VALUE, [
                        optionName,
                        newValue,
                        systemMap,
                    ])}
                />
            ))}
        </CollapsibleTitle>
    );
}

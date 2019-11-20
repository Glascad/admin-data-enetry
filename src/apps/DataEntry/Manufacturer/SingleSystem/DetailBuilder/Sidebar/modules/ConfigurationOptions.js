import React, { memo } from 'react';
import { CollapsibleTitle, Select } from '../../../../../../../components';
import { getConfigurationTypeFromPath, getDefaultPath, getOptionListFromPath, getLastItemFromPath, getChildren } from '../../../../../../../app-logic/system-utils';

export default memo(function ConfigurationOptions({
    systemMap,
    selectedItem,
    selectedItem: {
        __typename,
        path = '',
    } = {},
    selectConfigurationPath,
    selectedConfigurationPaths,
}) {
    console.log(arguments[0]);
    const configurationType = getConfigurationTypeFromPath(path, systemMap);
    const fullPath = selectedConfigurationPaths[configurationType];
    const options = getOptionListFromPath(fullPath);
    if (
        !selectedItem
        ||
        __typename !== 'DetailConfiguration'
        ||
        !options.length
    ) return null;
    return (
        <CollapsibleTitle
            titleBar={{
                title: "Config Options",
                // snailTrail: [configurationType],
            }}
        >
            {/* <div className="sidebar-list"> */}
            {options.map(({ name, value }) => {
                const path = fullPath.replace(new RegExp(`${name}\\.${value}`), name);
                return (
                    <Select
                        label={name}
                        value={value}
                        options={getChildren({ path }, systemMap).map(({ path }) => getLastItemFromPath(path))}
                        onChange={value => selectConfigurationPath(`${path}.${value}`)}
                    />
                );
            })}
            {/* </div> */}
        </CollapsibleTitle>
    );
})
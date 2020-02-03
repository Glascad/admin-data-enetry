import React, { memo } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { CollapsibleTitle, Select } from '../../../../../../components';
import { getConfigurationTypeFromPath, getDefaultPath, getOptionListFromPath, getLastItemFromPath, getChildren } from '../../../../../../app-logic/system';
import { parseSearch } from '../../../../../../utils';

export default withRouter(memo(function ConfigurationOptions({
    location: {
        search,
    },
    match: {
        path: matchPath,
    },
    history,
    systemMap,
    selectedItem,
    selectedItem: {
        __typename,
        path = '',
    } = {},
    selectConfigurationPath,
    selectedConfigurationPaths,
}) {
    // console.log(arguments[0]);
    const configurationType = getConfigurationTypeFromPath(path, systemMap);
    const fullPath = selectedConfigurationPaths[configurationType];
    const options = getOptionListFromPath(fullPath);
    return (
        selectedItem
        &&
        __typename === 'DetailConfiguration'
    ) ? (
            <>
                {options.length ? (
                    <CollapsibleTitle
                        titleBar={{
                            title: "Config Options",
                            // snailTrail: [configurationType],
                        }}
                    >
                        {/* <div className="sidebar-list"> */}
                        {options.map(({ name, value }) => {
                            const path = fullPath.replace(new RegExp(`${name}\\.${value}(\\..*)?`), name);
                            console.log({ name, value, path });
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
                ) : null}
                <Link
                    className="sidebar-button"
                    to={`${matchPath}${parseSearch(search).update({ path: fullPath })}`}
                >
                    <button>
                        Edit Configuration
                    </button>
                </Link>
            </>
        ) : null;
}));

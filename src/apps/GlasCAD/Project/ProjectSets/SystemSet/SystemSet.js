import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import F from '../../../../../schemas';
import {
    useQuery,
    TitleBar,
    withQueryParams,
    CollapsibleTitle,
    Select,
    GroupingBox,
    Input,
} from '../../../../../components';
import {
    getOptionListFromPath,
    getChildren,
    SystemMap,
    getLastItemFromPath,
    getDetailTypeFromPath,
    getConfigurationTypeFromPath,
} from '../../../../../app-logic/system-utils';
import { defaultSystemSetUpdate } from './ducks/schemas';
import { GENERATE } from './ducks/actions';

const query = gql`query SystemSet($systemSetId: Int!) {
    systemSetById(id: $systemSetId) {
        ...EntireSystemSet
    }
    # ...ValidOptions
    ...AllSystems
}
${F.PRJ.ENTIRE_SYSTEM_SET}
${F.SYS.ALL_SYSTEMS}
`;
// # ${F.CTRLD.VALID_OPTIONS}

export default withQueryParams({
    required: {
        projectId: Number,
    },
    optional: {
        systemSetId: id => +id || 0,
    },
}, ({ __failed__, path, parsed }) => `${
    path.replace(/system-set.*$/, 'all')
    }${
    parsed.remove(Object.keys(__failed__))
    }`
)(function SystemSet({
    params: {
        systemSetId,
        projectId,
    },
}) {

    const [fetchQuery, queryResult, fetching] = useQuery({ query, variables: { systemSetId } });

    const {
        _systemSet,
        _systemSet: {
            name,
            _system = {},
            systemOptionValuePath = '',
            _systemSetDetailOptionValues = [],
            _systemSetConfigurationOptionValues = [],
            _system: {
                name: systemName = '',
                systemType = '',
                _manufacturer: {
                    name: manufacturerName = '',
                } = {},
                _systemOptions = [],
                _detailOptions = [],
                _configurationOptions = [],
                _systemConfigurations = [],
            } = {},
        } = {},
        allSystems = [],
    } = queryResult;

    const systemMap = new SystemMap(_system);

    const [systemSetUpdate, setSystemSetUpdate] = useState(defaultSystemSetUpdate);

    const dispatch = (ACTION, payload) => setSystemSetUpdate(systemSetUpdate => ACTION(queryResult, systemSetUpdate, payload));

    useEffect(() => {
        if (!fetching) dispatch(GENERATE);
    }, [fetching, systemName]);

    console.log({
        props: arguments[0],
        queryResult,
        systemSetUpdate,
        systemOptionValuePath,
        _systemSetDetailOptionValues,
        _systemSetConfigurationOptionValues,
    });

    return (
        <>
            <TitleBar
                title="System Set"
                selections={name ? [name] : undefined}
            />
            <div className="card">
                {/* SYSTEM INFO */}
                <CollapsibleTitle
                    title="System Info"
                >
                    <Select
                        label="Manufacturer"
                        value={manufacturerName}
                        options={allSystems.map(({ _manufacturer: { name } }) => name)}
                        onChange={() => { }}
                    />
                    <Select
                        label="System Type"
                        value={systemType}
                        options={allSystems.map(({ systemType }) => systemType)}
                        onChange={() => { }}
                    />
                    <Select
                        label="System"
                        value={systemName}
                        options={allSystems.map(({ name }) => name)}
                        onChange={() => { }}
                    />
                </CollapsibleTitle>
                {systemName ? (
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
                                                    {...console.log({ configurationOptionValuePath, path })}
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
                ) : null}
            </div>
        </>
    );
});

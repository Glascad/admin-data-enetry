import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import F from '../../../../../schemas';
import {
    useQuery,
    TitleBar,
    withQueryParams,
    CollapsibleTitle,
    Select,
    Input,
    GroupingBox,
    useRedoableState,
} from '../../../../../components';
import { defaultSystemSetUpdate } from './ducks/schemas';
import merge from './ducks/merge';
import {
    GENERATE,
    SELECT_MANUFACTURER,
    SELECT_SYSTEM_TYPE,
    SELECT_SYSTEM,
    UPDATE_SYSTEM_SET_NAME,
} from './ducks/actions';
import SystemSetOptions from './SystemSetOptions';

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
        allSystems = [],
    } = queryResult;

    const {
        currentState: systemSetUpdate,
        currentIndex,
        cancel,
        replaceState,
        pushState,
    } = useRedoableState(defaultSystemSetUpdate);

    const dispatch = (ACTION, payload, shouldReplaceState = false) => (shouldReplaceState ?
        replaceState
        :
        pushState
    )(systemSetUpdate => ACTION(queryResult, systemSetUpdate, payload));

    const systemSet = merge(queryResult, systemSetUpdate);

    const {
        name,
        systemOptionValuePath = '',
        _systemSetDetailOptionValues = [],
        _systemSetConfigurationOptionValues = [],
        _system: {
            name: systemName = '',
            systemType = '',
            _manufacturer: {
                name: manufacturerName = '',
            } = {},
        } = {},
    } = systemSet;

    console.log({
        props: arguments[0],
        queryResult,
        systemSetUpdate,
        systemOptionValuePath,
        _systemSetDetailOptionValues,
        _systemSetConfigurationOptionValues,
        systemSet,
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
                    title="System Set"
                >
                    {/* <GroupingBox
                        title="System Info"
                    >
                        <div className="input-group">
                            <Select
                                data-cy="manufacturer-name"
                                label="Manufacturer"
                                value={manufacturerName}
                                options={allSystems.map(({ _manufacturer: { name } }) => name)}
                                onChange={manufacturerName => SELECT_MANUFACTURER({ manufacturerName })}
                            />
                            <Select
                                data-cy="system-type"
                                label="System Type"
                                value={systemType}
                                options={allSystems.map(({ systemType }) => systemType)}
                                onChange={systemType => SELECT_SYSTEM_TYPE({ systemType })}
                            /> */}
                    <Select
                        data-cy="system-name"
                        label="System"
                        value={systemName}
                        options={allSystems.map(({ name }) => name)}
                        onChange={systemName => dispatch(SELECT_SYSTEM, { systemName })}
                    />
                    {/* </div>
                    </GroupingBox> */}
                    <Input
                        data-cy="system-set-name"
                        label="System Set Name"
                        value={name}
                        onChange={({ target: { value } }) => dispatch(UPDATE_SYSTEM_SET_NAME, { name: value })}
                    />
                </CollapsibleTitle>
                <SystemSetOptions
                    systemSet={systemSet}
                    dispatch={dispatch}
                />
            </div>
        </>
    );
});

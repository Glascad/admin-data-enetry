import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import F from '../../../../../schemas';
import {
    useQuery,
    TitleBar,
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
import './SystemSet.scss';
import { parseSearch } from '../../../../../utils';

const query = gql`query SystemSet($systemSetId: Int!) {
    systemSetById(id: $systemSetId) {
        ...EntireSystemSet
    }
    # ...ValidOptions
    ...AllSystems
}
${F.PRJ.ENTIRE_SYSTEM_SET}
${F.MNFG.ALL_SYSTEMS}
`;
// # ${F.CTRLD.VALID_OPTIONS}

export default function SystemSet({
    location: {
        search,
    },
}) {

    const { systemSetId, projectId } = parseSearch(search);

    const [fetchQuery, queryResult, fetching] = useQuery({ query, variables: { systemSetId: +systemSetId } });

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
        systemId,
        systemOptionValuePath = '',
        _systemSetDetailOptionValues = [],
        _systemSetConfigurationOptionValues = [],
    } = systemSet;

    const {
        name: systemName = '',
        systemType = '',
        _manufacturer: {
            name: manufacturerName = '',
        } = {},
    } = allSystems.find(({ id }) => id === systemId) || {};

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
                    <GroupingBox
                        title="System Info"
                    >
                        <div className="input-group">
                            <Select
                                data-cy="manufacturer-name"
                                label="Manufacturer"
                                className="warning"
                                value={manufacturerName}
                                options={allSystems.map(({ _manufacturer: { name } }) => name)}
                                onChange={() => { }}
                            // onChange={manufacturerName => SELECT_MANUFACTURER({ manufacturerName })}
                            />
                            <Select
                                data-cy="system-type"
                                label="System Type"
                                className="warning"
                                value={systemType}
                                options={allSystems.map(({ systemType }) => systemType)}
                                onChange={() => { }}
                            // onChange={systemType => SELECT_SYSTEM_TYPE({ systemType })}
                            />
                            <Select
                                data-cy="system-name"
                                label="System"
                                value={systemName}
                                options={allSystems.map(({ name }) => name)}
                                onChange={systemName => dispatch(SELECT_SYSTEM, { systemName })}
                            />
                        </div>
                    </GroupingBox>
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
};

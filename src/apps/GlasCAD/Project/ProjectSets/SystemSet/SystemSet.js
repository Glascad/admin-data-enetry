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
    ConfirmButton,
    AsyncButton,
    useMutation,
} from '../../../../../components';
import { defaultSystemSetUpdate } from './ducks/schemas';
import merge from './ducks/merge';
import {
    SELECT_MANUFACTURER,
    SELECT_SYSTEM_TYPE,
    SELECT_SYSTEM,
    UPDATE_SYSTEM_SET_NAME,
    SELECT_OPTION_GROUP_VALUE,
    SELECT_SYSTEM_OPTION_VALUE,
} from './ducks/actions';
import SystemSetOptions from './SystemSetOptions';
import './SystemSet.scss';
import { parseSearch } from '../../../../../utils';
import { SystemMap, getDefaultPath, getDefaultOptionGroupValue } from '../../../../../app-logic/system-utils';

const query = gql`query SystemSet($systemSetId: Int!) {
    systemSetById(id: $systemSetId) {
        ...EntireSystemSet
    }
    ...AllSystems
}
${F.PRJ.ENTIRE_SYSTEM_SET}
${F.MNFG.ALL_SYSTEMS}
`;

const mutation = gql`mutation UpdateEntireSystemSet($systemSet: EntireSystemSetInput!) {
    updateEntireSystemSet(
        input: {
            systemSet: $systemSet
        }
    ) {
        ...EntireSystemSet
    }
}
${F.PRJ.ENTIRE_SYSTEM_SET}
`;

export default function SystemSet({
    location: {
        search,
    },
    match: {
        path,
    },
    history,
}) {

    const { systemSetId } = parseSearch(search);

    const [fetchSystemSet, systemSetQueryResult, fetchingSystemSet] = useQuery({ query, variables: { systemSetId: +systemSetId || 0 } });
    const [updateSystemSet, updateResult, updating] = useMutation({ mutation }, fetchSystemSet);

    const {
        allSystems = [],
    } = systemSetQueryResult;

    const {
        currentState: systemSetUpdate,
        replaceState,
        pushState,
    } = useRedoableState(defaultSystemSetUpdate);

    const dispatch = (ACTION, payload, shouldReplaceState = false) => (shouldReplaceState ?
        replaceState
        :
        pushState
    )(systemSetUpdate => ACTION(systemSetQueryResult, systemSetUpdate, payload));

    const [fetchSystem, systemQueryResult, fetchingSystem] = useQuery({
        query: gql`
            query SystemById($systemId: Int!) {
                systemById(id: $systemId) {
                    ...EntireSystem
                }
            }
            ${F.MNFG.ENTIRE_SYSTEM}
        `,
    }, true);

    const {
        _system = {},
        _system: {
            id: newSystemId,
            _systemConfigurations = [],
            _optionGroups = [],
        } = {},
    } = systemQueryResult;

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
            console.log("UPDATING AFTER RESELECTION OF SYSTEM");
            console.log({ systemMap });
            _optionGroups.forEach(({ name }) => dispatch(SELECT_OPTION_GROUP_VALUE, [
                name,
                getDefaultOptionGroupValue(name, systemMap),
                systemMap,
            ]));
            dispatch(SELECT_SYSTEM_OPTION_VALUE, [
                newSystemOptionValuePath,
                systemMap,
            ]);
        }
    });

    const systemSet = merge(systemSetQueryResult, systemSetUpdate, systemMap);

    const {
        name,
        systemId,
        systemOptionValuePath = '',
        _systemSetDetailOptionValues = [],
        _systemSetConfigurationOptionValues = [],
    } = systemSet;

    useEffect(() => {
        if (systemId) fetchSystem({ systemId });
    }, [systemId]);

    const {
        name: systemName = '',
        systemType = '',
        _manufacturer: {
            name: manufacturerName = '',
        } = {},
    } = allSystems.find(({ id }) => id === systemId) || {};

    const save = async () => {
        console.log({
            systemSet,
        });
    }

    return (
        <>
            <TitleBar
                title={`${systemSetId ? '' : 'New '}System Set`}
                selections={[name]}
                right={(
                    <>
                        <ConfirmButton
                            doNotConfirmWhen={true}
                            onClick={() => history.push(`${path.replace(/system.set/, 'all')}${search}`)}
                        >
                            Close
                        </ConfirmButton>
                        <AsyncButton
                            onClick={save}
                            className="action"
                        >
                            Save
                        </AsyncButton>
                    </>
                )}
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
                                readOnly={true}
                                value={manufacturerName}
                                options={allSystems.map(({ _manufacturer: { name } }) => name)}
                                onChange={() => { }}
                            // onChange={manufacturerName => SELECT_MANUFACTURER({ manufacturerName })}
                            />
                            <Select
                                data-cy="system-type"
                                label="System Type"
                                readOnly={true}
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
                    dispatch={dispatch}
                    systemSet={systemSet}
                    systemMap={systemMap}
                />
                <div className="bottom-buttons">
                    <ConfirmButton
                        doNotConfirmWhen={true}
                        onClick={() => history.push(`${path.replace(/system.set/, 'all')}${search}`)}
                    >
                        Close
                    </ConfirmButton>
                    <AsyncButton
                        onClick={save}
                        className="action"
                    >
                        Save
                    </AsyncButton>
                </div>
            </div>
        </>
    );
};

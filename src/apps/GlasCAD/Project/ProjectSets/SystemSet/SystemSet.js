import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { getDefaultOptionGroupValue, getDefaultPath, SystemMap } from '../../../../../app-logic/system-utils';
import { AsyncButton, ConfirmButton, TitleBar, useMutation, useQuery, useRedoableState } from '../../../../../components';
import F from '../../../../../schemas';
import { parseSearch } from '../../../../../utils';
import { SELECT_OPTION_GROUP_VALUE, SELECT_SYSTEM_OPTION_VALUE } from './ducks/actions';
import merge from './ducks/merge';
import { defaultSystemSetUpdate } from './ducks/schemas';
import Details from './modules/Details';
import SystemOptions from './modules/SystemOptions';
import SystemSetInfo from './modules/SystemSetInfo';
import './SystemSet.scss';

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
            _detailConfigurations = [],
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
        _systemSetOptionGroupValues = [],
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

    console.log({ systemSet });

    return (
        <>
            <TitleBar
                title={`${systemSetId ? '' : 'New '}System Set`}
                snailTrail={[name]}
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
                <SystemSetInfo
                    {...{
                        systemName,
                        allSystems,
                        dispatch,
                        manufacturerName,
                        systemType,
                        name,
                    }}
                />
                <SystemOptions
                    {...{
                        systemOptionValuePath,
                        systemMap,
                        dispatch,
                        _systemSetOptionGroupValues,
                    }}
                />
                <Details
                    {...{
                        _systemSetDetailOptionValues,
                        _systemSetConfigurationOptionValues,
                        _detailConfigurations,
                        _optionGroups,
                        dispatch,
                        systemMap,
                    }}
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

import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { getDefaultOptionGroupValue, getDefaultPath, SystemMap } from '../../../../../app-logic/system';
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
import Configurations from './modules/Configurations';
import SAMPLE_SYSTEM_SETS from './ducks/__test__/sample-query-results';

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

    const { systemSetId, sampleSystemSet = {} } = parseSearch(search);

    // splice in sample system set into the system set query result
    // and add sample system to all systems array
    const { systemSet: _sampleSystemSet, system: _sampleSystem } = SAMPLE_SYSTEM_SETS[sampleSystemSet] || {};
    const [fetchSystemSet, ssqr, fetchingSystemSet] = useQuery({ query, variables: { systemSetId: +systemSetId || 0 } });
    const { _systemSet = {} } = ssqr;
    const systemSetQueryResult = {
        ...ssqr,
        _systemSet: _sampleSystemSet || _systemSet,
    }
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

    // compare system id of system set to the sample system id
    // if same splice sample system into system query result
    const [fetchSystem, qr, fetchingSystem] = useQuery({
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
    } = qr;

    const systemQueryResult = _systemSet.id === sampleSystemSet.id ?
        {
            ...qr,
            _system: _sampleSystem || _system,
        }
        :
        qr;



    // const _optionGroups = [];

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
        _systemSetDetails = [],
        _systemSetConfigurations = [],
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

    // console.log({ systemSet });

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
                        _systemSetDetails,
                        _systemSetConfigurations,
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

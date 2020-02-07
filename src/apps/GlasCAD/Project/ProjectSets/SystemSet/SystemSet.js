import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { getDefaultOptionGroupValue, getDefaultPath, SystemMap } from '../../../../../app-logic/system';
import { AsyncButton, ConfirmButton, TitleBar, useMutation, useQuery, useRedoableState, useSaveOnCtrlS } from '../../../../../components';
import F from '../../../../../schemas';
import { parseSearch } from '../../../../../utils';
import Details from './Details/Details';
import { SELECT_OPTION_GROUP_VALUE, SELECT_SYSTEM_OPTION_VALUE } from './ducks/actions';
import merge from './ducks/merge';
import { defaultSystemSetUpdate } from './ducks/schemas';
import SAMPLE_SYSTEM_SETS from './ducks/__test__/sample-query-results';
import SystemOptions from './SystemOptions/SystemOptions';
import './SystemSet.scss';
import SystemSetInfo from './SystemSetInfo/SystemSetInfo';

const query = gql`query SystemSet($systemSetId: Int!) {
    systemSetById(id: $systemSetId) {
        ...EntireSystemSet
    }
    ...AllSystems
}
${F.PROJ.ENTIRE_SYSTEM_SET}
${F.MNFG.ALL_SYSTEMS}
`;

const mutation = gql`mutation UpdateEntireSystemSet($systemSet: EntireSystemSetInput!) {
    updateEntireSystemSet(
        input: {
            systemSet: $systemSet
        }
    ) {
        systemSet {
            ...EntireSystemSet
        }
    }
}
${F.PROJ.ENTIRE_SYSTEM_SET}
`;

export default function SystemSet({
    location: {
        search,
    },
    match: {
        path,
    },
    fetchProject,
    fetchingProject,
    history,
}) {

    const { systemSetId, sampleSystemSet = {}, projectId } = parseSearch(search);

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
        if (systemId === newSystemId) {
            const newSystemOptionValuePath = getDefaultPath(systemMap);
            if (
                !systemOptionValuePath
                &&
                newSystemOptionValuePath
            ) {
                console.log({
                    newSystemOptionValuePath,
                    _optionGroups,
                    systemMap,
                    systemSetUpdate,
                });
                dispatch(SELECT_SYSTEM_OPTION_VALUE, [
                    newSystemOptionValuePath,
                    systemMap,
                ]);
                _optionGroups.forEach(({ name }) => dispatch(SELECT_OPTION_GROUP_VALUE, [
                    name,
                    getDefaultOptionGroupValue(name, systemMap),
                    systemMap,
                ]));
            }
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

    console.log({
        systemSet,
        name,
        systemSetQueryResult,
        systemSetUpdate,
        systemMap,
    });

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

    const save = useSaveOnCtrlS(async () => {

        const payload = {
            ...systemSetUpdate,
            projectId: +projectId,
            id: +systemSetId,
        };

        console.log({
            systemSet,
            systemSetUpdate,
            payload,
        });

        const result = await updateSystemSet({ systemSet: payload });

        console.log({ result });

        try {
            const {
                updateEntireSystemSet: {
                    systemSet: {
                        id,
                        projectId,
                    },
                },
            } = result;
            console.log({ id });

            const projectResult = await fetchProject({ id: projectId }, { fetchPolicy: "no-cache" });

            console.log({ projectResult });

            history.push(`${path.replace(/system-set.*/, 'all')}${parseSearch(search).update({ systemSetId: id })}`);

        } catch (err) {
            console.error(err);
        }

    });

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
                            loadingText="Saving"
                            loading={updating || fetchingProject}
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
                        loadingText="Saving"
                        loading={updating || fetchingProject}
                    >
                        Save
                    </AsyncButton>
                </div>
            </div>
        </>
    );
};

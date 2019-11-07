import React from 'react';
import { TransformProvider, useRedoableState, RightSidebar } from "../../../../../components";
import SystemTree from './SystemTree/SystemTree';
import Header from './Header/Header';
import { systemUpdate } from './ducks/schemas';
import merge from './ducks/merge';
import { SystemMap } from '../../../../../app-logic/system-utils';
import { useCollapseSidebar } from '../../../../Statics/Statics';
import cleanSystemInput from './ducks/clean-system-input';
import { usePartialAction, useSelection, useCheckDefaultValues } from './ducks/hooks';
import * as VIEWS from './sidebar-views';

SystemBuilder.navigationOptions = {
    path: '/build',
};

export default function SystemBuilder({
    location,
    match,
    history,
    queryResult,
    updateEntireSystem,
    fetching,
    updating,
}) {

    useCollapseSidebar();

    const {
        currentState: systemInput,
        pushState,
        replaceState,
    } = useRedoableState(systemUpdate);

    const system = merge(systemInput, queryResult);

    const systemMap = new SystemMap(system);

    // adding default value to all options without one
    useCheckDefaultValues({ systemMap, system, systemInput });

    const {
        selectedItem,
        selectedItem: {
            __typename: selectedTypename,
        } = {},
        selectItem,
    } = useSelection({ systemMap, location, match, history });

    const { partialAction, dispatchPartial, cancelPartial } = usePartialAction({ selectItem });

    const dispatch = (ACTION, payload, { replaceState: shouldReplaceState = false } = {}) => (shouldReplaceState ?
        replaceState
        :
        pushState
    )(systemInput => ({
        ...systemInput,
        ...ACTION(
            systemInput,
            payload,
        ),
    }));

    const save = async () => {
        dispatch(() => systemUpdate);
        try {
            const result = await updateEntireSystem(cleanSystemInput(systemInput, system));
            console.log({ result });
        } catch (err) {
            console.error(err);
            dispatch(() => systemInput);
        }
    };

    return (
        <TransformProvider>
            <Header
                queryResult={queryResult}
                systemInput={systemInput}
                system={system}
                systemMap={systemMap}
                dispatch={dispatch}
                selectedItem={selectedItem}
                selectItem={selectItem}
                save={save}
            />
            <SystemTree
                queryResult={queryResult}
                updating={updating}
                fetching={fetching}
                system={system}
                systemMap={systemMap}
                dispatch={dispatch}
                selectItem={selectItem}
                selectedItem={selectedItem}
                partialAction={partialAction}
                cancelPartial={cancelPartial}
            />
            <RightSidebar
                open={!!selectedItem}
                handleCloseClick={() => selectItem()}
                View={VIEWS[selectedTypename] || { title: '', component: () => null }}
                childProps={{
                    queryResult,
                    system,
                    systemMap,
                    dispatch,
                    selectItem,
                    selectedItem,
                    dispatchPartial,
                    partialAction,
                    cancelPartial,
                }}
            />
        </TransformProvider>
    );
}

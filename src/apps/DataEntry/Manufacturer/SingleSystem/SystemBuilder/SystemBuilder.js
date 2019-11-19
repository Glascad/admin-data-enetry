import React from 'react';
import { TransformProvider, RightSidebar } from "../../../../../components";
import SystemTree from './SystemTree/SystemTree';
import Header from './Header/Header';
import { useCollapseSidebar } from '../../../../Statics/Statics';
import { usePartialAction, useSelection, useCheckDefaultValues } from '../ducks/hooks';
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
    systemMap,
    system,
    systemInput,
    dispatch,
    save,
}) {

    useCollapseSidebar();

    const {
        selectedItem,
        selectedItem: {
            __typename: selectedTypename,
        } = {},
        selectItem,
    } = useSelection({ systemMap, location, match, history });

    const { partialAction, dispatchPartial, cancelPartial } = usePartialAction({ selectItem });

    // adding default value to all options without one
    useCheckDefaultValues({ systemMap, system, dispatch, systemInput });

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

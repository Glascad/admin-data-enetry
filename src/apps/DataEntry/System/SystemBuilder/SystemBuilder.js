import React from 'react';
import { TransformProvider } from "../../../../components";
import { useCollapseSidebar } from '../../../Statics/Statics';
import { useCheckDefaultValues, usePartialAction, useSelection } from '../ducks/hooks';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import SystemTree from './SystemTree/SystemTree';

SystemBuilder.navigationOptions = {
    requiredURLParams: ["systemId"],
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
                {...{
                    queryResult,
                    systemInput,
                    system,
                    systemMap,
                    dispatch,
                    selectedItem,
                    selectItem,
                    save,
                }}
            />
            <SystemTree
                {...{
                    queryResult,
                    updating,
                    fetching,
                    system,
                    systemMap,
                    dispatch,
                    selectItem,
                    selectedItem,
                    partialAction,
                    cancelPartial,
                }}
            />
            <Sidebar
                {...{
                    queryResult,
                    system,
                    systemMap,
                    dispatch,
                    selectItem,
                    selectedItem,
                    dispatchPartial,
                    partialAction,
                    cancelPartial,
                    match,
                    location,
                }}
            />
            {/* <RightSidebar
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
            /> */}
        </TransformProvider>
    );
}

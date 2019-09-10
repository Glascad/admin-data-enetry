import React, { useState, useEffect } from 'react';
import { TitleBar, TransformProvider, useSelection, useRedoableState } from "../../../../components";
import SystemTree from './SystemTree/SystemTree';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { systemUpdate } from './ducks/schemas';
import merge from './ducks/merge';
import { parseSearch } from '../../../../utils';
import { findItemByIdAndTypename, generateSystemMap } from './ducks/utils';

SystemBuilder.navigationOptions = {
    path: '/build',
};

export default function SystemBuilder({
    location: {
        search,
    },
    queryResult,
    fetching,
}) {

    const { systemId } = parseSearch(search);

    // const [systemInput, setState] = useState(systemUpdate);
    const [originalSelectedItem, setSelection] = useState();

    const selectItem = item => setSelection(selectedItem => item === selectedItem ? undefined : item);

    const cancelSelectionOnEscape = ({ key }) => key === "Escape" && selectItem();
    const cancelSelectionOnClick = () => selectItem();

    useEffect(() => {
        window.addEventListener('keydown', cancelSelectionOnEscape);
        window.addEventListener('click', cancelSelectionOnClick);
        return () => {
            window.removeEventListener('keydown', cancelSelectionOnEscape);
            window.removeEventListener('click', cancelSelectionOnClick);
        }
    }, []);

    const {
        currentState: systemInput,
        pushState,
        replaceState,
    } = useRedoableState(systemUpdate);

    const system = merge(systemInput, queryResult);

    const systemMap = generateSystemMap(system);

    const selectedItem = findItemByIdAndTypename(system, originalSelectedItem);

    useEffect(() => {
        if (!selectedItem) selectItem();
    }, [selectedItem]);

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

    // console.log(system);

    const save = async () => {
        console.log(systemInput);
    }

    console.log({
        props: arguments[0],
        state: systemInput,
    });

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
                fetching={fetching}
                system={system}
                systemMap={systemMap}
                dispatch={dispatch}
                selectItem={selectItem}
                selectedItem={selectedItem}
            />
            <Sidebar
                queryResult={queryResult}
                system={system}
                systemMap={systemMap}
                dispatch={dispatch}
                selectItem={selectItem}
                selectedItem={selectedItem}
            />
        </TransformProvider>
    );
}

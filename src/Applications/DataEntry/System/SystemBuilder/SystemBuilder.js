import React, { useState, useEffect } from 'react';
import { TitleBar, TransformProvider, useSelection, useUndoRedo } from "../../../../components";
import SystemTree from './SystemTree/SystemTree';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { systemUpdate } from './ducks/schemas';
import merge from './ducks/merge';
import { parseSearch } from '../../../../utils';
import { findItemByIdAndTypename } from './ducks/utils';

SystemBuilder.navigationOptions = {
    path: '/build',
};

export default function SystemBuilder({
    location: {
        search,
    },
    queryStatus,
    queryStatus: {
        _system,
        validOptions = [],
    },
    fetching,
}) {

    const { systemId } = parseSearch(search);

    // const [systemInput, setState] = useState(systemUpdate);
    const [originalSelectedItem, setSelection] = useState();

    const selectItem = item => setSelection(selectedItem => item === selectedItem ? undefined : item);

    const cancelSelectionOnEscape = ({ key }) => key === "Escape" && selectItem();

    useEffect(() => {
        window.addEventListener('keydown', cancelSelectionOnEscape);
        return () => window.removeEventListener('keydown', cancelSelectionOnEscape);
    }, []);

    const {
        currentState: systemInput,
        pushState,
    } = useUndoRedo(systemUpdate);

    const system = merge(systemInput, queryStatus);

    const selectedItem = findItemByIdAndTypename(system, originalSelectedItem) || originalSelectedItem;

    const dispatch = (ACTION, payload) => pushState(systemInput => ({
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

    // console.log(arguments[0]);

    console.log({ originalSelectedItem, selectedItem, system });

    return (
        <TransformProvider>
            <Header
                queryStatus={queryStatus}
                systemInput={systemInput}
                system={system}
                dispatch={dispatch}
                selectedItem={selectedItem}
                selectItem={selectItem}
                save={save}
            />
            <SystemTree
                queryStatus={queryStatus}
                fetching={fetching}
                system={system}
                dispatch={dispatch}
                selectItem={selectItem}
                selectedItem={selectedItem}
            />
            <Sidebar
                queryStatus={queryStatus}
                system={system}
                dispatch={dispatch}
                selectItem={selectItem}
                selectedItem={selectedItem}
            />
        </TransformProvider>
    );
}

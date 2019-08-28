import React, { useState } from 'react';
import { TitleBar, TransformProvider, useSelection } from "../../../../components";
import SystemTree from './SystemTree/SystemTree';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { systemUpdate } from './ducks/schemas';
import merge from './ducks/merge';

SystemBuilder.navigationOptions = {
    path: '/build',
};

export default function SystemBuilder({
    queryStatus,
    queryStatus: {
        _system,
        validOptions = [],
    },
}) {

    const [systemInput, setState] = useState(systemUpdate);
    const selection = useSelection();

    const dispatch = (ACTION, payload) => setState(systemInput => ({ ...systemInput, ...ACTION(payload) }));

    const system = merge(systemInput, queryStatus);

    const save = async () => {
        console.log(systemInput);
    }

    console.log(arguments[0]);

    return (
        <TransformProvider>
            <Header
                queryStatus={queryStatus}
                systemInput={systemInput}
                system={system}
                dispatch={dispatch}
                selection={selection}
                save={save}
            />
            <SystemTree
                queryStatus={queryStatus}
                system={system}
                dispatch={dispatch}
                selection={selection}
            />
            <Sidebar
                queryStatus={queryStatus}
                system={system}
                dispatch={dispatch}
                selection={selection}
            />
        </TransformProvider>
    );
}

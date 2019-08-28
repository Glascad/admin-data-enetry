import React, { useState } from 'react';
import { TitleBar, TransformProvider, useSelection } from "../../../../components";
import SystemTree from './SystemTree/SystemTree';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { elevationUpdate } from './ducks/schemas';
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

    const [elevationInput, setState] = useState(elevationUpdate);
    const selection = useSelection();

    const dispatch = (ACTION, payload) => setState(elevationInput => ({ ...elevationInput, ...ACTION(payload) }));

    const system = merge(elevationInput, queryStatus);

    console.log(arguments[0]);

    return (
        <TransformProvider>
            <Header
                queryStatus={queryStatus}
                system={system}
                dispatch={dispatch}
                selection={selection}
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

import React, { useState } from 'react';
import { TitleBar, TransformProvider, useSelection } from "../../../../components";
import SystemTree from './SystemTree/SystemTree';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { systemUpdate } from './ducks/schemas';
import merge from './ducks/merge';
import { parseSearch } from '../../../../utils';

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
}) {

    const { systemId } = parseSearch(search);

    const [systemInput, setState] = useState(systemUpdate);
    const [selectedItem, selectItem] = useState();

    const dispatch = (ACTION, payload) => setState(systemInput => ({ ...systemInput, ...ACTION(payload) }));

    const system = merge(systemInput, queryStatus);

    const save = async () => {
        console.log(systemInput);
    }

    // console.log(arguments[0]);

    return (
        <TransformProvider>
            <Header
                queryStatus={queryStatus}
                systemInput={systemInput}
                system={system}
                dispatch={dispatch}
                selectItem={selectItem}
                save={save}
            />
            <SystemTree
                queryStatus={queryStatus}
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

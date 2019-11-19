import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
    TransformProvider,
} from '../../../../../components';
import Header from './Header/Header';
import DetailDisplay from './DetailDisplay/DetailDisplay';
import DetailTray from './DetailTray/DetailTray';
import Sidebar from './Sidebar/Sidebar';
import { getDefaultPath, getChildren } from '../../../../../app-logic/system-utils';
import { parseSearch } from '../../../../../utils';
import { useCollapseSidebar } from '../../../../Statics/Statics';

DetailBuilder.navigationOptions = {
    requiredURLParams: ["path"],
    path: "/detail",
};

export default function DetailBuilder({
    location: {
        search,
    },
    match: {
        path: matchPath,
    },
    systemMap,
    dispatch,
    updating,
    save,
}) {

    useCollapseSidebar();

    const { path } = parseSearch(search);

    const fullPath = getDefaultPath(path, systemMap);

    const children = getChildren({ path }, systemMap) || [];

    const [{ path: selectedPath } = {}, setSelectedPart] = useState();

    const selectedPart = systemMap[selectedPath];

    const selectPart = newPart => setSelectedPart(part => newPart === part ? undefined : newPart);

    useEffect(() => {
        selectPart();
    }, [path]);

    console.log({
        fullPath,
        path,
        systemMap,
        children,
        selectedPart,
    });

    if (path !== fullPath) return (
        <Redirect
            to={{
                pathname: matchPath,
                search: `${parseSearch(search).update({ path: fullPath })}`,
                state: {
                    previousPath: path,
                },
            }}
        />
    );

    return (
        <TransformProvider>
            <Header
                systemMap={systemMap}
                save={save}
                updating={updating}
            />
            <DetailDisplay
                systemMap={systemMap}
                children={children}
                selectPart={selectPart}
                selectedPart={selectedPart}
                updating={updating}
            />
            <DetailTray
                systemMap={systemMap}
                selectedPart={selectedPart}
                dispatch={dispatch}
            />
            <Sidebar
                systemMap={systemMap}
            />
        </TransformProvider>
    );
}

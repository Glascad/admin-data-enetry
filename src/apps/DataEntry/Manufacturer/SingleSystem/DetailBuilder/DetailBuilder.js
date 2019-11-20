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

    const [{ path: selectedPath } = {}, setSelectedItem] = useState();

    const selectedItem = systemMap[selectedPath];

    const selectItem = newItem => setSelectedItem(item => newItem === item ? undefined : newItem);
    const cancelSelection = () => selectItem();

    useEffect(() => {
        cancelSelection();
    }, [path]);

    useEffect(() => {
        window.addEventListener('click', cancelSelection);
        return () => window.removeEventListener('click', cancelSelection);
    }, []);

    console.log({
        fullPath,
        path,
        systemMap,
        children,
        selectedItem,
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
                selectItem={selectItem}
                selectedItem={selectedItem}
                updating={updating}
                />
            <DetailTray
                systemMap={systemMap}
                selectedItem={selectedItem}
                dispatch={dispatch}
            />
            <Sidebar
                systemMap={systemMap}
                children={children}
                selectItem={selectItem}
                selectedItem={selectedItem}
            />
        </TransformProvider>
    );
}

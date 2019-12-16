import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getChildren, getConfigurationTypeFromPath, getDefaultPath } from '../../../../app-logic/system';
import { TransformProvider, useInitialState } from '../../../../components';
import { parseSearch } from '../../../../utils';
import { useCollapseSidebar } from '../../../Statics/Statics';
import { usePartialAction } from '../ducks/hooks';
import DetailDisplay from './DetailDisplay/DetailDisplay';
import DetailTray from './DetailTray/DetailTray';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

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
    fetching,
    updating,
    save,
}) {

    useCollapseSidebar();

    const { path } = parseSearch(search);

    const fullPath = getDefaultPath(path, systemMap).replace(/\.__PT\d+__\..*/, '');

    const item = systemMap[fullPath];

    const children = getChildren(item, systemMap) || [];

    const [selectedConfigurationPaths, setSelectedConfigurationPaths] = useInitialState(
        children.reduce((paths, { path }) => ({
            ...paths,
            [getConfigurationTypeFromPath(path)]: getDefaultPath(path, systemMap).replace(/\.__PT\d+__\..*/, ''),
        }), {}),
        [fetching, children.length, fullPath],
    );

    const selectConfigurationPath = path => setSelectedConfigurationPaths(paths => ({
        ...paths,
        [getConfigurationTypeFromPath(path)]: getDefaultPath(path, systemMap),
    }));

    const [{ path: selectedPath } = {}, setSelectedItem] = useState();

    const selectedItem = systemMap[selectedPath];

    const selectItem = newItem => setSelectedItem(item => newItem === item ? undefined : newItem);
    const cancelSelection = () => selectItem();
    const cancelOnEscape = ({ key }) => key === 'Escape' && cancelSelection();

    const {
        partialAction,
        dispatchPartial,
        cancelPartial,
        dispatchPartialPayload,
    } = usePartialAction({ selectItem, dispatch });

    useEffect(() => {
        cancelSelection();
    }, [path]);

    useEffect(() => {
        window.addEventListener('click', cancelSelection);
        window.addEventListener('keydown', cancelOnEscape);
        return () => {
            window.removeEventListener('click', cancelSelection);
            window.removeEventListener('keydown', cancelOnEscape);
        }
    }, []);

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
                selectedConfigurationPaths={selectedConfigurationPaths}
                item={item}
                children={children}
                selectItem={selectItem}
                selectedItem={selectedItem}
                updating={updating}
                partialAction={partialAction}
                dispatchPartialPayload={dispatchPartialPayload}
            />
            <DetailTray
                selectItem={selectItem}
                systemMap={systemMap}
                selectedItem={selectedItem}
                dispatch={dispatch}
                partialAction={partialAction}
                dispatchPartial={dispatchPartial}
                cancelPartial={cancelPartial}
            />
            <Sidebar
                systemMap={systemMap}
                children={children}
                selectItem={selectItem}
                selectedItem={selectedItem}
                selectConfigurationPath={selectConfigurationPath}
                selectedConfigurationPaths={selectedConfigurationPaths}
            />
        </TransformProvider>
    );
}

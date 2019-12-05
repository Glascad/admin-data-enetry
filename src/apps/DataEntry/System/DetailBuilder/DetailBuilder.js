import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
    TransformProvider, useInitialState,
} from '../../../../components';
import Header from './Header/Header';
import DetailDisplay from './DetailDisplay/DetailDisplay';
import DetailTray from './DetailTray/DetailTray';
import Sidebar from './Sidebar/Sidebar';
import { getDefaultPath, getChildren, getLastItemFromPath, getConfigurationTypeFromPath } from '../../../../app-logic/system-utils';
import { parseSearch, replace } from '../../../../utils';
import { useCollapseSidebar } from '../../../Statics/Statics';
import { usePartialAction } from '../ducks/hooks';

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

    const children = getChildren({ path }, systemMap) || [];

    const [selectedConfigurationPaths, setSelectedConfigurationPaths] = useInitialState(
        children.reduce((paths, { path }) => ({
            ...paths,
            [getConfigurationTypeFromPath(path)]: getDefaultPath(path, systemMap),
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

    const { partialAction, dispatchPartial, cancelPartial, } = usePartialAction({ selectItem });

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

    // console.log({
    //     fullPath,
    //     path,
    //     systemMap,
    //     children,
    //     selectedItem,
    //     selectedConfigurationPaths,
    // });

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
                selectedConfigurationPaths={selectedConfigurationPaths}
                selectItem={selectItem}
                selectedItem={selectedItem}
                updating={updating}
                partialAction={partialAction}
                dispatchPartial={dispatchPartial}

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

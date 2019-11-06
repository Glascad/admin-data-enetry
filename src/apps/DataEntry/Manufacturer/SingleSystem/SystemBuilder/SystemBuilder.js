import React, { useState, useEffect } from 'react';
import { TitleBar, TransformProvider, useSelection, useRedoableState } from "../../../../../components";
import SystemTree from './SystemTree/SystemTree';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { systemUpdate } from './ducks/schemas';
import merge from './ducks/merge';
import { parseSearch, removeNullValues } from '../../../../../utils';
import { SystemMap, getLastItemFromPath, getChildren } from '../../../../../app-logic/system-utils';
import { UPDATE_ITEM } from './ducks/actions';
import { useCollapseSidebar } from '../../../../Statics/Statics';

SystemBuilder.navigationOptions = {
    path: '/build',
};

export default function SystemBuilder({
    location: {
        search,
    },
    match: {
        path: matchPath,
    },
    history,
    queryResult,
    updateEntireSystem,
    fetching,
}) {

    useCollapseSidebar();

    // const [systemInput, setState] = useState(systemUpdate);

    const {
        currentState: systemInput,
        states,
        currentIndex,
        pushState,
        replaceState,
    } = useRedoableState(systemUpdate);

    const system = merge(systemInput, queryResult);

    const systemMap = new SystemMap(system);

    const { path } = parseSearch(search);

    const selectItem = ({ path: newPath } = {}) => console.log(`SELECTING ITEM: ${newPath}`) || (!newPath && console.trace(newPath)) || history.push(!newPath || (newPath === path) ? `${
        matchPath
        }${
        parseSearch(search).remove('path')
        }` : `${
        matchPath
        }${
        parseSearch(search).update({ path: newPath })
        }`);

    const selectedItem = systemMap[path];

    console.log({
        selectedItem,
        systemInput,
        states,
        currentIndex,
    });

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

    const [partialAction, setPartialAction] = useState();

    const dispatchPartial = (ACTION, payload) => setPartialAction({ ACTION, payload });
    const cancelPartial = () => setPartialAction();

    const cancelOnClick = () => partialAction ?
        cancelPartial()
        :
        selectItem();

    const cancelOnEscape = ({ key }) => key === "Escape" && cancelOnClick();

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('keydown', cancelOnEscape, true);
            window.addEventListener('click', cancelOnClick);
        });
        return () => {
            window.removeEventListener('keydown', cancelOnEscape, true);
            window.removeEventListener('click', cancelOnClick);
        }
    }, [partialAction]);

    // adding default value to all options without one
    useEffect(() => {
        Object.entries(system)
            .filter(([key]) => key.match(/Options$/i))
            .forEach(([key, options]) => {
                options.forEach(option => {
                    const { __typename } = option;

                    const defaultValueKey = `default${__typename}Value`;

                    const { [defaultValueKey]: defaultValue } = option;

                    const children = getChildren(option, systemMap);

                    const noDefault = !defaultValue || !children.some(({ path }) => (path).endsWith(`.${defaultValue}`));

                    if (noDefault) {

                        const [{
                            path = '',
                        } = {}] = children;

                        const newDefault = getLastItemFromPath(path);

                        if (newDefault) dispatch(UPDATE_ITEM, {
                            ...option,
                            update: {
                                [defaultValueKey]: newDefault,
                            },
                        }, {
                            replaceState: true,
                        });
                    }
                });
            });
    }, [systemInput]);

    const save = async () => {
        console.log(systemInput);
        console.log({
            arguments: arguments,
            systemInput,
            currentIndex,
            system,
            systemMap,
            selectedItem,
        });

        const {
            id,
            manufacturerId,
            name: systemName,
            systemType,
        } = system;

        const {
            pathsToDelete,
            optionGroupsToDelete,
            systemOptions,
            detailOptions,
            configurationOptions,
            systemOptionValues,
            detailOptionValues,
            configurationOptionValues,
            systemDetails,
            systemConfigurations,
            newOptionGroups,
            newSystemOptions,
            newDetailOptions,
            newConfigurationOptions,
            newSystemOptionValues,
            newDetailOptionValues,
            newConfigurationOptionValues,
            newSystemDetails,
            newSystemConfigurations,
        } = systemInput;
        console.log(systemInput);

        const updatedSystem = {
            id,
            manufacturerId,
            name: systemName,
            systemType,
            pathsToDelete,
            optionGroupsToDelete,
            newOptionGroups,
            systemOptions: systemOptions.map(({ __typename, nodeId, ...rest }) => ({ ...rest })),
            detailOptions: detailOptions.map(({ __typename, nodeId, ...rest }) => ({ ...rest })),
            configurationOptions: configurationOptions.map(({ __typename, nodeId, ...rest }) => ({ ...rest })),
            systemOptionValues: systemOptionValues.map(({ __typename, nodeId, ...rest }) => ({ ...rest })),
            detailOptionValues: detailOptionValues.map(({ __typename, nodeId, ...rest }) => ({ ...rest })),
            configurationOptionValues: configurationOptionValues.map(({ __typename, nodeId, ...rest }) => ({ ...rest })),
            systemDetails: systemDetails.map(({ __typename, nodeId, update, ...rest }) => ({ ...rest, update: removeNullValues({...update, systemDetails: update.name, name: undefined}) })),
            systemConfigurations: systemConfigurations.map(({ __typename, nodeId, update, ...rest }) => ({ ...rest, update: removeNullValues({...update, systemConfigurations: update.name, name: undefined}) })),
            newSystemOptions: newSystemOptions.map(({ __typename, nodeId, ...rest }) => ({ ...rest })),
            newDetailOptions: newDetailOptions.map(({ __typename, nodeId, ...rest }) => ({ ...rest })),
            newConfigurationOptions: newConfigurationOptions.map(({ __typename, nodeId, ...rest }) => ({ ...rest })),
            newSystemOptionValues: newSystemOptionValues.map(({ __typename, nodeId, ...rest }) => ({ ...rest })),
            newDetailOptionValues: newDetailOptionValues.map(({ __typename, nodeId, ...rest }) => ({ ...rest })),
            newConfigurationOptionValues: newConfigurationOptionValues.map(({ __typename, nodeId, ...rest }) => ({ ...rest })),
            newSystemDetails: newSystemDetails.map(({ __typename, nodeId, name, ...rest }) => ({ detailType: name, ...rest })),
            newSystemConfigurations: newSystemConfigurations.map(({ __typename, nodeId, name, ...rest }) => ({ configurationType: name, ...rest })),
        };

        console.log({
            system,
            systemInput,
            updatedSystem
        })

        const result = await (updateEntireSystem({
            system: updatedSystem
        }))
        return result;
    }

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
                search={search}
                system={system}
                systemMap={systemMap}
                dispatch={dispatch}
                selectItem={selectItem}
                selectedItem={selectedItem}
                partialAction={partialAction}
                cancelPartial={cancelPartial}
            />
            <Sidebar
                queryResult={queryResult}
                system={system}
                systemMap={systemMap}
                dispatch={dispatch}
                selectItem={selectItem}
                selectedItem={selectedItem}
                dispatchPartial={dispatchPartial}
                partialAction={partialAction}
                cancelPartial={cancelPartial}
            />
        </TransformProvider>
    );
}

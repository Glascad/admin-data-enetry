import React, { useState, useEffect } from 'react';
import { TitleBar, TransformProvider, useSelection, useRedoableState } from "../../../../../components";
import SystemTree from './SystemTree/SystemTree';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { systemUpdate } from './ducks/schemas';
import merge from './ducks/merge';
import { parseSearch } from '../../../../../utils';
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

import React, { useState, useEffect } from 'react';
import { TitleBar, TransformProvider, useSelection, useRedoableState } from "../../../../components";
import SystemTree from './SystemTree/SystemTree';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { systemUpdate } from './ducks/schemas';
import merge from './ducks/merge';
import { parseSearch } from '../../../../utils';
import { findItemByIdAndTypename, SystemMap, getNameFromPath } from '../../../../app-logic/system-utils';
import { UPDATE_ITEM } from './ducks/actions';

SystemBuilder.navigationOptions = {
    path: '/build',
};

export default function SystemBuilder({
    location: {
        search,
    },
    queryResult,
    fetching,
}) {

    const { systemId } = parseSearch(search);

    // const [systemInput, setState] = useState(systemUpdate);
    const [originalSelectedItem, setSelection] = useState();

    const selectItem = item => setSelection(selectedItem => item === selectedItem ? undefined : item);

    const cancelSelectionOnEscape = ({ key }) => key === "Escape" && selectItem();
    const cancelSelectionOnClick = () => selectItem();

    useEffect(() => {
        window.addEventListener('keydown', cancelSelectionOnEscape, true);
        window.addEventListener('click', cancelSelectionOnClick);
        return () => {
            window.removeEventListener('keydown', cancelSelectionOnEscape, true);
            window.removeEventListener('click', cancelSelectionOnClick);
        }
    }, []);

    const {
        currentState: systemInput,
        pushState,
        replaceState,
    } = useRedoableState(systemUpdate);

    const system = merge(systemInput, queryResult);

    const systemMap = new SystemMap(system);

    const selectedItem = systemMap[originalSelectedItem ? originalSelectedItem.path : undefined];

    // console.log({
    //     originalSelectedItem,
    //     selectedItem,
    // });

    useEffect(() => {
        if (!selectedItem) selectItem();
    }, [selectedItem]);

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

    //adding default value to all options without one
    useEffect(() => {
        Object.entries(system)
            .filter(([key]) => key.match(/options$/i))
            .forEach(([key, options]) => {
                options.map(option => {
                    const defaultValueKey = `default${option.__typename}Value`;
                    const {
                        [defaultValueKey]: defaultValue,
                        path,
                        __typename,
                    } = option

                    const optionValuesKey = `_${__typename.toLowerCase().replace(/option/i, 'OptionValues')}`;
                    const { [optionValuesKey]: optionValues } = system;
                    const valuePathRegex = new RegExp(`^${path}\.\\w+$`, 'i');
                    const needsDefault = defaultValue ?
                        !optionValues.find(value => value.path === `${path}.${defaultValue}`)
                        &&
                        optionValues.find(value => value.path.match(valuePathRegex))
                        :
                        optionValues.find(value => value.path.match(valuePathRegex));

                    if (needsDefault) dispatch(UPDATE_ITEM,
                        {
                            ...option,
                            update: {
                                [defaultValueKey]: getNameFromPath(optionValues.find(value => value.path.match(valuePathRegex)).path)
                            }
                        });
                })
            })
    }, [systemInput])

    const save = async () => {
        console.log(systemInput);
    }

    console.log({
        props: arguments[0],
        state: systemInput,
        system,
    });

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
            />
            <Sidebar
                queryResult={queryResult}
                system={system}
                systemMap={systemMap}
                dispatch={dispatch}
                selectItem={selectItem}
                selectedItem={selectedItem}
            />
        </TransformProvider>
    );
}

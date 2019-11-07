import { useState, useEffect } from 'react';
import {
    SystemMap,
    getChildren,
    getLastItemFromPath,
} from '../../../../../../app-logic/system-utils';
import { parseSearch } from '../../../../../../utils';
import { UPDATE_ITEM } from "./actions";

export const usePartialAction = ({ selectItem }) => {
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

    return {
        partialAction,
        dispatchPartial,
        cancelPartial,
    };
}

export const useSelection = ({
    history,
    systemMap,
    location: {
        search,
    },
    match: {
        path: matchPath,
    },
}) => {
    const { path, systemId } = parseSearch(search);

    const selectItem = (item = {}) => {
        const newPath = item instanceof SystemMap ?
            `${item.id}`
            :
            item.path;

        history.push(!newPath || (newPath === path) ?
            `${matchPath}${parseSearch(search).remove('path')}`
            :
            `${matchPath}${parseSearch(search).update({ path: newPath })}`);
    }

    const selectedItem = path === systemId ?
        systemMap
        :
        systemMap[path];

    return {
        selectItem,
        selectedItem,
    };
}

export const useCheckDefaultValues = ({ system, systemMap, dispatch, systemInput }) => {
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
                        const [{ path = '' } = {}] = children;
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
}
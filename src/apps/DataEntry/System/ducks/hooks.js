import { useEffect, useState } from 'react';
import { getChildren, getLastItemFromPath } from '../../../../app-logic/system-utils';
import { parseSearch } from '../../../../utils';
import { UPDATE_ITEM } from "./actions";

export const usePartialAction = ({ selectItem, dispatch }) => {
    const [partialAction, setPartialAction] = useState();

    const dispatchPartial = (ACTION, payload, completePayload) => setPartialAction({ ACTION, payload, completePayload });
    const cancelPartial = () => setPartialAction();

    const completePartial = payload2 => {
        const { ACTION, completePayload } = partialAction;
        const payload = completePayload(payload2);
        console.log({ ACTION, payload, payload2 });
        dispatch(ACTION, payload);
        cancelPartial();
    }

    const cancelOnClick = () => partialAction ?
        cancelPartial()
        :
        selectItem();

    const cancelOnEscape = ({ key }) => key === "Escape" && cancelOnClick();

    useEffect(() => {
        const addListeners = () => {
            window.addEventListener('keydown', cancelOnEscape, true);
            window.addEventListener('click', cancelOnClick);
        }

        const removeListeners = () => {
            window.removeEventListener('keydown', cancelOnEscape, true);
            window.removeEventListener('click', cancelOnClick);
        }

        setTimeout(addListeners);

        return () => {
            removeListeners();
            setTimeout(removeListeners);
        }
    }, [partialAction]);

    console.log({ partialAction });

    return {
        partialAction,
        dispatchPartial,
        cancelPartial,
        completePartial,
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
    const { path } = parseSearch(search);

    const decodedPath = decodeURI(path);

    const selectedItem = systemMap[decodedPath];

    const selectItem = ({ path: newPath } = {}) => history.push(`${
        matchPath
        }${
        !newPath || (newPath === decodedPath) ?
            parseSearch(search).remove('path')
            :
            parseSearch(search).update({ path: newPath })
        }`);

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
import React from 'react';
import ItemMovement from './ItemMovement';
import ItemDelete from './ItemDelete';
import ItemLink from './ItemLink';
import SpliceOption from './SpliceOption';

export default function BottomButtons({
    system,
    selectedItem,
    selectedItem: {
        __typename = '',
    } = {},
    name,
    match,
    location,
    partialAction,
    cancelPartial,
    dispatchPartial,
    dispatch,
    systemMap,
}) {
    return __typename.match(/^System$/i) ?
        null
        :
        (
            <>
                <SpliceOption
                    {...{
                        dispatch,
                        selectedItem,
                        systemMap,
                    }}
                />
                <ItemMovement
                    {...{
                        selectedItem,
                        name,
                        partialAction,
                        cancelPartial,
                        dispatchPartial,
                        systemMap,
                    }}
                />
                <ItemLink
                    {...{
                        selectedItem,
                        match,
                        location,
                    }}
                />
                <ItemDelete
                    {...{
                        system,
                        selectedItem,
                        name,
                        dispatch,
                        systemMap,
                    }}
                />
            </>
        )
};
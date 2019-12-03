import React from 'react';
import ItemMovement from './ItemMovement';
import ItemDelete from './ItemDelete';
import ItemLink from './ItemLink';

const BottomButtons = ({
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
}) => __typename.match(/^System$/i) ?
        null
        :
        (
            <>
                <ItemMovement
                    {...{
                        selectedItem,
                        name,
                        partialAction,
                        cancelPartial,
                        dispatchPartial,
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
        );
export default BottomButtons;
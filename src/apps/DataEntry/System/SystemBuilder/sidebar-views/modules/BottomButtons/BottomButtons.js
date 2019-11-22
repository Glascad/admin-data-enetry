import React from 'react';
import ItemMovement from './ItemMovement';
import ItemDelete from './ItemDelete';
import ItemLink from './ItemLink';

const BottomButtons = ({
    system,
    item,
    item: {
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
                        item,
                        name,
                        partialAction,
                        cancelPartial,
                        dispatchPartial,
                    }}
                />
                <ItemLink
                    {...{
                        item,
                        match,
                        location,
                    }}
                />
                <ItemDelete
                    {...{
                        system,
                        item,
                        name,
                        dispatch,
                        systemMap,
                    }}
                />
            </>
        );
export default BottomButtons;
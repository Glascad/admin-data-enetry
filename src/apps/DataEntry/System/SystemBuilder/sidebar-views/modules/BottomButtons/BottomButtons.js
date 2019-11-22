import React from 'react';
import ItemMovement from './ItemMovement';
import ItemDelete from './ItemDelete';
import ItemLink from './ItemLink';

const BottomButtons = ({
    item,
    item: {
        __typename = '',
    } = {},
    parentOptionIsGrouped = false,
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
                        item,
                        parentOptionIsGrouped,
                        name,
                        dispatch,
                        systemMap,
                    }}
                />
            </>
        );
export default BottomButtons;
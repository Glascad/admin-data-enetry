import React from 'react';
import ItemMovement from './ItemMovement';
import ItemDelete from './ItemDelete';
import ItemLink from './ItemLink';
import SpliceOption from './SpliceOption';

export default function BottomButtons({
    queryResult,
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
    return (
        <>
            <SpliceOption
                {...{
                    queryResult,
                    dispatch,
                    selectedItem,
                    systemMap,
                }}
            />
            {__typename.match(/^System$/i) ?
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
            }
        </>
    )
};
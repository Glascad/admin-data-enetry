import React from 'react';
import { getLastItemFromPath, getAllInstancesOfItem, getChildren } from '../../../../../../../app-logic/system-utils';
import { DELETE_ITEM } from '../../ducks/actions';
import { confirmWithModal } from '../../../../../../../components';

export const ItemDelete = ({
    item,
    item: {
        path,
        __typename
    },
    parentOptionIsGrouped = false,
    name,
    dispatch,
    systemMap,
}) => {
    const itemName = getLastItemFromPath(path);
    const children = getChildren(item, systemMap);

    return !path.match(/^\d+\.\w+$/) ? (
        <button
            className="sidebar-button danger"
            data-cy={`edit-${name}-delete-button`}
            onClick={() => {
                const deleteItem = () => dispatch(DELETE_ITEM, {
                    path: path,
                    __typename,
                })
                const deleteValuesFromGroupedOptions = () => {
                    getAllInstancesOfItem({ path, __typename }, systemMap)
                        .forEach((instance, i) => {
                            const item = systemMap[instance];
                            dispatch(DELETE_ITEM, {
                                path: item.path,
                                __typename: item.__typename,
                            }, {
                                replaceState: i !== 0,
                            })
                        })
                };
                parentOptionIsGrouped ?
                    confirmWithModal(deleteValuesFromGroupedOptions, {
                        titleBar: { title: `Delete Grouped Option Value` },
                        children: `Deleting a value attached to a grouped option will impact other values`,
                        finishButtonText: 'Delete',
                        danger: true,
                    })
                    :
                    children.length > 0 ?
                        confirmWithModal(deleteItem, {
                            titleBar: { title: `Delete ${itemName}?` },
                            children: `Deleting ${itemName.toLowerCase()} will delete all the items below it. Do you want to continue?`,
                            finishButtonText: 'Delete',
                            danger: true,
                        })
                        :
                        deleteItem();
            }}
        >
            {`Delete ${name}`}
        </button >
    ) : null;
}
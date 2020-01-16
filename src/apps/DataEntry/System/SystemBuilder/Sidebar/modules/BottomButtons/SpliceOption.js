import React from 'react';
import { getLastItemFromPath, getAllInstancesOfItem, getChildren } from '../../../../../../../app-logic/system';
import { DELETE_ITEM, SPLICE_OPTION } from '../../../../ducks/actions';
import { getOptionIsGrouped } from '../../../../ducks/utils';
import { confirmWithModal } from '../../../../../../../components';

export default function SpliceOption({
    selectedItem,
    selectedItem: {
        __typename
    },
    systemMap,
    dispatch,
}) {

    const children = getChildren(selectedItem, systemMap);
    const filterOptionsAboveAndBelow = () => true;

    // Can Splice if:
    //      Is NOT an End Node (It has children)
    //      Does have Options to choose from (looking above and below)
    //      Is NOT another Option
    const canSpliceOption = (
        children.length > 0
        &&
        filterOptionsAboveAndBelow()
        &&
        !__typename.match(/Option$/i)
    );

    return canSpliceOption ?
        (
            <button
                className="sidebar-button light"
                onClick={() => dispatch(SPLICE_OPTION, { selectedItem, systemMap })}
            >
                Spice Option Below
            </button>
        )
        :
        null;
}

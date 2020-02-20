import React from 'react';
import { ADD_OPTION_GROUP, DELETE_OPTION_GROUP } from '../../../../ducks/actions';
import { canItemBeGrouped } from '../../../../../../../app-logic/system';
import { Input } from '../../../../../../../components';
import { getOptionIsGrouped } from '../../../../ducks/utils';

const OptionToggles = ({
    system,
    selectedItem,
    selectedItem: {
        path,
    },
    itemName,
    dispatch,
    systemMap,
}) => {
    const optionIsSpliced = itemName === 'SELECT_OPTION';
    const optionIsGrouped = getOptionIsGrouped(system, selectedItem);
    return optionIsSpliced ? null : path.match(/__DT__/) && canItemBeGrouped(selectedItem, systemMap) ? (
        <Input
            data-cy="group-option"
            type="switch"
            label="Grouped"
            checked={optionIsGrouped}
            onChange={() => dispatch(optionIsGrouped ? DELETE_OPTION_GROUP : ADD_OPTION_GROUP, selectedItem)}
        />
    ) : null;
}

export default OptionToggles;
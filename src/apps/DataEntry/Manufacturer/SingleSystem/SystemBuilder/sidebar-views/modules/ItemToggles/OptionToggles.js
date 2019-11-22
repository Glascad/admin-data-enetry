import React from 'react';
import { ADD_OPTION_GROUP, DELETE_OPTION_GROUP } from '../../../../ducks/actions';
import { canItemBeGrouped } from '../../../../../../../../app-logic/system-utils';
import { Input } from '../../../../../../../../components';
import { getOptionIsGrouped } from '../../../../ducks/utils';

const OptionToggles = ({
    system,
    item,
    item: {
        path,
    },
    dispatch,
    systemMap,
}) => {
    const optionIsGrouped = getOptionIsGrouped(system, item);
    return path.match(/__DT__/) && canItemBeGrouped(item, systemMap) ? (
        <Input
            data-cy="group-option"
            type="switch"
            label="Grouped"
            checked={optionIsGrouped}
            onChange={() => dispatch(optionIsGrouped ? DELETE_OPTION_GROUP : ADD_OPTION_GROUP, item)}
        />
    ) : null;
}

export default OptionToggles;
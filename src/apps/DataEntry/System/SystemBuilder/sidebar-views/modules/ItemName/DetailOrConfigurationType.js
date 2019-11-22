import React from 'react';
import { UPDATE_ITEM } from '../../../../ducks/actions';
import { confirmWithModal, Select } from '../../../../../../../components';
import { getSiblings, getLastItemFromPath } from '../../../../../../../app-logic/system-utils';

export default function DetailOrConfigurationType({
    item,
    item: {
        path,
        __typename = '',
    },
    name,
    itemName,
    children,
    dispatch,
    systemMap,
    queryResult: {
        detailTypes = [],
        configurationTypes = [],
    } = {},
}) {

    const siblings = getSiblings(item, systemMap);

    const selectValidTypes = __typename.match(/detail/i) ?
        detailTypes
        :
        configurationTypes

    const selectOptions = selectValidTypes
        .filter(name => !siblings.some(({ path: typePath }) =>
            name.toLowerCase() === getLastItemFromPath(typePath).toLowerCase()
        ));

    return (
        <Select
            data-cy={`edit-${name.toLowerCase()}-type`}
            readOnly={name === 'System'}
            label={name}
            value={itemName}
            options={selectOptions}
            onChange={name => {
                if (name !== itemName) {
                    const updateType = () => dispatch(UPDATE_ITEM, {
                        path,
                        __typename,
                        update: {
                            name,
                        },
                    });
                    children.length > 0 ?
                        confirmWithModal(updateType, {
                            titleBar: { title: `Change ${itemName}` },
                            children: 'Are you sure?',
                            finishButtonText: "Change",
                        })
                        :
                        updateType();
                }
            }}
        />
    );
}
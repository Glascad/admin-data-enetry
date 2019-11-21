import React from 'react';
import { UPDATE_ITEM } from '../../../../ducks/actions';
import { confirmWithModal, Select } from '../../../../../../../../components';

const DetailOrConfigurationType = ({
    selectOptions,
    item: {
        path,
        __typename,
    },
    type,
    itemName,
    children,
    dispatch,
}) => (
        <Select
            data-cy={`edit-${type.toLowerCase()}-type`}
            readOnly={type === 'System'}
            label={type}
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

export default DetailOrConfigurationType;
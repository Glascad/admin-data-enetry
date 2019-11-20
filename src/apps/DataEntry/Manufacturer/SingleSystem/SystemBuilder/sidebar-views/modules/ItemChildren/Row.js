import React from 'react';
import { Select, CircleButton, confirmWithModal } from "../../../../../../../../components";
import { DELETE_ITEM } from "../../../../ducks/actions";

const Row = ({
    item,
    item: {
        __typename: childTypename = '',
        path: childPath = '',
    },
    selectValue = '',
    handleSelectChange,
    selectChildOptions,
    grandchildren,
    dispatch,
    selectItem,
}) => (
        <div className="input-group">
            <Select
                data-cy={`edit-child-${selectValue.toLowerCase()}`}
                value={selectValue}
                options={selectChildOptions}
                onChange={handleSelectChange}
            />
            <CircleButton
                data-cy={`select-child-${selectValue.toLowerCase()}`}
                className="primary"
                actionType="arrow"
                onClick={() => selectItem(item)}
            />
            <CircleButton
                data-cy={`delete-child-${selectValue.toLowerCase()}`}
                type="small"
                className="danger"
                actionType="delete"
                onClick={() => {
                    const deleteType = () => dispatch(DELETE_ITEM, {
                        __typename: childTypename,
                        path: childPath,
                    });
                    if (grandchildren.length > 0) confirmWithModal(deleteType, {
                        titleBar: { title: `Delete ${selectValue}` },
                        children: `Deleting ${selectValue.toLowerCase()} will delete all the items below it. Do you want to continue?`,
                        danger: true,
                        finishButtonText: 'Delete',
                    });
                    else deleteType();
                }}
            />
        </div>
    );

export default Row;
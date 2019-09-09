import React, { useState } from 'react';
import { TitleBar, Input, GroupingBox, CircleButton, useInitialState } from "../../../../../../components";
import { UPDATE_OPTION, ADD_OPTION_VALUE, UPDATE_OPTION_VALUE } from '../../ducks/actions';
import { systemOptionUpdate } from '../../ducks/schemas';
import { getChildren } from '../../ducks/utils';


function EditOption({
    selectedItem: option,
    selectedItem: {
        id: oId,
        fakeId: oFId,
        name: oName,
        __typename,
    } = {},
    systemMap,
    queryStatus: {
        validOptions = [],
    } = {},
    dispatch,
}) {
    console.log(arguments[0]);
    const [newValue, setNewValue] = useState();
    const handleAddClick = () => setNewValue(systemOptionUpdate);
    const handleBlur = () => dispatch(ADD_OPTION_VALUE)
    const optionValues = getChildren(option, systemMap);

    const validOptionValues = validOptions
        .reduce((values, { name, _validOptionValues }) => (
            oName.toLowerCase() === name.toLowerCase() ?
                _validOptionValues
                :
                values
        ), []);

    const selectValidOptionValues = validOptionValues
        .filter(({ name }) => !optionValues.some(v => v.name === name))
        .map(({ name }) => ({
            value: name,
            label: name,
        }));

    console.log({ optionValues, validOptionValues })

    return (
        <>
            <TitleBar
                title='Edit Option'
            />
            {/* <div className='sidebar-group'> */}
            <Input
                label='Option Name'
                data-cy='edit-option-name'
                select={{
                    value: {
                        value: oName,
                        label: oName,
                    },
                    options: validOptions
                        .filter(({ name }) => name !== oName)
                        .map(({ name }) => ({
                            value: name,
                            label: name,
                        })),
                    onChange: ({ label }) => dispatch(UPDATE_OPTION, {
                        id: oId,
                        fakeId: oFId,
                        name: label,
                        __typename,
                    }),
                }}
            />
            {/* </div> */}
            <GroupingBox
                data-cy="edit-option-values"
                title="Option Values"
                circleButton={selectValidOptionValues.length > 0 ? {
                    "data-cy": "add-option-value",
                    actionType: "add",
                    className: "action",
                    onClick: () => dispatch(ADD_OPTION_VALUE, {
                        parentOptionId: oId,
                        parentOptionFakeId: oFId,
                        name: (validOptionValues.find(({ name }) => !optionValues.some(ov => name === ov.name)) || {}).name || 'New Value',
                        __typename: `${__typename}Value`,
                    }),
                } : undefined}
            >
                {console.log({ optionValues })}
                {optionValues.length ?
                    optionValues.map(({ name, id, fakeId }, i, { length }) => (
                        <div className="input-group">
                            <Input
                                key={id || fakeId}
                                select={{
                                    autoFocus: i === length - 1,
                                    value: {
                                        label: name,
                                        value: id,
                                    },
                                    options: selectValidOptionValues,
                                    onChange: ({ value }) => dispatch(UPDATE_OPTION_VALUE, {
                                        id,
                                        fakeId,
                                        name: value,
                                        __typename: `${__typename}Value`,
                                    }),
                                }}
                            />
                            <CircleButton
                                className="danger"
                                type="small"
                                actionType="delete"
                                onClick={() => { }}
                            />
                        </div>
                    )) : (
                        <div>
                            No Values
                        </div>
                    )}
            </GroupingBox>
        </>
    )
}

export const SystemOption = {
    title: "Edit Option",
    component: EditOption,
};

export const DetailOption = SystemOption;
export const ConfigurationOption = DetailOption;

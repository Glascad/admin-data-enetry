import React from 'react';
import { TitleBar, GroupingBox, Input, CircleButton, DeleteButton, confirmWithModal } from '../../../../../../components';
import { getChildren, filterOptionsAbove } from '../../ducks/utils';
import { ADD_OPTION, DELETE_OPTION, UPDATE_OPTION, UPDATE_TYPE, DELETE_TYPE } from '../../ducks/actions';

function EditType({
    selectedItem: selectedType,
    selectedItem: {
        __typename,
        id: tId,
        fakeId: tFId,
        detailType,
        configurationType,
    } = {},
    system,
    systemMap,
    queryResult: {
        validOptions = [],
        detailTypes = [],
        configurationTypes = [],
    } = {},
    dispatch,
}) {
    const isDetail = !!__typename.match(/Detail/i);
    const type = __typename.replace(/System/i, '');
    const {
        0: childOption,
        0: {
            id: oId,
            fakeId: oFId,
            name: oName,
            __typename: oTypename,
        } = {},
    } = getChildren(selectedType, systemMap);

    const childValues = getChildren(childOption, systemMap); //Types' Child's children
    return (
        <>
            <TitleBar
                title={`Edit ${type}`}
            />
            <Input
                data-cy={`edit-${type.toLowerCase()}-type`}
                // className={childOption ? 'warning' : ''}
                label={type}
                select={{
                    value: {
                        value: detailType || configurationType,
                        label: detailType || configurationType,
                    },
                    options: (isDetail ?
                        detailTypes
                        :
                        configurationTypes
                    )
                        .filter(type => isDetail ?
                            type !== detailType
                            :
                            type !== configurationType
                        )
                        .map(type => ({
                            value: type,
                            label: type,
                        })),
                    onChange: ({ value }) => childOption ?
                        confirmWithModal(() => dispatch(UPDATE_TYPE, {
                            id: tId,
                            fakeId: tFId,
                            __typename,
                            type: value
                        }), {
                            titleBar: { title: `Change ${oName}` },
                            children: 'Are you sure?',
                            finishButtonText: "Change"
                        })
                        :
                        dispatch(UPDATE_TYPE, {
                            id: tId,
                            fakeId: tFId,
                            __typename,
                            type: value
                        })
                }}
            />
            <GroupingBox
                title="Option"
                circleButton={childOption ? undefined : {
                    "data-cy": "add-option",
                    actionType: "add",
                    className: "action",
                    onClick: () => dispatch(ADD_OPTION, {
                        __typename: `${type}Option`,
                        parentTypeId: tId,
                        parentTypeFakeId: tFId,
                        name: "Select Option",
                    }),
                }}
            >
                {childOption ? (
                    <div className="input-group">
                        <Input
                            className={childValues.length > 0 ? 'warning' : ''}
                            select={{
                                autoFocus: true,
                                value: {
                                    value: oName,
                                    label: oName,
                                },
                                options: filterOptionsAbove(selectedType, system, validOptions)
                                    .map(({ name }) => ({
                                        value: name,
                                        label: name,
                                    })),
                                onChange: ({ value }) => dispatch(UPDATE_OPTION, {
                                    id: oId,
                                    fakeId: oFId,
                                    name: value,
                                    __typename: oTypename,
                                }),
                            }}
                        />
                        <CircleButton
                            data-cy="delete-option"
                            type="small"
                            actionType="delete"
                            className="danger"
                            onClick={() => {
                                return childValues.length > 0 ?
                                    confirmWithModal(() => dispatch(DELETE_OPTION, {
                                        id: oId,
                                        fakeId: oFId,
                                        __typename: oTypename,
                                    }), {
                                        titleBar: { title: `Delete ${oName}` },
                                        children: `Deleting ${oName.toLowerCase()} will delete all the items below it. Do you want to continue?`,
                                        finishButtonText: 'Delete',
                                        danger: true,
                                    })
                                    :
                                    dispatch(DELETE_OPTION, {
                                        id: oId,
                                        fakeId: oFId,
                                        __typename: oTypename,
                                    })
                            }
                            }
                        />
                    </div>
                ) : (
                        <div>
                            No Option
                        </div>
                    )}
            </GroupingBox>
            <button
                className="sidebar-button danger"
                data-cy="edit-type-delete-button"
                onClick={() => childOption ?
                    confirmWithModal(() => dispatch(DELETE_TYPE, {
                        id: tId,
                        fakeId: tFId,
                        __typename,
                    }), {
                        titleBar: { title: `Delete ${detailType || configurationType}` },
                        children: `Deleting ${(detailType || configurationType).toLowerCase()} will delete all the items below it. Do you want to continue?`,
                        finishButtonText: 'Delete',
                        danger: true,
                    })
                    :
                    dispatch(DELETE_TYPE, {
                        id: tId,
                        fakeId: tFId,
                        __typename,
                    })
                }
            >
                {`Delete ${detailType ? 'Detail' : 'Configuration'}`}
            </button>
        </>
    );
}

export const SystemDetail = {
    title: "Edit Detail",
    component: EditType,
};

export const SystemConfiguration = SystemDetail;

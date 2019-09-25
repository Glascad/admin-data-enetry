import React from 'react';
import { TitleBar, GroupingBox, Input, CircleButton, confirmWithModal } from '../../../../../../components';
import { getChildren, filterOptionsAbove } from '../../../../../../app-logic/system-utils';
import { ADD_OPTION, DELETE_OPTION, UPDATE_OPTION, UPDATE_TYPE, DELETE_TYPE } from '../../ducks/actions';
import Select from '../../../../../../components/ui/Select/Select';

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
    console.log(arguments[0]);

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
            <Select
                data-cy={`edit-${type.toLowerCase()}-type`}
                label={type}
                value={detailType || configurationType}
                options={(isDetail ?
                    detailTypes
                    :
                    configurationTypes
                )
                    .filter(type => isDetail ?
                        type !== detailType
                        :
                        type !== configurationType
                    )
                    .map(type => type)}
                onChange={name => {
                    const updateType = () => dispatch(UPDATE_TYPE, {
                        id: tId,
                        fakeId: tFId,
                        __typename,
                        type: name
                    })
                    if (childOption) confirmWithModal(updateType, {
                        titleBar: { title: `Change ${oName}` },
                        children: 'Are you sure?',
                        finishButtonText: "Change"
                    });
                    else updateType();
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
                        <Select
                            data-cy={`edit-${type.toLowerCase()}-type`}
                            className={childValues.length > 0 ? 'warning' : ''}
                            autoFocus={childValues.length === 0}
                            value={oName}
                            options={filterOptionsAbove(selectedType, system, validOptions).map(({ name }) => name)}
                            onChange={name => dispatch(UPDATE_OPTION, {
                                id: oId,
                                fakeId: oFId,
                                name,
                                __typename: oTypename,
                            })}
                        />
                        <CircleButton
                            data-cy="delete-option"
                            type="small"
                            actionType="delete"
                            className="danger"
                            onClick={() => {
                                const deleteOption = () => dispatch(DELETE_OPTION, {
                                    id: oId,
                                    fakeId: oFId,
                                    __typename: oTypename,
                                });
                                if (childValues.length > 0) confirmWithModal(deleteOption, {
                                    titleBar: { title: `Delete ${oName}` },
                                    children: `Deleting ${oName.toLowerCase()} will delete all the items below it. Do you want to continue?`,
                                    finishButtonText: 'Delete',
                                    danger: true,
                                });
                                else deleteOption();
                            }}
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
                onClick={() => {
                    const deleteType = () => dispatch(DELETE_TYPE, {
                        id: tId,
                        fakeId: tFId,
                        __typename,
                    })
                    if (childOption) confirmWithModal(deleteType, {
                        titleBar: { title: `Delete ${detailType || configurationType}` },
                        children: `Deleting ${(detailType || configurationType).toLowerCase()} will delete all the items below it. Do you want to continue?`,
                        finishButtonText: 'Delete',
                        danger: true,
                    });
                    else deleteType();
                }}
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

export const SystemConfiguration = {
    title: "Edit Configuration",
    component: EditType,
};

import React from 'react';
import { TitleBar, GroupingBox, Input, CircleButton } from '../../../../../../components';
import { getChildren } from '../../ducks/utils';
import { ADD_OPTION, DELETE_OPTION, UPDATE_OPTION, UPDATE_TYPE } from '../../ducks/actions';

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
    const type = __typename.replace(/^System(.*)Type$/, '$1');
    const {
        0: childOption,
        0: {
            id: oId,
            fakeId: oFId,
            name: oName,
            __typename: oTypename,
        } = {},
    } = getChildren(selectedType, systemMap);
    return (
        <>
            <TitleBar
                title={`Edit ${type}`}
            />
            <Input
                data-cy={`edit-${type.toLowerCase()}-type`}
                className={childOption ? 'warning' : ''}
                select={{
                    value: {
                        value: detailType || configurationType,
                        label: detailType || configurationType,
                    },
                    ...(childOption ? {
                        options: [],
                        onChange: () => { }
                    } : {
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
                            onChange: ({ value }) => dispatch(UPDATE_TYPE, {
                                id: tId,
                                fakeId: tFId,
                                __typename,
                                type: value
                            }),
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
                            select={{
                                autoFocus: true,
                                value: {
                                    value: oName,
                                    label: oName,
                                },
                                options: validOptions.map(({ name }) => ({
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
                            onClick={() => dispatch(DELETE_OPTION, {
                                id: oId,
                                fakeId: oFId,
                                __typename: oTypename,
                            })}
                        />
                    </div>
                ) : (
                        <div>
                            No Option
                        </div>
                    )}
            </GroupingBox>
        </>
    );
}

export const SystemDetailType = {
    title: "Edit Detail",
    component: EditType,
};

export const SystemConfigurationType = SystemDetailType;

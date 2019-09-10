import React from 'react';
import { TitleBar, GroupingBox, Input } from '../../../../../../components';
import { getChildren } from '../../ducks/utils';
import { ADD_OPTION } from '../../ducks/actions';

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
    dispatch,
}) {
    const isDetail = !!__typename.match(/Detail/i);
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
                title={`Edit ${__typename.replace(/^System(.*)Type$/, '$1')}`}
            />
            <Input
                data-cy={`edit-${__typename.replace(/System(.*)Type/, '$1').toLowerCase()}-type`}
                // select={{
                //     value: {
                //         // value: 
                //     }
                // }}
            />
            <GroupingBox
                title="Option"
                circleButton={childOption ? undefined : {
                    actionType: "add",
                    className: "action",
                    onClick: () => dispatch(ADD_OPTION, {
                        __typename: __typename.replace(/^System(.*)Type$/, '$1Option'),
                        parentTypeId: tId,
                        parentTypeFakeId: tFId,
                        name: "Select Option",
                    }),
                }}
            >
                {childOption ? (
                    <>
                        <Input
                            select={{
                                value: {
                                    value: oName,
                                    label: oName,
                                },
                                options: [],
                                onChange: () => { },
                            }}
                        />
                    </>
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

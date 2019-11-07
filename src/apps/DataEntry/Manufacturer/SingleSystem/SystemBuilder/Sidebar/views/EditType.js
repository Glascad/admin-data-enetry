import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TitleBar, GroupingBox, Input, CircleButton, confirmWithModal, Select } from '../../../../../../../components';
import { getChildren, filterOptionsAbove, getLastItemFromPath, getAllInstancesOfItem, getParentPath, getSiblings } from '../../../../../../../app-logic/system-utils';
import { UPDATE_ITEM, ADD_ITEM, DELETE_ITEM } from '../../ducks/actions';
import { parseSearch } from '../../../../../../../utils';

function EditType({
    location: {
        search,
    },
    match: {
        path,
    },
    selectItem,
    selectedItem: selectedType,
    selectedItem: {
        __typename,
        name: sName,
        path: tPath = '',
        optional,
    } = {},
    system,
    system: {
        _optionGroups
    },
    systemMap,
    queryResult: {
        validOptions = [],
        detailTypes = [],
        configurationTypes = [],
    } = {},
    dispatch,
    dispatchPartial,
    partialAction,
    cancelPartial,
}) {
    console.log(arguments[0]);

    const isDetail = !!__typename.match(/Detail/i);
    const type = __typename.replace(/^(System|Detail)\w+/i, '$1');

    const {
        0: childOption,
        0: {
            path: oPath = '',
            __typename: oTypename,
        } = {},
    } = getChildren(selectedType, systemMap);

    const tName = getLastItemFromPath(tPath) || sName;
    const oName = getLastItemFromPath(oPath);

    const childValues = getChildren(childOption, systemMap); // Types' Child's children
    const siblingTypes = getSiblings(selectedType, systemMap);

    const selectValidTypes = __typename.match(/detail/i) ?
        detailTypes
        :
        configurationTypes;

    const selectTypes = selectValidTypes
        .filter(name => !siblingTypes.some(({ path: typePath }) =>
            name.toLowerCase() === getLastItemFromPath(typePath).toLowerCase()
        ));
    return (
        <>
            <TitleBar
                title={`Edit ${type}`}
            />
            <Select
                data-cy={`edit-${type.toLowerCase()}-type`}
                readOnly={type === 'System'}
                label={type}
                value={tName}
                options={selectTypes}
                onChange={name => {
                    if (name !== tName) {
                        const updateType = () => dispatch(UPDATE_ITEM, {
                            path: tPath,
                            __typename,
                            update: {
                                name,
                            }
                        })
                        childOption ?
                            confirmWithModal(updateType, {
                                titleBar: { title: `Change ${oName}` },
                                children: 'Are you sure?',
                                finishButtonText: "Change"
                            })
                            :
                            updateType();
                    }
                }}
            />
            {type === 'Configuration' ? (
                <Input
                    data-cy="required-optional"
                    type="switch"
                    label="Required"
                    checked={!optional}
                    onChange={() => dispatch(UPDATE_ITEM), {
                        ...selectedType,
                        update: {
                            optional: !optional,
                        },
                    }}
                />
                // <button
                //     data-cy="edit-type-optional-button"
                //     className="sidebar-button light"
                //     onClick={() => dispatch(UPDATE_ITEM, {
                //         ...selectedType,
                //         update: {
                //             optional: !optional,
                //         },
                //     })}
                // >
                //     {optional ? 'Required' : 'Optional'}
                // </button>
            ) : null}
            <GroupingBox
                title="Option"
                circleButton={childOption ? undefined : {
                    "data-cy": "add-option",
                    actionType: "add",
                    className: "action",
                    onClick: () => dispatch(ADD_ITEM, {
                        __typename: `${type}Option`,
                        [`parent${__typename}Path`]: tPath,
                        name: 'ADD_OPTION',
                    }),
                }}
            >
                {childOption ? (
                    <div className="input-group">
                        <Select
                            data-cy={`edit-${type.toLowerCase()}-type`}
                            disabled={childValues.length > 0}
                            // autoFocus={childValues.length === 0}
                            value={oName}
                            options={filterOptionsAbove(selectedType, validOptions).map(({ name }) => name)}
                            onChange={name => {
                                const allInstances = getAllInstancesOfItem({
                                    path: `${tPath}.${name}`,
                                    __typename: oTypename,
                                }, systemMap);
                                const firstInstance = systemMap[allInstances[0]];
                                const instanceValues = firstInstance ? getChildren(firstInstance, systemMap) : [];
                                const [instanceDefaultValueKey, instanceDefaultValue] = firstInstance ?
                                    Object.entries(firstInstance).find(([key, value]) => key.match(/default/i))
                                    :
                                    [];
                                dispatch(UPDATE_ITEM, {
                                    path: oPath,
                                    __typename: oTypename,
                                    update: {
                                        name,
                                        [`default${oTypename}Value`]: instanceDefaultValue,

                                    }
                                })
                                if (_optionGroups.some(og => og.name === name)) {
                                    instanceValues.forEach(value => dispatch(ADD_ITEM, {
                                        [`parent${oTypename}Path`]: `${getParentPath({ path: oPath })}.${name}`,
                                        name: getLastItemFromPath(value.path),
                                        __typename: `${oTypename}Value`,
                                    }, {
                                        replaceState: true
                                    }))
                                }
                            }}
                        />
                        <CircleButton
                            data-cy={`select-option-${oName.toLowerCase()}`}
                            className="primary"
                            actionType="arrow"
                            onClick={() => selectItem(childOption)}
                        />
                        <CircleButton
                            data-cy="delete-option"
                            type="small"
                            actionType="delete"
                            className="danger"
                            onClick={() => {
                                const deleteOption = () => dispatch(DELETE_ITEM, {
                                    path: oPath,
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
                data-cy="edit-type-move-button"
                className="sidebar-button light"
                onClick={() => partialAction && partialAction.ACTION === "MOVE" ?
                    cancelPartial()
                    :
                    dispatchPartial('MOVE', selectedType)}
            >
                {partialAction && partialAction.ACTION === "MOVE" ? 'Cancel Move' : `Move ${isDetail ? 'Detail' : 'Configuration'}`}
            </button>
            <button
                data-cy="edit-type-copy-button"
                className="sidebar-button light"
                onClick={() => partialAction ?
                    cancelPartial()
                    :
                    dispatchPartial('COPY', selectedType)}
            >
                {partialAction ? 'Cancel Copy' : `Copy ${isDetail ? 'Detail' : 'Configuration'}`}
            </button>

            {tPath.match(/__DT__/) ? (
                <Link
                    to={`${path.replace(/build/, 'detail')}${parseSearch(search).update({ path: tPath })}`}
                    className="sidebar-button empty"
                >
                    <button>
                        Edit {tPath.match(/__CT__/) ? "Configuration" : "Detail"}
                    </button>
                </Link>
            ) : null}
            <button
                className="sidebar-button danger"
                data-cy="edit-type-delete-button"
                onClick={() => {
                    const deleteType = () => dispatch(DELETE_ITEM, {
                        path: tPath,
                        __typename,
                    })
                    if (childOption) confirmWithModal(deleteType, {
                        titleBar: { title: `Delete ${tName}` },
                        children: `Deleting ${(tName).toLowerCase()} will delete all the items below it. Do you want to continue?`,
                        finishButtonText: 'Delete',
                        danger: true,
                    });
                    else deleteType();
                }}
            >
                {`Delete ${isDetail ? 'Detail' : 'Configuration'}`}
            </button>
        </>
    );
}

const EditWithRouter = withRouter(EditType);

export const System = {
    title: 'Edit System',
    component: EditWithRouter,
}

export const SystemDetail = {
    title: "Edit Detail",
    component: EditWithRouter,
};

export const DetailConfiguration = {
    title: "Edit Configuration",
    component: EditWithRouter,
};

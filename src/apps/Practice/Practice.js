import React, { useState } from 'react';
import Statics from '../Statics/Statics';
import { TitleBar, Pill, ListWrapper, Tree, useQuery, RightSidebar, Input, GroupingBox, Toggle, ToggleBox } from '../../components';
import { match } from '../../utils';
import './Practice.scss';

function Practice({ selectedItem: { __typename = '' } }) {
    const props = arguments[0];
    const NameComponent = match(__typename)
        .regex(/Value$/, ValueName)
        .regex(/Option$/, OptionName)
        .equals('System', SystemName)
        .equals('ConfigurationPart', PartNumber)
        .otherwise(DetailOrConfigurationType);
    return <NameComponent {...props} />;
}

function OtherPractice({ selectedItem: { __typename } }) {
    const props = arguments[0];
    return (
        __typename.match(/Option$/) ?
            <OptionValueChildren {...props} />
            :
            <OptionOrOtherChildren {...props} />
    );

}

function OptionValueChildren() {
    const values = getChildren();
    const validValues = getPossibleChildren();
    
    return (
        <GroupingBox
            title="Values"
        >

        </GroupingBox>
    );
}

function OptionOrOtherChildren() {
    const otherChildName = match(__typename)
    // ... get child name based on typename (Details, Configurations, or Parts)
    const children = getChildren();
    const possibleChildren = getPossibleChildren();
    return (
        <ToggleBox
            views={[
                {
                    toggle: {
                        text: "Option",
                        "data-cy": "toggle-child-option",
                        selected: optionIsSelected,
                        className: (hasChildren && !optionIsSelected) ? 'disabled' : '',
                        onClick: () => !hasChildren && setOptionIsSelected(true),
                    },
                    render: () => hasChildren ? (
                        <div className="input-group">
                            <Row
                                item={childOption}
                                selectOptions={filterOptionsAbove(optionValue, validOptions)
                                    .map(({ name }) => name)}
                                grandchildren={childOptionChildren}
                                dispatch={dispatch}
                                selectValue={childOptionName}
                                selectItem={selectItem}
                                handleSelectChange={name => {
                                    const allInstances = getAllInstancesOfItem({
                                        path: `${path}.${name}`,
                                        __typename: childTypename,
                                    }, systemMap);
                                    const firstInstance = systemMap[allInstances[0]];
                                    const instanceValues = firstInstance ? getChildren(firstInstance, systemMap) || []
                                        :
                                        [];
                                    const [instanceDefaultValueKey, instanceDefaultValue] = firstInstance ?
                                        Object.entries(firstInstance).find(([key]) => key.match(/default/i)) || []
                                        :
                                        [];
                                    dispatch(UPDATE_ITEM, {
                                        path: childOptionPath,
                                        __typename: childTypename,
                                        update: {
                                            name,
                                            [`default${childTypename}Value`]: instanceDefaultValue,

                                        }
                                    })
                                    if (_optionGroups.some(og => og.name === name)) {
                                        instanceValues.forEach(value => dispatch(ADD_ITEM, {
                                            [`parent${childTypename}Path`]: `${getParentPath({ path: childOptionPath })}.${name}`,
                                            name: getLastItemFromPath(value.path),
                                            __typename: `${childTypename}Value`,
                                        }, {
                                            replaceState: true
                                        }))
                                    }
                                }}
                            />
                        </div>
                    ) : (
                            <div>
                                No Option
                            </div>
                        )
                },
                {
                    toggle: {
                        text: `${childTypeType.slice(0, 6)}s`,
                        "data-cy": `toggle-child-${childTypeType.toLowerCase()}`,
                        selected: !optionIsSelected,
                        className: hasChildren && optionIsSelected ? 'disabled' : '',
                        onClick: () => !hasChildren && setOptionIsSelected(false),
                    },
                    render: () => hasChildren ? (
                        <>
                            {valueChildren.map((item, i, { length }) => {
                                const { path: childTypePath = '', partNumber = '' } = item;
                                const childTypeChildren = getChildren({ path: childTypePath }, systemMap);
                                const childName = childTypePath ?
                                    getLastItemFromPath(childTypePath)
                                    :
                                    partNumber;
                                return (
                                    <Row
                                        key={i}
                                        item={item}
                                        selectOptions={selectTypes}
                                        grandchildren={childTypeChildren}
                                        dispatch={dispatch}
                                        selectValue={childName}
                                        selectItem={selectItem}
                                        handleSelectChange={name => {
                                            if (childName !== name) {
                                                const updateType = () => dispatch(UPDATE_ITEM, {
                                                    __typename: childTypeTypename,
                                                    path: childTypePath,
                                                    update: {
                                                        name,
                                                    },
                                                });
                                                if (childTypeChildren.length > 0) {
                                                    confirmWithModal(updateType, {
                                                        titleBar: { title: `Change ${childName}` },
                                                        children: 'Are you sure?',
                                                        finishButtonText: 'Change',
                                                    });
                                                } else {
                                                    updateType();
                                                }
                                            }
                                        }}
                                    />
                                );
                            })}
                        </>
                    ) : (
                            <div>
                                No {childTypeType}
                            </div>
                        )
                },
            ]}
            circleButton={optionIsSelected ?
                hasChildren ?
                    undefined
                    :
                    {
                        "data-cy": "add-option",
                        actionType: "add",
                        className: "action",
                        onClick: () => dispatch(ADD_ITEM, {
                            __typename: __typename.replace(/value/i, ''),
                            [`parent${__typename}Path`]: path,
                            name: "ADD_OPTION",
                        }),
                    }
                :
                valueChildren.length < selectValidTypes.length ? {
                    "data-cy": `add-${childTypeType.toLowerCase()}`,
                    actionType: "add",
                    className: "action",
                    onClick: () => {
                        dispatch(ADD_ITEM, {
                            __typename: childTypeTypename,
                            [`parent${__typename}Path`]: path,
                            name: getSelectTypeName(valueChildren, `ADD_${childTypeType.toUpperCase()}`),
                        })
                    },
                }
                    :
                    undefined}
        />
    );
}

export default () => <Statics routes={{ Practice }} />

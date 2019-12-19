import React, { useState } from 'react';
import { filterOptionsAbove, getAllInstancesOfItem, getChildren, getLastItemFromPath, getParentPath } from '../../../../../../../app-logic/system';
import { confirmWithModal, ToggleBox } from '../../../../../../../components';
import { match } from '../../../../../../../utils';
import { ADD_ITEM, UPDATE_ITEM } from '../../../../ducks/actions';
import { getSelectTypeName } from '../../../../ducks/utils';
import Row from './Row';

export default function ValueAndTypeChildren({
    system,
    system: {
        _optionGroups,
        _manufacturer: {
            _parts = [],
        } = {},
    } = {},
    queryResult,
    queryResult: {
        validOptions = [],
        detailTypes = [],
        configurationTypes = [],
    } = {},
    selectedItem,
    selectedItem: {
        path = '',
        __typename = '',
    } = {},
    children = [],
    children: {
        0: child,
        0: {
            path: childPath = '',
            __typename: childTypename = '',
        } = {},
    } = [],
    selectItem,
    dispatch,
    systemMap,
}) {

    const childName = getLastItemFromPath(childPath);

    const childTypeType = __typename.match(/value/i) ?
        match(__typename)
            .regex(/^System/i, 'Detail')
            .regex(/^Detail/i, 'Configuration')
            .otherwise('Part')
        :
        match(__typename)
            .regex(/System$/i, 'Detail')
            .regex(/Detail$/i, 'Configuration')
            .otherwise('Part');

    const selectValidTypes = __typename.match(/value/i) ?
        match(__typename)
            .regex(/^System/i, detailTypes)
            .regex(/^Detail/i, configurationTypes)
            .otherwise(_parts)
        :
        match(__typename)
            .regex(/System$/i, detailTypes)
            .regex(/Detail$/i, configurationTypes)
            .otherwise(_parts);

    const selectTypes = childTypeType === 'Part' ?
        selectValidTypes
        :
        selectValidTypes.filter(name => !children.some(({ path: childPath }) =>
            name.toLowerCase() === getLastItemFromPath(childPath).toLowerCase()
        ));

    const [optionSelected, setOptionIsSelected] = useState(true);

    const optionIsSelected = child ?
        !!childTypename.match(/option/i)
        :
        optionSelected;

    console.log({
        optionSelected,
        optionIsSelected,
        childTypename,
    });

    return (
        <ToggleBox
            views={[
                {
                    toggle: {
                        text: "Option",
                        "data-cy": "toggle-child-option",
                        selected: optionIsSelected,
                        className: (children.length > 0 && !optionIsSelected) ? 'disabled' : '',
                        onClick: () => children.length === 0 && setOptionIsSelected(true),
                    },
                    render: () => children.length > 0 ? (
                        <div className="input-group">
                            <Row
                                selectedItem={child}
                                selectChildOptions={filterOptionsAbove(selectedItem, validOptions)
                                    .map(({ name }) => name)}
                                grandchildren={getChildren(child, systemMap)}
                                dispatch={dispatch}
                                selectValue={childName}
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
                                        ...child,
                                        update: {
                                            name,
                                            [`default${childTypename}Value`]: instanceDefaultValue,

                                        }
                                    })
                                    if (_optionGroups.some(og => og.name === name)) {
                                        instanceValues.forEach(value => dispatch(ADD_ITEM, {
                                            [`parent${childTypename}Path`]: `${getParentPath({ path: childPath })}.${name}`,
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
                        className: children.length > 0 && optionIsSelected ? 'disabled' : '',
                        onClick: () => children.length === 0 && setOptionIsSelected(false),
                    },
                    render: () => children.length > 0 ? (
                        <>
                            {children.map((item, i, { length }) => {
                                const { path: itemPath = '' } = item;
                                const childTypeChildren = getChildren({ path: itemPath }, systemMap);
                                const childName = getLastItemFromPath(itemPath);
                                console.log({ item, childTypeChildren, childName })
                                return (
                                    <Row
                                        key={i}
                                        selectedItem={item}
                                        selectChildOptions={childTypeType === 'Part' ? selectTypes.map(({ partNumber }) => partNumber) : selectTypes}
                                        grandchildren={childTypeChildren}
                                        dispatch={dispatch}
                                        selectValue={childName}
                                        selectItem={selectItem}
                                        handleSelectChange={name => {
                                            if (childName !== name) {
                                                const updateType = () => dispatch(UPDATE_ITEM, {
                                                    ...item,
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
                                )
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
                children.length > 0 ?
                    undefined
                    :
                    {
                        "data-cy": "add-child",
                        actionType: "add",
                        className: "action",
                        onClick: () => dispatch(ADD_ITEM, {
                            __typename: `${__typename.match(/value$/i) ?
                                __typename.replace(/OptionValue/i, '')
                                :
                                __typename.replace(/^.*(system|detail|configuration)$/i, '$1')
                                }Option`,
                            [`parent${__typename}Path`]: path,
                            name: "ADD_OPTION",
                        }),
                    }
                :
                children.length < selectValidTypes.length ? {
                    "data-cy": `add-child`,
                    actionType: "add",
                    className: "action",
                    onClick: () => {
                        const payload = {
                            __typename: __typename.match(/value$/i) ?
                                console.log("IS VALUE")
                                ||
                                match(__typename)
                                    .regex(/^system/i, 'SystemDetail')
                                    .regex(/^detail/i, 'DetailConfiguration')
                                    .otherwise('ConfigurationPart')
                                :
                                console.log("IS TYPE")
                                ||
                                match(__typename)
                                    .regex(/system$/i, 'SystemDetail')
                                    .regex(/detail$/i, 'DetailConfiguration')
                                    .otherwise('ConfigurationPart'),
                            [`parent${__typename}Path`]: path,
                            name: getSelectTypeName(children, `ADD_${childTypeType.toUpperCase()}`),
                        };
                        dispatch(ADD_ITEM, __typename.match(/detail$/i) || (__typename.match(/DetailOptionValue$/i)) ?
                            {
                                ...payload,
                                optional: false,
                            }
                            :
                            payload
                        )
                    },
                }
                    :
                    undefined}
        />
    )
};

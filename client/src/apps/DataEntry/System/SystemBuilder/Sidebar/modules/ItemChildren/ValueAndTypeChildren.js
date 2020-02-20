import React, { useState } from 'react';
import { filterOptionsAbove, getAllInstancesOfItem, getChildren, getLastItemFromPath, getParentPath, getConfigurationPartIdFromPath, filterOptionsAboveAndBelow } from '../../../../../../../app-logic/system';
import { confirmWithModal, ToggleBox } from '../../../../../../../components';
import { match } from '../../../../../../../utils';
import { ADD_ITEM, UPDATE_ITEM } from '../../../../ducks/actions';
import { getSelectTypeName, getOptionIsGrouped } from '../../../../ducks/utils';
import Row from './Row';
import getPartId from '../../../../../../../app-logic/system/get-part-id';

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
        _system = {},
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

    const isSplicedOption = getLastItemFromPath(childPath) === 'SELECT_OPTION';
    const grandchildren = getChildren(child, systemMap);

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
                                disabled={!!grandchildren.length && !isSplicedOption}
                                selectedItem={child}
                                selectChildOptions={filterOptionsAboveAndBelow(selectedItem, validOptions, systemMap)
                                    .map(({ name }) => name)}
                                grandchildren={grandchildren}
                                dispatch={dispatch}
                                selectValue={childName}
                                selectItem={selectItem}
                                handleSelectChange={name => {
                                    const newOptionPath = childPath.replace(/\w+$/, name);

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
                                    
                                    const optionIsGrouped = getOptionIsGrouped(system, { ...child, path: newOptionPath });
                                    const validOptionValues = validOptions
                                        .reduce((values, { name: optionName, _validOptionValues }) => (
                                            optionName.toLowerCase() === name.toLowerCase() ?
                                                _validOptionValues
                                                :
                                                values
                                        ), []);
                                    const selectedOption = validOptionValues[0].name;

                                    
                                    dispatch(UPDATE_ITEM, {
                                        ...child,
                                        update: {
                                            name: name.replace(/-/g, '_'),
                                            [`default${childTypename}Value`]: instanceDefaultValue,

                                        }
                                    })
                                    if (isSplicedOption) {

                                        // update the default Value
                                        dispatch(UPDATE_ITEM, {
                                            ...grandchildren[0], // default EMPTY_VALUE
                                            path: `${newOptionPath}.EMPTY_VALUE`,
                                            update: {
                                                name: optionIsGrouped ? instanceDefaultValue : selectedOption,
                                            }
                                        }, {
                                            replaceState: true,
                                        });
                                    }

                                    if (optionIsGrouped) {
                                        instanceValues.forEach(value => {
                                            const valueName = getLastItemFromPath(value.path);
                                            if (!isSplicedOption || valueName !== instanceDefaultValue) dispatch(ADD_ITEM, {
                                                [`parent${childTypename}Path`]: `${getParentPath({ path: childPath })}.${name}`,
                                                name: valueName,
                                                __typename: `${childTypename}Value`,
                                            }, {
                                                replaceState: true,
                                            })
                                        });
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
                                                const updateType = () => dispatch(UPDATE_ITEM,
                                                    childTypeType === 'Part' ?
                                                        {
                                                            ...item,
                                                            update: {
                                                                name: name.replace(/-/g, '_'),
                                                                partId: getPartId(name, _system),
                                                            },
                                                        }
                                                        :
                                                        {
                                                            ...item,
                                                            update: {
                                                                name: name.replace(/-/g, '_'),
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
                                match(__typename)
                                    .regex(/^system/i, 'SystemDetail')
                                    .regex(/^detail/i, 'DetailConfiguration')
                                    .otherwise('ConfigurationPart')
                                :
                                match(__typename)
                                    .regex(/system$/i, 'SystemDetail')
                                    .regex(/detail$/i, 'DetailConfiguration')
                                    .otherwise('ConfigurationPart'),
                            [`parent${__typename}Path`]: path,
                            name: getSelectTypeName(children, `ADD_${childTypeType.toUpperCase()}`),
                        };
                        dispatch(ADD_ITEM, match(__typename)
                            .regex(/detail$|DetailOptionValue/i, {
                                ...payload,
                                optional: false,
                            })
                            .regex(/part$|ConfigurationOptionValue/i, {
                                ...payload,
                                partId: getPartId(payload.name, _system),
                            })
                            .otherwise(payload)
                        )
                    },
                }
                    :
                    undefined}
        />
    )
};

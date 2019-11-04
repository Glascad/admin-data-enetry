import React, { useContext, useEffect } from 'react';
import { Tree, TransformBox, Ellipsis } from '../../../../../../components';
import { makeRenderable, getLastItemFromPath, getChildren } from '../../../../../../app-logic/system-utils';
import { normalCase, parseSearch } from '../../../../../../utils';
import './SystemTree.scss';
import { StaticContext } from '../../../../../Statics/Statics';
import { ADD_ITEM, UPDATE_ITEM } from '../ducks/actions';
import { getIsAvailableForAction } from '../ducks/utils';
// import { ADD_OPTION } from '../../ducks/actions';

export default function SystemTree({
    search,
    system,
    systemMap,
    system: {
        _optionGroups,
        _systemOptions: {
            length,
        } = [],
    } = {},
    selectedItem,
    selectItem,
    fetching,
    dispatch,
    partialAction: {
        ACTION: PARTIAL_ACTION,
        payload: partialPayload,
    } = {},
    cancelPartial,
}) {

    console.log({
        system,
    })

    const { Viewport } = useContext(StaticContext);

    useEffect(() => {
        if (!length && !fetching) dispatch(ADD_ITEM, {
            __typename: "SystemOption",
            name: "ADD_OPTION",
        }, {
            replaceState: true,
        });
    }, [fetching]);

    const trunk = makeRenderable(system);

    return (
        <TransformBox
            id="SystemTree"
            viewportRef={Viewport}
            className={PARTIAL_ACTION ? 'with-partial-action' : ''}
            onClick={e => {
                e.stopPropagation();
                cancelPartial();
            }}
        >
            {fetching ? (
                <Ellipsis
                    text="Loading"
                />
            ) : (
                    <Tree
                        trunk={trunk}
                        renderItem={(item = {}, { parent = {} }) => {
                            const {
                                __typename = '',
                                path = '',
                                optional = '',
                            } = item;
                            const name = path ? getLastItemFromPath(path) : '';
                            const isDefault = Object.entries(parent).some(([key, value]) => value && (
                                key.match(/default.+Value/) && value === name
                            ));
                            const isAvailableToCompleteAction = PARTIAL_ACTION ?
                                getIsAvailableForAction({ partialPayload, item }, systemMap)
                                :
                                false;

                            const isGrouped = __typename.match(/option$/i)
                                &&
                                _optionGroups.some(og => og.name === name);

                            const groupedWithSelectedItem = isGrouped
                                &&
                                selectedItem
                                &&
                                getLastItemFromPath(selectedItem.path) === getLastItemFromPath(item.path);

                            return (
                                <div
                                    data-cy={`${path}`}
                                    className={`tree-item type-${
                                        __typename.replace(/^.*(option|value|type)$/i, '$1').toLowerCase()
                                        } subtype-${
                                        __typename.toLowerCase()
                                        } ${
                                        item === selectedItem ? 'selected' : ''
                                        } ${
                                        isDefault ? 'default' : ''
                                        } ${
                                        isGrouped ? 'grouped' : ''
                                        } ${
                                        groupedWithSelectedItem ? 'grouped-with-selected' : ''
                                        } ${
                                        optional ? 'optional' : ''
                                        } ${
                                        PARTIAL_ACTION && !isAvailableToCompleteAction && (item !== selectedItem) ?
                                            'disabled'
                                            :
                                            'available'
                                        }`}
                                    onClick={e => {
                                        e.stopPropagation();
                                        console.log(item);
                                        if (!PARTIAL_ACTION) selectItem(item);
                                        else if (isAvailableToCompleteAction) {
                                            if (PARTIAL_ACTION === 'MOVE') {
                                                dispatch(UPDATE_ITEM, {
                                                    ...partialPayload,
                                                    update: {
                                                        [`parent${__typename}Path`]: path
                                                    }
                                                })
                                            }
                                            cancelPartial();
                                        }
                                    }}
                                >
                                    <div className="title">{normalCase(name)}</div>
                                </div>
                            );
                        }}
                    />
                )}
        </TransformBox>
    );
}

import React, { useContext, useEffect } from 'react';
import { Tree, TransformBox, Ellipsis } from '../../../../../../components';
import { makeRenderable, getLastItemFromPath, getChildren, SystemMap } from '../../../../../../app-logic/system-utils';
import { normalCase, parseSearch } from '../../../../../../utils';
import './SystemTree.scss';
import { StaticContext } from '../../../../../Statics/Statics';
import { ADD_ITEM, UPDATE_ITEM, COPY_ITEM } from '../../ducks/actions';
import { getPotentialParent } from '../../ducks/utils';

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
    updating,
    dispatch,
    partialAction: {
        ACTION: PARTIAL_ACTION,
        payload: partialPayload,
    } = {},
    cancelPartial,
}) {

    const { Viewport } = useContext(StaticContext);

    const trunk = makeRenderable(system);

    return (
        <TransformBox
            id="SystemTree"
            viewportRef={Viewport}
            className={PARTIAL_ACTION ? 'with-partial-action' : ''}
        >
            {fetching ? (
                <Ellipsis
                    text="Loading"
                />
            ) : updating ? (
                <Ellipsis
                    text="Saving"
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

                                const {
                                    path: selectedPath = null,
                                } = selectedItem || {};

                                const isSelected = path === selectedPath;

                                const name = getLastItemFromPath(path, systemMap);

                                const isDefault = Object.entries(parent)
                                    .some(([key, value]) => value
                                        &&
                                        key.match(/default.+Value/)
                                        &&
                                        value === name
                                    );

                                // console.log({
                                //     partialPayload,
                                //     item,
                                //     systemMap
                                // })

                                const isAvailableToCompleteAction = PARTIAL_ACTION ?
                                    getPotentialParent({ partialPayload, item }, systemMap)
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
                                            isSelected ? 'selected' : ''
                                            } ${
                                            isDefault ? 'default' : ''
                                            } ${
                                            isGrouped ? 'grouped' : ''
                                            } ${
                                            groupedWithSelectedItem ? 'grouped-with-selected' : ''
                                            } ${
                                            optional ? 'optional' : ''
                                            } ${
                                            PARTIAL_ACTION && !isAvailableToCompleteAction && !isSelected ?
                                                'disabled'
                                                :
                                                'available'
                                            }`}
                                        onClick={e => {
                                            e.stopPropagation();
                                            if (!PARTIAL_ACTION) selectItem(item);
                                            else if (isAvailableToCompleteAction) {
                                                if (PARTIAL_ACTION === 'MOVE') {
                                                    dispatch(UPDATE_ITEM, {
                                                        ...partialPayload,
                                                        update: {
                                                            [`parent${__typename}Path`]: path
                                                        }
                                                    })
                                                } else if (PARTIAL_ACTION === 'COPY') {
                                                    dispatch(COPY_ITEM, {
                                                        partialPayload,
                                                        targetItem: item,
                                                        systemMap
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

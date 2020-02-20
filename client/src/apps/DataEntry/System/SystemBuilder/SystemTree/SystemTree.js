import React, { useContext } from 'react';
import { getLastItemFromPath, makeRenderable } from '../../../../../app-logic/system';
import { Ellipsis, TransformBox, Tree } from '../../../../../components';
import { normalCase } from '../../../../../utils';
import { StaticContext } from '../../../../Statics/Statics';
import { getPotentialParent } from '../../ducks/utils';
import './SystemTree.scss';

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
    completePartial,
}) {

    const { viewportRef } = useContext(StaticContext);

    const trunk = makeRenderable(system);

    return (
        <TransformBox
            id="SystemTree"
            viewportRef={viewportRef}
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

                                const isSpliced = name === 'SELECT_OPTION';
                                const isEmptyValue = name === 'EMPTY_VALUE';

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

                                return isEmptyValue ? null : (
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
                                            isSpliced ? 'spliced' : ''
                                            } ${
                                            PARTIAL_ACTION && !isAvailableToCompleteAction && !isSelected ?
                                                'disabled'
                                                :
                                                'available'
                                            }`}
                                        onClick={e => {
                                            e.stopPropagation();
                                            if (!PARTIAL_ACTION) selectItem(item);
                                            else if (isAvailableToCompleteAction) completePartial(item);
                                        }}
                                    >
                                        <div className="title">
                                            {normalCase(name)}
                                        </div>
                                    </div>
                                );
                            }}
                        />
                    )}
        </TransformBox>
    );
}

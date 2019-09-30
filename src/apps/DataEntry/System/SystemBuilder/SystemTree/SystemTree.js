import React, { useContext, useEffect } from 'react';
import { Tree, TransformBox, Ellipsis } from '../../../../../components';
import { makeRenderable } from '../../../../../app-logic/system-utils';
import { normalCase } from '../../../../../utils';
import './SystemTree.scss';
import { StaticContext } from '../../../../Statics/Statics';
import { ADD_ITEM } from '../ducks/actions';
// import { ADD_OPTION } from '../ducks/actions';

export default function SystemTree({
    system,
    system: {
        _systemOptions: {
            length,
        } = [],
    } = {},
    selectedItem,
    selectItem,
    fetching,
    dispatch,
}) {

    console.log(arguments[0]);

    const { Viewport } = useContext(StaticContext);

    useEffect(() => {
        if (!length && !fetching) dispatch(ADD_ITEM, {
            __typename: "SystemOption",
            name: "ADD_OPTION",
            parentPath: `${system.id}`
        }, {
            replaceState: true,
        });
    }, [fetching]);

    const trunk = makeRenderable(system);

    return (
        <TransformBox
            id="SystemTree"
            viewportRef={Viewport}
        >
            {fetching ? (
                <Ellipsis
                    text="Loading"
                />
            ) : (
                    <Tree
                        trunk={trunk}
                        renderItem={(item = {}, { depth, toggleOpen, parent = {} }) => {
                            const {
                                name = '',
                                detailType = '',
                                configurationType = '',
                                __typename = '',
                                id,
                                fakeId,
                            } = item;
                            const isDefault = Object.entries(parent).some(([key, value]) => value && (
                                (key.match(/default.*fake/i) && value === fakeId)
                                ||
                                (key.match(/default/i) && value === id)
                            ));
                            return (
                                <div
                                    data-cy={`${__typename}-${(name || detailType || configurationType).toLowerCase()}`}
                                    className={`tree-item type-${
                                        __typename.replace(/^.*(option|value|type)$/i, '$1').toLowerCase()
                                        } subtype-${
                                        __typename.toLowerCase()
                                        } ${
                                        item === selectedItem ? 'selected' : ''
                                        } ${
                                        isDefault ? 'default' : ''
                                        }`}
                                    onClick={e => {
                                        e.stopPropagation();
                                        selectItem(item);
                                    }}
                                >
                                    <div className="title">{normalCase(name || detailType || configurationType)}</div>
                                </div>
                            );
                        }}
                    />
                )}
        </TransformBox>
    );
}

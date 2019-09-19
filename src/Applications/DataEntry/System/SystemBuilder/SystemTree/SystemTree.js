import React, { useRef, useState, useContext, useEffect } from 'react';
import { Tree, TransformBox, Ellipsis } from '../../../../../components';
import { makeRenderable } from '../../../../../application-logic/system-utils';
import { normalCase } from '../../../../../utils';
import './SystemTree.scss';
import { StaticContext } from '../../../../Statics/Statics';
import { ADD_OPTION } from '../ducks/actions';

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

    const { Viewport } = useContext(StaticContext);

    useEffect(() => {
        if (!length && !fetching) dispatch(ADD_OPTION, {
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
                            const isDefault = Object.entries(parent).some(([key, value]) => (
                                (key.match(/default.*fake/i) && value === fakeId)
                                ||
                                (key.match(/default/i) && value === id)
                            ));
                            return (
                                <div
                                    data-cy={`${__typename}-${name || detailType || configurationType}`}
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
                    // renderItem={({ name, detailType, configurationType, __typename } = {}, { depth }) => match(__typename)
                    //     .against({
                    //         SystemOption: () => <span>{name || detailType || configurationType}</span>,
                    //         DetailOption: () => <span>{name || detailType || configurationType}</span>,
                    //         ConfigurationOption: () => <span>{name || detailType || configurationType}</span>,
                    //         SystemOptionValue: () => <span>{name || detailType || configurationType}</span>,
                    //         DetailOptionValue: () => <span>{name || detailType || configurationType}</span>,
                    //         ConfigurationOptionValue: () => <span>{name || detailType || configurationType}</span>,
                    //         SystemDetail: () => <span>{name || detailType || configurationType}</span>,
                    //         SystemConfiguration: () => <span>{name || detailType || configurationType}</span>,
                    //         undefined: () => null,
                    //     })
                    //     .otherwise(() => { throw new Error(`Unknown typename: ${__typename}`) })}
                    />
                )}
        </TransformBox>
    );
}

import React, { useRef, useState } from 'react';
import { Tree, TransformBox } from '../../../../../components';
import { makeRenderable } from '../ducks/utils';
import { match, normalCase } from '../../../../../utils';
import './SystemTree.scss';

export default function SystemTree({
    system,
    selectedItem,
    selectItem,
}) {

    const trunk = makeRenderable(system);

    return (
        <TransformBox
            id="SystemTree"
        >
            <Tree
                trunk={trunk}
                renderItem={(item = {}, { depth, toggleOpen }) => {
                    const { name = '', detailType = '', configurationType = '', __typename = '', } = item;
                    return (
                        <div
                            data-cy={`${__typename}-${name || detailType || configurationType}`}
                            className={`tree-item type-${
                                __typename.replace(/^.*(option|value|type)$/, '$1').toLowerCase()
                                } subtype-${
                                __typename.toLowerCase()
                                } ${
                                item === selectedItem ? 'selected' : ''
                                }`}
                            onClick={() => selectItem(item)}
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
            //         SystemDetailType: () => <span>{name || detailType || configurationType}</span>,
            //         SystemConfigurationType: () => <span>{name || detailType || configurationType}</span>,
            //         undefined: () => null,
            //     })
            //     .otherwise(() => { throw new Error(`Unknown typename: ${__typename}`) })}
            />
        </TransformBox>
    );
}

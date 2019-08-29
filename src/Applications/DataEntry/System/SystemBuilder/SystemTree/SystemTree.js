import React from 'react';
import { Tree } from '../../../../../components';
import { makeRenderable } from '../ducks/utils';

export default function SystemTree({
    system,
}) {
    console.log(arguments[0]);

    const trunk = makeRenderable(system);

    return (
        <div
            id="SystemTree"
        >
            <Tree
                trunk={trunk}
                renderItem={({ name, detailType, configurationType } = {}, { depth }) => (
                    <span>
                        {name || detailType || configurationType}
                    </span>
                )}
            />
        </div>
    );
}

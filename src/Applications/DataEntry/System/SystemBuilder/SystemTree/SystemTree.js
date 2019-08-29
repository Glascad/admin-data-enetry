import React from 'react';
import { Tree } from '../../../../../components';
import { makeRenderable } from '../ducks/utils';

export default function SystemTree({
    system,
}) {
    console.log(arguments[0]);

    const trunk = makeRenderable(system);

    return (
        <Tree
            trunk={trunk}
            renderItem={(_, { depth }) => (
                <span>
                    &nbsp;{`${' --'.repeat(depth)} item`}
                </span>
            )}
        />
    );
}

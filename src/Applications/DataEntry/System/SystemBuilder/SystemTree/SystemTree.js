import React from 'react';
import { Tree } from '../../../../../components';

export default function SystemTree() {
    return (
        <Tree
            trunk={{
                item: {},
                branches: [
                    {
                        item: {},
                        branches: [],
                    },
                ],
            }}
            renderItem={() => 'item'}
        />
    );
}

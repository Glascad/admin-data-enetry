import React from 'react';

import SystemInfo from './SystemInfo/SystemInfo';
import GlazingInfo from './GlazingInfo/GlazingInfo';
import ValidTypes from './ValidTypes/ValidTypes';
import SystemOptions from './SystemOptions/SystemOptions';
import InvalidCombinations from './InvalidCombinations/InvalidCombinations';

import {
    TabNavigator,
} from '../../../../components';

export default function SystemDatabase({
    batcher: {
        completeMutations,
        resetMutations,
    },
    ...apollo
}) {
    return (
        <TabNavigator
            routes={[
                {
                    name: "System Info",
                    path: `/system-info`,
                    render: () => (
                        <SystemInfo
                            {...apollo}
                        />
                    ),
                },
                {
                    name: "Glazing Info",
                    path: `/glazing-info`,
                    render: () => (
                        <GlazingInfo
                            {...apollo}
                        />
                    ),
                },
                {
                    name: "Valid Types",
                    path: `/valid-types`,
                    render: () => (
                        <ValidTypes
                            {...apollo}
                        />
                    ),
                },
                {
                    name: "System Options",
                    path: `/system-options`,
                    render: () => (
                        <SystemOptions
                            {...apollo}
                        />
                    ),
                },
                {
                    name: "Invalid Combinations",
                    path: `/invalid-combinations`,
                    render: () => (
                        <InvalidCombinations
                            {...apollo}
                        />
                    ),
                },
            ]}
        >
            <div className="bottom-buttons">
                <button
                    className="empty"
                    onClick={resetMutations}
                >
                    Reset
                    </button>
                <button
                    className="primary"
                    onClick={completeMutations}
                >
                    Save
                </button>
            </div>
        </TabNavigator>
    );
}

import React from 'react';

import SystemInfo from './SystemInfo/SystemInfo';
import GlazingInfo from './GlazingInfo/GlazingInfo';
import ValidTypes from './ValidTypes/ValidTypes';
import SystemOptions from './SystemOptions/SystemOptions';
import InvalidCombinations from './InvalidCombinations/InvalidCombinations';

import {
    TabNavigator,
} from '../../../../components';

const subroutes = [
    SystemInfo,
    GlazingInfo,
    ValidTypes,
    SystemOptions,
    InvalidCombinations,
];

SystemDatabase.navigationOptions = {
    name: "Database",
    path: "/database",
    subroutes,
};

export default function SystemDatabase({
    batcher: {
        completeMutations,
        resetMutations,
    },
    ...apollo
}) {
    return (
        <TabNavigator
            routeProps={apollo}
            routes={subroutes}
        >
            <div className="bottom-buttons">
                <button
                    className="empty"
                    onClick={resetMutations}
                >
                    Reset
                    </button>
                <button
                    className="action"
                    onClick={completeMutations}
                >
                    Save
                </button>
            </div>
        </TabNavigator>
    );
}

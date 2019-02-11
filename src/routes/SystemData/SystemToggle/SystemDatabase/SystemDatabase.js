import React, { Component } from 'react';

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

export default class SystemDatabase extends Component {

    static navigationOptions = {
        name: "Database",
        path: "/database",
        subroutes,
    };

    state = {
        systemUpdate: {
            // system fields
            id: undefined,
            manufacturerId: undefined,
            systemTypeId: undefined,
            name: undefined,
            depth: undefined,
            shimSize: undefined,
            defaultGlassSize: undefined,
            defaultGlassBite: undefined,
            defaultSightline: undefined,
            inset: undefined,
            frontInset: undefined,
            topGap: undefined,
            bottomGap: undefined,
            sideGap: undefined,
            glassGap: undefined,
            meetingStileGap: undefined,
            // lists
            systemOptions: [],
            invalidSystemConfigurationTypeIds: [],
            systemConfigurationOverrides: [],
            // deletion lists
            systemOptionIdsToDelete: [],
            invalidSystemConfigurationTypeIdsToDelete: [],
            systemConfigurationOverridesToDelete: [],
        },
    };

    save = () => { }

    reset = () => { }

    render = () => {
        const {
            props,
            // props: {
            //     batcher: {
            //         completeMutations,
            //         resetMutations,
            //     },
            // },
            save,
            reset,
        } = this;

        return (
            <TabNavigator
                routeProps={props}
                routes={subroutes}
            >
                <div className="bottom-buttons">
                    <button
                        className="empty"
                        onClick={reset}
                    >
                        Reset
                    </button>
                    <button
                        className="action"
                        onClick={save}
                    >
                        Save
                    </button>
                </div>
            </TabNavigator>
        );
    }
}

import React, { Component } from 'react';

import SystemInfo from './SystemInfo/SystemInfo';
import GlazingInfo from './GlazingInfo/GlazingInfo';
import ValidTypes from './ValidTypes/ValidTypes';
import SystemOptions from './SystemOptions/SystemOptions';
import InvalidCombinations from './InvalidCombinations/InvalidCombinations';

import {
    TabNavigator,
} from '../../../../components';

import SystemUpdate from './SystemUpdate';

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
        system: new SystemUpdate(),
    };

    handleChange = (key, value) => this.setState(({ system: { update } }) => ({
        system: update(key, value),
    }));

    handleOptionChange = (optionId, key, value) => this.setState(({ system: { updateOption } }) => ({
        system: updateOption(optionId, key, value),
    }));

    handleOptionValueChange = (optionId, valueId, key, value) => this.setState(({ system: { updateOptionValue } }) => ({
        system: updateOptionValue(optionId, valueId, key, value),
    }));

    createOption = name => this.setState(({ system: { createOption } }) => ({
        system: createOption(name),
    }));

    createOptionValue = (optionId, name) => this.setState(({ system: { createOptionValue } }) => ({
        system: createOptionValue(optionId, name),
    }));

    deleteOption = id => this.setState(({ system: { deleteOption } }) => ({
        system: deleteOption(id),
    }));

    deleteOptionValue = id => this.setState(({ system: { deleteOptionValue } }) => ({
        system: deleteOptionValue(id),
    }));

    _mergeUpdatedSystem = (systemUpdate, system) => ({
        // equivalent of mapresulttoprops
        // fix later
        ...system,
        ...systemUpdate,
    });

    save = () => this.props.mutations.updateEntireSystem(this.state)

    reset = () => { }

    render = () => {
        const {
            state: {
                system: systemUpdate,
            },
            props,
            props: {
                queryStatus: {
                    system,
                },
                mutations: {
                    updateEntireSystem,
                },
                // batcher: {
                //     completeMutations,
                //     resetMutations,
                // },
            },
            // handleChange,
            save,
            reset,
            _mergeUpdatedSystem,
        } = this;

        console.log(this);

        return (
            <TabNavigator
                routeProps={{
                    queryStatus: _mergeUpdatedSystem(systemUpdate, system),
                    mutations: {
                        updateEntireSystem
                    },
                }}
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

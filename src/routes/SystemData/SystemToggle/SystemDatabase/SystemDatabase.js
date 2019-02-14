import React, { Component } from 'react';

import SystemInfo from './SystemInfo/SystemInfo';
import GlazingInfo from './GlazingInfo/GlazingInfo';
import ValidTypes from './ValidTypes/ValidTypes';
import SystemOptions from './SystemOptions/SystemOptions';
import InvalidCombinations from './InvalidCombinations/InvalidCombinations';

import {
    TabNavigator,
} from '../../../../components';

import createNewSystemUpdate, {
    updateSystem,
    updateSystemList,
    updateSystemOption,
    updateOptionValue,
    createSystemOption,
    createOptionValue,
    deleteSystemOption,
    deleteOptionValue,
    mergeSystemUpdate,
} from './SystemUpdate';

const subroutes = [
    SystemInfo,
    // GlazingInfo,
    // ValidTypes,
    // SystemOptions,
    // InvalidCombinations,
];

export default class SystemDatabase extends Component {

    static navigationOptions = {
        name: "Database",
        path: "/database",
        subroutes,
    };

    state = {
        system: createNewSystemUpdate(),
    };

    handleChange = (key, value) => this.setState(({ system }) => ({
        system: updateSystem(system, key, value),
    }));

    handleListChange = (key, addedItems, deletedItems) => this.setState(({ system }) => ({
        system: updateSystemList(system, key, addedItems, deletedItems),
    }));

    handleOptionChange = (optionId, key, value) => this.setState(({ system }) => ({
        system: updateSystemOption(system, optionId, key, value),
    }));

    handleOptionValueChange = (optionId, valueId, key, value) => this.setState(({ system }) => ({
        system: updateOptionValue(system, optionId, valueId, key, value),
    }));

    createOption = name => this.setState(({ system }) => ({
        system: createSystemOption(system, name),
    }));

    createOptionValue = (optionId, name) => this.setState(({ system }) => ({
        system: createOptionValue(system, optionId, name),
    }));

    deleteOption = id => this.setState(({ system }) => ({
        system: deleteSystemOption(system, id),
    }));

    deleteOptionValue = id => this.setState(({ system }) => ({
        system: deleteOptionValue(system, id),
    }));

    save = () => this.props.mutations.updateEntireSystem(this.state)

    reset = () => { }

    render = () => {
        const {
            state: {
                system,
            },
            props: {
                queryStatus,
            },
            save,
            reset,
            handleChange,
            handleListChange,
            handleOptionChange,
            handleOptionValueChange,
            createOption,
            createOptionValue,
            deleteOption,
            deleteOptionValue,
        } = this;

        console.log(this);

        return (
            <TabNavigator
                routeProps={{
                    queryStatus: mergeSystemUpdate(system, queryStatus),
                    methods: {
                        handleChange,
                        handleListChange,
                        handleOptionChange,
                        handleOptionValueChange,
                        createOption,
                        createOptionValue,
                        deleteOption,
                        deleteOptionValue,
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

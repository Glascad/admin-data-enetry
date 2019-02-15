import React, { Component } from 'react';

import SystemInfo from './SystemInfo/SystemInfo';
import GlazingInfo from './GlazingInfo/GlazingInfo';
import ValidTypes from './ValidTypes/ValidTypes';
import SystemOptions from './SystemOptions/SystemOptions';
import InvalidCombinations from './InvalidCombinations/InvalidCombinations';

import {
    TabNavigator,
} from '../../../../components';

import defaultSystem from './system-manager/default-system';
import SM from './system-manager/system-manager';
import mapUpdateToProps from './system-manager/map-update-to-props';

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
        system: defaultSystem,
    };

    handleChange = (key, value) => this.setState(
        state => SM.UPDATE_SYSTEM(state, {
            key,
            value,
        }),
    );

    handleListChange = (key, addedItems, deletedItems) => this.setState(
        state => SM.UPDATE_SYSTEM_LIST(state, {
            key,
            addedItems,
            deletedItems,
        }),
    );

    handleOptionChange = (optionId, key, value) => this.setState(
        state => SM.UPDATE_SYSTEM_OPTION(state, {
            optionId,
            key,
            value,
        }),
    );

    handleOptionValueChange = (optionId, valueId, key, value) => this.setState(
        state => SM.UPDATE_OPTION_VALUE(state, {
            optionId,
            valueId,
            key,
            value,
        }),
    );

    createOption = name => this.setState(
        state => SM.CREATE_SYSTEM_OPTION(state, {
            name,
        }),
    );

    createOptionValue = (optionId, name) => this.setState(
        state => SM.CREATE_OPTION_VALUE(state, {
            optionId,
            name,
        }),
    );

    deleteOption = optionId => this.setState(
        state => SM.DELETE_SYSTEM_OPTION(state, {
            optionId,
        }),
    );

    deleteOptionValue = valueId => this.setState(
        state => SM.DELETE_OPTION_VALUE(state, {
            valueId,
        }),
    );

    save = async () => {
        await this.props.mutations.updateEntireSystem({
            system: {
                ...this.state.system,
                id: this.props.queryStatus.system.id,
            },
        });
        this.setState({ system: defaultSystem });
    }

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
                    queryStatus: mapUpdateToProps(system, queryStatus),
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

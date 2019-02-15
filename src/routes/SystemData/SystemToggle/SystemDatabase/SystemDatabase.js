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
import mergeSystemUpdate from './system-manager/merge-system-update';

const subroutes = [
    SystemInfo,
    GlazingInfo,
    ValidTypes,
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

    updateSystem = (MERGE, payload) => this.setState(state => MERGE(state, payload));

    save = async () => {
        await this.props.mutations.updateEntireSystem({
            system: {
                ...this.state.system,
                id: this.props.queryStatus.system.id,
            },
        });
        this.reset();
    }

    reset = () => this.setState({ system: defaultSystem });

    render = () => {
        const {
            state: {
                system,
            },
            props: {
                queryStatus,
                mutations,
            },
            save,
            reset,
            updateSystem,
        } = this;

        const routeProps = {
            queryStatus,
            mutations,
            system: mergeSystemUpdate(system, queryStatus),
            updateSystem,
        };

        return (
            <TabNavigator
                routeProps={routeProps}
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

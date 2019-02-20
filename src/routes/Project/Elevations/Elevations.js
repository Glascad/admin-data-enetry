import React, { Component } from 'react';

import {
    TitleBar,
    TabNavigator,
} from '../../../components';

import ElevationInfo from './ElevationInfo/ElevationInfo';
import SystemSets from './SystemSets/SystemSets';
import ElevationPreview from './ElevationPreview';

import {
    elevation as defaultElevation,
} from './elevation-manager/default-elevation';

import mergeElevation from './elevation-manager/merge-elevation';

const subroutes = [
    ElevationInfo,
    SystemSets,
];

export default class Elevations extends Component {

    static navigationOptions = {
        subroutes,
    };

    state = {
        elevation: defaultElevation,
    };

    reset = () => this.setState({ elevation: defaultElevation });

    updateElevation = (ACTION, payload) => this.setState(state => ACTION(state, payload));

    save = () => (undefined);

    render = () => {
        const {
            state: {
                elevation,
            },
            props,
            props: {
                queryStatus,
            },
            cancel,
            reset,
            save,
            updateElevation,
        } = this;

        const updatedElevation = mergeElevation(elevation, queryStatus);

        const routeProps = {
            ...props,
            updatedElevation,
            updateElevation,
        };

        return (
            <>
                <TitleBar
                    title="Elevation Info"
                />
                <TabNavigator
                    routeProps={routeProps}
                    routes={subroutes}
                >
                    <ElevationPreview
                        elevation={elevation}
                    />
                    <div className="bottom-buttons">
                        <div className="buttons-left">
                            <button
                                onClick={cancel}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={reset}
                            >
                                Reset
                            </button>
                            <button
                                onClick={save}
                            >
                                Save
                            </button>
                        </div>
                        <div className="buttons-right">
                            <button
                                className="action"
                            >
                                Build
                            </button>
                        </div>
                    </div>
                </TabNavigator>
            </>
        );
    }
}

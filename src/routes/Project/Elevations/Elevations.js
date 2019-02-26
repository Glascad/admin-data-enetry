import React, { Component } from 'react';

import {
    TitleBar,
    TabNavigator,
} from '../../../components';

import ElevationInfo from './ElevationInfo/ElevationInfo';
import SystemSets from './SystemSets/SystemSets';
import ElevationPreview from './ElevationPreview';

import mergeElevationInput from './elevation-manager/merge-elevation-input';
import calculatePlacement from './elevation-manager/calculate-placement';

const subroutes = [
    ElevationInfo,
    SystemSets,
];

export default class Elevations extends Component {

    static navigationOptions = {
        subroutes,
    };

    state = {
        elevation: {},
    };

    reset = () => this.setState({ elevation: {} });

    updateElevation = (ACTION, payload) => this.setState(state => ACTION(state, payload));

    save = () => (undefined);

    render = () => {
        const {
            state: {
                elevation: elevationInput,
            },
            props,
            props: {
                queryStatus: {
                    allElevations: [
                        rawElevation = {},
                    ] = [],
                },
            },
            cancel,
            reset,
            save,
            updateElevation,
        } = this;

        console.log(this);

        const elevation = calculatePlacement(
            mergeElevationInput({ rawElevation }, { elevationInput })
        );

        console.log({ elevation });

        return (
            <>
                <TitleBar
                    title="Elevation Info"
                />
                <TabNavigator
                    routeProps={{
                        elevation,
                        updateElevation,
                    }}
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

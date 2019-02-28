import React, { Component } from 'react';

import {
    Navigator,
} from '../../../../components';


import NewElevation from './NewElevation/NewElevation';
import EditElevation from './EditElevation/EditElevation';
import BuildElevation from './BuildElevation/BuildElevation';

import mergeElevationInput from './elevation-manager/merge-elevation-input';
import calculatePlacement from './elevation-manager/calculate-placement';
import parseSearch from '../../../../utils/parse-search';

const subroutes = {
    NewElevation,
    EditElevation,
    BuildElevation,
};

export default class Elevations extends Component {

    static navigationOptions = {
        subroutes,
    };

    state = {
        elevation: {},
    };

    reset = () => this.setState({ elevation: {} });

    updateElevation = (ACTION, payload) => this.setState(state => ACTION(state, payload));

    save = () => { };

    render = () => {
        const {
            state: {
                elevation: elevationInput,
            },
            props: {
                location: {
                    search,
                },
                queryStatus: {
                    _project: {
                        _elevations = [],
                    } = {},
                },
            },
            cancel,
            reset,
            save,
            updateElevation,
        } = this;

        const { elevationId } = parseSearch(search);

        const rawElevation = _elevations.find(({ id }) => id === +elevationId);

        const elevation = calculatePlacement(
            mergeElevationInput({ rawElevation }, { elevationInput })
        );

        return (
            <Navigator
                routeProps={{
                    elevation,
                    updateElevation,
                }}
                routes={subroutes}
            />
        );
    }
}

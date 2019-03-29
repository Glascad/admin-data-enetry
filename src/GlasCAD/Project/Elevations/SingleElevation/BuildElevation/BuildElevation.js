import React, { Component } from 'react';

import { StaticContext } from '../../../../../Statics/Statics';

import RecursiveElevation from '../utils/recursive-elevation/elevation';
import mergeElevationInput from './ducks/merge-input';

import SelectionProvider from './SelectionContext';
import TransformProvider from './TransformContext';

import Header from './Header/Header';
import InteractiveElevation from './InteractiveElevation/InteractiveElevation';
import RightSidebar from './RightSidebar/RightSidebar';

import elevationJSON from './ducks/elevation.json';
import validateElevation from './ducks/validate-elevation';
import { parseSearch } from '../../../../../utils';

const defaultElevationUpdate = {};

export default class BuildElevation extends Component {

    static contextType = StaticContext;

    state = {
        elevation: defaultElevationUpdate,
    };

    componentDidMount = () => this.context.sidebar.toggle(false);

    componentWillUnmount = () => this.context.sidebar.toggle(true);

    updateElevation = (ACTION, payload) => this.setState(state => ACTION(state, payload));

    save = async () => {
        const elevationInput = {
            elevation: {
                ...this.state.elevation,
                id: +parseSearch(this.props.location.search).elevationId,
                details: this.state.elevation.details
                    .map(({
                        _detailOptionValues,
                        nodeId,
                        __typename,
                        ...detail
                    }) => detail),
                containers: this.state.elevation.containers
                    .map(({
                        nodeId,
                        __typename,
                        ...container
                    }) => container),
            },
        };

        const result = await this.props.mutations.updateEntireElevation(elevationInput);

        this.setState({ elevation: defaultElevationUpdate });

        return result;
    }

    render = () => {
        const {
            state: {
                elevation: elevationInput,
            },
            props: {
                history,
                location: {
                    search,
                },
                match: {
                    path,
                },
                queryStatus: {
                    _elevation: rawElevation,
                    _elevation: {
                        name = ''
                    } = {},
                    _system,
                },
            },
            updateElevation,
            save,
        } = this;

        // const rawElevation = elevationJSON;

        console.log({ rawElevation });

        console.log({ elevationInput });

        const mergedElevation = mergeElevationInput(rawElevation, elevationInput);

        console.log({ mergedElevation });

        validateElevation(mergedElevation);

        console.log("SUCCESSFULLY MERGED ELEVATION INPUT");

        const recursiveElevation = new RecursiveElevation(mergedElevation, _system);

        console.log({ recursiveElevation });

        return (
            <SelectionProvider
                elevation={recursiveElevation}
            >
                <TransformProvider
                    elevation={recursiveElevation}
                >
                    <Header
                        name={name}
                        path={path}
                        search={search}
                        history={history}
                        elevation={recursiveElevation}
                        save={save}
                    />
                    <InteractiveElevation
                        elevation={recursiveElevation}
                        updateElevation={updateElevation}
                    />
                    <RightSidebar
                        elevation={recursiveElevation}
                        updateElevation={updateElevation}
                    />
                </TransformProvider>
            </SelectionProvider>
        );
    }
}

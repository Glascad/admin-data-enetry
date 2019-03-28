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

const defaultElevationUpdate = {};

export default class BuildElevation extends Component {

    static contextType = StaticContext;

    state = {
        elevation: defaultElevationUpdate,
    };

    componentDidMount = () => this.context.sidebar.toggle(false);

    componentWillUnmount = () => this.context.sidebar.toggle(true);

    updateElevation = (ACTION, payload) => this.setState(state => ACTION(state, payload));

    render = () => {
        const {
            state: {
                elevation: elevationInput,
            },
            props: {
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
                        elevation={recursiveElevation}
                        updateElevation={updateElevation}
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

import React, { Component } from 'react';

import { StaticContext } from '../../../../../Statics/Statics';

import RecursiveElevation from '../utils/recursive-elevation/elevation';
import mergeElevationInput from './ducks/merge-input';

import SelectionProvider from './SelectionContext';
import TransformProvider from './TransformContext';

import Header from './Header/Header';
import InteractiveElevation from './InteractiveElevation/InteractiveElevation';
import RightSidebar from './RightSidebar/RightSidebar';

const defaultElevationUpdate = {

};

export default class BuildElevation extends Component {

    static contextType = StaticContext;

    state = {
        elevation: defaultElevationUpdate,
    };

    componentDidMount = () => this.context.sidebar.toggle(false);

    componentWillUnmount = () => this.context.sidebar.toggle(true);

    updateElevation = (ACTION, payload) => this.setState(state => ACTION(
        this.props.queryStatus,
        state,
        payload,
    ));

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

        const recursiveElevation = new RecursiveElevation(mergeElevationInput(rawElevation, elevationInput), _system);

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

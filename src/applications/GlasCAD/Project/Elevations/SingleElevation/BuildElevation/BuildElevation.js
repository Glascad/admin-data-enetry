import React, { PureComponent } from 'react';

import { StaticContext } from '../../../../../../Statics/Statics';

import RecursiveElevation from '../utils/recursive-elevation/elevation';
import mergeElevationInput from './ducks/merge-input';

import SelectionProvider from './contexts/SelectionContext';
import TransformProvider from './contexts/TransformContext';

import Header from './Header/Header';
import validateElevation from './ducks/validate-elevation';
import InteractiveElevation from './InteractiveElevation/InteractiveElevation';
import RightSidebar from './RightSidebar/RightSidebar';

import { parseSearch } from '../../../../../../utils';

const defaultElevationInput = {
    containers: [],
    details: [],
};

export default class BuildElevation extends PureComponent {

    static contextType = StaticContext;

    state = {
        elevationInput: defaultElevationInput,
    };

    componentDidMount = () => this.context.sidebar.toggle(false);

    componentWillUnmount = () => this.context.sidebar.toggle(true);

    componentDidUpdate = ({ queryStatus: oldQueryStatus }) => {
        const {
            props: {
                queryStatus: newQueryStatus,
            },
        } = this;

        if (oldQueryStatus !== newQueryStatus) this.updateElevation(state => state);
    }

    createRecursiveElevation = ({ elevationInput } = this.state) => {
        const {
            props: {
                queryStatus: {
                    _elevation: rawElevation,
                    _system,
                } = {},
            },
        } = this;

        console.log({ rawElevation });

        console.log({ elevationInput });

        const mergedElevation = mergeElevationInput(rawElevation, elevationInput);

        console.log({ mergedElevation });

        validateElevation(mergedElevation);

        const recursiveElevation = new RecursiveElevation(mergedElevation, _system);

        console.log({ recursiveElevation });

        return {
            elevationInput,
            rawElevation,
            mergedElevation,
            recursiveElevation,
        };
    }

    updateElevation = (ACTION, payload, cb) => this.setState(state => this.createRecursiveElevation(ACTION(state, payload)), cb);

    cancel = () => this.updateElevation(() => defaultElevationInput);

    save = async () => {
        const elevationInput = {
            elevation: {
                ...this.state.elevationInput,
                id: +parseSearch(this.props.location.search).elevationId,
                details: this.state.elevationInput.details
                    .map(({
                        _detailOptionValues,
                        nodeId,
                        __typename,
                        ...detail
                    }) => detail),
                containers: this.state.elevationInput.containers
                    .map(({
                        nodeId,
                        __typename,
                        ...container
                    }) => container),
            },
        };

        const result = await this.props.mutations.updateEntireElevation(elevationInput);

        this.cancel();

        return result;
    }

    render = () => {
        const {
            state: {
                recursiveElevation,
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
                    _elevation: {
                        name = ''
                    } = {},
                },
            },
            updateElevation,
            cancel,
            save,
        } = this;

        console.log(this);

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
                        cancel={cancel}
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

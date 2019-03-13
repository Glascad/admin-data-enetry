import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { StaticContext } from '../../../../../Statics/Statics';

import {
    TitleBar,
} from '../../../../../components';

import RecursiveElevation from '../recursive-elevation/elevation';
import ElevationBuilder from './ElevationBuilder/ElevationBuilder';

export default class BuildElevation extends Component {

    static contextType = StaticContext;

    state = {
        focusedRefId: "",
    };

    componentDidMount = () => this.context.sidebar.toggle(false);

    componentWillUnmount = () => this.context.sidebar.toggle(true);

    handleFocus = ({ target: { id } }) => this.setState({ focusedRefId: id });

    render = () => {
        const {
            state,
            props: {
                location: {
                    search,
                },
                match: {
                    path,
                },
                queryStatus: {
                    _elevation,
                },
            },
            handleFocus,
        } = this;

        const elevation = new RecursiveElevation(_elevation);

        console.log(this.props);

        console.log({
            _elevation,
            elevation,
        });

        return (
            <>
                <TitleBar
                    title="Build Elevation"
                    className="blue-border"
                    left={(
                        <Link
                            to={`${
                                path.replace(/build/, 'edit')
                                }${
                                search
                                }`}
                        >
                            <button>
                                Elevation Info
                            </button>
                        </Link>
                    )}
                />
                <ElevationBuilder
                    state={state}
                    elevation={elevation}
                    methods={{
                        handleFocus,
                    }}
                />
            </>
        );
    }
}

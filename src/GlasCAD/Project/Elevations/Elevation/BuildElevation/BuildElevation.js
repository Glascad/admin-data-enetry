import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { StaticContext } from '../../../../../Statics/Statics';

import {
    TitleBar,
} from '../../../../../components';

import ElevationPreview from '../NewElevation/ElevationPreview';
import RecursiveElevation from '../recursive-elevation/recursive-elevation';

export default class BuildElevation extends Component {

    static contextType = StaticContext;

    componentDidMount = () => this.context.sidebar.toggle(false);

    componentWillUnmount = () => this.context.sidebar.toggle(true);

    render = () => {
        const {
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
                <ElevationPreview
                    elevation={elevation}
                />
            </>
        );
    }
}

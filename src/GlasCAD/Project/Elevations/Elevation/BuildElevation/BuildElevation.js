import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { StaticContext } from '../../../../../Statics/Statics';

import {
    TitleBar, GroupingBox,
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
            state: {
                focusedRefId,
            },
            props: {
                location: {
                    search,
                },
                match: {
                    path,
                },
                queryStatus: {
                    _elevation,
                    _system,
                },
            },
            handleFocus,
        } = this;

        const elevation = new RecursiveElevation(_elevation, _system);

        console.log(this.props);

        console.log({
            _elevation,
            elevation,
        });

        const selectedFrame = elevation.getItemByRefId(focusedRefId);

        const detailTypes = selectedFrame instanceof RecursiveElevation.RecursiveFrame ?
            selectedFrame.detailTypes
            :
            [];

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
                <div className="card">
                    {detailTypes.map(({
                        detailType = '',
                        configurationTypes = [],
                        detailId = '',
                    }) => (
                            <GroupingBox
                                title={detailId}
                            >
                                <div>
                                    Detail Type -- {detailType}
                                </div>
                                <div>
                                    {configurationTypes.map(({
                                        required,
                                        _configurationType: {
                                            type = '',
                                        } = {}
                                    }) => (
                                            <div>
                                                Configuration Type -- {type}
                                                {required ?
                                                    ' (Required)'
                                                    :
                                                    ''}
                                            </div>
                                        ))}
                                </div>
                            </GroupingBox>
                        ))}
                </div>
            </>
        );
    }
}

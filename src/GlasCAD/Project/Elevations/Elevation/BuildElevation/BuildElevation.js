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

        const selectedItem = elevation.getItemByRefId(focusedRefId);

        const frameDetails = selectedItem instanceof RecursiveElevation.RecursiveFrame ?
            selectedItem.detailTypes
            :
            [];

        const containerDetails = selectedItem instanceof RecursiveElevation.RecursiveContainer ?
            {
                Top: selectedItem.topDetails,
                Left: selectedItem.leftDetails,
                Right: selectedItem.rightDetails,
                Bottom: selectedItem.bottomDetails,
            }
            :
            {};

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
                {frameDetails.length ? (
                    <GroupingBox
                        title="Frame Details"
                    >
                        {frameDetails.map(({
                            detailType = '',
                            configurationTypes = [],
                            detailId = '',
                        }) => (
                                <>
                                    <div style={{
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                    }}>
                                        {detailType} {detailId}
                                    </div>
                                    <ul style={{
                                        marginTop: '0.5rem',
                                    }}>
                                        {configurationTypes.map(({
                                            required,
                                            _configurationType: {
                                                type = '',
                                            } = {}
                                        }) => (
                                                <li style={{
                                                    marginBottom: '0.25rem',
                                                }}>
                                                    {` - ${
                                                        required ? '' : '* '
                                                        }${
                                                        type
                                                        }${
                                                        required ? '' : ' *'
                                                        }`}
                                                </li>
                                            ))}
                                    </ul>
                                </>
                            ))}
                        <div
                            style={{
                                paddingTop: '1rem',
                                paddingLeft: '0.5rem',
                            }}
                        >
                            * Optional Configuration Type
                        </div>
                    </GroupingBox>
                ) : null}
                {Object.entries(containerDetails).map(([
                    location = '',
                    detailTypes = [],
                ]) => (
                        <GroupingBox
                            title={location}
                        >
                            {detailTypes.map(({
                                detailType,
                                detailId,
                            }) => (
                                    <div>
                                        {detailType} - {detailId}
                                    </div>
                                ))}
                        </GroupingBox>
                    ))}
            </>
        );
    }
}

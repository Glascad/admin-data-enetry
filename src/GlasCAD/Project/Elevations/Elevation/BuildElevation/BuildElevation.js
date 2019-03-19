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

        const details = selectedItem instanceof RecursiveElevation.RecursiveFrame ?
            [{
                detailLocation: "Frame",
                detailTypes: selectedItem.detailTypes,
            }]
            :
            selectedItem instanceof RecursiveElevation.RecursiveContainer ?
                [
                    {
                        detailLocation: "Top Detail",
                        detailTypes: selectedItem.topDetails,
                    },
                    {
                        detailLocation: "Bottom Detail",
                        detailTypes: selectedItem.bottomDetails,
                    },
                    {
                        detailLocation: "Left Detail",
                        detailTypes: selectedItem.leftDetails,
                    },
                    {
                        detailLocation: "Right Detail",
                        detailTypes: selectedItem.rightDetails,
                    },
                ]
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
                {details.map(({
                    detailLocation = '',
                    detailTypes = [],
                }) => (
                        <GroupingBox
                            title={detailLocation}
                        >
                            {detailTypes.map(({
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
                                                    <li>
                                                        - {type}
                                                        {required ?
                                                            ' (Required)'
                                                            :
                                                            ''}
                                                    </li>
                                                ))}
                                        </ul>
                                    </>
                                ))}
                        </GroupingBox>
                    ))}
            </>
        );
    }
}

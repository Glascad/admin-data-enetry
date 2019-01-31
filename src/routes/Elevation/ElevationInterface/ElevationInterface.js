import React, { Component } from 'react';

import {
    ApolloBatcher,
} from '../../../components';

import elevationData from './data-model';

const selectionTypes = [
    "container",
    "frame",
    "infill",
];

class Interface extends Component {

    state = {
        elevation: elevationData,
        selection: [],
        selectionType: "",
    };

    handleSelect = (selectionType, nodeId) => selectionTypes.includes(selectionType) ?
        this.setState({
            selectionType,
            selection: selectionType === this.state.selectionType ?
                this.state.selection.concat(nodeId)
                :
                [nodeId],
        })
        :
        new Error(`invalid selectionType: ${selectionType}`);

    render = () => {
        const {
            state: {
                elevation,
            },
        } = this;

        return this.props.children({
            elevation,
        });
    }
}

export default function ElevationInterface({ nodeId, ...props }) {
    return (
        <ApolloBatcher

        >
            {apollo => (
                <Interface
                    {...props}
                    {...apollo}
                />
            )}
        </ApolloBatcher>
    );
}

import React, { Component } from 'react';

import {
    HeadedContainer,
    Input,
} from '../../../../components';

export default class LinetypeInfo extends Component {

    state = {
        weight: this.props.lineWeight.weight || 0
    };

    componentDidUpdate = ({ lineWeight: { nodeId, weight } }) => {
        if (
            nodeId !== this.props.lineWeight.nodeId
            ||
            weight !== this.props.lineWeight.weight
        ) {
            this.setState({
                weight: this.props.lineWeight.weight
            });
        }
    }

    handleWeightChange = ({ target: { value } }) => this.setState({
        weight: value
    });

    handleBlur = () => this.props.updateItem({
        variables: {
            nodeId: this.props.lineWeight.nodeId,
            weight: this.state.weight
        }
    });

    blurOnEnter = ({ key, target }) => {
        if (key === "Enter") {
            target.blur();
        }
    }

    render = () => {
        const {
            state: {
                weight,
            },
            props: {
                lineWeight: {
                    name,
                }
            },
            handleWeightChange,
            handleBlur,
            blurOnEnter,
        } = this;

        return (
            <HeadedContainer
                title={`Line Weight - ${name || ''}`}
                nestLevel={1}
            >
                <Input
                    label="Weight (mm)"
                    type="number"
                    value={weight}
                    onChange={handleWeightChange}
                    onBlur={handleBlur}
                    onKeyDown={blurOnEnter}
                />
            </HeadedContainer>
        );
    }
}

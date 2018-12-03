import React, { Component } from 'react';
import {
    HeadedContainer,
} from '../../../../../components';

export default class Info extends Component {

    state = {
        door: false,
        vertical: false,
        presentationLevel: -1,
        overrideLevel: -1,
    };

    handleChange = key => ({ target: { value } }) => this.setState({
        [key]: value,
    });

    handleBlur = () => {
        this.props.updateConfigurationType({
            variables: {
                ...this.state,
                nodeId: this.props.configurationType.nodeId,
            }
        })
    }

    componentDidUpdate = ({ configurationType: { nodeId } }) => {
        if (nodeId !== this.props.configurationType.nodeId) {
            const {
                door = false,
                vertical = false,
                presentationLevel = -1,
                overrideLevel = -1,
            } = this.props.configurationType;

            this.setState({
                door,
                vertical,
                presentationLevel,
                overrideLevel,
            });
        }
    }

    render = () => {
        const {
            props: {
                configurationType: {
                    type,
                },
            },
            state: {
                door,
                vertical,
                presentationLevel,
                overrideLevel,
            },
            handleChange,
        } = this;

        return (
            <HeadedContainer
                title={`Configuration Type - ${type}`}
            >
                <h6>Door</h6>
                <input
                    type="checkbox"
                    value={door}
                    checked={door}
                    onChange={handleChange('door')}
                />
                <h6>Vertical</h6>
                <input
                    type="checkbox"
                    value={vertical}
                    checked={vertical}
                    onChange={handleChange('vertical')}
                />
                <h6>Presentation Level</h6>
                <input
                    type="number"
                    value={presentationLevel}
                    onChange={handleChange('presentationLevel')}
                />
                <h6>Override Level</h6>
                <input
                    type="number"
                    value={overrideLevel}
                    onChange={handleChange('overrideLevel')}
                />
            </HeadedContainer>
        );
    }
}

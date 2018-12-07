import React, { Component } from 'react';
import {
    HeadedContainer,
} from '../../../components';

export default class ConfigurationTypeInfo extends Component {

    state = {
        door: false,
        presentationLevel: 0,
        overrideLevel: 0,
    };

    handleChange = key => ({ target: { value } }) => this.setState({
        [key]: value,
    });

    handleCheckboxChange = key => ({ target: { checked } }) => this.setState({
        [key]: checked,
    });

    handleBlur = () => {
        this.props.updateConfigurationType({
            variables: {
                ...this.state,
                nodeId: this.props.configurationType.nodeId,
            }
        });
    }

    componentDidUpdate = ({ configurationType: { nodeId } }) => {
        if (nodeId !== this.props.configurationType.nodeId) {
            const {
                door = false,
                presentationLevel = 0,
                overrideLevel = 0,
            } = this.props.configurationType;

            this.setState({
                door,
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
                presentationLevel,
                overrideLevel,
            },
            handleChange,
            handleCheckboxChange,
            handleBlur,
        } = this;

        return (
            <HeadedContainer
                title={`Configuration Type - ${type}`}
            >
                <h6>Door</h6>
                <input
                    type="checkbox"
                    // value={door}
                    checked={door}
                    onChange={handleCheckboxChange('door')}
                    onBlur={handleBlur}
                />
                <h6>Presentation Level</h6>
                <input
                    type="number"
                    value={presentationLevel || 0}
                    onChange={handleChange('presentationLevel')}
                    onBlur={handleBlur}
                />
                <h6>Override Level</h6>
                <input
                    type="number"
                    value={overrideLevel || 0}
                    onChange={handleChange('overrideLevel')}
                    onBlur={handleBlur}
                />
            </HeadedContainer>
        );
    }
}

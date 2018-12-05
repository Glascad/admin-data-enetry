import React, { Component } from 'react';
import {
    HeadedContainer,
} from '../../../../../../../../components';

export default class ConfigurationTypeInfo extends Component {

    state = {
        optional: false,
        mirrorable: false,
    };

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

    componentDidUpdate = ({ systemType, detailType, configurationType }) => {
        if ((
            systemType.nodeId !== this.props.systemType.nodeId
            ||
            detailType.nodeId !== this.props.detailType.nodeId
            ||
            configurationType.nodeId !== this.props.configurationType.nodeId
        )) {
            const {
                optional = false,
                mirrorable = false,
            } = this.props.configurationType;

            this.setState({
                optional,
                mirrorable,
            });
        }
    }

    render = () => {
        const {
            props: {
                systemType,
                detailType,
                configurationType,
            },
            state: {
                optional,
                mirrorable,
            },
            handleCheckboxChange,
            handleBlur,
        } = this;

        return (
            <HeadedContainer
                title={`Configuration Type - ${systemType.type} > ${detailType.type} > ${configurationType.type}`}
            >
                <h6>Optional</h6>
                <input
                    type="checkbox"
                    checked={optional}
                    onChange={handleCheckboxChange('optional')}
                    onBlur={handleBlur}
                />
                <h6>Mirror</h6>
                <input
                    type="checkbox"
                    checked={mirrorable}
                    onChange={handleCheckboxChange('mirrorable')}
                    onBlur={handleBlur}
                />
            </HeadedContainer>
        );
    }
}

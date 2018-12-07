import React, { Component } from 'react';

import { HeadedContainer } from '../../../components';

export default class DetailTypeInfo extends Component {

    state = {
        entrance: false,
        vertical: false,
    };

    handleCheckboxChange = key => ({ target: { checked } }) => this.setState({
        [key]: checked,
    });

    handleBlur = () => {
        this.props.updateDetailType({
            variables: {
                ...this.state,
                nodeId: this.props.detailType.nodeId,
            }
        });
    }

    componentDidUpdate = ({ detailType: { nodeId } }) => {
        if (nodeId !== this.props.detailType.nodeId) {
            const {
                entrance = false,
                vertical = false,
            } = this.props.detailType;

            this.setState({
                entrance,
                vertical,
            });
        }
    }

    render = () => {
        const {
            state: {
                vertical,
                entrance,
            },
            props: {
                detailType: {
                    type,
                }
            },
            handleBlur,
            handleCheckboxChange,
        } = this;

        return (
            <HeadedContainer
                title={`Detail Types - ${type}`}
                nestLevel={1}
            >
                <h6>Vertical</h6>
                <input
                    type="checkbox"
                    checked={vertical}
                    onChange={handleCheckboxChange('vertical')}
                    onBlur={handleBlur}
                />
                <h6>Entrance</h6>
                <input
                    type="checkbox"
                    checked={entrance}
                    onChange={handleCheckboxChange('entrance')}
                    onBlur={handleBlur}
                />
            </HeadedContainer>
        );
    }
}

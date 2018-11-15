import React, { Component } from 'react';
import { HeadedContainer } from '../../../../../components';

export default class SystemDetailTypes extends Component {
    render = () => {
        const {
            props: {
                systemType: {
                    type: systemType = '',
                    systemTypeDetailTypesBySystemTypeId: detailTypes
                } = {},
                invalidConfigurationTypes,
                configurationOverrides,
            }
        } = this;
        return (
            <HeadedContainer
                id="SystemDetailTypes"
                title={`Detail Types - ${systemType}`}
            >

            </HeadedContainer>
        );
    }
}

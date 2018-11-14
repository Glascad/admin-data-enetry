import React, { Component } from 'react';
import HeadedContainer from '../../../../../components/HeadedContainer/HeadedContainer';

export default class SystemInfo extends Component {
    render = () => {
        const {
            props: {
                nodeId,
                id: systemId,
                name: systemName = '',
                manufacturer: {
                    id: mnfgId,
                    name: mnfgName = '',
                } = {},
                systemType,
                systemTags,
                infillSizes,
                infillPocketTypes,
                infillPocketSizes,
            }
        } = this;
        return (
            <HeadedContainer
                id="SystemInfo"
                title={`System - ${mnfgName} > ${systemName}`}
            >
                
            </HeadedContainer>
        );
    }
}

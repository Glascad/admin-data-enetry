import React, { Component } from 'react';

import {
    HeadedListContainer,
    Pill
} from '../../../../../../components';

export default class ConfTypes extends Component {
    render = () => {

        // const {
        //     type: selectedConfigurationTypeName = '',
        // } = systemTypeDetailTypeConfigurationTypes
        //     .find(({
        //         configurationTypeByConfigurationTypeId: {
        //             nodeId
        //         }
        //     }) => nodeId === selectedConfigurationTypeNID) || {};

        return (
            <div>
                {/* <HeadedContainer
                    title={`Configuration Type Information - ${
                        selectedSystemTypeName
                        } > ${
                        selectedDetailTypeName
                        } > ${
                        selectedConfigurationTypeName
                        }`}
                >
                    <input type="checkbox" />
                    <h6>Required</h6>
                    <input type="checkbox" />
                    <h6>Mirror {selectedConfigurationTypeName} Configuration with {selectedDetailTypeName} Detail</h6>
                </HeadedContainer> */}
            </div>
        );
    }
}
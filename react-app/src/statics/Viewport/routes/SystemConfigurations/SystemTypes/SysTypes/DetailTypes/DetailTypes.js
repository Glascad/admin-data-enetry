import React, { Component } from 'react';

import {
    HeadedListContainer,
    Pill
} from '../../../../../../../components';

import ConfTypes from './ConfTypes/Conftypes';

export default class DetailTypes extends Component {

    state = {
        selectedDetailType: {}
    };

    selectDetailType = ({ arguments: selectedDetailType }) => this.setState({
        selectedDetailType
    });

    render = () => {

        const {
            state: {
                selectedDetailType,
            },
            props: {
                systemType,
                systemType: {
                    systemDetailTypesBySystemId: detailTypes = [],
                    systemTypeDetailTypeConfigurationTypes = [],
                }
            },
            selectDetailType,
        } = this;

        console.log(systemType);

        const configurationTypes = systemTypeDetailTypeConfigurationTypes
            .filter(({
                detailTypeByDetailTypeId: {
                    nodeId
                }
            }) => nodeId === selectedDetailType.nodeId);

        return (
            <div>
                <HeadedListContainer
                    title={`Detail Types - ${systemType.type}`}
                    list={{
                        items: detailTypes,
                        renderItem: ({
                            detailTypeByDetailTypeId: detailType,
                            detailTypeByDetailTypeId: {
                                nodeId,
                                type,
                            }
                        }) => (
                                <Pill
                                    key={nodeId}
                                    tagname="li"
                                    title={type}
                                    arguments={detailType}
                                    selected={nodeId === selectedDetailType.nodeId}
                                    onSelect={selectDetailType}
                                />
                            )
                    }}
                />
                <ConfTypes
                    {...{
                        systemType,
                        detailType: selectedDetailType,
                        configurationTypes
                    }}
                />
            </div>
        );
    }
}
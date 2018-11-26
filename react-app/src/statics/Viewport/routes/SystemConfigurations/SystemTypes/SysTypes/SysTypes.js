import React, { Component } from 'react';

import {
    HeadedListContainer,
    Pill,
} from '../../../../../../components';

import DetailTypes from './DetailTypes/DetailTypes';

export default class SysTypes extends Component {

    state = {
        selectedSystemType: {},
    };

    selectSystemType = ({ arguments: selectedSystemType }) => this.setState({
        selectedSystemType
    });

    render = () => {
        const {
            state: {
                selectedSystemType,
            },
            props: {
                systemTypes
            },
            selectSystemType,
        } = this;

        return (
            <div>
                <HeadedListContainer
                    title="System Types"
                    list={{
                        items: systemTypes,
                        renderItem: ({
                            nodeId,
                            type,
                            ...systemType
                        }) => (
                                <Pill
                                    key={nodeId}
                                    arguments={{
                                        nodeId,
                                        type,
                                        ...systemType
                                    }}
                                    tagname="li"
                                    title={type}
                                    selected={nodeId === selectedSystemType.nodeId}
                                    onSelect={selectSystemType}
                                />
                            )
                    }}
                />
                <DetailTypes
                    systemType={selectedSystemType}
                />
            </div>
        );
    }
}

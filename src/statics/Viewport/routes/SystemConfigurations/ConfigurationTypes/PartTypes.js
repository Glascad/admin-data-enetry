import React, { Component } from 'react';
import propTypes from 'prop-types';

import {
    create_configuration_type,
    update_configuration_type,
    delete_configuration_type,
} from './configuration-types-query';

import {
    HeadedListContainer,
    Pill,
    AsyncModal,
} from '../../../../../components';

export default class PartTypes extends Component {

    static propTypes = {

    };

    render = () => {

        const {
            props: {
                selectedConfigurationTypeName,
                partTypes,
                selectedNID,
                selectPartType,
            }
        } = this;

        return (
            <HeadedListContainer
                title={`Part Types - ${selectedConfigurationTypeName}`}
                listItems={partTypes}
                renderListItem={({
                    partTypeByPartTypeId: {
                        nodeId,
                        type,
                    }
                }) => (
                        <Pill
                            key={nodeId}
                            nodeId={nodeId}
                            tagname="li"
                            title={type}
                            selected={nodeId === selectedNID}
                            onSelect={selectPartType}
                        />
                    )}
            />
        );
    }
}

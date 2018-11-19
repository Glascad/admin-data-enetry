import React, { Component } from 'react';
import { Query } from 'react-apollo';

import {
    query,
    create_configuration_type,
    update_configuration_type,
    delete_configuration_type,
} from './configuration-types-query';

import {
    HeadedListContainer,
    Pill,
    AsyncModal,
} from '../../../../../components';

import ConfTypes from './ConfTypes';
import PartTypes from './PartTypes';
import Overrides from './Overrides';

export default class ConfigurationTypes extends Component {

    state = {
        selectedConfigurationTypeNID: "",
        selectedPartTypeNID: "",
    }

    selectConfigurationType = ({ nodeId }) => this.setState({
        selectedConfigurationTypeNID: nodeId
    });

    selectPartType = ({ nodeId }) => this.setState({
        selectedPartTypeNID: nodeId
    });

    render = () => {
        const {
            state: {
                selectedConfigurationTypeNID,
                selectedPartTypeNID,
            },
            selectConfigurationType,
            selectPartType,
        } = this;

        return (
            <Query
                query={query}
            >
                {({
                    loading,
                    error,
                    data: {
                        allConfigurationTypes: {
                            nodes: configurationTypes = [],
                        } = {},
                    } = {},
                }) => {
                    const {
                        type: selectedConfigurationTypeName = '',
                        configurationTypePartTypesByConfigurationTypeId: {
                            nodes: partTypes = [],
                        } = {},
                        configurationNameOverridesByConfigurationTypeId: {
                            nodes: configurationTypeNameOverrides = [],
                        } = {},
                    } = configurationTypes.find(({ nodeId }) => nodeId === selectedConfigurationTypeNID)
                    ||
                    configurationTypes[0]
                        ||
                        {};

                    return (
                        <div>
                            <ConfTypes
                                configurationTypes={configurationTypes}
                                selectedNID={selectedConfigurationTypeNID}
                                selectConfigurationType={selectConfigurationType}
                            />
                            <PartTypes
                                selectedConfigurationTypeName={selectedConfigurationTypeName}
                                partTypes={partTypes}
                                selectedNID={selectedPartTypeNID}
                                selectPartType={selectPartType}
                            />
                            <Overrides
                                selectedConfigurationTypeName={selectedConfigurationTypeName}
                                overrides={configurationTypeNameOverrides}
                            />
                        </div>
                    );
                }}
            </Query>
        );
    }
}
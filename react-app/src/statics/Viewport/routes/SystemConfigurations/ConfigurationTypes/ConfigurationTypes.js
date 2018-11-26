import React, { Component } from 'react';
import { Query } from 'react-apollo';

import {
    query,
} from './configuration-types-graphql';

import ConfTypes from './ConfTypes/ConfTypes';
import PartTypes from './PartTypes/PartTypes';
import Overrides from './Overrides/Overrides';

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
                        allPartTypes: {
                            nodes: allPartTypes = [],
                        } = {},
                    } = {},
                }) => {
                    const {
                        id: selectedConfigurationTypeId,
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
                            {/* <ConfTypes
                                configurationTypes={configurationTypes}
                                selectedNID={selectedConfigurationTypeNID}
                                selectConfigurationType={selectConfigurationType}
                            /> */}
                            <PartTypes
                                selectedConfigurationTypeName={selectedConfigurationTypeName}
                                selectedConfigurationTypeId={selectedConfigurationTypeId}
                                allPartTypes={allPartTypes}
                                partTypes={partTypes}
                                selectedNID={selectedPartTypeNID}
                                selectPartType={selectPartType}
                            />
                            <Overrides
                                selectedConfigurationTypeId={selectedConfigurationTypeId}
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
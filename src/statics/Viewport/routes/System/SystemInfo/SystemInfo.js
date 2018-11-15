import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';

import SYSTEM_INFO_QUERY from './system-info-query.js';

import { HeadedContainer } from '../../../../../components';

export default class SystemInfo extends Component {

    state = {
        name: '',
        mnfgId: -1,
        systemTypeId: -1,
        systemTagIds: [],
        depth: 0.0,
        defaultSightline: 0.0,
        shimSize: 0.0,
        defaultGlassSize: 0.0,
        defaultGlassBite: 0.0,
        infillSizes: [],
        infillPocketTypes: [],
        infillPocketSizes: [],
    };

    render = () => {
        const {
            props: {
                nodeId,
                id: systemId,
                name: systemName = '',
                depth,
                defaultSightline,
                shimSize,
                defaultGlassSize,
                defaultGlassBite,
                manufacturer: {
                    id: mnfgId,
                    name: mnfgName = '',
                } = {},
                systemType: {
                    id: systemTypeId,
                    type: systemType
                } = {},
                systemTags,
                infillSizes,
                infillPocketTypes,
                infillPocketSizes,
            }
        } = this;
        return (
            <Query
                query={SYSTEM_INFO_QUERY}
            >
                {({
                    loading,
                    error,
                    data: {
                        allSystemTypes: {
                            nodes: systemTypes = []
                        } = {},
                        allSystemTags: {
                            nodes: systemTags = []
                        } = {},
                        allInfillSizes: {
                            nodes: infillSizes = []
                        } = {},
                        allInfillPocketTypes: {
                            nodes: infillPocketTypes = []
                        } = {},
                        allInfillPocketSizes: {
                            nodes: infillPocketSizes = []
                        } = {},
                    }
                }) => (
                        <HeadedContainer
                            id="SystemInfo"
                            title={`System - ${mnfgName} > ${systemName}`}
                        >
                            {console.log({
                                systemTypes,
                                systemTags,
                                infillSizes,
                                infillPocketTypes,
                                infillPocketSizes
                            })}
                            <h6>Name</h6>
                            <Creatable
                                inputValue={systemName}
                            />
                            <h6>System Type</h6>
                            <Select
                                options={systemTypes.map(({ id, type }) => ({ value: id, label: type }))}
                                inputValue={systemType}
                            />
                            <h6>System Tags</h6>
                            <Select
                                options={systemTags.map(({ id, type }) => ({ value: id, label: type }))}
                                isMulti={true}
                            />
                        </HeadedContainer>
                    )}
            </Query>
        );
    }
}

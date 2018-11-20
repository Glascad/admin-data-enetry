import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';

import SYSTEM_INFO_QUERY from './system-info-query.js';

import {
    HeadedContainer,
    ListContainer,
    Pill,
} from '../../../../../components';


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
                depth: systemDepth,
                defaultSightline: systemDefaultSightline,
                shimSize: systemShimSize,
                defaultGlassSize: systemDefaultGlassSize,
                defaultGlassBite: systemDefaultGlassBite,
                manufacturer: {
                    id: mnfgId,
                    name: mnfgName = '',
                } = {},
                systemType: {
                    id: systemTypeId,
                    type: systemTypeName = '',
                } = {},
                systemTags: {
                    nodes: systemTags = [],
                } = {},
                infillSizes: {
                    nodes: infillSizes = [],
                } = {},
                infillPocketTypes: {
                    nodes: infillPocketTypes = [],
                } = {},
                infillPocketSizes: {
                    nodes: infillPocketSizes = [],
                } = {},
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
                            nodes: allSystemTypes = []
                        } = {},
                        allSystemTags: {
                            nodes: allSystemTags = []
                        } = {},
                        allInfillSizes: {
                            nodes: allInfillSizes = []
                        } = {},
                        allInfillPocketTypes: {
                            nodes: allInfillPocketTypes = []
                        } = {},
                        allInfillPocketSizes: {
                            nodes: allInfillPocketSizes = []
                        } = {},
                    } = {}
                }) => (
                        <HeadedContainer
                            id="SystemInfo"
                            title={`System - ${mnfgName} > ${systemName}`}
                        >
                            <h6>Name</h6>
                            <input
                                value={systemName}
                            />
                            <h6>System Type</h6>
                            <Select
                                options={allSystemTypes.map(({ id, type }) => ({ value: id, label: type }))}
                                inputValue={systemTypeName}
                            />
                            <ListContainer
                                title="System Tags"
                                items={systemTags}
                                renderItem={({ nodeId, type }) => (
                                    <Pill
                                        key={nodeId}
                                        nodeId={nodeId}
                                        title={type}
                                    />
                                )}
                                onAddItem={console.log}
                            />
                            <h6>System Depth</h6>
                            <input
                                value={systemDepth}
                            />
                            <h6>System Sightline</h6>
                            <input
                                value={systemDefaultSightline}
                            />
                            <h6>Caulk Joint Size</h6>
                            <input
                                value={systemShimSize}
                            />
                            <h6>Glass Bite</h6>
                            <input
                                value={systemDefaultGlassBite}
                            />
                            <ListContainer
                                title="Infill Sizes"
                                items={infillSizes}
                                renderItem={({ nodeId, size }) => (
                                    <Pill
                                        key={nodeId}
                                        nodeId={nodeId}
                                        title={size}
                                    />
                                )}
                                onAddItem={console.log}
                            />
                            <ListContainer
                                title="Infill Pocket Types"
                                items={infillPocketTypes}
                                renderItem={({ nodeId, type }) => (
                                    <Pill
                                        key={nodeId}
                                        nodeId={nodeId}
                                        title={type}
                                    />
                                )}
                                onAddItem={console.log}
                            />
                            <ListContainer
                                title="Infill Pocket Sizes"
                                items={infillPocketSizes}
                                renderItem={({ nodeId, size }) => (
                                    <Pill
                                        key={nodeId}
                                        nodeId={nodeId}
                                        title={size}
                                    />
                                )}
                                onAddItem={console.log}
                            />
                        </HeadedContainer>
                    )}
            </Query>
        );
    }
}

import React, { Component } from 'react';

import {
    CRUDWrapper,
    HeadedContainer,
    Input,
} from '../../../components';

import * as CRUDProps from './system-info-graphql';

import SystemTags from './SystemTags';

class SystemInfo extends Component {

    state = {};

    componentDidUpdate = () => {

    }

    render = () => {
        console.log(this);
        const {
            state: {

            },
            props: {
                CRUD,
                CRUD: {
                    queryStatus: {
                        data: {
                            system,
                            system: {
                                nodeId,
                                id,
                                name = "",
                                depth = 0,
                                defaultSightline,
                                shimSize,
                                systemTypeBySystemTypeId: systemType = {},
                                systemTagsBySystemId: systemTags = [],
                            } = {},
                        } = {}
                    }
                },
            }
        } = this;

        console.log(CRUD);
        console.log({
            system,
            systemType,
            systemTags,
        });

        return (
            <HeadedContainer
                title="System Info"
            >
                <Input
                    label="Name"
                    value={name}
                    onChange={() => { }}
                />
                <Input
                    label="System Type"
                    value={systemType.type}
                    onChange={() => { }}
                />
                <SystemTags
                    systemTags={systemTags}
                />
                <div style={{ display: 'flex' }}>
                    <Input
                        label="System Depth"
                        value={depth}
                        onChange={() => { }}
                    />
                    <Input
                        label="System Sightline"
                        value={defaultSightline}
                        onChange={() => { }}
                    />
                </div>
                <Input
                    label="Caulk Joint Size"
                    value={shimSize}
                    onChange={() => { }}
                />
            </HeadedContainer>
        );
    }
}

export default ({ match: { params: { systemNID } } }) => (
    <CRUDWrapper
        {...CRUDProps}
        queryVariables={{
            systemNID
        }}
    >
        {CRUD => (
            <SystemInfo
                CRUD={CRUD}
            />
        )}
    </CRUDWrapper>
)

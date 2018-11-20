import React, { Component } from 'react';
import propTypes from 'prop-types';

import {
    create_configuration_type,
    update_configuration_type,
    delete_configuration_type,
} from './configuration-types-graphql';

import {
    HeadedListContainer,
    Pill,
    AsyncModal,
} from '../../../../../components';

export default class Overrides extends Component {

    static propTypes = {

    };

    render = () => {

        const {
            props: {
                selectedConfigurationTypeName,
                overrides,
            }
        } = this;

        return (
            <HeadedListContainer
                title={`Configuration Type Name Override - ${selectedConfigurationTypeName}`}
                listItems={overrides}
                renderListItem={({
                    nodeId,
                    nameOverride,
                    manufacturerByManufacturerId: {
                        name: mnfgName,
                    }
                }) => (
                        <Pill
                            key={nodeId}
                            tagname="li"
                            type="tile"
                            align="left"
                            title={mnfgName}
                            subtitle={nameOverride}
                            footer={selectedConfigurationTypeName}
                        />
                    )}
            />
        );
    }
}


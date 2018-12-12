import React from 'react';
import { withRouter } from 'react-router-dom';

import {
    ApolloListWrapper,
} from '../../../components';

import * as apolloProps from './select-system-graphql';

function SelectSystem({
    history,
}) {
    console.log(arguments[0]);
    return (
        <ApolloListWrapper
            apolloProps={apolloProps}
            itemClass="Select System"
            plural={false}
            extractList={({
                allSystems: {
                    nodes = [],
                } = {},
            }) => nodes}
            defaultPillProps={{
                type: "tile",
                align: "left",
                footer: "Last Updated: ...",
                selectable: false,
                onSelect: ({ arguments: { nodeId } }) => history.push(`/system/system-info/${nodeId}`)
            }}
            mapPillProps={({
                name: systemName,
                manufacturerByManufacturerId: {
                    name: mnfgName,
                } = {}
            }) => ({
                title: mnfgName,
                subtitle: systemName,
            })}
            // canCreate={true}
            addButtonProps={{
                type: "large",
                // onAdd: () => history.push('/system/system-info/new')
            }}
            mapCreateVariables={({ }, { input }) => ({
                name: input,
                depth: 0,
                
            })}
        />
    );
}

export default withRouter(SelectSystem);

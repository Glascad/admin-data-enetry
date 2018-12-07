import React from 'react';
import { withRouter } from 'react-router-dom';

import {
    CRUDListWrapper,
} from '../../../components';

import * as CRUDProps from './select-system-graphql';

function SelectSystem({
    history,
}) {
    console.log(arguments[0]);
    return (
        <CRUDListWrapper
            CRUDProps={CRUDProps}
            itemClass="Select System"
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
                onSelect: ({ arguments: { nodeId } }) => history.push(`/system/system info/${nodeId}`)
            }}
            mapPillProps={({
                name: systemName,
                manufacturerByManufacturerId: {
                    name: mnfgName,
                }
            }) => ({
                    title: mnfgName,
                    subtitle: systemName,
            })}
        />
    );
}

export default withRouter(SelectSystem);

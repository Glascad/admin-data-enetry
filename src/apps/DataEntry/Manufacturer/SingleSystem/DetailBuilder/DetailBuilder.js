import React from 'react';
import {
    useQuery, TransformProvider,
} from '../../../../../components';
import Header from './Header/Header';
import DetailDisplay from './DetailDisplay/DetailDisplay';
import Tray from './Tray/Tray';
import Sidebar from './Sidebar/Sidebar';
import query from '../system-graphql/query';
import { SystemMap } from '../../../../../app-logic/system-utils';
import { parseSearch } from '../../../../../utils';

DetailBuilder.navigationOptions = {
    requiredURLParams: ["path"],
    path: "/detail",
};

export default function DetailBuilder({
    location: {
        search,
    },
}) {
    const { systemId } = parseSearch(search);
    const [fetchQuery, queryResult, fetching] = useQuery({ query, variables: { id: +systemId || 0 } });
    const { _system } = queryResult;
    const system = new SystemMap(_system);
    // console.log(arguments[0]);
    // console.log({ queryResult, _system, system });
    return (
        <TransformProvider>
            <Header
                system={system}
            />
            <DetailDisplay
                system={system}
            />
            <Tray
                system={system}
            />
            <Sidebar
                system={system}
            />
        </TransformProvider>
    );
}

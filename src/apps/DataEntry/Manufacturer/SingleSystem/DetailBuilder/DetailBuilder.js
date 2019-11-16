import React from 'react';
import { Redirect } from 'react-router-dom';
import {
    useQuery, TransformProvider,
} from '../../../../../components';
import Header from './Header/Header';
import DetailDisplay from './DetailDisplay/DetailDisplay';
import Tray from './Tray/Tray';
import Sidebar from './Sidebar/Sidebar';
import query from '../system-graphql/query';
import { SystemMap, getDefaultPath } from '../../../../../app-logic/system-utils';
import { parseSearch } from '../../../../../utils';
import { useCollapseSidebar } from '../../../../Statics/Statics';

DetailBuilder.navigationOptions = {
    requiredURLParams: ["path"],
    path: "/detail",
};

export default function DetailBuilder({
    location: {
        search,
    },
    match: {
        path: matchPath,
    },
}) {

    console.log(arguments[0]);

    const { path, systemId } = parseSearch(search);

    const [fetchQuery, queryResult, fetching] = useQuery({ query, variables: { id: +systemId || 0 } });

    useCollapseSidebar();

    const { _system } = queryResult;

    const system = new SystemMap(_system);

    const fullPath = getDefaultPath(path, system);

    console.log({ fullPath, path, system });

    return path === fullPath ? (
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
    ) : (
            <Redirect
                to={{
                    pathname: matchPath,
                    search: `${parseSearch(search).update({ path: fullPath })}`,
                    state: {
                        previousPath: path,
                    },
                }}
            />
        );
}

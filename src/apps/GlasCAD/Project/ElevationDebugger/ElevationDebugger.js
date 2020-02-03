import React from 'react';
import gql from 'graphql-tag';
import { Navigator, useQuery } from '../../../../components';
import BugList from './BugList';
import ElevationViewer from './ElevationViewer';

const query = gql`
    {
        bugReports: getBugReports {
            id
            report
            username
            location
            timestamp
            state
        }
    }
`;

ElevationDebugger.navigationOptions = ({
    AUTH: {
        currentUser: {
            role = '',
        } = {},
    } = {},
}) => ({
    shouldRenderInNavMenu: role === 'ADMIN',
});

export default function ElevationDebugger() {

    const [fetchQuery, { bugReports = [] }] = useQuery({ query });

    return (
        <Navigator
            routeProps={{ bugReports }}
            routes={{
                BugList,
                ElevationViewer,
            }}
        />
    );
}

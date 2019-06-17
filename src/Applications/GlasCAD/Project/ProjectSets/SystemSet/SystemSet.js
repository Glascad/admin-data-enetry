import React from 'react';

import { Link } from 'react-router-dom';

import {
    TabNavigator,
    TitleBar,
    ApolloWrapper,
} from '../../../../../components';

import SystemSetInfo from './views/SystemSetInfo';
import SystemSetOptions from './views/SystemSetOptions';
import SystemSetConfigurationTypes from './views/SystemSetConfigurationTypes';

import query from './system-set-graphql/query';
import updateEntireSystemSet from './system-set-graphql/mutation';

import { parseSearch } from '../../../../../utils';

import useSystemSetReducer from './ducks/hooks';

function SystemSet({
    location: {
        search,
    },
    match: {
        path,
    },
    queryStatus,
}) {

    const {
        state: {
            filters,
            systemSetInput,
        },
        systemSet,
        dispatch,
    } = useSystemSetReducer(queryStatus);

    return (
        <>
            <TitleBar
                title="System Set"
                right={(
                    <>
                        <Link
                            to={`${path.replace(/\/system-set/, '')}${search}`}
                        >
                            <button>
                                Cancel
                            </button>
                        </Link>
                        <button>
                            Reset
                        </button>
                        <button
                            className="action"
                        >
                            Save
                        </button>
                    </>
                )}
            />
            <TabNavigator
                routes={{
                    SystemSetInfo,
                    SystemSetOptions,
                    SystemSetConfigurationTypes,
                }}
                routeProps={{
                    queryStatus,
                    filters,
                    systemSetInput,
                    systemSet,
                    dispatch,
                }}
            />
        </>
    );
}

export default function SystemSetWrapper(props) {
    const {
        location: {
            search,
        },
        queryStatus: queryStatusOne,
    } = props;

    const { projectId, systemSetId } = parseSearch(search);

    return (
        <ApolloWrapper
            query={{
                query,
                variables: {
                    projectId: +projectId || 0,
                    systemSetId: +systemSetId || 0,
                },
            }}
            mutations={{ updateEntireSystemSet }}
        >
            {({
                queryStatus: queryStatusTwo,
                mutations,
            }) => (
                    <SystemSet
                        {...props}
                        queryStatus={{
                            ...queryStatusOne,
                            ...queryStatusTwo,
                        }}
                        mutations={mutations}
                    />
                )}
        </ApolloWrapper>
    );
}

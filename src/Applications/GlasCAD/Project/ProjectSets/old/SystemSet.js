import React from 'react';

import { Link } from 'react-router-dom';

import {
    TabNavigator,
    TitleBar,
    ApolloWrapper,
    useQuery,
    useMutation,
} from '../../../../../components';

import SystemSetInfo from './views/SystemSetInfo';
import SystemSetOptions from './views/SystemSetOptions';
import SystemSetConfigurationTypes from './views/SystemSetConfigurationTypes';

import query from './system-set-graphql/query';
import updateEntireSystemSetMutation from './system-set-graphql/mutation';

import { parseSearch } from '../../../../../utils';

import useSystemSetReducer from './ducks/hooks';

export default function SystemSet({
    location: {
        search,
    },
    match: {
        path,
    },
    queryResult,
}) {

    const { projectId, systemSetId } = parseSearch(search);

    const [refetch, queryResultTwo] = useQuery({
        query,
        variables: {
            // projectId: +projectId || 0,
            id: +systemSetId || 0,
        },
    });

    // console.log({ queryResultTwo, refetch });

    // const [updateEntireSystemSet] = useMutation(updateEntireSystemSetMutation);

    const {
        state: {
            filters,
            systemSetInput,
        },
        systemSet,
        dispatch,
    } = useSystemSetReducer(queryResult);

    // const routeProps = {
    //     queryResult,
    //     filters,
    //     systemSetInput,
    //     systemSet,
    //     dispatch,
    // };

    // console.log(arguments[0]);

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
            {/* <SystemSetInfo
                {...routeProps}
            />
            <SystemSetOptions
                {...routeProps}
            />
            <SystemSetConfigurationTypes
                {...routeProps}
            /> */}
            <TabNavigator
                routeProps={{
                    queryResult: {
                        ...queryResult,
                        ...queryResultTwo,
                    },
                    filters,
                    systemSetInput,
                    systemSet,
                    dispatch,
                }}
                routes={{
                    SystemSetInfo,
                    SystemSetOptions,
                    SystemSetConfigurationTypes,
                }}
            />
        </>
    );
}

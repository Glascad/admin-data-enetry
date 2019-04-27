import React, { PureComponent } from 'react';

import { Link } from 'react-router-dom';

import { TabNavigator, TitleBar, ApolloWrapper } from '../../../../../components';

import SystemSetInfo from './views/SystemSetInfo';
import SystemSetOptions from './views/SystemSetOptions';
import SystemSetConfigurationTypes from './views/SystemSetConfigurationTypes';

import query from './system-set-graphql/query';

import { parseSearch } from '../../../../../utils';

export default class SystemSet extends PureComponent {

    state = {
        systemId: 0,
        infillSize: 0,
        systemOptions: [],
        configurationTypes: [],
    };

    render = () => {
        const {
            props: {
                location: {
                    search,
                },
                match: {
                    path,
                },
            },
        } = this;

        const { projectId, systemSetId } = parseSearch(search);

        return (
            <ApolloWrapper
                query={{
                    query,
                    variables: {
                        projectId: +projectId || 0,
                        systemSetId: +systemSetId,
                    },
                }}
                mutations={{}}
            >
                {({
                    queryStatus,
                    queryStatus: {

                    },
                    ...status,
                }) => (
                        <>
                            {console.log({ queryStatus, ...status })}
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
                                    queryStatus
                                }}
                            />
                        </>
                    )}
            </ApolloWrapper>
        );
    }
}

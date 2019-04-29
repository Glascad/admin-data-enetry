import React, { PureComponent } from 'react';

import { Link } from 'react-router-dom';

import { TabNavigator, TitleBar, ApolloWrapper } from '../../../../../components';

import SystemSetInfo from './views/SystemSetInfo';
import SystemSetOptions from './views/SystemSetOptions';
import SystemSetConfigurationTypes from './views/SystemSetConfigurationTypes';

import query from './system-set-graphql/query';

import { parseSearch } from '../../../../../utils';

class SystemSet extends PureComponent {

    state = {
        filters: {
            manufacturerId: 0,
            systemTypeId: 0,
        },
        systemSetInput: {
            systemId: 0,
            infillSize: 0,
            systemOptions: [],
            configurationTypeIds: [],
            configurationTypeIdsToUnselect: [],
        },
    };

    updateSystemSet = (ACTION, payload) => this.setState(state => ACTION(state, payload, this.props.queryStatus));

    render = () => {
        const {
            state: {
                filters,
                systemSetInput,
            },
            props: {
                location: {
                    search,
                },
                match: {
                    path,
                },
                queryStatus,
            },
            updateSystemSet,
        } = this;

        console.log(this.state);

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
                        updateSystemSet,
                    }}
                />
            </>
        );
    }
}

export default function SystemSetWrapper(props) {

    const {
        location: {
            search,
        },
        queryStatus: queryStatusOne,
    } = props;

    const { projectId, systemSetId } = parseSearch(search);

    console.log({
        projectId: +projectId || 0,
        systemSetId: +systemSetId || 0,
    });

    return (
        <ApolloWrapper
            query={{
                query,
                variables: {
                    projectId: +projectId || 0,
                    systemSetId: +systemSetId || 0,
                },
            }}
            mutations={{}}
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

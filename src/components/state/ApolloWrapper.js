import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';

import {
    removeNullValues,
    flattenNodeArrays,
    replaceByKeys,
} from '../../utils';

const normalizeResponse = ({ data }) => removeNullValues(
    flattenNodeArrays(
        replaceByKeys(
            data,
        ),
    ),
);

/**
 * PURPOSE
 * 
 * The ApolloWrapper provides a simplified interface for interacting with Apollo's `Query` and `Mutation` components. It takes props `query` and `mutations`. This way you can wrap your component in one ApolloWrapper and gain access to the results of a query and to multiple mutation functions instead of having to use a `Query` and a `Mutation` for each mutation.
 * 
 * 
 * BATCHER
 * 
 * This component is built to interface with the Batcher component. It interfaces with the Batcher component in such a way that its children don't need to know if there is or isn't a Batcher.
 * 
 * 
 * NORMALIZED RESPONSE
 * 
 * The every response provided by Apollo is automatically normalized by the ApolloWrapper. All `nodes` keys are removed, all `null` values are deleted, and the `by___id` part of every key is removed.
 * 
 * 
 * NOTE
 * 
 * This component is recursive, meaning it will continue to render itself until all the mutations have been created.
 * 
 */

export default class ApolloWrapper extends Component {

    // static propTypes = {
    //     query: PropTypes.shape({
    //         query: PropTypes.object.isRequired,
    //         variables: PropTypes.object,
    //     }),
    //     mutations: PropTypes.objectOf(PropTypes.object),
    // };

    static defaultProps = {
        mutations: {},
    };

    render = () => {
        const {
            props: {
                query,
                refetch,
                mutations,
                children,
                ...props
            },
        } = this;

        const mutationKeys = Object.keys(mutations);

        const nextMutation = mutations[mutationKeys[0]];

        // REFACTOR TO USE A `Read` COMPONENT LIKE THE ApolloWrapper TO SIMPLIFY LOGIC

        if (query) {
            return (
                <Query
                    {...query}
                >
                    {({ refetch, ...queryStatus }) => (
                        <ApolloWrapper
                            mutations={mutations}
                            refetch={refetch}
                        >
                            {accumulatedProps => {
                                // THIS IS THE FINAL CALLBACK THAT RENDERS THE ORIGINAL CHILDREN
                                return children({
                                    ...accumulatedProps,
                                    queryStatus: normalizeResponse(queryStatus),
                                });
                            }}
                        </ApolloWrapper>
                    )}
                </Query>
            )
        } else if (mutationKeys.length) {
            return (
                <Mutation
                    {...nextMutation}
                >
                    {(mutate, status) => (
                        <ApolloWrapper
                            mutations={mutationKeys
                                .slice(1)
                                .reduce((all, key) => ({
                                    ...all,
                                    [key]: mutations[key],
                                }), {})}
                            refetch={refetch}
                        >
                            {accumulatedProps => (
                                children({
                                    ...accumulatedProps,
                                    mutations: {
                                        ...accumulatedProps.mutations,
                                        [mutationKeys[0]]: async args => {
                                            // console.log(args);
                                            await mutate({
                                                variables: args,
                                            });
                                            refetch();
                                        },
                                        [`${mutationKeys[0]}Status`]: status,
                                    }
                                })
                            )}
                        </ApolloWrapper>
                    )}
                </Mutation>
            )
        } else {
            return children({
                ...props,
            });
        }
    }
}

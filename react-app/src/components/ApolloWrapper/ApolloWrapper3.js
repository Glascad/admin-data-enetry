import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';

export default class ApolloWrapper3 extends Component {

    static propTypes = {
        query: PropTypes.shape({
            query: PropTypes.object.isRequired,
            mapQueryToProps: PropTypes.func,
            variables: PropTypes.object,
        }),
        mutations: PropTypes.objectOf(PropTypes.object),
    };

    // for the sake of destructuring in child components
    removeNullValues = (prev = []) => obj => (obj === null ?
        undefined
        :
        typeof obj !== 'object' || prev.includes(obj) ?
            obj
            :
            Array.isArray(obj) ?
                obj.map(this.removeNullValues([...prev, obj]))
                :
                Object.keys(obj)
                    .reduce((filteredObj, key) => {
                        const value = this.removeNullValues([...prev, obj])(obj[key]);
                        return value === undefined ?
                            // console.log(`REMOVED KEY: \n "${key}" \n from object: \n`, obj)
                            // ||
                            filteredObj
                            :
                            {
                                ...filteredObj,
                                [key]: value
                            }
                    }, {})
    );

    render = () => {
        const {
            props: {
                batcher,
                batcher: {
                    registerQueryRefetch = () => { },
                    getNodeId,
                    batchedMutations = {},
                    batchMutation,
                } = {},
                query,
                query: {
                    mapQueryToProps = props => props,
                } = {},
                refetch,
                mutations = {},
                children,
                ...props
            },
            removeNullValues,
        } = this;

        const mutationKeys = Object.keys(mutations);

        const nextMutation = mutations[mutationKeys[0]];

        // REFACTOR TO USE A `Read` COMPONENT LIKE THE ApolloWrapper TO SIMPLIFY LOGIC

        if (query) {
            return (
                <Query
                    {...query}
                >
                    {({ refetch, ...status }) => (
                        registerQueryRefetch(refetch)
                        ||
                        <ApolloWrapper3
                            mutations={mutations}
                            batcher={batcher}
                            refetch={refetch}
                        >
                            {accumulatedProps => {
                                // THIS IS THE FINAL CALLBACK THAT RENDERS THE ORIGINAL CHILDREN
                                // iterate through all batched mutations
                                const batchedMutationKeys = Object.keys(batchedMutations);
                                // console.log(batchedMutationKeys);
                                const queryStatus = batchedMutationKeys.reduce((mappedStatus, mutationKey) => {
                                    // console.log(mappedStatus);
                                    const {
                                        mapResultToProps = (res, props) => props
                                    } = mutations[mutationKey] || {};
                                    const {
                                        argumentSets = []
                                    } = batchedMutations[mutationKey] || {};
                                    // iterate through all argument sets of batched mutations
                                    return argumentSets.reduce((mappedStatus, argSet) => ({
                                        ...mappedStatus,
                                        ...mapResultToProps(argSet, mappedStatus),
                                    }), mappedStatus);
                                }, mapQueryToProps(removeNullValues()(status)));
                                const childProps = {
                                    ...accumulatedProps,
                                    batcher,
                                    queryStatus,
                                };
                                console.log(status);
                                console.log(childProps);
                                return children(childProps);
                            }}
                        </ApolloWrapper3>
                    )}
                </Query>
            )
        } else if (mutationKeys.length) {
            return (
                <Mutation
                    {...nextMutation}
                >
                    {(mutate, status) => (
                        <ApolloWrapper3
                            mutations={mutationKeys
                                .slice(1)
                                .reduce((all, key) => ({
                                    ...all,
                                    [key]: mutations[key],
                                }), {})}
                            batcher={batcher}
                        >
                            {accumulatedProps => (
                                children({
                                    ...accumulatedProps,
                                    mutations: {
                                        ...accumulatedProps.mutations,
                                        [mutationKeys[0]]: batcher ?
                                            args => batchMutation({
                                                arguments: {
                                                    nodeId: args.nodeId || getNodeId(),
                                                    ...args,
                                                },
                                                mutate,
                                                mutationKey: mutationKeys[0],
                                            })
                                            :
                                            async args => {
                                                await mutate({
                                                    variables: args,
                                                });
                                                refetch();
                                            },
                                        [`${mutationKeys[0]}Status`]: status,
                                    }
                                })
                            )}
                        </ApolloWrapper3>
                    )}
                </Mutation>
            )
        } else {
            return children({
                batcher,
                ...props,
            });
        }
    }
}

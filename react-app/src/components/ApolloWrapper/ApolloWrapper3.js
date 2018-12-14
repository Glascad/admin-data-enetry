import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';

export default class ApolloWrapper3 extends Component {

    static propTypes = {
        query: PropTypes.shape({
            mapProps: PropTypes.func.isRequired,
            query: PropTypes.object.isRequired,
            variables: PropTypes.object,
        }),
        mutations: PropTypes.objectOf(PropTypes.object),
    };

    render = () => {
        const {
            props: {
                batcher,
                batcher: {
                    batchedMutations,
                    batchMutation,
                } = {},
                query,
                query: {
                    mapProps: mapQueryProps,
                } = {},
                mutations = {},
                children,
                ...props
            }
        } = this;

        const mutationKeys = Object.keys(mutations);

        const nextMutation = mutations[mutationKeys[0]];

        if (query) {
            return (
                <Query
                    {...query}
                >
                    {status => (
                        <ApolloWrapper3
                            mutations={mutations}
                            batcher={batcher} // VERY IMPORTANT
                        >
                            {accumulatedProps => (
                                children({
                                    ...accumulatedProps,
                                    ...mapQueryProps({
                                        status
                                    })
                                })
                            )}
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
                            batcher={batcher} // VERY IMPORTANT
                        >
                            {accumulatedProps => (
                                children({
                                    ...accumulatedProps,
                                    [mutationKeys[0]]: batcher ?
                                        (args) => batchMutation({
                                            arguments: args,
                                            mutate,
                                            mutationKey: mutationKeys[0],
                                        })
                                        :
                                        mutate,
                                    [`${mutationKeys[0]}Status`]: status,
                                })
                            )}
                        </ApolloWrapper3>
                    )}
                </Mutation>
            )
        } else {
            const batchedMutationKeys = Object.keys(batchedMutations);
            const childProps = batchedMutationKeys.reduce((accumulatedProps, key) => {

                return {
                    ...accumulatedProps,
                }
            }, {
                    batcher,
                    ...props,
                });

            return children(childProps);
        }
    }
}

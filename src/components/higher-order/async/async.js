import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

export default function async(SuperClass, mapMutateToProps) {
    return class Async extends SuperClass {

        static SuperClass = SuperClass;

        static propTypes = {
            mutation: PropTypes.object.isRequired,
            update: PropTypes.func.isRequired,
            variables: PropTypes.object.isRequired,
        }

        render = () => {
            const {
                props: {
                    mutation,
                    variables,
                    update,
                    ...props
                }
            } = this;
            return (
                <Mutation
                    mutation={mutation}
                    update={update}
                >
                    {mutate => {
                        return (
                            <SuperClass
                                {...props}
                                {...mapMutateToProps(() => mutate({ variables }))}
                            />
                        );
                    }}
                </Mutation>
            );
        }
    }
}

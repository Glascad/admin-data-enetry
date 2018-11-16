import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

export default function async(SuperClass, transformProps) {
    return class extends SuperClass {

        static propTypes = {
            mutation: PropTypes.object.isRequired,
            update: PropTypes.func.isRequired,
            variables: PropTypes.object.isRequired,
            onFinish: PropTypes.object.isRequired,
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
                                {...transformProps({
                                    ...props,
                                    mutate: () => mutate({ variables })
                                })}
                            />
                        );
                    }}
                </Mutation>
            );
        }
    }
}

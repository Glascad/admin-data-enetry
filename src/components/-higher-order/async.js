import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

export default mapMutateToProps => WrappedComponent => (
    class Async extends Component {

        static propTypes = {
            mutation: PropTypes.object.isRequired,
            update: PropTypes.func,
            afterUpdate: PropTypes.func,
            variables: PropTypes.object,
        }

        update = (...args) => {
            this.props.update && this.props.update(...args);
            this.props.afterUpdate && this.props.afterUpdate(this.props);
        }

        render = () => {
            const {
                props: {
                    mutation,
                    variables,
                    update: _update,
                    afterUpdate,
                    ...props
                },
                update,
            } = this;
            return (
                <Mutation
                    mutation={mutation}
                    update={update}
                >
                    {mutate => (
                        <WrappedComponent
                            {...props}
                            {...mapMutateToProps(() => mutate({ variables }))}
                        />
                    )}
                </Mutation>
            );
        }
    }
);

import React, { Component } from 'react';

import { Mutation } from 'react-apollo';

import { NewModal } from '../../../../../components';

import { create_system_type } from './system-types-gql';

const {
    mutation,
    update,
} = create_system_type;

export default class Create extends Component {

    state = {
        type: "",
    };

    handleInput = key => ({ target: { value } }) => this.setState({
        [key]: value
    });

    handleClick = key => ({ target: { checked } }) => this.setState({
        [key]: checked
    });

    handleReset = () => this.setState({
        type: "",
    });

    render = () => {
        const {
            state: variables,
            state: {
                type,
            },
            props: {
                onCancel,
                onReset,
                ...props
            },
            handleInput,
            handleClick,
            handleReset
        } = this;
        return (
            <Mutation
                mutation={mutation}
                update={(...args) => {
                    update(...args);
                    onCancel();
                }}
            >
                {mutate => (
                    <Mutation
                        mutation={mutation}
                        update={(...args) => {
                            update(...args);
                            onCancel();
                        }}
                    >
                        {mutate => (
                            <NewModal
                                {...props}
                                onCancel={onCancel}
                                title="Create System Type"
                                onFinish
                                finishButtonClassName
                            // buttons={{
                            //     left: (
                            //         <button
                            //             className="empty light"
                            //             onClick={handleReset}
                            //         >
                            //             Reset
                            // </button>
                            //     ),
                            //     right: (
                            //         <span>
                            //             <button
                            //                 className="empty light"
                            //                 onClick={onCancel}
                            //             >
                            //                 Cancel
                            //             </button>
                            //             <button className="primary"
                            //                 onClick={e => {
                            //                     e.stopPropagation();
                            //                     mutate({ variables });
                            //                 }}
                            //             >
                            //                 Create
                            //         </button>
                            //         </span>
                            //     )
                            // }}
                            >
                                <h6>Type</h6>
                                <input
                                    value={type}
                                    onChange={handleInput('type')}
                                />
                            </NewModal>
                        )}
                    </Mutation>
                )}
            </Mutation>
        );
    }
}

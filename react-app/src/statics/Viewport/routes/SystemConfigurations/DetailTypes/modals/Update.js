import React, { Component } from 'react';

import { Mutation } from 'react-apollo';

import { NewModal } from '../../../../../../components';

import { update_detail_type } from '../detail-types-gql';

const {
    mutation,
    update,
} = update_detail_type;

export default class Update extends Component {

    state = {
        type: "",
        vertical: false,
        entrance: false,
    };

    handleInput = key => ({ target: { value } }) => this.setState({
        [key]: value
    });

    handleClick = key => ({ target: { checked } }) => this.setState({
        [key]: checked
    });

    handleReset = () => this.setState(this.props.selectedDetailType);

    componentDidUpdate = ({ display }) => {
        if (display !== this.props.display) {
            this.setState(this.props.selectedDetailType);
        }
    }

    render = () => {
        const {
            state: variables,
            state: {
                type,
                vertical,
                entrance,
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
            <NewModal
                {...props}
                onCancel={onCancel}
                title="Create Detail Type"
                buttons={{
                    left: (
                        <button
                            className="empty light"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    ),
                    right: (
                        <Mutation
                            mutation={mutation}
                            update={onCancel}
                        >
                            {mutate => (
                                <span>
                                    <button
                                        className="empty light"
                                        onClick={onCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button className="primary"
                                        onClick={e => {
                                            e.stopPropagation();
                                            mutate({ variables });
                                        }}
                                    >
                                        Update
                                </button>
                                </span>
                            )}
                        </Mutation>
                    )
                }}
            >
                <h6>Type</h6>
                <input
                    value={type}
                    onChange={handleInput('type')}
                />
                <h6>Vertical</h6>
                <input
                    type="checkbox"
                    checked={vertical}
                    onChange={handleClick('vertical')}
                />
                <h6>Entrance</h6>
                <input
                    type="checkbox"
                    checked={entrance}
                    onChange={handleClick('entrance')}
                />
            </NewModal>
        );
    }
}

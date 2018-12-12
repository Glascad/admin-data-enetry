import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ApolloWrapper from '../ApolloWrapper/ApolloWrapper';
import HeadedContainer from '../HeadedContainer/HeadedContainer';

import './ApolloBatchedWrapper.scss';

import InputComponent from './InputComponent';


const createInputComponent = boundProps => props => (
    <InputComponent
        {...props}
        {...boundProps}
    />
);


const removeDuplicateNIDs = list => list.filter((item, i) => i === list.findIndex(({ nodeId }) => nodeId === item.nodeId));


class BatchedWrapper extends Component {

    static propTypes = {
        inputs: PropTypes.array,
    };

    mutationIds = {};

    handleSave = () => {
        const newMutation = () => {
            this.props.apollo.updateItem({
                variables: this.props.mapUpdateVariables(this.state)
            });
        }
        this.mutationIds.base_mutation = this.props.apollo.batchMutation(newMutation);
        this.props.apollo.completeMutations();
    }

    handleModalFinish = ({
        label,
        mapCreateVariables,
        mapDeleteVariables,
        createItem,
        deleteItem,
        cancel
    }) => ({
        arguments: {
            addedItems,
            deletedItems
        }
    }) => {
            console.log(label);
            const oldList = this.state[label];
            const newList = oldList
                .concat(addedItems)
                .filter(({ nodeId }) => !deletedItems.some(deletedItem => deletedItem.nodeId === nodeId));
            console.log({
                addedItems,
                deletedItems,
                oldList,
                newList,
            });
            const mutationId = this.mutationIds[label];
            const queryData = this.props.apollo.queryStatus.data;
            if (mutationId) {
                this.props.apollo.replaceMutation(mutationId, () => {

                });
            } else {
                this.mutationIds[label] = this.props.apollo.batchMutation(() => {
                    deletedItems.forEach(item => {
                        deleteItem({
                            variables: mapDeleteVariables(item, queryData)
                        });
                    });
                    addedItems.forEach(item => {
                        createItem({
                            variables: mapCreateVariables(item, queryData)
                        });
                    });
                });
            }
            this.setState({
                [label]: removeDuplicateNIDs(newList)
            }, cancel);
        }

    render = () => {
        const {
            state,
            props: {
                apollo,
                apollo: {
                    queryStatus: {
                        data: queryData,
                    },
                    batchMutation,
                    resetMutations,
                    replaceMutation,
                    completeMutations,
                },
                title,
                inputs = [],
                children,
            },
            handleModalFinish,
            handleSave,
            handleBlur,
            handleChange,
            handleCheckChange,
            handleSelectChange,
            handleReset,
        } = this;

        console.log(this);

        return (
            <HeadedContainer
                title={title}
                className="ApolloBatchedWrapper"
            >
                {children(createInputComponent({
                    queryData,
                }))}
                <div
                    className="button-wrapper"
                >
                    <button
                        className="empty"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <div
                        className="buttons-right"
                    >
                        <button
                            className="primary"
                            onClick={handleSave}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </HeadedContainer>
        );
    }
}

export default function ApolloBatchedWrapper({
    apolloProps,
    apolloProps: {
        queryVariables
    },
    ...props
}) {
    return (
        <ApolloWrapper
            {...apolloProps}
        >
            {apollo => (
                <BatchedWrapper
                    {...props}
                    variables={queryVariables}
                    apollo={apollo}
                />
            )}
        </ApolloWrapper>
    );
}

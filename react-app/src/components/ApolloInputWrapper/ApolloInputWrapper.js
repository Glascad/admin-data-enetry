import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ApolloWrapper from '../ApolloWrapper/ApolloWrapper';
import HeadedContainer from '../HeadedContainer/HeadedContainer';
import Input from '../Input/Input';
import MultiSelect from '../MultiSelect/MultiSelect';
import SelectionWrapper from '../SelectionWrapper/SelectionWrapper';
import ListContainer from '../ListContainer/ListContainer';
import Pill from '../Pill/Pill';

import './ApolloInputWrapper.scss';


const removeDuplicateNIDs = list => list.filter((item, i) => i === list.findIndex(({ nodeId }) => nodeId === item.nodeId));


const shallowEquals = (obj1, obj2) => typeof obj1 === 'object' && typeof obj2 === 'object' ?
    Array.isArray(obj1) && Array.isArray(obj2) ?
        obj1.length === obj2.length
        &&
        obj1.every((item, i) => shallowEquals(item, obj2[i]))
        :
        Object.keys(obj1).reduce((equal, key) => equal && obj1[key] === obj2[key], true)
    :
    obj1 === obj2;


class BatchedWrapper extends Component {

    static propTypes = {
        inputs: PropTypes.array,
    };

    getInitialState = () => this.props.inputs.reduce((
        state,
        {
            label,
            multiSelectList,
            multiSelectList: {
                extractItems,
            } = {},
            extractValue
        }) => ({
            ...state,
            [label]: multiSelectList ?
                extractItems(this.props.apollo.queryStatus ?
                    this.props.apollo.queryStatus.data
                    :
                    {})
                :
                extractValue(this.props.apollo.queryStatus ?
                    this.props.apollo.queryStatus.data
                    :
                    {}),
        }),
        {});

    state = this.getInitialState();

    mutationIds = {};

    componentDidUpdate = ({
        apollo: {
            queryStatus: {
                data
            }
        }
    }) => {
        this.props.inputs.forEach(({
            multiSelectList,
            multiSelectList: {
                extractItems,
            } = {},
            label,
            extractValue,
        }) => {
            if (!multiSelectList) {
                const oldValue = extractValue(data);
                const newValue = extractValue(this.props.apollo.queryStatus.data);
                if (!shallowEquals(oldValue, newValue)) {
                    this.setState({
                        [label]: newValue,
                    });
                } else {
                    // console.log(`Key: "${label}" remained the same`);
                    // console.log({
                    //     label,
                    //     oldValue,
                    //     newValue,
                    // });
                }
            } else {
                const oldValue = extractItems(data);
                const newValue = extractItems(this.props.apollo.queryStatus.data);
                if (!shallowEquals(oldValue, newValue)) {
                    this.setState({
                        [label]: newValue,
                    });
                } else {
                    // console.log(`Key: "${label}" remained the same`);
                    // console.log({
                    //     label,
                    //     oldValue,
                    //     newValue,
                    // });
                }
            }
        });
    }

    handleChange = label => ({ target: { value } }) => this.setState({
        [label]: value
    });

    handleCheckChange = label => ({ target: { checked } }) => this.setState({
        [label]: checked
    });

    handleSelectChange = label => value => this.setState({
        [label]: value
    });

    // handleBlur = () => {
    //     const newMutation = () => {
    //         this.props.apollo.updateItem({
    //             variables: this.props.mapUpdateVariables(this.state)
    //         });
    //     }
    //     if (this.baseUpdateId === -1) {
    //         this.baseUpdateId = this.props.apollo.batchMutation(newMutation);
    //     } else {
    //         this.props.apollo.replaceMutation(this.baseUpdateId, newMutation)
    //     }
    // }

    handleReset = () => {
        // this.props.apollo.resetMutations();
        this.setState(this.getInitialState());
    }

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
                children = () => null,
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
        // console.log(apollo);

        return (
            <HeadedContainer
                title={title}
                className="ApolloInputWrapper"
            >
                {inputs.map(({
                    label,
                    type,
                    extractValue,
                    extractOptions,
                    multiSelectList,
                    multiSelectList: {
                        apolloProps,
                        mapCreateVariables,
                        mapDeleteVariables,
                        extractItems,
                        extractAllItems,
                        mapModalProps = () => ({}),
                        mapListPillProps,
                        mapModalPillProps,
                        ...multiSelect
                    } = {},
                    ...input
                }) => (!multiSelectList ?
                    <Input
                        key={label}
                        label={label}
                        type={type}
                        value={state[label]}
                        onChange={type === "checkbox" ?
                            handleCheckChange(label)
                            :
                            handleChange(label)}
                        select={type === "select" ? {
                            value: state[label],
                            options: extractOptions(queryData),
                            onChange: handleSelectChange(label),
                        } : undefined}
                        {...input}
                    />
                    :
                    <ApolloWrapper
                        {...apolloProps}
                    >
                        {({
                            createItem,
                            deleteItem,
                        }) => (
                                <SelectionWrapper
                                    key={label}
                                >
                                    {({
                                        selectedNID,
                                        creating,
                                        deleting,
                                        handleCreateClick,
                                        handleDeleteClick,
                                        cancel,
                                    }) => (
                                            // See React.Fragment documentation
                                            <>
                                                <ListContainer
                                                    label={label}
                                                    items={state[label]}
                                                    renderItem={item => (
                                                        <Pill
                                                            key={item.nodeId}
                                                            arguments={{
                                                                nodeId: item.nodeId,
                                                            }}
                                                            onDelete={handleDeleteClick}
                                                            {...mapListPillProps(item)}
                                                        />
                                                    )}
                                                    addButton={{
                                                        onAdd: handleCreateClick
                                                    }}
                                                />
                                                <MultiSelect
                                                    modalProps={{
                                                        display: creating || deleting,
                                                        onCancel: cancel,
                                                        onFinish: handleModalFinish({
                                                            queryData,
                                                            mapCreateVariables,
                                                            mapDeleteVariables,
                                                            createItem,
                                                            deleteItem,
                                                            label,
                                                            cancel,
                                                        }),
                                                        ...mapModalProps({
                                                            selectedNID,
                                                            creating,
                                                            deleting,
                                                        }),
                                                    }}
                                                    selectedNID={selectedNID}
                                                    creating={creating}
                                                    deleting={deleting}
                                                    previousItems={state[label]}
                                                    allItems={extractAllItems(queryData)}
                                                    mapPillProps={mapModalPillProps}
                                                    {...multiSelect}
                                                />
                                            </>
                                        )}
                                </SelectionWrapper>
                            )}
                    </ApolloWrapper>
                    ))}
                {children({
                    batchMutation,
                    replaceMutation,
                })}
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

export default function ApolloInputWrapper({
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

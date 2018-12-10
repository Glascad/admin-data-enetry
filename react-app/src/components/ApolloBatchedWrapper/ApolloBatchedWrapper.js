import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ApolloWrapper from '../ApolloWrapper/ApolloWrapper';
import HeadedContainer from '../HeadedContainer/HeadedContainer';
import Input from '../Input/Input';
import MultiSelect from '../MultiSelect/MultiSelect';
import SelectionWrapper from '../SelectionWrapper/SelectionWrapper';
import ListContainer from '../ListContainer/ListContainer';
import Pill from '../Pill/Pill';


const removeDuplicateNIDs = list => list.filter((item, i) => i === list.findIndex(({ nodeId }) => nodeId === item.nodeId));


const shallowEquals = (obj1, obj2) => typeof obj1 === 'object' && typeof obj2 === 'object' ?
    Object.keys(obj1).reduce((equal, key) => equal && obj1[key] === obj2[key], true)
    :
    obj1 === obj2;


class BatchedWrapper extends Component {

    static propTypes = {
        // getInitialState: PropTypes.func,
        inputs: PropTypes.array,
    };

    // state = this.props.getInitialState ?
    //     this.props.getInitialState(this.props.queryStatus.data)
    //     :
    //     {};

    getInitialState = () => this.props.inputs.reduce((
        state,
        {
            label,
            multiSelectList,
            multiSelectList: {
                list: {
                    extractItems,
                } = {},
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

    mutation = -1;

    componentDidUpdate = ({
        apollo: {
            queryStatus: {
                data
            }
        }
    }) => {
        this.props.inputs.forEach(({
            multiSelectList,
            label,
            extractValue,
        }) => {
            if (!multiSelectList) {
                const oldValue = extractValue(data);
                const newValue = extractValue(this.props.apollo.queryStatus.data);
                if (!shallowEquals(oldValue, newValue)) {
                    this.setState({
                        [label]: newValue,
                        n: console.log({
                            [label]: newValue,
                            [`old-${label}`]: oldValue,
                        })
                    });
                }
            } else {

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
        this.baseUpdateId = this.props.apollo.batchMutation(newMutation);
        this.props.apollo.completeMutations();
    }

    handleModalFinish = (label, cancel) => ({ arguments: { addedItems, deletedItems } }) => {
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
        this.setState({
            [label]: removeDuplicateNIDs(newList)
        }, cancel);
        this.props.apollo.batchMutation()
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
        console.log(apollo);

        return (
            <HeadedContainer
                title={title}
            >
                {inputs.map(({
                    label,
                    type,
                    extractValue,
                    extractOptions,
                    multiSelectList,
                    multiSelectList: {
                        list: {
                            extractItems,
                            mapPillProps: mapListPills,
                        } = {},
                        multiSelect: {
                            extractAllItems,
                            mapModalProps = () => ({}),
                            mapPillProps: mapSelectPills,
                            ...multiSelect
                        } = {},
                    } = {},
                    ...input
                }) => (multiSelectList ?
                    <SelectionWrapper
                        key={label}
                    >
                        {({
                            selectedNID,
                            creating,
                            deleting,
                            handleCreateClick,
                            cancel,
                        }) => {
                            // const items = extractItems(queryData);
                            console.log(state[label]);
                            return (
                                <div>
                                    <ListContainer
                                        items={state[label]}
                                        renderItem={(item) => (
                                            <Pill
                                                key={item.nodeId}
                                                arguments={{
                                                    nodeId: item.nodeId,
                                                }}
                                                {...mapListPills(item)}
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
                                            onFinish: handleModalFinish(label, cancel),
                                            ...mapModalProps({
                                                selectedNID,
                                                creating,
                                                deleting,
                                            }),
                                        }}
                                        previousItems={state[label]}
                                        allItems={extractAllItems(queryData)}
                                        mapPillProps={mapSelectPills}
                                        {...multiSelect}
                                    />
                                </div>
                            );
                        }}
                    </SelectionWrapper>
                    :
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
                    ))}
                <button
                    className="empty"
                    onClick={handleReset}
                >
                    Reset
                </button>
                <button
                    className="primary"
                    onClick={handleSave}
                >
                    Next
                </button>
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

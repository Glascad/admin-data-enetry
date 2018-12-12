import React, { Component } from 'react';

import ApolloWrapper from '../ApolloWrapper/ApolloWrapper';
import SelectionWrapper from '../SelectionWrapper/SelectionWrapper';
import MultiSelect from '../MultiSelect/MultiSelect';
import ListContainer from '../ListContainer/ListContainer';
import Input from '../Input/Input';
import Pill from '../Pill/Pill';


const shallowEquals = (obj1, obj2) => typeof obj1 === 'object' && typeof obj2 === 'object' ?
    Array.isArray(obj1) && Array.isArray(obj2) ?
        obj1.length === obj2.length
        &&
        obj1.every((item, i) => shallowEquals(item, obj2[i]))
        :
        Object.keys(obj1).reduce((equal, key) => equal && obj1[key] === obj2[key], true)
    :
    obj1 === obj2;


const removeDuplicateNIDs = list => list.filter((item, i) => i === list.findIndex(({ nodeId }) => nodeId === item.nodeId));


export default class InputComponent extends Component {

    getInitialState = ({
        label,
        multiSelectList,
        multiSelectList: {
            extractItems,
        } = {},
        extractValue,
        queryData,
    }) => ({
        [label]: multiSelectList ?
            extractItems(queryData)
            :
            extractValue(queryData)
    });

    state = this.getInitialState(this.props);

    componentDidUpdate = ({
        label,
        multiSelectList,
        multiSelectList: {
            extractItems,
        } = {},
        extractValue,
        queryData,
    }) => {
        const getValue = multiSelectList ? extractItems : extractValue;
        const oldValue = getValue(queryData);
        const newValue = getValue(this.props.queryData);
        if (!shallowEquals(oldValue, newValue)) {
            this.setState({
                [label]: newValue
            });
        } else {
            console.log(`Key: "${label}" remained the same`);
            console.log({
                label,
                oldValue,
                newValue,
            });
        }
    }

    handleChange = ({ target: { value, checked } = {}, ...selectValue }) => this.setState({
        [this.props.label]: this.props.type === "checkbox" ?
            checked
            :
            this.props.type === "select" ?
                selectValue
                :
                value
    });

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
                queryData,
                ...input
            },
            handleChange,
            handleModalFinish,
        } = this;

        return (!multiSelectList ?
            <Input
                key={label}
                label={label}
                type={type}
                value={state[label]}
                onChange={handleChange}
                select={type === "select" ? {
                    value: state[label],
                    options: extractOptions(queryData),
                    onChange: handleChange,
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
                                            title={label}
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
        )
    }
}

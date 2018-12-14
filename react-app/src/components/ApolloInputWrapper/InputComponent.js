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

    getOriginalState = ({
        multiSelectList,
        multiSelectList: {
            extractItems,
        } = {},
        extractValue,
        queryData,
    } = this.props) => console.log("GOT ORIGINAL STATE: ", this.props.label) || (multiSelectList ?
        console.log("extractItems") ||
        extractItems(queryData)
        :
        console.log("extractValue") ||
        extractValue(queryData)
    );

    // updateState = (value, cb) => this.props.updateState(this.props.label)(value, cb);

    // componentDidMount = () => this.updateState(this.getOriginalState());
    componentDidMount = () => console.log("COMPONENT MOUNTED: ", this.props.label) || this.props.updateState({
        [this.props.label]: this.getOriginalState()
    });

    componentDidUpdate = ({
        label,
        multiSelectList,
        multiSelectList: {
            extractItems,
        } = {},
        extractValue,
        queryData,
    }) => {
        const getValue = multiSelectList ?
            extractItems
            :
            extractValue;
        const oldValue = getValue(queryData);
        const newValue = getValue(this.props.queryData);
        if (!shallowEquals(oldValue, newValue)) {
            console.log(`UPDATING ${label} STATE TO`);
            console.log(newValue);
            this.props.updateState({
                [this.props.label]: newValue
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

    handleChange = ({ target: { value, checked } = {}, ...selectValue }) => this.props.updateState({
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
            const oldList = this.state;
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
            this.props.updateState({
                [this.props.label]: removeDuplicateNIDs(newList)
            }, cancel);
        }

    render = () => {
        const {
            props: {
                state,
                state: {
                    [this.props.label]: currentValue = this.getOriginalState(),
                },
                updateState,
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

        console.log({
            label,
            state,
            queryData,
            currentValue,
        });

        return (!multiSelectList ?
            <Input
                key={label}
                label={label}
                type={type}
                value={currentValue}
                onChange={handleChange}
                select={type === "select" ? {
                    value: state,
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
                                            label={label}
                                            items={currentValue}
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
                                                title: label,
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
                                            previousItems={currentValue}
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

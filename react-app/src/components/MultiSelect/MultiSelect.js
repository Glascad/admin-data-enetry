import React, { Component } from 'react';

import Modal from '../Modal/Modal';
import Pill from '../Pill/Pill';
import ListContainer from '../ListContainer/ListContainer';
import HeadedListContainer from '../HeadedListContainer/HeadedListContainer';

const removeDuplicateNIDs = list => list.filter((item, i) => i === list.findIndex(({ nodeId }) => nodeId === item.nodeId));

export default class MultiSelect extends Component {

    state = {
        addedItems: [],
        deletedItems: [],
    };

    componentDidUpdate = ({ modalProps: { display } }) => {
        if (display !== this.props.modalProps.display) {
            this.setState({
                addedItems: [],
                deletedItems: [],
            });
        }
    }

    handleSelect = ({ arguments: item }) => this.setState(({ addedItems }) => ({
        addedItems: addedItems.concat(item)
    }));

    handleDeleteClick = ({ arguments: deletedItem }) => {
        if (this.props.previousItems.some(({ nodeId }) => nodeId === deletedItem.nodeId)) {
            this.setState(({ deletedItems }) => ({
                deletedItems: deletedItems.concat(deletedItem)
            }));
        } else {
            this.setState(({ addedItems }) => ({
                addedItems: addedItems.filter(({ nodeId }) => nodeId !== deletedItem.nodeId)
            }));
        }
    }

    render = () => {
        const {
            state,
            state: {
                addedItems,
                deletedItems,
            },
            props: {
                modalProps,
                previousItems,
                allItems,
                mapPillProps = () => null,
            },
            handleSelect,
            handleDeleteClick,
        } = this;

        const selectedItems = removeDuplicateNIDs(previousItems
            .concat(addedItems));

        const nonSelectedItems = allItems
            .filter(item => !selectedItems.some(({ nodeId }) => nodeId === item.nodeId));

        console.log(this);
        console.log({
            selectedItems,
            nonSelectedItems,
        });

        return (
            <Modal
                arguments={state}
                {...modalProps}
            >
                <ListContainer
                    items={selectedItems}
                    renderItem={item => (
                        <Pill
                            key={item.nodeId}
                            tagname="li"
                            selected={!previousItems.includes(item)}
                            danger={deletedItems.includes(item)}
                            arguments={item}
                            onDelete={handleDeleteClick}
                            {...mapPillProps(item, true)}
                        />
                    )}
                />
                <HeadedListContainer
                    title={""}
                    list={{
                        items: nonSelectedItems,
                        renderItem: item => (
                            <Pill
                                key={item.nodeId}
                                tagname="li"
                                onSelect={handleSelect}
                                arguments={item}
                                {...mapPillProps(item, false)}
                            />
                        )
                    }}
                />
            </Modal>
        );
    }
}

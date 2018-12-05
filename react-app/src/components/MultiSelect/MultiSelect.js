import React, { Component } from 'react';

import Modal from '../Modal/Modal';
import Pill from '../Pill/Pill';
import ListContainer from '../ListContainer/ListContainer';
import HeadedListContainer from '../HeadedListContainer/HeadedListContainer';

export default class MultiSelect extends Component {

    state = {
        addedItems: [],
        deletedItems: [],
    };

    handleSelect = ({ arguments: item }) => this.setState(({ addedItems }) => ({
        addedItems: addedItems.concat(item)
    }));

    handleDeleteClick = ({ arguments: deletedItem }) => {
        if (this.props.previousItems.includes(deletedItem)) {
            this.setState(({ deletedItems }) => ({
                deletedItems: deletedItems.concat(deletedItem)
            }));
        } else {
            this.setState(({ addedItems }) => ({
                addedItems: addedItems.filter(item => item !== deletedItem)
            }));
        }
    }

    render = () => {
        const {
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

        const selectedItems = previousItems
            .concat(addedItems);

        const nonSelectedItems = allItems
            .filter(item => !selectedItems.includes(item));

        console.log(this);

        console.log(mapPillProps({ pillProps: "Pill Props" }));

        return (
            <Modal
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

import React, { Component } from 'react';

import Modal from '../Modal/Modal';
import Pill from '../Pill/Pill';
import ListContainer from '../ListContainer/ListContainer';

import './MultiSelect.scss';

const removeDuplicateNIDs = (list, identifier = 'nodeId') => list.filter((item, i) => i === list.findIndex(({ [identifier]: id }) => id === item[identifier]));

export default class MultiSelect extends Component {

    static defaultProps = {
        identifier: 'nodeId',
        mapPillProps: () => null,
    };

    state = {
        addedItems: [],
        deletedItems: [],
    };

    componentDidUpdate = ({ modal: { display } }) => {
        const {
            props: {
                selection: {
                    selectedNID,
                    creating,
                    deleting,
                } = {},
                modal: {
                    display: newDisplay,
                },
                identifier,
                previousItems,
            },
        } = this;
        if (display !== newDisplay) {
            const selectedItem = previousItems.find(({ [identifier]: id }) => id === selectedNID);
            this.setState({
                addedItems: creating && selectedItem ? [selectedItem] : [],
                deletedItems: deleting && selectedItem ? [selectedItem] : [],
            });
        }
    }

    handleSelect = ({ arguments: item }) => this.setState(({ addedItems }) => ({
        addedItems: addedItems.concat(item)
    }));

    handleDeleteClick = ({ arguments: deletedItem }) => {
        const {
            props: {
                identifier,
            },
        } = this;
        console.log({ deletedItem, identifier });
        if (this.props.previousItems.some(({ [identifier]: id }) => id === deletedItem[identifier])) {
            if (this.state.deletedItems.some(({ [identifier]: id }) => id === deletedItem[identifier])) {
                this.setState(({ deletedItems }) => ({
                    deletedItems: deletedItems
                        .filter(({ [identifier]: id }) => id !== deletedItem[identifier])
                }));
            } else {
                this.setState(({ deletedItems }) => ({
                    deletedItems: deletedItems.concat(deletedItem)
                }));
            }
        } else {
            this.setState(({ addedItems }) => ({
                addedItems: addedItems
                    .filter(({ [identifier]: id }) => id !== deletedItem[identifier])
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
            props,
            props: {
                modal,
                previousItems,
                allItems,
                mapPillProps,
                list: {
                    titleBar,
                },
                identifier,
            },
            handleSelect,
            handleDeleteClick,
        } = this;

        const selectedItems = removeDuplicateNIDs(previousItems.concat(addedItems));

        const nonSelectedItems = allItems
            .filter(item => !selectedItems.some(({ [identifier]: id }) => id === item[identifier]));

        console.log({
            state,
            props,
        });

        return (
            <Modal
                className="MultiSelect"
                arguments={{
                    ...state,
                    previousItems,
                }}
                {...modal}
            >
                <ListContainer
                    items={selectedItems}
                    renderItem={(item, i) => (
                        <Pill
                            key={item[identifier]}
                            tagname="li"
                            selected={!previousItems.includes(item)}
                            danger={deletedItems.includes(item)}
                            arguments={item}
                            onSelect={handleDeleteClick}
                            onDelete={handleDeleteClick}
                            {...mapPillProps(item, true)}
                        />
                    )}
                />
                <ListContainer
                    titleBar={titleBar}
                    items={nonSelectedItems}
                    renderItem={item => (
                        <Pill
                            key={item[identifier]}
                            tagname="li"
                            onSelect={handleSelect}
                            arguments={item}
                            {...mapPillProps(item, false)}
                        />
                    )}
                />
            </Modal>
        );
    }
}

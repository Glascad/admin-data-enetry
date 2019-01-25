import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectionWrapper from '../../state/SelectionWrapper';
import Pill from '../Pill/Pill';
import MultiSelect from '../MultiSelect/MultiSelect';
import Modal from '../Modal/Modal';
import ListContainer from '../ListContainer/ListContainer';
import AddButton from '../AddButton/AddButton';

import './ListWrapper.scss';

class List extends Component {

    static propTypes = {
        title: PropTypes.string,
        label: PropTypes.string,
        parent: PropTypes.string,
        items: PropTypes.array.isRequired,
        mapPillProps: PropTypes.func.isRequired,
        onCreate: PropTypes.func,
        onUpdate: PropTypes.func,
        onDelete: PropTypes.func,
        children: PropTypes.func,
        multiSelect: PropTypes.shape({

        })
    };

    handleDelete = async () => {
        try {
            await this.props.onDelete({
                arguments: {
                    nodeId: this.props.selection.selectedNID
                }
            });
            this.props.selection.cancel();
        } catch (err) {
            console.error(err);
        }
    }

    handleMultiSelectFinish = async ({ arguments: { addedItems, deletedItems } }) => {
        try {
            await Promise.all(addedItems.map(this.props.onCreate));
        } catch (err) {
            console.error(err);
        }
        try {
            await Promise.all(deletedItems.map(this.props.onDelete));
        } catch (err) {
            console.error(err);
        }
        this.props.selection.cancel();
    }

    render = () => {
        const {
            props: {
                title = this.props.titleBar && this.props.titleBar.title || "",
                titleBar,
                label,
                items,
                defaultPillProps,
                mapPillProps,
                addButton,
                onDisabledSelect,
                onCreate,
                onUpdate,
                onDelete,
                deleteModal,
                deleteModal: {
                    name: modalName,
                } = {},
                selection,
                selection: {
                    selectedNID,
                    creating,
                    deleting,
                    cancel,
                    handleSelect,
                    handleCreateClick,
                    handleDeleteClick,
                    selectable,
                },
                multiSelect,
                multiSelect: {
                    title: multiSelectTitle,
                    allItems,
                    // onCreate: onMultiSelectCreate,
                    // onDelete: onMultiSelectDelete,
                    mapPreviousItems = item => item,
                } = {},
                children,
            },
            handleMultiSelectFinish,
            handleDelete,
        } = this;

        const selectedItem = items.find(({ nodeId }) => nodeId === selectedNID)
            ||
            items[0]
            ||
            {};

        return (
            <>
                <ListContainer
                    titleBar={titleBar || { title }}
                    label={label}
                    items={items}
                    renderItem={item => {

                        const { nodeId } = item;

                        const args = { nodeId };

                        const canSelect = !creating
                            &&
                            (
                                children
                                ||
                                selectable
                            );

                        const onSelect = canSelect ?
                            handleSelect
                            :
                            undefined;

                        const danger = onDelete
                            &&
                            deleting
                            &&
                            nodeId === selectedNID;

                        const _delete = multiSelect || deleteModal ?
                            handleDeleteClick
                            :
                            onDelete;

                        const selected = !!(nodeId === selectedItem.nodeId
                            &&
                            canSelect);

                        return (
                            <Pill
                                key={nodeId}
                                tagname="li"
                                selected={selected}
                                danger={danger}
                                onSelect={onSelect}
                                onDisabledSelect={onDisabledSelect}
                                onEdit={onUpdate}
                                onDelete={_delete}
                                arguments={args}
                                {...defaultPillProps}
                                {...mapPillProps(item)}
                            />
                        );
                    }}
                    afterList={(!multiSelect && onCreate && creating) ? (
                        <Pill
                            {...defaultPillProps}
                            tagname="li"
                            editing={true}
                            onEdit={onCreate}
                            onBlur={cancel}
                        />
                    ) : (onCreate || addButton) && !creating ? (
                        <AddButton
                            {...addButton}
                            onAdd={handleCreateClick}
                        />
                    ) : null}
                />
                {multiSelect ? (
                    <MultiSelect
                        modal={{
                            titleBar: {
                                title: multiSelectTitle || titleBar ?
                                    `Update ${titleBar.title}`
                                    :
                                    label ?
                                        `Update ${label}`
                                        :
                                        '',
                            },
                            display: !!(deleting || creating),
                            onCancel: cancel,
                            onFinish: handleMultiSelectFinish,
                        }}
                        list={{
                            titleBar: {
                                title: `All ${title || label || ''}`,
                            },
                        }}
                        selection={selection}
                        previousItems={items.map(mapPreviousItems)}
                        allItems={allItems}
                        mapPillProps={mapPillProps}
                    />
                ) : deleteModal ? (
                    <Modal
                        {...deleteModal}
                        titleBar={{
                            title: `Delete ${modalName}`
                        }}
                        display={deleting}
                        onCancel={cancel}
                        onFinish={handleDelete}
                        danger={true}
                    >
                        Are you sure you want to delete {
                            modalName.toLowerCase()
                        }: {
                            mapPillProps(selectedItem).title
                        }?
                    </Modal>
                ) : null}
                {children ? (
                    <div className={`nested ${
                        Object.keys(selectedItem).length === 0 ?
                            "disabled"
                            :
                            ""
                        }`} >
                        {children(selectedItem)}
                    </div>
                ) : null}
            </>
        );
    }
}


export default function ListWrapper({
    stateManager,
    stateManager: {
        id,
        props: {
            state,
            update,
        } = {},
    } = {},
    ...props
}) {
    return stateManager ? (
        <List
            selection={{
                selectedNID: state[id] && state[id].nodeId,
                handleSelect: update(id),
                selectable: true,
            }}
            {...props}
        />
    ) : (
            <SelectionWrapper>
                {selection => (
                    <List
                        selection={selection}
                        {...props}
                    />
                )}
            </SelectionWrapper>
        );
}

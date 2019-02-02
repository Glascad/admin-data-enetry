import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import SelectionWrapper from '../../state/SelectionWrapper';
import Pill from '../Pill/Pill';
import MultiSelect from '../MultiSelect/MultiSelect';
import Modal from '../Modal/Modal';
import ListContainer from '../ListContainer/ListContainer';
import AddButton from '../AddButton/AddButton';

import './ListWrapper.scss';

class List extends Component {

    // static propTypes = {
    //     title: PropTypes.string,
    //     label: PropTypes.string,
    //     parent: PropTypes.string,
    //     items: PropTypes.array.isRequired,
    //     mapPillProps: PropTypes.func.isRequired,
    //     onCreate: PropTypes.func,
    //     onUpdate: PropTypes.func,
    //     onDelete: PropTypes.func,
    //     children: PropTypes.func,
    //     multiSelect: PropTypes.shape({

    //     })
    // };

    handleDelete = async () => {
        const {
            props: {
                selection: {
                    cancel,
                    selectedNID,
                },
                onDelete,
                identifier = 'nodeId',
            },
        } = this;
        try {
            await onDelete({
                arguments: {
                    [identifier]: selectedNID,
                },
            });
            cancel();
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
                title = (this.props.titleBar && this.props.titleBar.title) || "",
                titleBar,
                label,
                identifier = 'nodeId',
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
                    // onCreate: onMultiSelectCreate,
                    // onDelete: onMultiSelectDelete,
                    mapPreviousItems = item => item,
                } = {},
                children,
            },
            handleMultiSelectFinish,
            handleDelete,
        } = this;

        const selectedItem = items.find(({ [identifier]: id }) => id === selectedNID)
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

                        const { [identifier]: id } = item;

                        const args = { [identifier]: id };

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
                            id === selectedNID;

                        const _delete = multiSelect || deleteModal ?
                            handleDeleteClick
                            :
                            onDelete;

                        const selected = !!(id === selectedItem[identifier]
                            &&
                            canSelect);

                        const className = children ?
                            "empty"
                            :
                            ""

                        return (
                            <Pill
                                className={className}
                                key={id}
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
                        {...multiSelect}
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
    identifier = 'nodeId',
    ...props
}) {
    return stateManager ? (
        <List
            selection={{
                selectedNID: state[id] && state[id][identifier],
                handleSelect: update(id),
                selectable: true,
            }}
            identifier={identifier}
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

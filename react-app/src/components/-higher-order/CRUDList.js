import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withSelect from './withSelect';
import withCRUD from './withCRUD';
import HeadedListContainer from '../HeadedListContainer/HeadedListContainer';
import Pill from '../Pill/Pill';
import Modal from '../Modal/Modal';

class CRUDList extends Component {

    static propTypes = {
        itemClass: PropTypes.string.isRequired,
        extractList: PropTypes.func.isRequired,
        mapPillProps: PropTypes.func.isRequired,
        mapCreateVariables: PropTypes.func,
        mapUpdateVariables: PropTypes.func,
        defaultPillProps: PropTypes.object,
        addButtonProps: PropTypes.object,
        mapDetailsProps: PropTypes.func,
        extractName: PropTypes.func,
        mapModalProps: PropTypes.func,
    };

    handleCreate = (...args) => {
        const variables = this.props.mapCreateVariables(...args, this.props);
        this.props.CRUD.onCreate(() => {
            this.props.withSelectProps.handleSelect({
                arguments: {
                    nodeId: variables.nodeId
                }
            });
        });
        this.props.CRUD.createItem({
            variables
        });
    }

    handleEdit = (...args) => this.props.CRUD.updateItem({
        variables: this.props.mapUpdateVariables(...args, this.props)
    });

    handleDelete = () => {
        this.props.CRUD.onDelete(this.props.withSelectProps.cancel);
        this.props.CRUD.deleteItem({
            variables: {
                nodeId: this.props.withSelectProps.selectedNID
            }
        });
    }

    render = () => {
        const {
            props,
            props: {
                itemClass,
                filters,
                sorts,
                sortItems,
                extractList,
                mapPillProps = props => props,
                defaultPillProps,
                addButtonProps,
                mapDetailsProps = props => props,
                BeforeList = () => null,
                Details = () => null,
                extractName = () => "",
                mapModalProps = props => props,
                CRUD,
                CRUD: {
                    queryStatus,
                },
                // withSelectProps,
                withSelectProps: {
                    selectedNID,
                    creating,
                    deleting,
                    cancel,
                    handleSelect,
                    handleCreateClick,
                    handleDeleteClick,
                },
            },
            handleCreate,
            handleEdit,
            handleDelete,
        } = this;

        const items = extractList(queryStatus) || [];

        const selectedItem = items.find(({ nodeId }) => nodeId === selectedNID)
            ||
            items[0]
            ||
            {};

        const detailsProps = mapDetailsProps({
            ...props,
            extractedList: items,
            selectedItem,
            data: queryStatus.data,
        });

        return (
            <div
                id={`${itemClass.replace(/ /g, '')}s`}
            >
                <HeadedListContainer
                    title={`${itemClass}s`}
                    filters={filters}
                    sorts={sorts}
                    beforeList={(
                        <BeforeList
                            {...detailsProps}
                        />
                    )}
                    list={{
                        items,
                        sort: sortItems,
                        renderItem: item => {
                            const {
                                nodeId,
                                ...pillProps
                            } = mapPillProps(item, selectedItem);
                            return (
                                <Pill
                                    tagname="li"
                                    onEdit={handleEdit}
                                    selected={nodeId === selectedItem.nodeId}
                                    danger={deleting && nodeId === selectedNID}
                                    onSelect={handleSelect}
                                    onDelete={handleDeleteClick}
                                    {...defaultPillProps}
                                    {...pillProps}
                                />
                            );
                        },
                        creating,
                        createItem: (
                            <Pill
                                tagname="li"
                                editing={true}
                                onEdit={handleCreate}
                                onBlur={cancel}
                                {...defaultPillProps}
                            />
                        ),
                        addButton: {
                            ...addButtonProps,
                            onAdd: handleCreateClick,
                        }
                    }}
                />
                <Details
                    {...detailsProps}
                />
                <Modal
                    title={`Delete ${itemClass}`}
                    display={deleting}
                    danger={true}
                    onFinish={handleDelete}
                    finishButtonText="Delete"
                    onCancel={cancel}
                    {...mapModalProps(selectedItem)}
                >
                    Are you sure you want to delete {itemClass} {extractName(selectedItem)}?
                </Modal>
            </div>
        );
    }
}

export default (CRUDOptions, options) => (
    withCRUD(CRUDOptions)(withSelect()(({
        CRUD,
        withSelectProps,
    }) => (
            <CRUDList
                {...{
                    CRUD,
                    withSelectProps,
                    ...options,
                }}
            />
        )))
);

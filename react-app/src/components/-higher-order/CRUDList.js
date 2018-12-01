import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withSelect from './withSelect';
import withCRUD from './withCRUD';
import HeadedListContainer from '../HeadedListContainer/HeadedListContainer';
import Pill from '../Pill/Pill';
import Modal from '../Modal/Modal';

class CRUDList extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        extractList: PropTypes.func.isRequired,
        mapPillProps: PropTypes.func.isRequired,
        mapCreateVariables: PropTypes.func,
        mapUpdateVariables: PropTypes.func,
        defaultPillProps: PropTypes.object,
        addButtonProps: PropTypes.object,
        mapDetailsProps: PropTypes.func,
        mapModalProps: PropTypes.func,
    };

    handleCreate = (...args) => {
        this.props.CRUD.onCreate(this.props.withSelectProps.cancel);
        this.props.CRUD.createItem({
            variables: this.props.mapCreateVariables(...args)
        });
    }

    handleEdit = (...args) => this.props.CRUD.updateItem({
        variables: this.props.mapUpdateVariables(...args)
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
                name,
                filters,
                sorts,
                extractList,
                mapPillProps = props => props,
                defaultPillProps,
                addButtonProps,
                mapDetailsProps = props => props,
                DetailsComponent,
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

        return (
            <div>
                <HeadedListContainer
                    title={`${name}s`}
                    filters={filters}
                    sorts={sorts}
                    list={{
                        items,
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
                {DetailsComponent ? (
                    <DetailsComponent
                        {...mapDetailsProps(props)}
                    />
                ) : null}
                <Modal
                    title={`Delete ${name}`}
                    display={deleting}
                    danger={true}
                    onFinish={handleDelete}
                    finishButtonText="Delete"
                    onCancel={cancel}
                    {...mapModalProps(selectedItem)}
                />
            </div>
        );
    }
}

export default (CRUDOptions, options = {}) => (
    DetailsComponent
) => (
        withCRUD(CRUDOptions)(withSelect()(({
            CRUD,
            withSelectProps,
        }) => (
                <CRUDList
                    {...{
                        CRUD,
                        withSelectProps,
                        DetailsComponent,
                        ...options,
                    }}
                />
            )))
    );

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CRUDWrapper from '../CRUDWrapper/CRUDWrapper';
import SelectionWrapper from '../SelectionWrapper/SelectionWrapper';
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
        extractName: PropTypes.func,
        mapModalProps: PropTypes.func,
        extractCreatedNID: PropTypes.func,
    };

    handleCreate = (...args) => {
        const variables = this.props.mapCreateVariables(...args, this.props);
        if (this.props.extractCreatedNID) {
            this.props.CRUD.onCreate((cache, { data }) => {
                this.props.withSelectProps.handleSelect({
                    arguments: {
                        nodeId: this.props.extractCreatedNID(data)
                    }
                });
            });
        } else {
            this.props.CRUD.onCreate(this.props.withSelectProps.cancel);
        }
        this.props.CRUD.createItem({
            variables
        });
    }

    handleEdit = ({ arguments: { nodeId } }, pillState) => this.props.CRUD.updateItem({
        variables: {
            nodeId,
            ...this.props.mapUpdateVariables(pillState, this.props)
        }
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
            props: {
                itemClass,
                parentItem,
                filters,
                sorts,
                sortItems,
                extractList,
                mapPillProps = props => props,
                defaultPillProps,
                addButtonProps,
                renderBeforeList = () => null,
                children = () => null,
                extractName = () => "",
                mapModalProps = props => props,
                canCreate,
                canUpdate,
                canDelete,
                multiSelect,
                CRUD,
                CRUD: {
                    queryStatus: {
                        data: queryData
                    },
                },
                withSelectProps,
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

        const items = extractList(queryData) || [];

        const selectedItem = items.find(({ nodeId }) => nodeId === selectedNID)
            ||
            items[0]
            ||
            {};

        const childProps = {
            CRUD,
            withSelectProps,
            extractedList: items,
            selectedItem,
            data: queryData,
        };

        return (
            <div
                id={`${itemClass.replace(/ /g, '')}s`}
            >
                <HeadedListContainer
                    title={`${
                        itemClass
                        }s${
                        parentItem ?
                            ` - ${parentItem}`
                            :
                            ''
                        }`}
                    filters={filters}
                    sorts={sorts}
                    beforeList={renderBeforeList(childProps)}
                    list={{
                        items,
                        sort: sortItems,
                        renderItem: item => {
                            const {
                                nodeId = item.nodeId,
                                arguments: args = { nodeId: item.nodeId },
                                ...pillProps
                            } = mapPillProps(item, selectedItem);
                            return (
                                <Pill
                                    key={nodeId}
                                    tagname="li"
                                    onEdit={(
                                        !multiSelect
                                        &&
                                        canUpdate
                                    ) ?
                                        handleEdit
                                        :
                                        () => { }
                                    }
                                    selected={(
                                        !creating
                                        &&
                                        nodeId === selectedItem.nodeId
                                    )}
                                    danger={(
                                        canDelete
                                        &&
                                        deleting
                                        &&
                                        nodeId === selectedNID
                                    )}
                                    onSelect={handleSelect}
                                    onDelete={(
                                        canDelete ?
                                            handleDeleteClick
                                            :
                                            () => { }
                                    )}
                                    arguments={args}
                                    {...defaultPillProps}
                                    {...pillProps}
                                />
                            );
                        },
                        creating: !!(
                            !multiSelect
                            &&
                            canCreate
                            &&
                            creating
                        ),
                        createItem: (
                            <Pill
                                tagname="li"
                                selected={true}
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
                {children(childProps)}
                {!multiSelect && canDelete ? (
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
                ) : null}
            </div>
        );
    }
}


export default function CRUDListWrapper({
    CRUDProps,
    CRUDProps: {
        create: {
            mutation: createMutation = false,
        } = {},
        update: {
            mutation: updateMutation = false,
        } = {},
        _delete: {
            mutation: deleteMutation = false,
        } = {},
    },
    ...props
}) {
    return (
        <CRUDWrapper
            {...CRUDProps}
        >
            {CRUD => (
                <SelectionWrapper>
                    {withSelectProps => (
                        <CRUDList
                            {...{
                                ...props,
                                canCreate: !!createMutation,
                                canUpdate: !!updateMutation,
                                canDelete: !!deleteMutation,
                                CRUD,
                                withSelectProps,
                            }}
                        />
                    )}
                </SelectionWrapper>
            )}
        </CRUDWrapper>
    );
}


// export default withSelect()(CRUDList);

// export default (CRUDOptions, options) => (
//     withCRUD(CRUDOptions)(withSelect()(props => (
//         <CRUDList
//             {...props}
//             {...options}
//         />
//     )))
// );

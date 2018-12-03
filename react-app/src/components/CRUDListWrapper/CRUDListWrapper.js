import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CRUDWrapper from '../CRUDWrapper/CRUDWrapper';
import SelectionWrapper from '../SelectionWrapper/SelectionWrapper';
import HeadedListContainer from '../HeadedListContainer/HeadedListContainer';
import Pill from '../Pill/Pill';
import Modal from '../Modal/Modal';
import MultiSelect from '../MultiSelect/MultiSelect';

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
                this.props.selection.handleSelect({
                    arguments: {
                        nodeId: this.props.extractCreatedNID(data)
                    }
                });
            });
        } else {
            this.props.CRUD.onCreate(this.props.selection.cancel);
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
        this.props.CRUD.onDelete(this.props.selection.cancel);
        this.props.CRUD.deleteItem({
            variables: {
                nodeId: this.props.selection.selectedNID
            }
        });
    }

    handleMultiSelectFinish = ({ addedItems, deletedItems }) => {
        console.log({ addedItems, deletedItems });
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
                mapPillProps = () => null,
                defaultPillProps,
                addButtonProps,
                renderBeforeList = () => null,
                children = () => null,
                extractName = () => "",
                mapModalProps = () => null,
                canCreate,
                canUpdate,
                canDelete,
                multiSelect,
                multiSelect: {
                    extractPreviousItems = () => [],
                    extractAllItems = () => [],
                    mapProps: mapMultiSelectProps = () => null,
                } = {},
                CRUD,
                CRUD: {
                    queryStatus: {
                        data: queryData
                    },
                },
                selection,
                selection: {
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
            handleMultiSelectFinish,
        } = this;

        const items = extractList(queryData) || [];

        const selectedItem = items.find(({ nodeId }) => nodeId === selectedNID)
            ||
            items[0]
            ||
            {};

        const childProps = {
            CRUD,
            selection,
            extractedList: items,
            selectedItem,
            data: queryData,
            creating,
            deleting,
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
                                        !multiSelect
                                        &&
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
                                        (
                                            multiSelect
                                            ||
                                            canDelete
                                        ) ?
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
                {multiSelect ? (
                    <MultiSelect
                        modalProps={{
                            display: !!(
                                deleting
                                ||
                                creating
                            ),
                            onCancel: cancel,
                            onFinish: handleMultiSelectFinish,
                            ...mapModalProps(selectedItem),
                        }}
                        previousItems={extractPreviousItems(queryData)}
                        allItems={extractAllItems(queryData)}
                        {...mapMultiSelectProps(childProps)}
                    />
                ) : canDelete ? (
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
                    {selection => (
                        <CRUDList
                            {...props}
                            canCreate={!!createMutation}
                            canUpdate={!!updateMutation}
                            canDelete={!!deleteMutation}
                            selection={selection}
                            CRUD={CRUD}
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

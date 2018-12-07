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
        const variables = this.props.mapCreateVariables(...args, this.props.CRUD.queryStatus.data);
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

    handleMultiSelectFinish = ({ arguments: { addedItems, deletedItems } }) => {
        console.log({ addedItems, deletedItems });

        // let count = addedItems.length + deletedItems.length;

        // const onComplete = () => {
        //     count--;
        //     if (!count) {
        //         this.props.selection.cancel();
        //     }
        // }

        // this.props.CRUD.onCreate(onComplete);
        // this.props.CRUD.onDelete(onComplete);

        this.props.CRUD.onCreate(this.props.selection.cancel);
        this.props.CRUD.onDelete(this.props.selection.cancel);

        addedItems.forEach(item => {
            console.log({
                variables: this.props.mapCreateVariables(item)
            });
            this.props.CRUD.createItem({
                variables: this.props.mapCreateVariables(item)
            });
        });

        deletedItems.forEach(item => {
            console.log("DELETING ITEM");
            console.log({
                variables: this.props.mapDeleteVariables(item)
            });
            this.props.CRUD.deleteItem({
                variables: this.props.mapDeleteVariables(item)
            });
        });
    }

    render = () => {
        const {
            props: {
                itemClass,
                parentItem,
                parentItems = [],
                filters,
                sorts,
                sortItems,
                extractList,
                mapPillProps = () => null,
                defaultPillProps,
                addButtonProps,
                canSelect,
                canCreate,
                renderBeforeList = () => null,
                children = () => null,
                extractName = () => "",
                mapModalProps = () => null,
                canUpdate,
                canDelete,
                multiSelect,
                multiSelect: {
                    extractPreviousItems = () => ({}),
                    extractAllItems = () => [],
                    mapPillProps: mapMultiSelectPillProps,
                    mapProps: mapMultiSelectProps = () => ({}),
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

        const titlePath = `${
            itemClass
            }s${
            parentItem ?
                ` - ${parentItem}`
                :
                parentItems ?
                    ` - ${parentItems.join(' > ')}`
                    :
                    ''
            }`;
        
        const nestLevel = parentItem ? 1 : parentItems.length;

        return (
            <div
                id={`${itemClass.replace(/ /g, '')}s`}
            >
                <HeadedListContainer
                    title={titlePath}
                    filters={filters}
                    sorts={sorts}
                    nestLevel={nestLevel}
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
                                        nodeId === selectedItem.nodeId
                                        &&
                                        (
                                            canSelect === true
                                            ||
                                            (
                                                !multiSelect
                                                &&
                                                !creating
                                            )
                                        )
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
                            title: `Update ${titlePath}`,
                            display: !!(
                                deleting
                                ||
                                creating
                            ),
                            onCancel: cancel,
                            onFinish: handleMultiSelectFinish,
                            ...mapModalProps(selectedItem),
                        }}
                        previousItems={items}
                        allItems={extractAllItems(queryData)}
                        mapPillProps={mapMultiSelectPillProps}
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

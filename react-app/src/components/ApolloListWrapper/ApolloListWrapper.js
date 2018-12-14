import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApolloWrapper from '../ApolloWrapper/ApolloWrapper';
import SelectionWrapper from '../SelectionWrapper/SelectionWrapper';
import HeadedListContainer from '../HeadedListContainer/HeadedListContainer';
import Pill from '../Pill/Pill';
import Modal from '../Modal/Modal';
import MultiSelect from '../MultiSelect/MultiSelect';

class ApolloList extends Component {

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
        const variables = this.props.mapCreateVariables(...args, this.props.apollo.queryStatus.data);
        if (this.props.extractCreatedNID) {
            this.props.apollo.onCreate((cache, { data }) => {
                this.props.selection.handleSelect({
                    arguments: {
                        nodeId: this.props.extractCreatedNID(data)
                    }
                });
            });
        } else {
            this.props.apollo.onCreate(this.props.selection.cancel);
        }
        this.props.apollo.createItem({
            variables
        });
    }

    handleEdit = ({ arguments: { nodeId } }, pillState) => this.props.apollo.updateItem({
        variables: {
            nodeId,
            ...this.props.mapUpdateVariables(pillState, this.props)
        }
    });

    handleDelete = () => {
        this.props.apollo.onDelete(this.props.selection.cancel);
        this.props.apollo.deleteItem({
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

        // this.props.apollo.onCreate(onComplete);
        // this.props.apollo.onDelete(onComplete);

        this.props.apollo.onCreate(this.props.selection.cancel);
        this.props.apollo.onDelete(this.props.selection.cancel);

        addedItems.forEach(item => {
            console.log({
                variables: this.props.mapCreateVariables(item)
            });
            this.props.apollo.createItem({
                variables: this.props.mapCreateVariables(item)
            });
        });

        deletedItems.forEach(item => {
            console.log("DELETING ITEM");
            console.log({
                variables: this.props.mapDeleteVariables(item)
            });
            this.props.apollo.deleteItem({
                variables: this.props.mapDeleteVariables(item)
            });
        });
    }

    render = () => {
        const {
            props: {
                itemClass,
                plural,
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
                renderAfterList = () => null,
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
                apollo,
                apollo: {
                    queryStatus: {
                        data: queryData
                    },
                    completeMutations,
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
            apollo,
            selection,
            extractedList: items,
            selectedItem,
            data: queryData,
            creating,
            deleting,
            completeMutations,
        };

        const titlePath = typeof plural === 'string' ?
            plural
            :
            `${
            itemClass
            }${
            plural !== false ?
                's'
                :
                ''
            }${
            parentItem ?
                ` - ${parentItem}`
                :
                parentItems.length ?
                    ` - ${parentItems.join(' > ')}`
                    :
                    ''
            }`;

        const nestLevel = parentItem ? 1 : parentItems.length;

        return (
            <div
                id={`${itemClass.replace(/ /g, '')}${plural !== false ? 's' : ''}`}
            >
                <HeadedListContainer
                    title={titlePath}
                    filters={filters}
                    sorts={sorts}
                    nestLevel={nestLevel}
                    beforeList={renderBeforeList(childProps)}
                    afterList={renderAfterList(childProps)}
                    list={{
                        items,
                        sort: sortItems,
                        renderItem: item => {

                            const {
                                nodeId = item.nodeId,
                                arguments: args = { nodeId: item.nodeId },
                                ...pillProps
                            } = mapPillProps(item, selectedItem);

                            const onEdit = !multiSelect && canUpdate ?
                                handleEdit
                                :
                                undefined;

                            const selected = nodeId === selectedItem.nodeId && (
                                canSelect === true
                                ||
                                (
                                    !multiSelect
                                    &&
                                    !creating
                                )
                            );

                            const danger = canDelete && deleting && nodeId === selectedNID;

                            const onDelete = multiSelect || canDelete ?
                                handleDeleteClick
                                :
                                undefined;

                            return (
                                <Pill
                                    key={nodeId}
                                    tagname="li"
                                    onEdit={onEdit}
                                    selected={selected}
                                    danger={danger}
                                    onSelect={handleSelect}
                                    onDelete={onDelete}
                                    arguments={args}
                                    {...defaultPillProps}
                                    {...pillProps}
                                />
                            );
                        },
                        creating: !!(!multiSelect && canCreate && creating),
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
                        addButton: canCreate &&!creating ? (
                            {
                                onAdd: handleCreateClick,
                                ...addButtonProps,
                            }
                        ) : undefined
                    }}
                />
                <div className="nested" >
                    {children(childProps)}
                </div>
                {multiSelect ? (
                    <MultiSelect
                        modalProps={{
                            title: `Update ${titlePath}`,
                            display: !!(deleting || creating),
                            onCancel: cancel,
                            onFinish: handleMultiSelectFinish,
                            ...mapModalProps(selectedItem),
                        }}
                        selectedNID={selectedNID}
                        creating={creating}
                        deleting={deleting}
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
                        Are you sure you want to delete {itemClass} "{extractName(selectedItem)}"?
                    </Modal>
                ) : null}
            </div>
        );
    }
}


export default function ApolloListWrapper({
    apolloProps,
    apolloProps: {
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
        <ApolloWrapper
            {...apolloProps}
        >
            {apollo => (
                <SelectionWrapper>
                    {selection => (
                        <ApolloList
                            canCreate={!!createMutation}
                            canUpdate={!!updateMutation}
                            canDelete={!!deleteMutation}
                            selection={selection}
                            apollo={apollo}
                            {...props}
                        />
                    )}
                </SelectionWrapper>
            )}
        </ApolloWrapper>
    );
}

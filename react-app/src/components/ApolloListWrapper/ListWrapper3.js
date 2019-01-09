import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectionWrapper from '../SelectionWrapper/SelectionWrapper';
import HeadedListContainer from '../HeadedListContainer/HeadedListContainer';
import Pill from '../Pill/Pill';
import MultiSelect from '../MultiSelect/MultiSelect';

class List extends Component {

    static propTypes = {
        title: PropTypes.string,
        label: PropTypes.string,
        parent: PropTypes.string,
        items: PropTypes.array.isRequired,
        mapPillProps: PropTypes.func.isRequired,
        canSelect: PropTypes.bool,
        onCreate: PropTypes.func,
        onUpdate: PropTypes.func,
        onDelete: PropTypes.func,
        children: PropTypes.func,
        multiSelect: PropTypes.shape({

        })
    };

    handleMultiSelectFinish = ({ arguments: { addedItems, deletedItems } }) => {
        console.log({ addedItems, deletedItems });
        addedItems.forEach(this.props.onCreate);
        deletedItems.forEach(this.props.onDelete);
        this.props.selection.cancel();
    }

    render = () => {
        const {
            props: {
                title,
                parent,
                label,
                items,
                defaultPillProps,
                mapPillProps,
                addButton,
                canSelect = true,
                onDisabledSelect,
                onCreate,
                onUpdate,
                onDelete,
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
        } = this;

        const selectedItem = items.find(({ nodeId }) => nodeId === selectedNID)
            ||
            items[0]
            ||
            {};

        return (
            <div className="ListWrapper3">
                <HeadedListContainer
                    title={title}
                    label={label}
                    list={{
                        items,
                        renderItem: item => {

                            const { nodeId } = item;

                            const args = { nodeId };

                            const selected = nodeId === selectedItem.nodeId && (
                                canSelect
                                ||
                                (
                                    !multiSelect
                                    &&
                                    !creating
                                )
                            );

                            const danger = onDelete && deleting && nodeId === selectedNID;

                            const _delete = multiSelect ? handleDeleteClick : onDelete;

                            const select = multiSelect ? handleDeleteClick : handleSelect;

                            return (
                                <Pill
                                    key={nodeId}
                                    tagname="li"
                                    selected={selected}
                                    danger={danger}
                                    onSelect={select}
                                    onDisabledSelect={onDisabledSelect}
                                    onEdit={onUpdate}
                                    onDelete={_delete}
                                    arguments={args}
                                    // n={console.log(item)}
                                    {...defaultPillProps}
                                    {...mapPillProps(item)}
                                />
                            );
                        },
                        creating: !!(!multiSelect && onCreate && creating),
                        createItem: (
                            <Pill
                                {...defaultPillProps}
                                tagname="li"
                                selected={true}
                                editing={true}
                                onEdit={onCreate}
                                onBlur={cancel}
                            />
                        ),
                        addButton: (onCreate || addButton) && !creating ? (
                            {
                                onAdd: handleCreateClick,
                                ...addButton,
                            }
                        ) : undefined
                    }}
                />
                {children ? (
                    <div className="nested">
                        {children(selectedItem)}
                    </div>
                ) : null}
                {multiSelect ? (
                    <MultiSelect
                        modalProps={{
                            title: multiSelectTitle || title ?
                                `Update ${title}`
                                :
                                label ?
                                    `Update ${label}`
                                    :
                                    '',
                            display: !!(deleting || creating),
                            onCancel: cancel,
                            onFinish: handleMultiSelectFinish,
                            // ...mapModalProps(selectedItem),
                        }}
                        listTitle={title ?
                            `All ${title}`
                            :
                            label ?
                                `All ${label}`
                                :
                                ''}
                        selection={selection}
                        previousItems={items.map(mapPreviousItems)}
                        allItems={allItems}
                        mapPillProps={mapPillProps}
                    // {...mapMultiSelectProps(childProps)}
                    />
                ) : null}
            </div>
        );
    }
}


export default function ListWrapper3({
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

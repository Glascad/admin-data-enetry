import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectionWrapper from '../SelectionWrapper/SelectionWrapper';
import HeadedListContainer from '../HeadedListContainer/HeadedListContainer';
import Pill from '../Pill/Pill';
import MultiSelect from '../MultiSelect/MultiSelect';

class List extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
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
    }

    render = () => {
        const {
            props: {
                title,
                parent,
                items,
                mapPillProps,
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
                    mapPillProps: mapMultiSelectPillProps,
                    mapPreviousItems = item => item,
                } = {},
                children,
            },
            handleMultiSelectFinish,
        } = this;

        // console.log(this);

        const selectedItem = items.find(({ nodeId }) => nodeId === selectedNID)
            ||
            items[0]
            ||
            {};

        return (
            <div className="ListWrapper3">
                <HeadedListContainer
                    title={title}
                    list={{
                        items,
                        renderItem: item => {

                            const nodeId = item.nodeId;

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

                            return (
                                <Pill
                                    key={nodeId}
                                    tagname="li"
                                    selected={selected}
                                    danger={danger}
                                    onSelect={handleSelect}
                                    onDisabledSelect={onDisabledSelect}
                                    onEdit={onUpdate}
                                    onDelete={_delete}
                                    arguments={args}
                                    // n={console.log(item)}
                                    {...mapPillProps(item)}
                                />
                            );
                        },
                        creating: !!(!multiSelect && onCreate && creating),
                        createItem: (
                            <Pill
                                tagname="li"
                                selected={true}
                                editing={true}
                                onEdit={onCreate}
                                onBlur={cancel}
                            />
                        ),
                        addButton: onCreate && !creating ? (
                            {
                                onAdd: handleCreateClick,
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
                            title: multiSelectTitle || `Update ${title}`,
                            display: !!(deleting || creating),
                            onCancel: cancel,
                            onFinish: handleMultiSelectFinish,
                            // ...mapModalProps(selectedItem),
                        }}
                        selection={selection}
                        previousItems={items.map(mapPreviousItems)}
                        allItems={allItems}
                        mapPillProps={mapMultiSelectPillProps}
                    // {...mapMultiSelectProps(childProps)}
                    />
                ) : null}
            </div>
        );
    }
}


export default function ListWrapper3(props) {
    return (
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

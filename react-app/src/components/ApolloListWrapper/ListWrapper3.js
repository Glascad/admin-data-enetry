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
        title: PropTypes.string.isRequired,
        parent: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        mapPillProps: PropTypes.func.isRequired,
        canSelect: PropTypes.bool,
        onCreate: PropTypes.func,
        onUpdate: PropTypes.func,
        onDelete: PropTypes.func,
        children: PropTypes.func,
    };

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
                children = () => null,
            }
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

                            return (
                                <Pill
                                    key={nodeId}
                                    tagname="li"
                                    selected={selected}
                                    danger={danger}
                                    onSelect={handleSelect}
                                    onDisabledSelect={onDisabledSelect}
                                    onEdit={onUpdate}
                                    onDelete={onDelete}
                                    arguments={args}
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
                <div className="nested">
                    {children(selectedItem)}
                </div>
            </div>
        );
    }
}


export default function ApolloListWrapper(props) {
    return (
        <SelectionWrapper>
            {selection => (
                <ApolloList
                    selection={selection}
                    {...props}
                />
            )}
        </SelectionWrapper>
    );
}

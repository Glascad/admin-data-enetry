import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Pill from '../Pill/Pill';
import oldMultiSelect from '../MultiSelect/oldMultiSelect';
import MultiSelect from '../MultiSelect/MultiSelect';
import Modal from '../Modal/Modal';
import ListContainer from '../ListContainer/ListContainer';
import CircleButton from '../CircleButton/CircleButton';

import useSelection, { selectionProps } from '../../hooks/use-selection';
import customPropTypes from '../../utils/custom-prop-types';
import TitleBar from '../TitleBar/TitleBar';

class List extends PureComponent {

    static propTypes = {
        mapPillProps: customPropTypes.deprecated(PropTypes.func, "Don't use map pill props"),
        titleBar: PropTypes.shape(TitleBar.propTypes),
        label: customPropTypes.renderable,
        identifier: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        items: PropTypes.arrayOf(PropTypes.shape(Pill.propTypes)),
        defaultPillProps: PropTypes.shape(Pill.propTypes),
        circleButton: PropTypes.shape(CircleButton.propTypes),
        onDisabledSelect: PropTypes.func,
        onCreate: PropTypes.func,
        onFinish: PropTypes.func,
        onUpdate: PropTypes.func,
        onDelete: PropTypes.func,
        deleteModal: PropTypes.shape(Modal.propTypes),
        selection: selectionProps,
        multiSelect: PropTypes.shape({
            ...MultiSelect.propTypes,
            allItems: PropTypes.arrayOf(PropTypes.shape(Pill.propTypes)),
            mapPreviousItems: customPropTypes.deprecated(PropTypes.func, "Don't use map previous items"),
            title: customPropTypes.renderable,
        }),
        children: customPropTypes.renderable,
    };

    static defaultProps = {
        identifier: "nodeId",
    };

    handleDelete = async () => {
        const {
            props: {
                selection: {
                    cancel,
                    selectedNID,
                },
                onDelete,
                identifier,
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
        // console.log({ addedItems, deletedItems });
        try {
            await this.props.onFinish ?
                this.props.onFinish({ addedItems, deletedItems })
                :
                Promise.all([
                    ...addedItems.map(this.props.onCreate),
                    ...deletedItems.map(this.props.onDelete),
                ]);
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
                identifier,
                items,
                defaultPillProps,
                mapPillProps,
                circleButton,
                onDisabledSelect,
                onCreate,
                onFinish,
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
                    allItems,
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
                                {...(mapPillProps ?
                                    mapPillProps(item)
                                    :
                                    item)}
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
                    ) : !creating && (onCreate || onFinish || multiSelect || circleButton) ? (
                        <CircleButton
                            data-cy="add-button"
                            actionType="add"
                            {...circleButton}
                            className={(circleButton && circleButton.className) || "action"}
                            onClick={onCreate || onFinish ?
                                handleCreateClick
                                :
                                circleButton ?
                                    circleButton.onClick
                                    :
                                    undefined}
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
                        identifier={identifier}
                        list={{
                            titleBar: {
                                title: `All ${title || label || ''}`,
                            },
                        }}
                        selection={selection}
                        previousItems={items.map(mapPreviousItems)}
                        otherItems={allItems.filter(({ [identifier]: id }) => !items.some(item => id === item[identifier]))}
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
                        finishButtonText="Delete"
                        finishingText="Deleting"
                        danger={true}
                    >
                        Are you sure you want to delete {
                            modalName.toLowerCase()
                        }: {
                            mapPillProps ?
                                mapPillProps(selectedItem).title
                                :
                                selectedItem.title
                        }?
                    </Modal>
                ) : null}
                {children ? (
                    <div
                        className={`nested ${
                            Object.keys(selectedItem).length === 0 ?
                                "disabled"
                                :
                                ""
                            }`}
                    >
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
    identifier,
}) {

    const selection = useSelection(identifier);

    return stateManager ? (
        <List
            {...arguments[0]}
            selection={{
                selectedNID: state[id] && state[id][identifier],
                handleSelect: update(id),
                selectable: true,
            }}
        />
    ) : (
            <List
                {...arguments[0]}
                selection={selection}
            />
        );
}

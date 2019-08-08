import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Modal from '../Modal/Modal';
import Pill from '../Pill/Pill';
import ListContainer from '../ListContainer/ListContainer';

import './MultiSelect.scss';
import TitleBar from '../TitleBar/TitleBar';

MultiSelect.propTypes = {
    modal: PropTypes.shape(Modal.propTypes),
    list: PropTypes.shape({
        titleBar: PropTypes.shape(TitleBar.propTypes)
    }),
    identifier: PropTypes.string,
    previousItems: PropTypes.arrayOf(PropTypes.shape(Pill.propTypes)),
    otherItems: PropTypes.arrayOf(PropTypes.shape(Pill.propTypes)),
};

export default function MultiSelect({
    modal,
    modal: {
        display,
    },
    list: {
        titleBar
    },
    identifier = 'nodeId',
    previousItems = [],
    otherItems = [],
}) {

    const [addedItems, setAdded] = useState([]);
    const [deletedItems, setRemoved] = useState([]);

    useEffect(() => {
        setAdded([]);
        setRemoved([]);
    }, [display]);

    const onClick = ({ arguments: { item, preSelected, currentlySelected } }) => {
        if (preSelected) {
            if (currentlySelected) setRemoved(deletedItems.concat(item));
            else setRemoved(deletedItems.filter(({ [identifier]: id }) => id !== item[identifier]));
        } else {
            if (currentlySelected) setAdded(addedItems.filter(({ [identifier]: id }) => id !== item[identifier]));
            else setAdded(addedItems.concat(item));
        }
    }

    const items = previousItems.map(item => ({
        currentlySelected: !deletedItems.some(({ [identifier]: id }) => id === item[identifier]),
        preSelected: true,
        item,
    })).concat(otherItems.map(item => ({
        currentlySelected: addedItems.some(({ [identifier]: id }) => id === item[identifier]),
        preSelected: false,
        item,
    })));

    const [top, bottom] = _.partition(items, ({ preSelected, currentlySelected }) => preSelected || currentlySelected);


    return (
        <Modal
            className="MultiSelect"
            arguments={{
                addedItems,
                deletedItems
            }}
            {...modal}
        >
            <ListContainer
                items={top}
                renderItem={({ item, currentlySelected, preSelected }, i) => (
                    <Pill
                        key={item[identifier]}
                        tagname="li"
                        selected={!preSelected}
                        danger={!currentlySelected}
                        arguments={{ item, currentlySelected, preSelected }}
                        onSelect={onClick}
                        onDelete={onClick}
                        {...item}
                        title={item.title}
                    />
                )}
            />
            <ListContainer
                titleBar={titleBar}
                items={bottom}
                renderItem={({ item }) => (
                    <Pill
                        key={item[identifier]}
                        tagname="li"
                        onSelect={onClick}
                        arguments={{ item }}
                        {...item}
                        title={item.title}
                    />
                )}
            />
        </Modal>
    );
}

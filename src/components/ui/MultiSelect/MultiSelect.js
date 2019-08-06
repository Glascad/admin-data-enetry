import React, { useState } from 'react';

import _ from 'lodash';
import Modal from '../Modal/Modal';
import Pill from '../Pill/Pill';
import ListContainer from '../ListContainer/ListContainer';

import './MultiSelect.scss';

export default function MultiSelect({
    modal,
    list: {
        titleBar
    },
    identifier = 'nodeId',
    previousItems = [],
    otherItems = [],
}) {

    const [added, setAdded] = useState([]);
    const [removed, setRemoved] = useState([]);

    const onClick = ({ arguments: { item, preSelected, currentlySelected } }) => {
        if (preSelected) {
            if (currentlySelected) setRemoved(removed.concat(item));
            else setRemoved(removed.filter(({ [identifier]: id }) => id !== item[identifier]));
        } else {
            if (currentlySelected) setAdded(added.filter(({ [identifier]: id }) => id !== item[identifier]));
            else setAdded(added.concat(item));
        }
    }

    const items = previousItems.map(item => ({
        currentlySelected: !removed.some(({ [identifier]: id }) => id === item[identifier]),
        preSelected: true,
        item,
    })).concat(otherItems.map(item => ({
        currentlySelected: added.some(({ [identifier]: id }) => id === item[identifier]),
        preSelected: false,
        item,
    })));

    const [top, bottom] = _.partition(items, ({ preSelected, currentlySelected }) => preSelected || currentlySelected);


    return (
        <Modal
            className="MultiSelect"
            arguments={{ items }}
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
                        title={item.title}
                    />
                )}
            />
        </Modal>
    );

}

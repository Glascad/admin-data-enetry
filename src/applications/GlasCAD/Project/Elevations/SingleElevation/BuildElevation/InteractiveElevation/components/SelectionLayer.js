import React, { PureComponent } from 'react';

import { withContext } from '../../../../../../../../components';

import { SelectionContext } from '../../contexts/SelectionContext';

import SelectedItem from './SelectedItem';

import Detail from './Detail';

import { unique } from '../../../../../../../../utils';

class SelectionLayer extends PureComponent {
    render = () => {
        const {
            props: {
                context: {
                    items,
                    items: {
                        length,
                    },
                    selectItem,
                },
            },
        } = this;

        console.log(this);

        const detailsToRender = unique(items
            .reduce((all, {
                // if frame is selected
                details = [],
                // if container is selected
                allDetails = [],
            }) => all.concat(details, allDetails),
                []));

        return (
            <div id="SelectionLayer" >
                {items.map((item, i) => (
                    <SelectedItem
                        key={item.refId}
                        item={item}
                        selectItem={selectItem}
                        lastSelected={i === length - 1}
                    />
                ))}
                {detailsToRender.map(detail => (
                    <Detail
                        key={detail.refId}
                        detail={detail}
                    />
                ))}
            </div>
        );
    }
}

export default withContext(SelectionContext)(SelectionLayer);

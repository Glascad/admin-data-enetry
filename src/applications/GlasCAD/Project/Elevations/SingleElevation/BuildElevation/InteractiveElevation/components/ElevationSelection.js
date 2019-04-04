import React, { PureComponent } from 'react';

import { withContext } from '../../../../../../../../components';

import { SelectionContext } from '../../contexts/SelectionContext';

import SelectedItem from './SelectedItem';

class Selection extends PureComponent {
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

        return (
            <div id="ElevationSelection" >
                {items.map((item, i) => (
                    <SelectedItem
                        key={item.refId}
                        item={item}
                        selectItem={selectItem}
                        lastSelected={i === length - 1}
                    />
                ))}
            </div>
        );
    }
}

export default withContext(SelectionContext)(Selection);

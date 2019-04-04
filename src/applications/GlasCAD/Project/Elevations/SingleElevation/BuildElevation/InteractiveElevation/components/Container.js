import React, { PureComponent } from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';
import { withContext } from '../../../../../../../../components';

class Container extends PureComponent {

    handleClick = () => this.props.context.selectItem(this.props.container);

    render = () => {
        const {
            props: {
                context: {
                    itemsByRefId,
                    items,
                    items: {
                        0: firstItem,
                        length,
                    },
                },
                container,
                container: {
                    refId,
                    class: RecursiveContainer,
                    customRoughOpening,
                    placement: {
                        x,
                        y,
                        height,
                        width,
                    },
                },
                tabIndex,
            },
            handleClick,
        } = this;

        return (
            <div
                id={refId}
                className={`Container ${
                    customRoughOpening ?
                        'custom-rough-opening'
                        :
                        ''
                    } ${
                    refId in itemsByRefId ?
                        'selected'
                        :
                        ''
                    } ${
                    items[length - 1] === container ?
                        'last-selected'
                        :
                        ''
                    } ${(
                        !length
                        ||
                        typeof firstItem === 'string'
                        ||
                        (firstItem.class === RecursiveContainer)
                    ) ?
                        'selectable'
                        :
                        ''
                    }`}
                style={{
                    left: ~~x,
                    bottom: ~~y,
                    height: ~~height,
                    width: ~~width,
                }}
                onClick={handleClick}
                tabIndex={tabIndex}
            >
                <div className="text">
                    {refId.replace(/\D*/, '*')}
                </div>
            </div>
        );
    }
}

export default withContext(SelectionContext, p => p, { pure: true })(Container);

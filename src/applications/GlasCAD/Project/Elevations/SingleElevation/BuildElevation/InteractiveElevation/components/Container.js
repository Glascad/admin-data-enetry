import React, { PureComponent } from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';

import { withContext } from '../../../../../../../../components';

class Container extends PureComponent {

    handleClick = () => this.props.selectable && this.props.selectItem(this.props.container);

    render = () => {
        const {
            props: {
                selectable,
                container: {
                    refId,
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
                    selectable ?
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

const mapProps = ({
    context: {
        selectItem,
        items: {
            0: {
                class: SelectedClass,
            } = {},
            length,
        },
    },
    container: {
        class: RecursiveContainer,
        customRoughOpening,
    },
}) => ({
    context: undefined,
    selectItem,
    selectable: !customRoughOpening && (
        length === 0
        ||
        SelectedClass === RecursiveContainer
    ),
});

export default withContext(SelectionContext, mapProps, { pure: true })(Container);

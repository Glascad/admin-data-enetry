import React, { PureComponent } from 'react';

export default class Frame extends PureComponent {

    handleClick = () => this.props.selectItem(this.props._frame);

    render = () => {
        const {
            props: {
                _frame: {
                    refId,
                    vertical,
                    registerReactComponent,
                    placement: {
                        x,
                        y,
                        height,
                        width,
                    } = {},
                },
                selectable,
            },
            handleClick,
        } = this;

        registerReactComponent(this);

        return (
            <div
                id={refId}
                className={`frame-wrapper ${
                    vertical ?
                        'vertical'
                        :
                        'horizontal'
                    }`}
                style={selectable ?
                    {
                        left: x - 10,
                        bottom: y - 10,
                        height: height + 20,
                        width: width + 20,
                    } : {
                        left: x,
                        bottom: y,
                        height,
                        width,
                    }}
                onClick={handleClick}
            >
                <div
                    className="Frame"
                    style={{
                        height,
                        width,
                    }}
                />
            </div>
        );
    }
}

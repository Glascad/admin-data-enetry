import React, { PureComponent } from 'react';
import { pixelsPerInch } from '../../contexts/TransformContext';
import { transformProps } from '../../../../../../../../components';

class Frame extends PureComponent {

    handleClick = () => this.props.selectItem(this.props._frame);

    render = () => {
        const {
            props: {
                _frame: {
                    refId,
                    vertical,
                    registerReactComponent,
                },
                scaledPlacement: {
                    x,
                    y,
                    height,
                    width,
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

export default transformProps(({
    _frame: {
        placement: {
            x,
            y,
            height,
            width,
        },
    },
}) => ({
    scaledPlacement: {
        x: pixelsPerInch * x,
        y: pixelsPerInch * y,
        height: pixelsPerInch * height,
        width: pixelsPerInch * width,
    },
}))(Frame);

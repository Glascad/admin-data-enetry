import React, { PureComponent } from 'react';
import { pixelsPerInch, withTransformContext } from '../../contexts/TransformContext';
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
                transform: {
                    scale: {
                        x: scaleX,
                    },
                },
                selectable,
            },
            handleClick,
        } = this;

        registerReactComponent(this);

        const padding = 10 / scaleX;

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
                        left: x - padding,
                        bottom: y - padding,
                        height: height + (2 * padding),
                        width: width + (2 * padding),
                        // background: `rgba(0, 0, 128, 0.2)`,
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
}))(withTransformContext(Frame));

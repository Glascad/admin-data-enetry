import React, { PureComponent } from 'react';
import { transformProps } from '../../../../../../../../components';
import { pixelsPerInch, withTransformContext } from '../../contexts/TransformContext';

const ContainerId = withTransformContext(({ refId, transform: { scale: { x, y } } }) => (
    <div className="text">
        <div
            style={{
                transform: `scale(${1 / x}, ${1 / y})`,
            }}
        >
            {
                refId
                    .replace(/\D*/, '*')
                    .replace(/</, '*')
                    .replace(/>/, '*')
                    .split('*')
                    .filter(Boolean)
                    .map((text, i) => (
                        <span key={i}>{text}</span>
                    ))
                // .replace(/<.*/, '')
            }
        </div>
    </div>
));

class Container extends PureComponent {

    handleClick = () => this.props.selectItem(this.props.container);

    render = () => {
        const {
            props: {
                container: {
                    refId,
                    customRoughOpening,
                    registerReactComponent,
                },
                scaledPlacement: {
                    x,
                    y,
                    height,
                    width,
                },
                tabIndex,
            },
            handleClick,
        } = this;

        registerReactComponent(this);

        return (
            <div
                id={refId}
                className={`Container ${
                    customRoughOpening ?
                        'custom-rough-opening'
                        :
                        ''
                    }`}
                style={{
                    left: x,
                    bottom: y,
                    height,
                    width,
                }}
                onClick={handleClick}
                tabIndex={tabIndex}
            >
                <ContainerId
                    refId={refId}
                />
            </div>
        );
    }
}

export default transformProps(({
    container: {
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
}))(Container);

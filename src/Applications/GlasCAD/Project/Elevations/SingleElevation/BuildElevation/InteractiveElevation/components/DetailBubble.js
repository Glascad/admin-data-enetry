import React, { PureComponent } from 'react';
import { withTransformContext } from '../../contexts/TransformContext';

class DetailBubble extends PureComponent {

    handleClick = e => {
        e.stopPropagation();
        this.props.selectItem(this.props.detail);
    }

    render = () => {
        const {
            props: {
                transform: {
                    scale: {
                        x: scaleX,
                        y: scaleY,
                    },
                },
                detail: {
                    detailId,
                },
            },
            handleClick,
        } = this;

        return (
            <div
                className={`detail-bubble-placement`}
                onClick={handleClick}
                style={{
                    transform: `scale(${1 / scaleX}, ${1 / scaleY})`
                }}
            >
                <button
                    className="DetailBubble"
                >
                    <span className="detail-id">
                        {detailId}
                    </span>
                </button>
                <div className="detail-pointer">
                    <div className="detail-pointer-white" />
                </div>
            </div>
        );
    }
}

export default withTransformContext(DetailBubble);

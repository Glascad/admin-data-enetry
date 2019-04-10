import React, { PureComponent } from 'react';

export default class DetailBubble extends PureComponent {

    handleClick = e => {
        e.stopPropagation();
        this.props.selectItem(this.props.detail);
    }

    render = () => {
        const {
            props: {
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
            >
                <button
                    className="DetailBubble"
                >
                    <span className="detail-id">
                        {detailId}
                    </span>
                    <div className="detail-pointer" />
                </button>
            </div>
        );
    }
}
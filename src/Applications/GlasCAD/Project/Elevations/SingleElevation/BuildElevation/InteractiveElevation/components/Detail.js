import React, { PureComponent } from 'react';

import DetailBubble from './DetailBubble';

export default class Detail extends PureComponent {

    handleClick = () => {
        this.props.unselectItem(this.props.detail);
        this.props.selectItem(this.props.detail._frame);
    }

    render = () => {
        const {
            props: {
                itemsByRefId,
                detail,
                detail: {
                    exists,
                    refId,
                    vertical,
                    registerReactComponent,
                    _frame: {
                        refId: frameRefId,
                    } = {},
                    placement: {
                        x,
                        y,
                        height,
                        width,
                    },
                    firstContainer,
                    firstContainer: {
                        refId: firstContainerRefId,
                    } = {},
                    secondContainer: {
                        refId: secondContainerRefId,
                    } = {},
                },
                selectItem,
            },
            handleClick,
        } = this;
        
        registerReactComponent(this);

        if (!exists) return null;

        return (
            <div
                id={refId}
                className={`Detail ${
                    frameRefId in itemsByRefId ?
                        'frame-selected'
                        :
                        firstContainerRefId in itemsByRefId ?
                            'first-container-selected'
                            :
                            secondContainerRefId in itemsByRefId ?
                                'second-container-selected'
                                :
                                'detail-selected'
                    } ${
                    firstContainer ?
                        ''
                        :
                        'no-first-container'
                    } ${
                    vertical ?
                        'vertical'
                        :
                        'horizontal'
                    }`}
                style={{
                    left: x,
                    bottom: y,
                    height,
                    width,
                }}
                onClick={handleClick}
            >
                <DetailBubble
                    selectItem={selectItem}
                    detail={detail}
                />
            </div>
        );
    }
}
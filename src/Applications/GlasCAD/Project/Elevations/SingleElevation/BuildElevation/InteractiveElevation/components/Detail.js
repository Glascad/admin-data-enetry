import React, { PureComponent } from 'react';

import DetailBubble from './DetailBubble';
import { transformProps } from '../../../../../../../../components';
import { pixelsPerInch } from '../../contexts/TransformContext';

class Detail extends PureComponent {

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
                    id,
                    exists,
                    refId,
                    vertical,
                    registerReactComponent,
                    _frame: {
                        refId: frameRefId,
                    } = {},
                    firstContainer,
                    firstContainer: {
                        refId: firstContainerRefId,
                    } = {},
                    secondContainer: {
                        refId: secondContainerRefId,
                    } = {},
                },
                scaledPlacement: {
                    x,
                    y,
                    height,
                    width,
                },
                selectItem,
                containerIsSelected,
                cancelSelection,
            },
            handleClick,
        } = this;

        registerReactComponent(this);

        if (!exists) return null;

        return (
            <div
                id={refId}
                data-cy={`detail-${id}`}
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
                    cancelSelection={cancelSelection}
                    selectItem={selectItem}
                    detail={detail}
                    containerIsSelected={containerIsSelected}
                />
            </div>
        );
    }
}

export default transformProps(({
    detail: {
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
}))(Detail);

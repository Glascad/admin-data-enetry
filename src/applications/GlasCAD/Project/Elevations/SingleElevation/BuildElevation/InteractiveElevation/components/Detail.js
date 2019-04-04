import React, { PureComponent } from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';

import DetailBubble from './DetailBubble';
import { withContext } from '../../../../../../../../components';

class Detail extends PureComponent {

    handleClick = () => this.props.context.selectItem(this.props.detail);

    render = () => {
        const {
            props: {
                context: {
                    itemsByRefId,
                },
                detail,
                detail: {
                    refId,
                    vertical,
                    _frame: {
                        refId: frameRefId,
                    },
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
            },
            handleClick,
        } = this;

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
                                ''
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
                    left: ~~x,
                    bottom: ~~y,
                    height: ~~height,
                    width: ~~width,
                }}
                onClick={handleClick}
            >
                <DetailBubble
                    detail={detail}
                />
            </div>
        );
    }
}

export default withContext(SelectionContext, undefined, { pure: true })(Detail);

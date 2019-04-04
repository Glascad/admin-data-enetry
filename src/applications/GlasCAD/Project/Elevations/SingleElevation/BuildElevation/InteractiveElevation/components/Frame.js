import React, { PureComponent } from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';

import { withContext } from '../../../../../../../../components';

import Detail from './Detail';

class Frame extends PureComponent {
    render = () => {
        const {
            props: {
                context: {
                    itemsByRefId,
                    items,
                    items: {
                        0: firstItem,
                        length,
                    },
                    selectItem,
                },
                _frame,
                _frame: {
                    refId,
                    vertical,
                    class: RecursiveFrame,
                    placement: {
                        x,
                        y,
                        height,
                        width,
                    } = {},
                    details,
                },
            },
        } = this;
        return (
            <div
                className={`frame-hover-wrapper ${
                    refId in itemsByRefId ?
                        'selected'
                        :
                        ''
                    } ${
                    !length || typeof firstItem === 'string' || (
                        firstItem.class === RecursiveFrame
                        &&
                        firstItem.vertical === vertical
                    ) ?
                        'selectable'
                        :
                        ''
                    } ${
                    vertical ?
                        'vertical'
                        :
                        'horizontal'
                    }`}
                onClick={() => selectItem(_frame)}
            >
                <div className="detail-wrapper">
                    {details.map(detail => (
                        <Detail
                            key={detail.refId}
                            detail={detail}
                        />
                    ))}
                </div>
                <div
                    // to make selecting a frame less difficult
                    className="frame-wrapper"
                    style={{
                        left: x - 10,
                        bottom: y - 10,
                        height: height + 20,
                        width: width + 20,
                    }}
                >
                    <div
                        id={refId}
                        className="Frame"
                        style={{
                            height,
                            width,
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default withContext(SelectionContext, undefined, { pure: true })(Frame);

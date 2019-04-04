import React from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';

import Detail from './Detail';

export default function Frame({
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
}) {
    return (
        <SelectionContext.Consumer>
            {({
                items,
                items: {
                    0: firstItem,
                    length,
                },
                selectItem,
            }) => (
                    <div
                        className={`frame-hover-wrapper ${
                            items.some(f => f.refId === refId) ?
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
                    >
                        {/* <div className="detail-wrapper">
                            {details.map(detail => (
                                <Detail
                                    key={detail.refId}
                                    detail={detail}
                                />
                            ))}
                        </div> */}
                        <div
                            // to make selecting a frame less difficult
                            className="frame-wrapper"
                            onClick={() => selectItem(_frame)}
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
                )}
        </SelectionContext.Consumer>
    );
}

import React from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';

export default function Detail({
    detail: {
        refId,
        vertical,
        _frame,
        class: RecursiveDetail,
        placement: {
            x,
            y,
            height,
            width,
        },
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
                        id={refId}
                        className={`Detail ${
                            items.some(f => f.refId === refId) ?
                                'selected'
                                :
                                ''
                            } ${
                            !length || typeof firstItem === 'string' || (
                                firstItem.class === RecursiveDetail
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
                                ''
                            }`}
                        style={{
                            left: x,
                            bottom: y,
                            height: height,
                            width: width,
                        }}
                        onClick={() => selectItem(_frame)}
                    />
                )}
        </SelectionContext.Consumer>
    );
}

import React, { PureComponent } from 'react';

import { withSelectionContext } from '../../contexts/SelectionContext';

import SelectedItem from './SelectedItem';

import Detail from './Detail';

import { unique } from '../../../../../../../../utils';

import RecursiveDetail from '../../../utils/recursive-elevation/detail';
import RecursiveContainer from '../../../utils/recursive-elevation/container';
import RecursiveFrame from '../../../utils/recursive-elevation/frame';

class SelectionLayer extends PureComponent {
    render = () => {
        const {
            props: {
                selection: {
                    itemsByRefId,
                    items,
                    items: {
                        0: firstItem,
                        length,
                    },
                    selectItem,
                    unselectItem,
                    cancelSelection,
                },
            },
        } = this;

        const detailIsSelected = firstItem instanceof RecursiveDetail;
        const containerIsSelected = firstItem instanceof RecursiveContainer;
        const frameIsSelected = firstItem instanceof RecursiveFrame;

        const detailsToRender = detailIsSelected ?
            items
            :
            containerIsSelected ?
                unique(items.reduce((all, { allDetails }) => all.concat(allDetails), []))
                :
                frameIsSelected ?
                    unique(items.reduce((all, { details }) => all.concat(details), []))
                    :
                    [];

        const filteredDetailsToRender = detailsToRender
            .reduce((all, detail) => {
                const {
                    detailId,
                    placement: {
                        x,
                        y,
                    },
                } = detail;
                const prevDetail = all.find(d => d.detailId === detailId);
                const shouldReplace = prevDetail && (
                    prevDetail.placement.x > x || (
                        prevDetail.placement.x === x
                        &&
                        prevDetail.placement.y > y
                    )
                );
                return prevDetail ?
                    shouldReplace ?
                        all.replace(all.indexOf(prevDetail), detail)
                        :
                        all
                    :
                    all.concat(detail);
            }, []);

        return (
            <div id="SelectionLayer" >
                {typeof firstItem !== 'string' ? (
                    <>
                        {items.map((item, i) => (
                            <SelectedItem
                                key={item.refId}
                                item={item}
                                selectItem={selectItem}
                                lastSelected={i === length - 1}
                            />
                        ))}
                        {filteredDetailsToRender.map(detail => (
                            <Detail
                                key={detail.detailId}
                                detail={detail}
                                selectItem={selectItem}
                                cancelSelection={cancelSelection}
                                unselectItem={unselectItem}
                                itemsByRefId={itemsByRefId}
                                detailIsSelected={detailIsSelected}
                                containerIsSelected={containerIsSelected}
                                frameIsSelected={frameIsSelected}
                            />
                        ))}
                    </>
                ) : null}
            </div>
        );
    }
}

export default withSelectionContext(SelectionLayer);

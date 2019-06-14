import React, { PureComponent } from 'react';

import { withSelectionContext } from '../../contexts/SelectionContext';

import SelectedItem from './SelectedItem';

import Detail from './Detail';

import { unique } from '../../../../../../../../utils';

import RecursiveDetail from '../../../utils/recursive-elevation/detail';

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
                    unselectItem
                },
            },
        } = this;

        const detailIsSelected = firstItem instanceof RecursiveDetail;

        const detailsToRender = detailIsSelected ?
            items
            :
            unique(
                items.reduce((all, {
                    // if frame is selected
                    details = [],
                    // if container is selected
                    allDetails = [],
                }) => all.concat(details, allDetails),
                    [])
            );

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
                        {detailsToRender.map(detail => (
                            <Detail
                                key={detail.refId}
                                detail={detail}
                                selectItem={selectItem}
                                unselectItem={unselectItem}
                                itemsByRefId={itemsByRefId}
                            />
                        ))}
                    </>
                ) : null}
            </div>
        );
    }
}

export default withSelectionContext(SelectionLayer);

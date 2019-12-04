import React from 'react';
import * as Icons from '../../../../../assets/icons';
import { Input } from '../../../../../components';
import { match, Matrix } from '../../../../../utils';
import { getAlignBottomCoordinates, getAlignHCenterCoordinates, getAlignLeftCoordinates, getAlignRightCoordinates, getAlignTopCoordinates, getAlignVCenterCoordinates } from '../../../../../utils/functions/svg-utils';


export default function ({

    partialAction: {
        ACTION: {
            vertical: partialVertical,
            first: partialFirst,
        } = {},
        payload: partialPayload,
    } = {},
    dispatchPartial,
    cancelPartial,
    selectItem,
    selectedItem,
    dispatchTransform,
}) {
    console.log(arguments[0]);

    const getAlignAction = (vertical, first) => {
        return vertical ?
            match(first)
                .equals(true, () => getAlignBottomCoordinates)
                .equals(false, () => getAlignTopCoordinates)
                .otherwise(() => getAlignVCenterCoordinates)
            :
            match(first)
                .equals(true, () => getAlignLeftCoordinates)
                .equals(false, () => getAlignRightCoordinates)
                .otherwise(() => getAlignHCenterCoordinates)
    };

    const movePoint = (nudge) => dispatchTransform(
        Matrix.createTranslation(
            partialVertical ? 0 : nudge,
            partialVertical ? nudge : 0,
        ),
    );

    const alignItemToItem = (item1, item2) => {
        const alignFunction = getAlignAction(partialVertical, partialFirst);
        const {
            x: firstX,
            y: firstY,
        } = alignFunction(item1);
        const {
            x: secondX,
            y: secondY,
        } = alignFunction(item2);
        const nudge = partialVertical ?
            secondY - firstY
            :
            secondX - firstX;
        movePoint(nudge);
    };

    if (partialPayload && selectedItem && (selectedItem !== partialPayload)) {
        alignItemToItem(partialPayload, selectedItem);
        selectItem(partialPayload);
        cancelPartial();
    };
    if ((partialVertical !== undefined) && selectedItem && !partialPayload) {
        dispatchPartial({ vertical: partialVertical, first: partialFirst }, selectedItem);
    };

    return (
        <div className="tray-section">
            <div className="label">
                Align
                </div>
            <div className="input-group">
                <Input
                    Icon={Icons.AlignBottom}
                    onChange={() => dispatchPartial({ vertical: true, first: true }, selectedItem)}
                />
                <Input
                    Icon={Icons.AlignMiddle}
                    onChange={() => dispatchPartial({ vertical: true }, selectedItem)}
                />
                <Input
                    Icon={Icons.AlignTop}
                    onChange={() => dispatchPartial({ vertical: true, first: false }, selectedItem)}
                />
            </div>
            <div className="input-group">
                <Input
                    Icon={Icons.AlignLeft}
                    onChange={() => dispatchPartial({ vertical: false, first: true }, selectedItem)}
                />
                <Input
                    Icon={Icons.AlignCenter}
                    onChange={() => dispatchPartial({ vertical: false }, selectedItem)}
                />
                <Input
                    Icon={Icons.AlignRight}
                    onChange={() => dispatchPartial({ vertical: false, first: false }, selectedItem)}
                />
            </div>
        </div>
    );
};
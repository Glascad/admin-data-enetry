import React from 'react';
import * as Icons from '../../../../../assets/icons';
import { Input } from '../../../../../components';
import { DIRECTIONS, Matrix } from '../../../../../utils';
import { getAlignmentCoordinate } from '../../../../../utils/functions/svg-utils';

const {
    DOWN,
    UP,
    LEFT,
    RIGHT,
    VCENTER,
    HCENTER,
} = DIRECTIONS;

export default function ({

    partialAction: {
        ACTION: {
        } = {},
        payload: {
            selectedItem: partialPayload,
            vertical: partialVertical,
            first: partialFirst
        },
    } = {},
    dispatchPartial,
    cancelPartial,
    selectItem,
    selectedItem,
    dispatchTransform,
}) {
    console.log(arguments[0]);

    const alignItems = (item1, item2) => {
        const coordinate1 = getAlignmentCoordinate(partialVertical, partialFirst, item1);
        const coordinate2 = getAlignmentCoordinate(partialVertical, partialFirst, item2);
        const nudge = coordinate2 - coordinate1;
        dispatchTransform(
            Matrix.createTranslation(
                partialVertical ? 0 : nudge,
                partialVertical ? nudge : 0,
            ),
        );
    };

    if (partialPayload && selectedItem && (selectedItem !== partialPayload)) {
        alignItems(partialPayload, selectedItem);
        selectItem(partialPayload);
        cancelPartial();
    };
    if ((partialVertical !== undefined) && selectedItem && !partialPayload) {
        dispatchPartial({ vertical: partialVertical, first: partialFirst }, selectedItem);
    };

    const dispatchPartialAlign = (vertical, first) => dispatchPartial(() => {

    }, { vertical, first, selectItem });

    return (
        <div className="tray-section">
            <div className="label">
                Align
                </div>
            <div className="input-group">
                <Input
                    Icon={Icons.AlignBottom}
                    onChange={() => dispatchPartialAlign(...DOWN)}
                    checked={partialVertical && partialFirst}
                />
                <Input
                    Icon={Icons.AlignMiddle}
                    onChange={() => dispatchPartialAlign(...VCENTER)}
                    checked={partialVertical && partialFirst === null}
                />
                <Input
                    Icon={Icons.AlignTop}
                    onChange={() => dispatchPartialAlign(...UP)}
                    checked={partialVertical && partialFirst === false}
                />
            </div>
            <div className="input-group">
                <Input
                    Icon={Icons.AlignLeft}
                    onChange={() => dispatchPartialAlign(...LEFT)}
                    checked={!partialVertical && partialFirst}
                />
                <Input
                    Icon={Icons.AlignCenter}
                    onChange={() => dispatchPartialAlign(...HCENTER)}
                    checked={partialVertical === false && partialFirst === null}
                />
                <Input
                    Icon={Icons.AlignRight}
                    onChange={() => dispatchPartialAlign(...RIGHT)}
                    checked={!partialVertical && partialFirst === false}
                />
            </div>
        </div>
    );
};
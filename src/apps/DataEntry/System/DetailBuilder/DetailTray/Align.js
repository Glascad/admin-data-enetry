import React, { useState } from 'react';
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
    dispatchPartial,
    selectedItem,
    TRANSFORM,
}) {
    console.log(arguments[0]);

    const [[vertical, first], setVerticalAndFirst] = useState([]);

    const dispatchPartialAlign = (vertical, first) => {

        setVerticalAndFirst([vertical, first]);

        dispatchPartial(TRANSFORM, selectedItem, (item1, item2) => {
            const coordinate1 = getAlignmentCoordinate(vertical, first, item1);
            const coordinate2 = getAlignmentCoordinate(vertical, first, item2);
            const nudge = coordinate2 - coordinate1;
            setVerticalAndFirst([]);
            return {
                targetItem: item1,
                intermediateTransform: Matrix.createTranslation(
                    vertical ? 0 : nudge,
                    vertical ? nudge : 0,
                ),
            };
        });
    }

    return (
        <div className="tray-section">
            <div className="label">
                Align
                </div>
            <div className="input-group">
                <Input
                    Icon={Icons.AlignBottom}
                    onChange={() => dispatchPartialAlign(...DOWN)}
                    checked={vertical && first}
                />
                <Input
                    Icon={Icons.AlignMiddle}
                    onChange={() => dispatchPartialAlign(...VCENTER)}
                    checked={vertical && first === null}
                />
                <Input
                    Icon={Icons.AlignTop}
                    onChange={() => dispatchPartialAlign(...UP)}
                    checked={vertical && first === false}
                />
            </div>
            <div className="input-group">
                <Input
                    Icon={Icons.AlignLeft}
                    onChange={() => dispatchPartialAlign(...LEFT)}
                    checked={!vertical && first}
                />
                <Input
                    Icon={Icons.AlignCenter}
                    onChange={() => dispatchPartialAlign(...HCENTER)}
                    checked={vertical === false && first === null}
                />
                <Input
                    Icon={Icons.AlignRight}
                    onChange={() => dispatchPartialAlign(...RIGHT)}
                    checked={!vertical && first === false}
                />
            </div>
        </div>
    );
};
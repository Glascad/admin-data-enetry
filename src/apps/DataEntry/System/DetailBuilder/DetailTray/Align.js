import React, { useState } from 'react';
import { getAlignmentCoordinate, joinConfigurationOrPart } from '../../../../../app-logic/system';
import * as Icons from '../../../../../assets/icons';
import { Input } from '../../../../../components';
import { DIRECTIONS, Matrix } from '../../../../../utils';

const {
    DOWN,
    UP,
    LEFT,
    RIGHT,
    VCENTER,
    HCENTER,
} = DIRECTIONS;

export default function Align({
    cancelPartial,
    dispatchPartial,
    selectedItem,
    TRANSFORM,
    systemMap,
    selectedConfigurationPaths,
}) {
    console.log(arguments[0]);

    const [[vertical, first], setVerticalAndFirst] = useState([]);

    const dispatchPartialAlign = (v, f) => {

        if (v === vertical && f === first) {

            cancelPartial();
            setVerticalAndFirst([]);

        } else {

            setVerticalAndFirst([v, f]);

            dispatchPartial(TRANSFORM, selectedItem, (item1, item2) => {
                const coordinate1 = getAlignmentCoordinate(
                    v,
                    f,
                    joinConfigurationOrPart(
                        item1,
                        selectedConfigurationPaths,
                        systemMap,
                    ),
                );
                const coordinate2 = getAlignmentCoordinate(
                    v,
                    f,
                    joinConfigurationOrPart(
                        item2,
                        selectedConfigurationPaths,
                        systemMap,
                    ),
                );
                const nudge = coordinate2 - coordinate1;
                setVerticalAndFirst([]);
                console.log({ coordinate1, coordinate2, nudge, v, f, item1, item2 });
                return {
                    targetItem: item1,
                    appliedTransform: Matrix.createTranslation(
                        v ? 0 : nudge,
                        v ? nudge : 0,
                    ),
                };
            });
        }
    }

    console.log({ vertical, first });

    return (
        <div className="tray-section">
            <div className="label">
                Align
            </div>
            <div className="input-group">
                <Input
                    data-cy={'align-bottom'}
                    Icon={Icons.AlignBottom}
                    onChange={() => dispatchPartialAlign(...DOWN)}
                    checked={vertical && first}
                />
                <Input
                    data-cy={'align-vcenter'}
                    Icon={Icons.AlignMiddle}
                    onChange={() => dispatchPartialAlign(...VCENTER)}
                    checked={vertical && first === null}
                />
                <Input
                    data-cy={'align-top'}
                    Icon={Icons.AlignTop}
                    onChange={() => dispatchPartialAlign(...UP)}
                    checked={vertical && first === false}
                />
            </div>
            <div className="input-group">
                <Input
                    data-cy={'align-left'}
                    Icon={Icons.AlignLeft}
                    onChange={() => dispatchPartialAlign(...LEFT)}
                    checked={!vertical && first}
                />
                <Input
                    data-cy={'align-hcenter'}
                    Icon={Icons.AlignCenter}
                    onChange={() => dispatchPartialAlign(...HCENTER)}
                    checked={vertical === false && first === null}
                />
                <Input
                    data-cy={'align-right'}
                    Icon={Icons.AlignRight}
                    onChange={() => dispatchPartialAlign(...RIGHT)}
                    checked={!vertical && first === false}
                />
            </div>
        </div>
    );
};
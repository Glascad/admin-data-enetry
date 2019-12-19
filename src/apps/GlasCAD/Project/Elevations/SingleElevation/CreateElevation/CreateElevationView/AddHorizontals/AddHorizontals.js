import React from 'react';
import { GroupingBox } from "../../../../../../../../components";
import { defaultHorizontal } from '../../utils/elevation-input';
import Horizontal from './Horizontal';

export default function AddHorizontals({
    horizontals,
    updateElevation,
    measureFromOptions,
    measureToOptions,
    recursiveElevation,
}) {
    console.log(arguments[0]);
    return (
        <GroupingBox
            title="Horizontals"
            circleButton={{
                actionType: "add",
                className: "action",
                onClick: () => {
                    const lastHorizontal = horizontals[horizontals.length - 1] || defaultHorizontal;

                    const {
                        distance,
                    } = lastHorizontal;

                    var { originalContainer: topContainer } = recursiveElevation;

                    while (topContainer.topContainers.length) {
                        topContainer = topContainer.topContainers[0];
                    }

                    if (
                        (horizontals.length === 0)
                        ||
                        topContainer.canAddHorizontalByDistance(distance)
                    ) {
                        updateElevation({
                            horizontals: horizontals.concat(lastHorizontal),
                        });
                    }
                },
            }}
        >
            {horizontals.length ?
                horizontals.map((horizontal, i, { length }) => (
                    <Horizontal
                        key={i}
                        i={i}
                        horizontal={horizontal}
                        horizontals={horizontals}
                        updateElevation={updateElevation}
                        measureToOptions={measureToOptions}
                        measureFromOptions={measureFromOptions}
                        length={length}
                    />
                )) : (
                    <div>
                        No Horizontals
                    </div>
                )}
        </GroupingBox>
    );
}

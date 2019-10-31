import React, { useState } from 'react';

import { GroupingBox, Input, CircleButton, useInitialState, Select } from "../../../../../../components";
import { defaultHorizontal } from './elevation-input';
import { replace } from '../../../../../../utils';

function Horizontal({
    horizontals,
    horizontal: {
        distance,
        from,
        to,
    },
    updateElevation,
    measureFromOptions,
    measureToOptions,
    i,
    length,
}) {
    console.log(arguments[0]);
    const [focused, setFocused] = useState(false);
    // update initial state of input only when input is not focused
    const [initialDistance] = useInitialState(distance, [focused ? null : distance]);

    return (
        <div className="input-group add-horizontal">
            <Select
                label="Measure from"
                disabled={true}
                value={from}
                options={measureFromOptions}
                onChange={value => updateElevation({
                    horizontals: replace(horizontals, i, {
                        distance,
                        from: value,
                        to,
                    })
                })}
            />
            <Select
                label="Measure to"
                disabled={true}
                value={to}
                options={measureToOptions}
                onChange={value => updateElevation({
                    horizontals: replace(horizontals, i, {
                        distance,
                        from,
                        to: value,
                    }),
                })}
            />
            <Input
                // autoFocus={i === length - 1}
                label="Distance"
                type="inches"
                min={0}
                initialValue={initialDistance}
                onChange={distance => updateElevation({
                    horizontals: replace(horizontals, i, {
                        distance,
                        from,
                        to,
                    }),
                })}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            <CircleButton
                actionType="delete"
                className="danger"
                onClick={() => updateElevation({
                    horizontals: horizontals.filter((_, j) => j !== i),
                })}
            >
                Delete
            </CircleButton>
        </div>
    );
}

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

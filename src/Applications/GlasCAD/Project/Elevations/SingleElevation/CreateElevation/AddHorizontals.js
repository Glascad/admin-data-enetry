import React, { useState } from 'react';

import { GroupingBox, Input, CircleButton, useInitialState } from "../../../../../../components";
import { defaultHorizontal } from './elevation-input';

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
}) {
    const [focused, setFocused] = useState(false);
    // update initial state of input only when input is not focused
    const [initialDistance] = useInitialState(distance, [focused ? null : distance]);

    return (
        <div className="input-group add-horizontal">
            <Input
                label="Measure from"
                disabled={true}
                select={{
                    value: {
                        value: from,
                        label: from,
                    },
                    options: measureFromOptions,
                    onChange: ({ value }) => updateElevation({
                        horizontals: horizontals.replace(i, {
                            distance,
                            from: value,
                            to,
                        }),
                    }),
                }}
            />
            <Input
                label="Measure to"
                disabled={true}
                select={{
                    value: {
                        value: to,
                        label: to,
                    },
                    options: measureToOptions,
                    onChange: ({ value }) => updateElevation({
                        horizontals: horizontals.replace(i, {
                            distance,
                            from,
                            to: value,
                        }),
                    }),
                }}
            />
            <Input
                label="Distance"
                type="inches"
                min={0}
                initialValue={initialDistance}
                onChange={distance => updateElevation({
                    horizontals: horizontals.replace(i, {
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

export default function AddHorizontal({
    horizontals,
    updateElevation,
    measureFromOptions,
    measureToOptions,
    recursiveElevation,
}) {
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
                horizontals.map((horizontal, i) => (
                    <Horizontal
                        key={i}
                        i={i}
                        horizontal={horizontal}
                        horizontals={horizontals}
                        updateElevation={updateElevation}
                        measureToOptions={measureToOptions}
                        measureFromOptions={measureFromOptions}
                    />
                )) : (
                    <div>
                        No Horizontals
                    </div>
                )}
        </GroupingBox>
    );
}

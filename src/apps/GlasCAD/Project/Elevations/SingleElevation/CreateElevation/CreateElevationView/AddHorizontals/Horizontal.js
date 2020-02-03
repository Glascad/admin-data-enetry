import React, { useState } from 'react';
import { CircleButton, Input, Select, useInitialState } from '../../../../../../../../components';
import { replace } from '../../../../../../../../utils';

export default function Horizontal({
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

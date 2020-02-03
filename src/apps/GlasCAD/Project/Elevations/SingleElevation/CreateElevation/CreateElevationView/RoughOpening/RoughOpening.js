import React from 'react';
import { GroupingBox, Input, useInitialState } from '../../../../../../../../components';

export default function RoughOpening({
    horizontalRoughOpening,
    horizontalMasonryOpening,
    verticalRoughOpening,
    recursiveElevation,
    horizontals,
    verticalMasonryOpening,
    updateElevation,
    startingBayQuantity,
    initialElevationInput,
}) {

    const [initialHorizontalRoughOpening, setInitialHorizontalRoughOpening] = useInitialState(initialElevationInput.horizontalRoughOpening);
    const [initialVerticalRoughOpening, setInitialVerticalRoughOpening] = useInitialState(initialElevationInput.verticalRoughOpening);

    return (
        <GroupingBox
            title="Rough opening"
        >
            <div className="input-group">
                <Input
                    data-cy="rough-opening-width"
                    label="Width"
                    type="inches"
                    min={10}
                    initialValue={initialHorizontalRoughOpening}
                    onChange={horizontalRoughOpening => updateElevation({
                        horizontalRoughOpening: Math.max(
                            +horizontalRoughOpening,
                            10,
                            startingBayQuantity * 5 + (
                                startingBayQuantity + (
                                    1 * recursiveElevation.sightline
                                )
                            )
                        )
                    })}
                    onBlur={() => setInitialHorizontalRoughOpening(horizontalRoughOpening)}
                />
                <Input
                    label="Masonry opening"
                    disabled={true}
                    type="switch"
                    readOnly={true}
                    checked={horizontalMasonryOpening}
                />
            </div>
            <div className="input-group">
                <Input
                    data-cy="rough-opening-height"
                    label="Height"
                    type="inches"
                    min={10}
                    initialValue={initialVerticalRoughOpening}
                    onChange={verticalRoughOpening => updateElevation({
                        verticalRoughOpening: Math.max(
                            +verticalRoughOpening,
                            // 10,
                            horizontals
                                .reduce((sum, { distance }) => (
                                    sum
                                    +
                                    distance
                                    +
                                    recursiveElevation.sightline
                                ), (
                                    recursiveElevation.sightline
                                    *
                                    2
                                    +
                                    5
                                ))
                            // horizontals.length * 5 + (
                            //     horizontals.length + (
                            //         1 * recursiveElevation.sightline
                            //     )
                            // )
                        ),
                    })}
                    onBlur={() => setInitialVerticalRoughOpening(verticalRoughOpening)}
                />
                <Input
                    label="Masonry opening"
                    disabled={true}
                    type="switch"
                    readOnly={true}
                    checked={verticalMasonryOpening}
                />
            </div>
        </GroupingBox>
    );
}

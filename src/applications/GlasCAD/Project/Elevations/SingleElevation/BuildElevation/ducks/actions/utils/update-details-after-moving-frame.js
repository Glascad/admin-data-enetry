
export default function updateDetailsAfterMovingFrame({
    elevationInput,
}, {
    _frame,
    _frame: {
        vertical,
    },
    distance,
}) {

    const firstAndLastContainersByDirection = [true, false]
        .reduce((containersByDirection, first) => [true, false]
            .reduce((firstAndLastContainersByDirection, last) => ({
                ...firstAndLastContainersByDirection,
                [last]: {
                    ...firstAndLastContainersByDirection[last],
                    [first]: _frame.getFirstOrLastContainerByDirection(first, last),
                },
            }),
                containersByDirection),
            {});

    console.log({ firstAndLastContainersByDirection });

    const detailsToCompare = Object.entries(firstAndLastContainersByDirection)
        .reduce((details, [last, containersByDirection]) => Object.entries(containersByDirection)
            .reduce((allDetails, [first, container]) => {
                // last and first are STRINGs here
                if (!container) return allDetails;
                else {
                    console.log({ vertical, details, last, containersByDirection, allDetails, first, container });
                    const detailsToCompare = container.getDetailsByDirection(vertical, last === "false").map(({ _frame: { ref } }) => ref);
                    return allDetails.concat(detailsToCompare);
                    // return {
                    //     ...allDetails,
                    // };
                }
            },
                details),
            []);

    console.log({ detailsToCompare });

    return arguments[0];
}

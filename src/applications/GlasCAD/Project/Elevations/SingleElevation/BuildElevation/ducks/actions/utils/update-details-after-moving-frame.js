
export default function updateDetailsAfterMovingFrame({
    elevationInput,
}, {
    _frame,
    _frame: {
        vertical,
    },
    distance,
}) {

    const first = distance > 0;

    const firstAndLastDetails = [true, false]
        .reduce((firstAndLastDetails, last) => {
            const container = _frame.getFirstOrLastContainerByDirection(first, last);
            if (!container) return firstAndLastDetails;
            else {
                const detailsToCompare = container.getDetailsByDirection(vertical, !last);
                return {
                    ...firstAndLastDetails,
                    [last]: detailsToCompare,
                };
            }
        }, {});

    console.log({ firstAndLastDetails });

    [true, false]
        .map(last => firstAndLastDetails[last]
            .map((detail, i) => {
                const {
                    ref,
                    placement: {
                        x,
                        y,
                        height,
                        width,
                    },
                } = detail;

                console.log({ last, ref });

                if (Math.abs(distance) > (vertical ? width : height)) {
                    console.log('MUST DELETE OR REDIRECT DETAIL:', ref);

                }
            }));

    return arguments[0];
}

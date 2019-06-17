
const defaultFactor = 1 / 16;
const defaultRounding = 0;

export const roundDown = (num, roundFactor = defaultFactor) => num - (num % roundFactor);
export const roundUp = (num, roundFactor = defaultFactor) => num + roundFactor - (num % roundFactor);

export const roundUpOrDown = (num, roundFactor = defaultFactor, rounding = -1) => {
    const up = roundUp(num, roundFactor);
    const down = roundDown(num, roundFactor);
    const upDifference = up - num;
    const downDifference = num - down;
    return upDifference === downDifference ?
        rounding > 0 ?
            up
            :
            down
        :
        upDifference > downDifference ?
            down
            :
            up;
}

export const round = (num, roundFactor = defaultFactor, rounding = defaultRounding, maybeRounding) => (
    rounding === 0 ?
        roundUpOrDown(num, roundFactor, maybeRounding)
        :
        rounding > 0 ?
            roundUp(num, roundFactor)
            :
            roundDown(num, roundFactor)
);

export const toFraction = (num, roundFactor = defaultFactor, rounding, maybeRounding) => {
    const rounded = round(num, roundFactor, rounding, maybeRounding);
    return `${rounded / roundFactor}/${roundFactor ** -1}`;
}

export const splitFraction = (fraction = "0/1") => fraction.split(/\//);

export const toMixedNumber = fraction => {
    const [numerator, denominator] = splitFraction(fraction);
    const whole = ~~(numerator / denominator);
    if (!whole) return fraction;
    else {
        const remainder = numerator % denominator;
        if (!remainder) return `${whole}`;
        return `${whole} ${remainder}/${denominator}`;
    }
}

export const simplifyFraction = fraction => {
    let [numerator, denominator] = splitFraction(fraction);
    if (!parseInt(numerator)) return "";
    if (numerator === denominator) return '1';
    for (let i = denominator - 1; i > 0; i--) {
        if (!(numerator % i) && !(denominator % i)) {
            numerator = numerator / i;
            denominator = denominator / i;
        }
    }
    return `${numerator}/${denominator}`;
}

export const splitMixedNumber = mixed => mixed.match(/ /) ?
    mixed.split(/ /)
    :
    mixed.match(/\//) ?
        ['', mixed]
        :
        [mixed, ''];

export const simplifyMixedNumber = mixed => {
    const [whole, fraction] = splitMixedNumber(mixed);
    if (!whole) return simplifyFraction(mixed);
    else {
        const simplifiedFraction = simplifyFraction(fraction);
        if (!simplifiedFraction) return `${whole}`
        return `${whole} ${simplifyFraction(fraction)}`
    }
}

export const numberToString = (num, roundFactor, rounding, maybeRounding) => (
    simplifyMixedNumber(
        toMixedNumber(
            toFraction(
                num,
                roundFactor,
                rounding,
                maybeRounding,
            ),
        ),
    )
);

export const parseFraction = fraction => splitFraction(fraction).reduce((a, b) => a / b);

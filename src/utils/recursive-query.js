
const recursiveString = ([before = '', after = '', ...tooMany], count = 0) => {
    if (tooMany.length) return new Error("must not interpolate more than once");
    else if (count <= 0) return before + after;
    else return before + recursiveString([before, after], count - 1) + after;
}

export default ([before, rec_1, rec_2, after, ...tooMany], start, count, finish) => {
    if (tooMany.length) return new Error("must not interpolate more than thrice");
    else return before + recursiveString([rec_1, rec_2], count) + after;
}

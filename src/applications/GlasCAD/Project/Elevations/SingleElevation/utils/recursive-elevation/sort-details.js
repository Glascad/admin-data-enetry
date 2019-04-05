
const compareDetailsByDirection = (detailA, detailB, vertical, first) => {
    const containerA = detailA.getContainerByDirection(first);
    const containerB = detailB.getContainerByDirection(first);
    const beforeA = containerA && containerA.getAllContainersByDirection(!vertical, true);
    const beforeB = containerB && containerB.getAllContainersByDirection(!vertical, true);
    // a comes before b because b is upward or rightward of a
    if (beforeB && beforeB.includes(containerA)) {
        // console.log(`${a.id} is before ${b.id}`);
        return -1;
    }
    // b comes before a because a is upward or rightward of a
    else if (beforeA && beforeA.includes(containerB)) {
        // console.log(`${b.id} is before ${a.id}`);
        return 1;
    }
}

export const sortDetails = (vertical, first) => (detailA, detailB) => {
    const result = compareDetailsByDirection(detailA, detailB, vertical, first);
    const otherResult = first === undefined ?
        compareDetailsByDirection(detailA, detailB, vertical, !first)
        :
        undefined;

    return result || otherResult;

    // THERE ARE NO MORE OFFSETS
    // otherwise we need to compare offsets
    // else {
    //     const containerA = detailA.getContainerByDirection(first);
    //     const containerB = detailB.getContainerByDirection(first);
    //     const beforeA = containerA && containerA.getAllContainersByDirection(!vertical, true);
    //     const beforeB = containerB && containerB.getAllContainersByDirection(!vertical, true);

    //     const key = vertical ? 'x' : 'y';

    //     const [
    //         {
    //             [key]: offsetA = 0,
    //         } = {},
    //         {
    //             [key]: offsetB = 0,
    //         } = {}
    //     ] = [beforeA, beforeB]
    //         .map((before = []) => before
    //             .find(({ bottomLeftOffset: { [key]: offset } = {} }) => offset));

    //     if (offsetA < offsetB) {
    //         // console.log(`${a.id} is before ${b.id}`);
    //         return -1;
    //     }
    //     else if (offsetA > offsetB) {
    //         // console.log(`${b.id} is before ${a.id}`);
    //         return 1;
    //     }
    //     else {
    //         // console.log(`${a.id} is equal to ${b.id}`);
    //         return 0;
    //     }
    // }
}

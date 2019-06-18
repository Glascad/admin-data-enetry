
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
    return (
        compareDetailsByDirection(detailA, detailB, vertical, first)
        ||
        (
            first === undefined ?
                compareDetailsByDirection(detailA, detailB, vertical, !first)
                :
                undefined
        )
    );
}

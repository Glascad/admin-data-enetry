
const compareContainers = (containerA, containerB, vertical) => {
    if (containerA === containerB) return 0;
    else {
        const beforeA = containerA && containerA.getAllContainersByDirection(vertical, true);
        const beforeB = containerB && containerB.getAllContainersByDirection(vertical, true);
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
}

export default (detailA, detailB) => {
    // const containerA = detailA.getContainerByDirection(first);
    // const containerB = detailB.getContainerByDirection(first);
    // a comes before b because b is upward or rightward of a
    return compareContainers(
        detailA.firstContainer,
        detailB.firstContainer,
        detailA.vertical
    ) || compareContainers(
        detailA.secondContainer,
        detailB.secondContainer,
        detailA.vertical
    )
}

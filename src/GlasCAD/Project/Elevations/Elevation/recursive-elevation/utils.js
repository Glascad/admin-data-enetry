
export const sortContainers = vertical => (a, b) => {
    const beforeA = a._getAllContainersByDirection(!vertical, true);
    const beforeB = b._getAllContainersByDirection(!vertical, true);
    // a comes before b because b is upward or rightward of a
    if (beforeB.includes(a)) {
        // console.log(`${a.id} is before ${b.id}`);
        return -1;
    }
    // b comes before a because a is upward or rightward of a
    else if (beforeA.includes(b)) {
        // console.log(`${b.id} is before ${a.id}`);
        return 1;
    }
    // otherwise we need to compare offsets
    else {
        const key = vertical ? 'x' : 'y';

        const [
            {
                [key]: offsetA = 0,
            } = {},
            {
                [key]: offsetB = 0,
            } = {}
        ] = [beforeA, beforeB]
            .map(before => before
                .find(({ bottomLeftOffset: { [key]: offset } = {} }) => offset));

        if (offsetA < offsetB) {
            // console.log(`${a.id} is before ${b.id}`);
            return -1;
        }
        else if (offsetA > offsetB) {
            // console.log(`${b.id} is before ${a.id}`);
            return 1;
        }
        else {
            // console.log(`${a.id} is equal to ${b.id}`);
            return 0;
        }
    }
}

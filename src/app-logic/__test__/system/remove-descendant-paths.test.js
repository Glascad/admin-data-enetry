import { filterDescendantPaths } from "../../system"

describe(`removes descendant paths from an array of paths`, () => {
    test(`removing A.A.A and A.A from A`, () => {
        const newArray = filterDescendantPaths(['A.A.A', 'A.A', 'A']);
        expect(newArray).toMatchObject(['A']);
    });
});
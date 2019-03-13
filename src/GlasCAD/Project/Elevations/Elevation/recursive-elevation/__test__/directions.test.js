import { DIRECTIONS, GET_RELATIVE_DIRECTIONS } from "../directions";

describe('Relative Directions Tests', () => {
    test('FORWARD of all directions is same', () => {
        Object.values(DIRECTIONS)
            .forEach(DIR => expect(GET_RELATIVE_DIRECTIONS(...DIR).FORWARD)
                .toEqual(DIR));
    });
    test('BACKWARD of UP is DOWN', () => {
        const { BACKWARD } = GET_RELATIVE_DIRECTIONS(...DIRECTIONS.UP);
        expect(BACKWARD).toEqual(DIRECTIONS.DOWN);
    })
    test('LEFT of DOWN is RIGHT', () => {
        const { LEFT } = GET_RELATIVE_DIRECTIONS(...DIRECTIONS.DOWN);
        expect(LEFT).toEqual(DIRECTIONS.RIGHT);
    });
    test('RIGHT of UP is RIGHT', () => {
        const { RIGHT } = GET_RELATIVE_DIRECTIONS(...DIRECTIONS.UP);
        expect(RIGHT).toEqual(DIRECTIONS.RIGHT);
    });
    test('LEFT of RIGHT is UP', () => {
        const { LEFT } = GET_RELATIVE_DIRECTIONS(...DIRECTIONS.RIGHT);
        expect(LEFT).toEqual(DIRECTIONS.UP);
    });
});


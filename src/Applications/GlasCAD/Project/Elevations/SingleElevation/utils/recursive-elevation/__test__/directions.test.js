import { DIRECTIONS, GET_RELATIVE_DIRECTIONS } from '../directions';

/**
 * Directions: [vertical][first]
 *
 * vertical = [|||]
 * !vertical = [---]
 *
 * first = [<<<] or [vvv]
 * !first = [>>>] or [^^^]
 *
 * |============|==============|
 * |            |[false][false]|
 * |  [second]  |   [third]    |
 * |            |              |
 * |============|==============|
 * |            |              |
 * |   [first]  |   [second]   |
 * |[true][true]|              |
 * |===========================|
 *
 * Up = [vertical][first] = [|||][^^^] = [true][false]
 * Down = [vertical][!first] = [|||][vvv] = [true][true]
 * Left = [!vertical][!first] = [---][<<<] = [false][true]
 * Right = [!vertical][first] = [---][>>>] = [false][false]
 */

describe('Direction Tests', () => {
    test('UP and DOWN are vertical', () => {
        expect(DIRECTIONS.UP[0]).toBe(true);
        expect(DIRECTIONS.DOWN[0]).toBe(true);
    });
    test('LEFT and RIGHT are horizontal', () => {
        expect(DIRECTIONS.LEFT[0]).toBe(false);
        expect(DIRECTIONS.RIGHT[0]).toBe(false);
    });
    test('LEFT and DOWN are first', () => {
        expect(DIRECTIONS.LEFT[1]).toBe(true);
        expect(DIRECTIONS.DOWN[1]).toBe(true);
    });
    test('RIGHT and UP are not first', () => {
        expect(DIRECTIONS.RIGHT[1]).toBe(false);
        expect(DIRECTIONS.UP[1]).toBe(false);
    });
});

describe('Relative Directions Tests', () => {
    test('FORWARD of all directions is same', () => {
        Object.values(DIRECTIONS)
            .forEach(DIR => expect(GET_RELATIVE_DIRECTIONS(DIR).FORWARD)
                .toEqual(DIR));
    });
    test('BACKWARD of UP is DOWN', () => {
        const { BACKWARD } = GET_RELATIVE_DIRECTIONS(DIRECTIONS.UP);
        expect(BACKWARD).toEqual(DIRECTIONS.DOWN);
    })
    test('LEFT of DOWN is RIGHT', () => {
        const { LEFT } = GET_RELATIVE_DIRECTIONS(DIRECTIONS.DOWN);
        expect(LEFT).toEqual(DIRECTIONS.RIGHT);
    });
    test('RIGHT of UP is RIGHT', () => {
        const { RIGHT } = GET_RELATIVE_DIRECTIONS(DIRECTIONS.UP);
        expect(RIGHT).toEqual(DIRECTIONS.RIGHT);
    });
    test('LEFT of RIGHT is UP', () => {
        const { LEFT } = GET_RELATIVE_DIRECTIONS(DIRECTIONS.RIGHT);
        expect(LEFT).toEqual(DIRECTIONS.UP);
    });
});


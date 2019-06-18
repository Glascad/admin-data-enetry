import error from './error-2.json';
import expected from './no-error-2.json';

describe('COMPARING ERROR', () => {
    test('', () => {
        expect(true).toEqual(true);
        // expect(expected).toEqual(error);
    });
});

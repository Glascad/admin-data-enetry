
import parseSearch from './parse-search';

describe('Parse search tests', () => {
    test('Can parse string search', () => {
        const parsed = parseSearch('?systemId=1&manufacturerId=2');
        expect(parsed).toMatchObject({
            systemId: 1,
            manufacturerId: 2,
        });
    });
    test('Can parse object search', () => {
        const parsed = parseSearch({
            projectId: 1,
            elevationId: 2,
        });
        expect(`${parsed}`).toBe('?projectId=1&elevationId=2');
    });
    test('Ignores empty keys in string search', () => {
        const parsed = parseSearch('?=&manufacturerId=2&systemId=null');
        expect(parsed).toMatchObject({
            manufacturerId: 2,
            systemId: "null"
        });
        expect(Object.prototype.hasOwnProperty.call(parsed, '')).toBe(false);
        expect(`${parsed}`).toBe('?manufacturerId=2&systemId=null');
    });
    test('Ignores empty keys in object search', () => {
        const parsed = parseSearch({
            '': '',
            systemId: 1,
        });
        expect(Object.prototype.hasOwnProperty.call(parsed, '')).toBe(false);
        expect(`${parsed}`).toBe('?systemId=1');
    });
});

import * as F from '../fractions';

describe('rounding tests', () => {
    test('can round down', () => {
        expect(F.roundDown(1.001)).toBe(1);
    });
    test('can round up', () => {
        expect(F.roundUp(1.001)).toBe(17 / 16);
    });
    test('can decide which way to round', () => {
        expect(F.roundUpOrDown(1.001)).toBe(1);
        expect(F.roundUpOrDown(1.06)).toBe(17 / 16);
    });
    test('round can decide which way to round', () => {
        expect(F.round(1.001)).toBe(1);
        expect(F.round(1.06)).toBe(17 / 16);
    });
});

describe('fraction tests', () => {
    test('can create a fraction', () => {
        expect(F.toFraction(1.001)).toBe('16/16');
        expect(F.toFraction(1.06)).toBe('17/16');
    });
    test('can simplify a fraction', () => {
        expect(F.simplifyFraction('17/16')).toBe('17/16');
        expect(F.simplifyFraction('16/16')).toBe('1');
        expect(F.simplifyFraction('8/16')).toBe('1/2');
    });
});

describe('mixed number tests', () => {
    test('can create a mixed number', () => {
        expect(F.toMixedNumber('17/16')).toBe('1 1/16');
    });
    test('can simplify a mixed number', () => {
        expect(F.simplifyMixedNumber('1 2/16')).toBe('1 1/8');
    });
})

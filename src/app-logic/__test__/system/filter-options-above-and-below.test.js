import { filterOptionsAboveAndBelow } from "../../system";
import { sampleSystemMap2 } from "../sample-systems";

function testGetAllEndNodes({
    payload: {
        path,
        optionList,
        systemMap,
    },
    expected,
}) {
    const result = filterOptionsAboveAndBelow({ path }, optionList, systemMap);
    test(`getting all end nodes of path: ${path}`, () => {
        expect(result).toEqual(expected)
    });
};

testGetAllEndNodes({
    payload: {
        path: '2',
        systemMap: sampleSystemMap2,
        optionList: [
            { name: 'SET' },
            { name: 'JOINERY' },
            { name: 'STOPS' },
            { name: 'GLAZING' },
            { name: 'DURABILITY' },
            { name: 'OPTION_X' },
        ],
    },
    expected: expect.arrayContaining([
        expect.objectContaining({ name: 'OPTION_X' }),
        expect.not.objectContaining({ name: 'SET' }),
        expect.not.objectContaining({ name: 'JOINERY' }),
        expect.not.objectContaining({ name: 'STOPS' }),
        expect.not.objectContaining({ name: 'GLAZING' }),
        expect.not.objectContaining({ name: 'DURABILITY' }),
    ]),
});

testGetAllEndNodes({
    payload: {
        path: '2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL',
        systemMap: sampleSystemMap2,
        optionList: [
            { name: 'SET' },
            { name: 'JOINERY' },
            { name: 'STOPS' },
            { name: 'GLAZING' },
            { name: 'DURABILITY' },
            { name: 'OPTION_X' },
        ],
    },
    expected: expect.arrayContaining([
        expect.objectContaining({ name: 'OPTION_X' }),
        expect.objectContaining({ name: 'DURABILITY' }),
        expect.not.objectContaining({ name: 'SET' }),
        expect.not.objectContaining({ name: 'JOINERY' }),
        expect.not.objectContaining({ name: 'STOPS' }),
        expect.not.objectContaining({ name: 'GLAZING' }),
    ]),
})
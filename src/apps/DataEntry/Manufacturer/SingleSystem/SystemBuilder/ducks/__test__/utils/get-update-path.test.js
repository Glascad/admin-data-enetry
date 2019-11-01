import { getUpdatedPath } from "../../utils"

function testGetUpdatePath({
    payload,
    result,
}) {
    describe('Testing get update path', () => {

        const updatedPath = getUpdatedPath(payload);

        test(`testing ${payload.path} to have updated path of ${result}`, () => {
            expect(updatedPath).toBe(result);

        })
    })
}

testGetUpdatePath({
    payload: {
        path: '1.SET.CENTER.__DT__.HEAD.GLAZING.INSIDE',
        update: {
            parentDetailOptionPath: '1.SET.FRONT.__DT__.HORIZONTAL.GLAZING',
            name: 'OUTSIDE'
        },
        __typename: 'DetailOptionValue'
    },
    result: '1.SET.FRONT.__DT__.HORIZONTAL.GLAZING.OUTSIDE'
});

testGetUpdatePath({
    payload: {
        path: '1.SET.CENTER.__DT__.HEAD.GLAZING.INSIDE.__CT__.HEAD',
        update: {
            parentDetailOptionPath: '1.SET.FRONT.__DT__.HORIZONTAL.GLAZING.INSIDE',
        },
        __typename: 'SystemConfiguration'
    },
    result: '1.SET.FRONT.__DT__.HORIZONTAL.GLAZING.INSIDE.__CT__.HEAD'
});

testGetUpdatePath({
    payload: {
        path: '1.SET.CENTER.__DT__.HEAD',
        update: {
            name: 'HORIZONTAL'
        },
        __typename: 'SystemDetail'
    },
    result: '1.SET.CENTER.__DT__.HORIZONTAL'
});

testGetUpdatePath({
    payload: {
        path: '1.SET.CENTER.__DT__.HEAD.STOPS',
        update: {
            defaultDetailOptionValue: 'UP'
        },
        __typename: 'DetailOption'
    },
    result: '1.SET.CENTER.__DT__.HEAD.STOPS'
});

testGetUpdatePath({
    payload: {
        parentSystemOptionValue: '1.SET.CENTER',
        name: 'HORIZONTAL',
        __typename: 'SystemDetail',
    },
    result: '1.SET.CENTER.__DT__.HORIZONTAL'
});

testGetUpdatePath({
    payload: {
        parentSystemOptionValue: '1.SET.CENTER.__DT__.HEAD',
        name: 'GLAZING',
        __typename: 'DetailOption',
    },
    result: '1.SET.CENTER.__DT__.HEAD.GLAZING'
});
testGetUpdatePath({
    payload: {
        path: '1.SET.CENTER.__DT__.SILL_FLASHING',
        __typename: 'SystemDetail',
        update: {
        }
    },
    result: '1.SET.CENTER.__DT__.SILL_FLASHING'
});

import { getParentWithUpdatedPath } from "../../utils"
import { systemUpdate } from "../../schemas";

function testGetParentWithUpdatedPath({
    systemInput,
    payload,
    expectedParentWithUpdatedPath,
}) {
    describe(`testing to get the parent for item`, () => {
        const parentWithUpdatedPath = getParentWithUpdatedPath({ ...systemUpdate, ...systemInput }, payload);
        test(`path: ${payload.path}'s parent's path is: ${parentWithUpdatedPath ? parentWithUpdatedPath.path : ''}`, () => {
            expect(parentWithUpdatedPath).toEqual(expectedParentWithUpdatedPath);
        });
    });
};

testGetParentWithUpdatedPath({
    systemInput: {
        systemOptionValues: [{
            path: '1.SET.CENTER',
            update: {
                name: 'FRONT',
            },
            __typename: 'SystemOptionValue',
        }]
    },
    payload: {
        path: '1.SET.CENTER.JOINERY',
    },
    expectedParentWithUpdatedPath: {
        path: '1.SET.CENTER',
        update: {
            name: 'FRONT',
        },
        __typename: 'SystemOptionValue',
    }
});
testGetParentWithUpdatedPath({
    systemInput: {
        systemOptionValues: [{
            path: '1.SET.CENTER',
            update: {
                name: 'FRONT',
            },
            __typename: 'SystemOptionValue',
        }],
        detailOptionValues: [{
            path: '1.SET.CENTER.__DT__.HEAD.GLAZING.INSIDE',
            update: {
                parentDetailOptionPath: '1.SET.MULTI_PLANE.__DT__.HORIZONTAL'
            },
            __typename: 'DetailOptionValue',
        }],
    },
    payload: {
        path: '1.SET.CENTER.__DT__.HEAD.GLAZING.INSIDE.__CT__.STOPS.DOWN',
    },
    expectedParentWithUpdatedPath: {
        path: '1.SET.CENTER.__DT__.HEAD.GLAZING.INSIDE',
        update: {
            parentDetailOptionPath: '1.SET.MULTI_PLANE.__DT__.HORIZONTAL'
        },
        __typename: 'DetailOptionValue',
    }
});


import { getParentTypename } from "../../system-utils";

function testGetParentTypename({
    path,
    expectedTypename,
}) {
    const parentTypename = getParentTypename({ path });
    describe('Testing typename', () => {
        test(`${path} matches parent typename of ${expectedTypename}`, () => {
            expect(parentTypename).toBe(expectedTypename);
        })
    })
}

testGetParentTypename({
    path: '1.SET',
    expectedTypename: 'SystemOption',
})

testGetParentTypename({
    path: '1.SET.CENTER',
    expectedTypename: 'SystemOptionValue',
})

testGetParentTypename({
    path: '1.SET.CENTER.__DT__.HEAD',
    expectedTypename: 'SystemDetail',
})

testGetParentTypename({
    path: '1.SET.CENTER.__DT__.HEAD.GLAZING',
    expectedTypename: 'DetailOption',
})

testGetParentTypename({
    path: '1.SET.CENTER.__DT__.HEAD.GLAZING.DTVAL',
    expectedTypename: 'DetailOptionValue',
})

testGetParentTypename({
    path: '1.SET.CENTER.__DT__.HEAD.GLAZING.DTVAL.__CT__.Config',
    expectedTypename: 'SystemConfiguration',
})
testGetParentTypename({
    path: '1.SET.CENTER.__DT__.HEAD.GLAZING.DTVAL.__CT__.Config.OPTION',
    expectedTypename: 'ConfigurationOption',
})
testGetParentTypename({
    path: '1.SET.CENTER.__DT__.HEAD.GLAZING.DTVAL.__CT__.Config.O.VALUE',
    expectedTypename: 'ConfigurationOptionValue',
})

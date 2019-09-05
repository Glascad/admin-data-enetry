import { findItemByIdAndTypename } from "../../utils";
import { nearlyEmptySystem } from '../../../../sample-systems';

function testFindItemByIdAndTypname(system, item, expectedResult) {
    describe('testing find item by id and typename', () => {
        const result = findItemByIdAndTypename(system, item);
        test('should return the correct item', () => {
            console.log({ item, expectedResult, result });
            if (expectedResult) {
                expect(result).toMatchObject({
                    ...item,
                    ...expectedResult,
                });
            } else {
                expect(result).toBeUndefined();
            }
        });
    });
}

testFindItemByIdAndTypname({
    item1: {
        id: 1,
        __typename: "SDLKFJ",
    },
    item2: {
        id: 2,
        __typename: "SystemOption",
        item3: {
            id: 1,
            __typename: "SystemOption",
            name: "JOINERY",
        },
    },
}, {
    id: 1,
    __typename: "SystemOption"
}, {
    name: "JOINERY",
});

testFindItemByIdAndTypname({
    item: {
        item: {
            id: 2,
        },
        __typename: "sldkfj",
    },
    otherItem: {
        item: {
            item: {
                items: [
                    {
                        id: 1,
                        __typename: "SystemOption",
                        name: "SET",
                    },
                ],
            },
        },
    },
}, {
    id: 1,
    __typename: "SystemOption"
}, {
    name: "SET",
});

testFindItemByIdAndTypname({
    item: {
        item: {
            fakeId: 2,
        },
        __typename: "sldkfj",
    },
    otherItem: {
        item: {
            item: {
                items: [
                    {
                        fakeId: 1,
                        __typename: "SystemOption",
                        name: "SET",
                    },
                ],
            },
        },
    },
}, {
    fakeId: 1,
    __typename: "SystemOption"
}, {
    name: "SET",
});

testFindItemByIdAndTypname({
    item: {
        item: {
            item: {

            },
        },
    },
},
    undefined,
    undefined,
);

testFindItemByIdAndTypname(
    nearlyEmptySystem,
    {
        fakeId: -1,
        __typename: "SystemOption",
    },
    {},
);

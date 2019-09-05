import { UPDATE_SYSTEM_OPTION } from "../../actions";
import { systemUpdate, systemOptionUpdate } from "../../schemas";
import "../../../../../../../../public";

function testUpdateSystemOption({
    systemInput,
    option,
    systemOptions,
}) {
    describe('Testing update system option', () => {
        const result = UPDATE_SYSTEM_OPTION({ ...systemUpdate, ...systemInput }, option);
        test('Result should be correct', () => {
            console.log({ option, systemOptions, result: result.systemOptions });
            expect(result.systemOptions).toMatchObject(systemOptions.map(o => ({
                ...o,
                __typename: "SystemOption",
            })));
        });
    });
}

testUpdateSystemOption({
    systemInput: {},
    option: {
        id: 1,
        name: "JOINERY",
    },
    systemOptions: [
        {
            id: 1,
            name: "JOINERY",
        },
    ],
});

testUpdateSystemOption({
    systemInput: {
        systemOptions: [
            {
                ...systemOptionUpdate,
                id: 1,
                name: "SET",
            },
        ],
    },
    option: {
        id: 1,
        name: "JOINERY",
    },
    systemOptions: [
        {
            id: 1,
            name: "JOINERY",
        },
    ],
});

testUpdateSystemOption({
    systemInput: {
        systemOptions: [
            {
                ...systemOptionUpdate,
                id: 1,
                name: "SET",
            },
        ],
    },
    option: {
        id: 2,
        name: "JOINERY",
    },
    systemOptions: [
        {
            id: 1,
            name: "SET",
        },
        {
            id: 2,
            name: "JOINERY",
        },
    ],
});

testUpdateSystemOption({
    systemInput: {
        systemOptions: [
            {
                ...systemOptionUpdate,
                fakeId: 1,
                name: "SET",
            },
        ],
    },
    option: {
        fakeId: 2,
        name: "JOINERY",
    },
    systemOptions: [
        {
            fakeId: 1,
            name: "SET",
        },
        {
            fakeId: 2,
            name: "JOINERY",
        },
    ],
});

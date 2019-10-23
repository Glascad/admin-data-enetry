import { getOldPath } from "../../utils"
import { systemUpdate } from "../../schemas";

function testGetOldPath({ systemInput, path, resultPath }) {
    describe(`getting the old path from a path`, () => {
        const oldPath = getOldPath(systemInput, path);
        test(`testing ${oldPath} to be ${resultPath}`, () => {
            expect(oldPath).toBe(resultPath);
        });
    });
};

testGetOldPath({
    systemInput: {
        ...systemUpdate,
        systemOptions: [
            {
                path: "1.4.5.A.B",
                update: {
                    parentSystemOptionValue: "1.2.3.A.7"
                }
            },
            {
                path: "1.4.5.A",
                update: {
                    parentSystemOptionValue: "1.2.3"
                }
            },
        ],
        systemOptionValues: [
            {
                path: "1.4.5.A",
                update: {
                    parentSystemOptionValue: "1.5.7.8.4.2.6.8.3.A.B.48.99.1341"
                }
            },
            {
                path: "1.4.5.A.B",
                update: {
                    parentSystemOptionValue: "1.2.3.A.7"
                }
            }
        ]
    },
    path: "1.2.3.A.7.B.10",
    resultPath: "1.4.5.A.B.10",
});
testGetOldPath({
    systemInput: {
        ...systemUpdate,
        systemOptions: [
            {
                path: "1.4.5.A",
                update: {
                    parentSystemOptionValue: "1.2.3"
                }
            },
            {
                path: "1.4.5.A.B",
                update: {
                    parentSystemOptionValue: "1.2.3.A.7"
                }
            },
        ],
    },
    path: "1.2.3.A.7",
    resultPath: "1.4.5.A.7",
});
testGetOldPath({
    systemInput: {
        ...systemUpdate,
        systemOptions: [
            {
                path: "1.4.5.A",
                update: {
                    parentSystemOptionValue: "1.2.3"
                }
            },
            {
                path: "1.4.5.A.B",
                update: {
                    parentSystemOptionValue: "1.2.3.A"
                }
            },
        ],
    },
    path: "1.2.3.A.B",
    resultPath: "1.4.5.A.B",
});
testGetOldPath({
    systemInput: {
        ...systemUpdate,
        systemOptions: [
            {
                path: "1.4.5.A",
                update: {
                    parentSystemOptionValue: "1.2.3"
                }
            },
            {
                path: "1.4.5.A.B",
                update: {
                    parentSystemOptionValue: "1.2.3.A.7"
                }
            },
        ],
    },
    path: "1.2.3.A.7.B.10.11.C",
    resultPath: "1.4.5.A.B.10.11.C",
});
testGetOldPath({
    systemInput: {
        ...systemUpdate,
        systemOptions: [
            {
                path: "1.4.5.A",
                update: {
                    parentSystemOptionValue: "1.2.3"
                }
            },
            {
                path: "1.4.5.A.B",
                update: {
                    parentSystemOptionValue: "1.2.3.A.7"
                }
            },
        ],
    },
    path: "1.5.7.D.C.E",
    resultPath: "1.5.7.D.C.E",
});
testGetOldPath({
    systemInput: {
        ...systemUpdate,
        systemOptions: [
            {
                path: "1.A",
                update: {
                    name: "B"
                }
            },
        ],
    },
    path: "1.B",
    resultPath: "1.A",
});
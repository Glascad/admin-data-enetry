import extractArrayCount from '../extract-array-count';

describe('extract array count tests', () => {
    test('names key correctly', () => {
        const queryResult = {
            data: {
                project: {
                    id: 1,
                    name: "Project",
                    elevationsByProjectId: {
                        totalCount: 4,
                        // nodes: [],
                    },
                },
            },
        };
        expect(extractArrayCount(queryResult)).toMatchObject({
            data: {
                project: {
                    id: 1,
                    name: "Project",
                    elevationsByProjectIdCount: 4,
                },
            },
        });
    });
});

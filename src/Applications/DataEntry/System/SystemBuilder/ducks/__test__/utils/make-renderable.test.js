import { makeRenderable } from '../../utils';
import { system1 } from '../../../../sample-systems';

function testMakeRenderable(system) {
    describe(`Testing MakeRenderable on ${system.name}`, () => {
        const result = makeRenderable(system);
        test(`all nodes have correct shape`, () => {
            const nodesHaveCorrectShape = ({
                item: {
                    __typename
                },
                branches
            }, parentTypeName = '') => {
                switch (parentTypeName
                    .replace(/^.*(option|value|type)$/i, '$1')
                    .toLowerCase()) {
                    case 'option':
                        expect(__typename).toMatch(/value$/i);
                        break;
                    case 'value':
                        expect(__typename).toMatch(/(type|value)$/i);
                        break;
                    case 'type':
                    case '':
                        expect(__typename).toMatch(/option$/i);
                        break;
                    default:
                        throw new Error(`Expected option value or type __typename, received ${__typename}`);
                }
                // expect(node).toMatchObject({
                //     item: expect.objectContaining({}),
                //     branches: expect.arrayContaining([]),
                // });
                branches.forEach(branch => nodesHaveCorrectShape(branch, __typename));
            };
            nodesHaveCorrectShape(result);
        });
    });
}

testMakeRenderable(system1)

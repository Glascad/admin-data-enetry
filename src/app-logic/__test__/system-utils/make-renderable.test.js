import { makeRenderable } from '../../system';
import { sample1 } from '../sample-systems';
import { match, final } from '../../../utils';

function testMakeRenderable(system) {
    describe(`Testing MakeRenderable on ${system.name}`, () => {
        const result = makeRenderable(system);
        test(`all nodes have correct shape`, () => {
            const testNode = ({
                item: {
                    __typename = '',
                } = {},
                branches = [],
            } = {},
                parentTypename = '',
            ) => final(match(parentTypename)
                .regex(/option$/i, () => expect(__typename).toMatch(/value$/i))
                .regex(/value$/i, () => expect(__typename).toMatch(/(detail|configuration|option)$/i))
                .regex(/(^)|(configuration)|(detail)$/i, () => expect(__typename).toMatch(/option$/i))
                .otherwise(() => {
                    throw new Error(`Expected option value or type __typename, received parentTypename: "${parentTypename}", and __typename: "${__typename}"`);
                }))
                .finally(() => branches.forEach(branch => testNode(branch, __typename)));
            testNode(result);
        });
    });
}

testMakeRenderable(sample1);

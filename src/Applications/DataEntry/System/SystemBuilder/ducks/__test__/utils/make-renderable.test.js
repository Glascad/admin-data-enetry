import { makeRenderable } from '../../utils';
import { sample1 } from '../../../../sample-systems';
import { match, logInputOutput } from '../../../../../../../utils';

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
                parentTypeName = '',
            ) => match(parentTypeName)
                .regex(/option$/i, () => expect(__typename).toMatch(/value$/i))
                .regex(/value$/i, () => expect(__typename).toMatch(/(type|option)$/i))
                .regex(/(^)|(type)$/i, () => expect(__typename).toMatch(/option$/i))
                .otherwise(() => {
                    throw new Error(`Expected option value or type __typename, received ${__typename}`);
                })
                .finally(() => {
                    branches.forEach(branch => testNode(branch, __typename));
                });
            testNode(result);
        });
    });
}

testMakeRenderable(sample1);

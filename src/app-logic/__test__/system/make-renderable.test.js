import { makeRenderable } from '../../system';
import { sample1 } from '../sample-systems';
import { match, final } from '../../../utils';

function testMakeRenderable(system) {
    describe(`Testing MakeRenderable on ${system.name}`, () => {
        const result = makeRenderable(system);
        test(`all nodes have correct shape`, () => {
            function testNode({
                item: {
                    __typename = '',
                } = {},
                branches = [],
            } = {},
                parentTypename = '',
            ) {
                final(
                    match(parentTypename)
                        // first node should be system
                        .equals("", () => expect(__typename).toMatch(/^system$/i))
                        // options should have values as children
                        .regex(/option$/i, () => expect(__typename).toMatch(/value$/i))
                        // values should have details or configurations or parts or options as children
                        .regex(/value$/i, () => expect(__typename).toMatch(/(detail|configuration|part|option)$/i))
                        .regex(/system$/i, () => expect(__typename).toMatch(/(option)|(detail)$/i))
                        // details have options or configurations
                        .regex(/detail$/i, () => expect(__typename).toMatch(/(option)|(configuration)$/i))
                        // configurations have options or parts
                        .regex(/configuration$/i, () => expect(__typename).toMatch(/(option)|(part)$/i))
                        .otherwise(() => {
                            throw new Error(`Expected option value or type __typename, received parentTypename: "${parentTypename}", and __typename: "${__typename}"`);
                        })
                )
                    .finally(() => branches.forEach(branch => testNode(branch, __typename)))
            }
            testNode(result);
        });
    });
}

testMakeRenderable(sample1);

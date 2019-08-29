import { makeRenderable } from '../../utils';
import { sample1 } from '../../../../sample-systems';
import { match } from '../../../../../../../utils';

function testMakeRenderable(system) {
    describe(`Testing MakeRenderable on ${system.name}`, () => {
        const result = makeRenderable(system);
        test(`all nodes have correct shape`, () => {
            const nodesHaveCorrectShape = ({
                item: {
                    __typename,
                } = {},
                branches,
            } = {},
                parentTypeName = '') => {
                match(parentTypeName)
                    .condition(parentTypeName.match(/option/i), () => {
                        expect(__typename).toMatch(/value$/i);
                    })
                    .condition(parentTypeName.match(/value/i), () => {
                        expect(__typename).toMatch(/(type|value)$/i);
                    })
                    .condition(parentTypeName === '' || parentTypeName.match(/type/), () => {
                        expect(__typename).toMatch(/option$/i);
                    })
                    .otherwise(() => {
                        throw new Error(`Expected option value or type __typename, received ${__typename}`);
                    });
                branches.forEach(branch => nodesHaveCorrectShape(branch, __typename));
            };
            nodesHaveCorrectShape(result);
        });
    });
}

testMakeRenderable(sample1);

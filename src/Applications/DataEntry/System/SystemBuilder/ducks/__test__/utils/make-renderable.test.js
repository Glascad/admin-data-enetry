import { makeRenderable } from '../../utils';
import { sample1 } from '../../../../sample-systems';
import { match } from '../../../../../../../utils';

function testMakeRenderable(system) {
    describe(`Testing MakeRenderable on ${system.name}`, () => {
        const result = makeRenderable(system);
        test(`all nodes have correct shape`, () => {
            const nodesHaveCorrectShape = ({
                item: {
                    __typename = '',
                } = {},
                branches = [],
            } = {},
                parentTypeName = '',
            ) => (
                    match(parentTypeName)
                        .condition(parentTypeName.match(/option/i), tn => {
                            expect(tn).toMatch(/value$/i);
                        })
                        .condition(parentTypeName.match(/value/i), tn => {
                            expect(tn).toMatch(/(type|value)$/i);
                        })
                        .condition(parentTypeName === '' || parentTypeName.match(/type/), tn => {
                            expect(tn).toMatch(/option$/i);
                        })
                        .otherwise(tn => {
                            throw new Error(`Expected option value or type __typename, received ${tn}`);
                        })
                        .finally(() => {
                            branches.forEach(branch => nodesHaveCorrectShape(branch, __typename));
                        })
                );
            nodesHaveCorrectShape(result);
        });
    });
}

testMakeRenderable(sample1);

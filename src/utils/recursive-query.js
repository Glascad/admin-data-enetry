
/**
 * recursiveString and recursiveQuery are meant to be invoked with backticks.
 * 
 * recursiveString will repeat itself inside of itself as many times as specified, as follows:
 * 
 * recursiveString`before ${0} after`;
 * will return 'before  after'.
 * 
 * recursiveString`before ${3} after`;
 * will return 'before before before before  after after after after'.
 * 
 * notice the 3 repetitions are added on to the initial string and therefore results in a total of 4 befores and 4 afters.
 * 
 * 
 * recursiveQuery will only repeat the specified portion of the string, as follows:
 * 
 * recursiveQuery`{
 *     item1{
 *         key1
 *         key2
 *         ${"start"}
 *         nestedKey{
 *             key3
 *             key4
 *             ${1}
 *         }
 *         ${"finish"}
 *     }
 * }`
 * 
 * The above example will repeat everything between the start and finish once, placing it where the ${1} is located, and resulting in:
 * 
 * recursiveQuery`{
 *     item1{
 *         key1
 *         key2
 *         nestedKey{
 *             key3
 *             key4
 *             nestedKey{
    *              key3
    *              key4
 *             }
 *         }
 *     }
 * }`
 * 
 * You must correctly specify the start and finish of the recursion, as well as the location of repetition of the recursive block inside of itself.
 */

const recursiveString = ([before = '', after = '', ...tooMany], count = 0) => {
    if (tooMany.length) return new Error("must not interpolate more than once");
    else if (count <= 0) return before + after;
    else return before + recursiveString([before, after], count - 1) + after;
}

const recursiveQuery = ([before, rec_1, rec_2, after, ...tooMany], start, count, finish) => {
    if (tooMany.length) return new Error("must not interpolate more than thrice");
    else return before + recursiveString([rec_1, rec_2], count) + after;
}

export default recursiveQuery;

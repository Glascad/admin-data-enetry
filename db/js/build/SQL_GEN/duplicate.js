const { partialLoop, loopStart, loopEnd, LOOP } = require('./loop');

const duplicate = (path, contents) => {

    const loopAttempts = contents.match(partialLoop);
    const loopMatches = contents.match(loopStart);
    const endLoopMatches = contents.match(loopEnd);
    const loopAttemptCount = (loopAttempts || []).length;
    const loopCount = (loopMatches || []).length;
    const endLoopCount = (endLoopMatches || []).length;

    if (loopAttemptCount !== loopCount) throw new Error(`Invalid <<LOOP ... >> attempt in ${log.errorPath(path)}`);
    if (loopCount !== endLoopCount) throw new Error(`Unequal number of '<<LOOP ... >>'s and '<<END LOOP>'s in ${log.errorPath(path)}`);

    return LOOP(path, contents);
}

module.exports = duplicate;

// OBJECTS
import { DIRECTIONS, GET_RELATIVE_DIRECTIONS, getDirectionFromArrowKey } from './objects/directions';
// CLASSES
import parseSearch from './classes/parse-search';
import ImperialValue from './classes/imperial-values';
import Loggable from './classes/loggable';
// FUNCTIONS
import removeNullishValues from './functions/remove-nullish-values';
import replaceByKeys from './functions/replace-by-keys';
import flattenNodeArrays from './functions/flatten-node-arrays';
import extractArrayCount from './functions/extract-array-count';
import normalizeQueryResponse from './functions/normalize-query-response';
import recursiveQuery from './functions/recursive-query';
import extractNavigationOptions from './functions/extract-navigation-options';
import arraysContainEqualValues from './functions/arrays-contain-equal-values';
import allocate from './functions/allocate';
import unique from './functions/unique-array';
import lastItem from './functions/last-item';
import normalCase from './functions/normal-case';
import logInputOutput from './functions/log-input-output';
import match, { final } from './functions/match';
import replace from './functions/replace';
import { extractPathData } from './functions/parse-svg';
import getDroppedFileContents from './functions/get-dropped-file-contents';
import DXFToSVG from './functions/dxf-to-svg';
import * as trig from './functions/trig';
import * as svg from './functions/svg-utils';
import Matrix from './functions/matrix';
import limitRefetches from './functions/limit-refetches';
import pipe, { asyncPipe } from './functions/pipe';

const validatePath = path => path.replace(/\/+/g, '/');

export {
    // OBJECTS
    DIRECTIONS,
    GET_RELATIVE_DIRECTIONS,
    getDirectionFromArrowKey,
    // CLASSES
    parseSearch,
    ImperialValue,
    Loggable,
    // FUNCTIONS
    removeNullishValues,
    replaceByKeys,
    flattenNodeArrays,
    extractArrayCount,
    normalizeQueryResponse,
    recursiveQuery,
    extractNavigationOptions,
    arraysContainEqualValues,
    allocate,
    unique,
    lastItem,
    validatePath,
    normalCase,
    logInputOutput,
    match,
    // when,
    final,
    replace,
    extractPathData,
    DXFToSVG,
    getDroppedFileContents,
    trig,
    svg,
    Matrix,
    limitRefetches,
    pipe,
    asyncPipe,
};

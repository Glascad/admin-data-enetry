const M = require('mathjs');


/**
 * RADIANS
 * 
 * converts degrees to radians
 * 
 * @param {number} degrees - the angle in degrees that should be converted to radians
 */

function radians(degrees) {
    return degrees * Math.PI / 180;
}

/**
 * DEGREES
 * 
 * converts radians to degrees
 * 
 * @param {number} radians - the angle in radians that should be converted to degrees
 */

function degrees(radians) {
    return radians * 180 / Math.PI;
}



// TRIGONOMETRIC FUNCTIONS

/**
 * SINE
 * 
 * returns the sine from degrees (as opposed to radians used in Math.sin())
 * 
 * @param {number} degrees - the angle in degrees
 */

function sin(degrees) {
    return Math.sin(radians(degrees));
}

/**
 * COSINE
 * 
 * returns the cosine from degrees (as opposed to radians used in Math.cos())
 * 
 * @param {number} degrees - the angle in degrees
 */

function cos(degrees) {
    return Math.cos(radians(degrees));
}



// MATRICES

// IDENTITY MATRIX

const IDENTITY_MATRIX = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
];

/**
 * CREATE TRANSFORMATION
 * 
 * takes in any number of values to be inserted into the Identity Matrix, returns the Identity Matrix unchanged if no arguments are supplied
 * 
 * @param {Object} [T={}] - Object containing values to be inserted into the Identity Matrix
 * 
 * @param {number} [T.a=1] - Base scale factor of X
 * @param {number} [T.b=0] - Scale factor of X in relation to Y
 * @param {number} [T.c=0] - Translation factor of X
 * 
 * @param {number} [T.d=0] - Scale factor of Y in relation to X
 * @param {number} [T.e=1] - Base scale factor of Y
 * @param {number} [T.f=0] - Translation factor of Y
 * 
 * @param {number} [T.g=0] - Do not use
 * @param {number} [T.h=0] - Do not use
 * @param {number} [T.i=1] - Do not use
 */

function createTransformation({
    a = 1, b = 0, c = 0,
    d = 0, e = 1, f = 0,
    g = 0, h = 0, i = 1
} = {}) {
    return [
        [a, b, c],
        [d, e, f],
        [g, h, i]
    ];
}

const z = undefined;
const origin = { x: 0, y: 0 };



// BASE TRANSFORMATIONS

/**
 * CREATE TRANSLATION
 * 
 * takes in horizontal and vertical translation values and returns a matrix that will perform the operation
 * 
 * @param {number} c - translation factor along the horizontal axis (x)
 * @param {number} f - translation factor along the vertical axis (y)
 */

function createTranslation(c, f) {
    return createTransformation({ c, f });
}

/**
 * CREATE SCALE
 * 
 * takes in horizontal and vertical scale values and returns a matrix that will perform the operation
 * 
 * @param {number} a - scale factor along the horizontal axis (x)
 * @param {number} e - scale factor along the vertical axis (y)
 */

function createScale(a, e) {
    return createTransformation({ a, e });
}

/**
 * CREATE SHEAR
 * 
 * takes in horizontal and vertical shear values and returns a matrix that will perform the operation
 * 
 * @param {number} b - horizontal shear factor (x in relation to y)
 * @param {number} d - vertical shear factor (y in relation to x)
 */

function createShear(b, d) {
    return createTransformation({ b, d });
}

/**
 * CREATE ROTATION
 * 
 * takes in an angle in degrees and returns a matrix that performs a counter-clockwise rotation operation of that angle (given rightward X and upward Y axes)
 * 
 * @param {number} phi - the number of degrees to rotate counter-clockwise (given rightward X and upward Y axes)
 */

function createRotation(phi) {
    return createTransformation({
        a: cos(phi), b: -sin(phi),
        d: sin(phi), e: cos(phi)
    });
}



// COMPLEX TRANSFORMATIONS

/**
 * CREATE CENTERED SCALE
 * 
 * returns a matrix that will scale an object around a given center point
 * 
 * @param {Object} S - object representing the scale factor
 * @param {number} S.x - horizontal scale factor
 * @param {number} S.y - vertical scale factor
 * 
 * @param {Object} P - coordinates of the given center point
 * @param {number} P.x - x coordinate of the center point
 * @param {number} P.y - y coordinate of the center point
 */

function createCenteredScale(S, P) {
    let translation1 = createTranslation(-P.x, -P.y);
    let scale = createScale(S.x, S.y);
    let translation2 = createTranslation(P.x, P.y);
    return M.multiply(
        translation2,
        scale,
        translation1
    );
}


/**
 * CREATE CENTERED ROTATION
 * 
 * returns a matrix that will rotate an object around a given center point
 * 
 * @param {number} phi - the number of degrees to rotate counter-clockwise relative to the center point (given rightward X and upward Y axes)
 * 
 * @param {Object} P - the coordinates of the given center point
 * @param {number} P.x - x coordinate of the center point
 * @param {number} P.y - y coordinate of the center point
 */

function createCenteredRotation(phi, P) {
    let translation1 = createTranslation(-P.x, -P.y);
    let rotation = createRotation(phi);
    let translation2 = createTranslation(P.x, P.y);
    return M.multiply(
        translation2,
        rotation,
        translation1
    );
}

/**
 * CREATE SCALE WITH AXIS
 * 
 * returns a matrix that will scale around a given axis
 * 
 * @param {Object} S - object representing the scale factor
 * @param {number} S.x - horizontal scale factor
 * @param {number} S.y - vertical scale factor
 * 
 * @param {number} phi - the counter-clockwise relative to the center point (given rightward X and upward Y axes) angle between the axis and the current x axis (given rightward X and upward Y axes)
 * 
 * @param {Object} P - coordinates of the center point of the axis
 * @param {number} P.x - x coordinate of the axis center point
 * @param {number} P.y - y coordinate of the axis center point
 */

function createScaleWithAxis(S, phi, P) {
    let translation1 = createTranslation(-P.x, -P.y);
    let rotation1 = createRotation(phi);
    let scale = createScale(S.x, S.y);
    let rotation2 = createRotation(-phi);
    let translation2 = createTranslation(P.x, P.y);
    return M.multiply(
        translation2,
        rotation2,
        scale,
        rotation1,
        translation1
    );
}

/**
 * CREATE MIRROR ACROSS AXIS
 * 
 * returns a matrix that will mirror across a given axis
 * 
 * @param {number} phi - the counter-clockwise angle between the given axis and the current y axis (given rightward X and upward Y axes)
 * 
 * @param {Object} P - the coordinates of the center point of the axis
 * @param {number} P.x - x coordinate of the axis center point
 * @param {number} P.y - y coordinate of the axis center point
 */

function createMirrorAcrossAxis(phi, P) {
    return createScaleWithAxis({ x: -1, y: 1 }, phi, P);
}



Object.assign(module.exports, {
    IDENTITY_MATRIX,
    createTransformation,
    createTranslation,
    createScale,
    createShear,
    createRotation,
    createCenteredScale,
    createCenteredRotation,
    createScaleWithAxis,
    createMirrorAcrossAxis
});

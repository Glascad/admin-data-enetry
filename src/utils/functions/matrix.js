import { multiply } from 'mathjs';


/**
 * RADIANS
 * 
 * converts degrees to radians
 * 
 * @param {number} degrees - the angle in degrees that should be converted to radians
 */

export const radians = degrees => degrees * Math.PI / 180;

/**
 * DEGREES
 * 
 * converts radians to degrees
 * 
 * @param {number} radians - the angle in radians that should be converted to degrees
 */

export const degrees = radians => radians * 180 / Math.PI;



// TRIGONOMETRIC FUNCTIONS

/**
 * SINE
 * 
 * returns the sine from degrees (as opposed to radians used in Math.sin())
 * 
 * @param {number} degrees - the angle in degrees
 */

export const sin = degrees => Math.sin(radians(degrees));

/**
 * COSINE
 * 
 * returns the cosine from degrees (as opposed to radians used in Math.cos())
 * 
 * @param {number} degrees - the angle in degrees
 */

export const cos = degrees => Math.cos(radians(degrees));



// MATRICES

// IDENTITY MATRIX

export const IDENTITY_MATRIX = [
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

export const createTransformation = ({
    a = 1, b = 0, c = 0,
    d = 0, e = 1, f = 0,
    g = 0, h = 0, i = 1
} = {}) => [
        [a, b, c],
        [d, e, f],
        [g, h, i]
    ];

export const z = undefined;
export const origin = { x: 0, y: 0 };



// BASE TRANSFORMATIONS

/**
 * CREATE TRANSLATION
 * 
 * takes in horizontal and vertical translation values and returns a matrix that will perform the operation
 * 
 * @param {number} c - translation factor along the horizontal axis (x)
 * @param {number} f - translation factor along the vertical axis (y)
 */

export const createTranslation = (c, f) => createTransformation({ c, f });

/**
 * CREATE SCALE
 * 
 * takes in horizontal and vertical scale values and returns a matrix that will perform the operation
 * 
 * @param {number} a - scale factor along the horizontal axis (x)
 * @param {number} e - scale factor along the vertical axis (y)
 */

export const createScale = (a, e) => createTransformation({ a, e });

/**
 * CREATE SHEAR
 * 
 * takes in horizontal and vertical shear values and returns a matrix that will perform the operation
 * 
 * @param {number} b - horizontal shear factor (x in relation to y)
 * @param {number} d - vertical shear factor (y in relation to x)
 */

export const createShear = (b, d) => createTransformation({ b, d });

/**
 * CREATE ROTATION
 * 
 * takes in an angle in degrees and returns a matrix that performs a counter-clockwise rotation operation of that angle (given rightward X and upward Y axes)
 * 
 * @param {number} phi - the number of degrees to rotate counter-clockwise (given rightward X and upward Y axes)
 */

export const createRotation = phi => createTransformation({
    a: cos(phi), b: -sin(phi),
    d: sin(phi), e: cos(phi),
});



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

export const createCenteredScale = (S, P) => multiply(
    createTranslation(P.x, P.y), // translation 2
    createScale(S.x, S.y), // scale
    createTranslation(-P.x, -P.y), // translation 1
);


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

export const createCenteredRotation = (phi, P) => multiply(
    createTranslation(P.x, P.y), //  translation 2
    createRotation(phi), //  rotation
    createTranslation(-P.x, -P.y), //  translation 1
);

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

export const createScaleWithAxis = (S, phi, P) => multiply(
    createTranslation(P.x, P.y), // translation 2
    createRotation(-phi), // rotation 2
    createScale(S.x, S.y), // scale
    createRotation(phi), // rotation 1
    createTranslation(-P.x, -P.y), // translation 1
);

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

export const createMirrorAcrossAxis = (phi, P) => createScaleWithAxis({ x: -1, y: 1 }, phi, P);

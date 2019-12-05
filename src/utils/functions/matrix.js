import { multiply, add } from 'mathjs';
import { cos, sin } from './trig';

export default window.Matrix = class Matrix {
    // IDENTITY MATRIX

    static IDENTITY_MATRIX = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
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

    static toArray = ({
        a = 1, b = 0, c = 0,
        d = 0, e = 1, f = 0,
        g = 0, h = 0, i = 1,
    } = {}) => [
            [a, b, c],
            [d, e, f],
            [g, h, i]
        ];

    static toObject = ([
        [a = 1, b = 0, c = 0],
        [d = 0, e = 1, f = 0],
        [g = 0, h = 0, i = 1],
    ]) => ({
        a, b, c,
        d, e, f,
        g, h, i,
    });

    static complete = matrix => Array.isArray(matrix) ?
        Matrix.toArray(Matrix.toObject(matrix))
        :
        Matrix.toObject(Matrix.toArray(matrix));

    static multiply = (...matrices) => new Matrix(
        multiply(
            ...matrices.map(m => m instanceof Matrix ?
                m.array
                :
                m,
            ),
        ),
    );

    static add = (...matrices) => new Matrix(
        add(
            ...matrices.map(m => m instanceof Matrix ?
                m.array
                :
                m,
            ),
        ),
    );

    // BASE TRANSFORMATIONS

    /**
     * CREATE TRANSLATION
     * 
     * takes in horizontal and vertical translation values and returns a matrix that will perform the operation
     * 
     * @param {number} c - translation factor along the horizontal axis (x)
     * @param {number} f - translation factor along the vertical axis (y)
     */

    static createTranslation = (c, f) => new Matrix({ c, f });

    /**
     * CREATE SCALE
     * 
     * takes in horizontal and vertical scale values and returns a matrix that will perform the operation
     * 
     * @param {number} a - scale factor along the horizontal axis (x)
     * @param {number} e - scale factor along the vertical axis (y)
     */

    static createScale = (a, e) => new Matrix({ a, e });

    /**
     * CREATE SHEAR
     * 
     * takes in horizontal and vertical shear values and returns a matrix that will perform the operation
     * 
     * @param {number} b - horizontal shear factor (x in relation to y)
     * @param {number} d - vertical shear factor (y in relation to x)
     */

    static createShear = (b, d) => new Matrix({ b, d });

    /**
     * CREATE ROTATION
     * 
     * takes in an angle in degrees and returns a matrix that performs a counter-clockwise rotation operation of that angle (given rightward X and upward Y axes)
     * 
     * @param {number} phi - the number of degrees to rotate counter-clockwise (given rightward X and upward Y axes)
     */

    static createRotation = phi => new Matrix({
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

    static createCenteredScale = (S, P) => Matrix.multiply(
        Matrix.createTranslation(P.x, P.y), // translation 2
        Matrix.createScale(S.x, S.y), // scale
        Matrix.createTranslation(-P.x, -P.y), // translation 1
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

    static createCenteredRotation = (phi, P) => Matrix.multiply(
        Matrix.createTranslation(P.x, P.y), //  translation 2
        Matrix.createRotation(phi), //  rotation
        Matrix.createTranslation(-P.x, -P.y), //  translation 1
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

    static createScaleWithAxis = (S, phi, P) => Matrix.multiply(
        Matrix.createTranslation(P.x, P.y), // translation 2
        Matrix.createRotation(-phi), // rotation 2
        Matrix.createScale(S.x, S.y), // scale
        Matrix.createRotation(phi), // rotation 1
        Matrix.createTranslation(-P.x, -P.y), // translation 1
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

    static createMirrorAcrossAxis = (phi, P) => Matrix.createScaleWithAxis({ x: -1, y: 1 }, phi, P);

    // CONSTRUCTOR
    constructor(arg = Matrix.IDENTITY_MATRIX) {
        if (Array.isArray(arg)) {
            this.array = Matrix.complete(arg);
            this.object = Matrix.toObject(arg);
        } else {
            this.array = Matrix.toArray(arg);
            this.object = Matrix.complete(arg);
        }

    }

    transformCoordinate = (X, Y) => {
        const { c, f } = this.object;
        const [[x], [y]] = multiply(this.array, [[X], [Y], [0]]);
        return { x: x + c, y: y + f };
    }

    multiply = (...matrices) => Matrix.multiply(this, ...matrices);
    add = (...matrices) => Matrix.add(this, ...matrices);

    toString = () => {
        const {
            object: {
                a,
                b,
                c,
                d,
                e,
                f,
                g,
                h,
                i,
            },
        } = this;
        return `matrix(${a} ${d} ${b} ${e} ${c} ${f})`;
    }

    toArray = () => this.array;
    toObject = () => this.object;
}

window.Matrix.IDENTITY = new window.Matrix(window.Matrix.IDENTITY_MATRIX);
window.Matrix.TEMP = new window.Matrix({ a: 0, b: -1, c: 20, d: 1, e: 0 });

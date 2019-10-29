
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


/**
 * RADIANS
 * 
 * converts degrees to radians
 * 
 * @param {number} degrees - the angle in degrees that should be converted to radians
 */

export const radians = window.radians = degrees => degrees * Math.PI / 180;

/**
 * DEGREES
 * 
 * converts radians to degrees
 * 
 * @param {number} radians - the angle in radians that should be converted to degrees
 */

export const degrees = window.degrees = radians => radians * 180 / Math.PI;



// TRIGONOMETRIC FUNCTIONS

export const tan = window.tan = degrees => Math.tan(radians(degrees));
export const atan = window.atan = ratio => degrees(Math.atan(ratio));

/**
 * SINE
 * 
 * returns the sine from degrees (as opposed to radians used in Math.sin())
 * 
 * @param {number} degrees - the angle in degrees
 */

export const sin = window.sin = degrees => Math.sin(radians(degrees));
export const asin = window.asin = ratio => degrees(Math.asin(ratio));

/**
 * COSINE
 * 
 * returns the cosine from degrees (as opposed to radians used in Math.cos())
 * 
 * @param {number} degrees - the angle in degrees
 */

export const cos = window.cos = degrees => Math.cos(radians(degrees));
export const acos = window.acos = ratio => degrees(Math.acos(ratio));

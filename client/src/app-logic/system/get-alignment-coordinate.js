import { getPartExtremities } from "../../utils/functions/svg-utils";
import { match, DIRECTIONS } from "../../utils";

const {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    VCENTER,
    HCENTER,
} = DIRECTIONS;

export default window.getAlignmentCoordinate = (vertical, first, {
    x: {
        min: xMin,
        max: xMax,
    },
    y: {
        min: yMin,
        max: yMax,
    },
}) => match(vertical, first)
    .equals(...DOWN, yMin)
    .equals(...UP, yMax)
    .equals(...LEFT, xMin)
    .equals(...RIGHT, xMax)
    .equals(...VCENTER, (yMax + yMin) / 2)
    .equals(...HCENTER, (xMax + xMin) / 2)
    .otherwise(() => {
        throw new Error(`invalid direction vertical: ${vertical} first: ${first}`)
    });

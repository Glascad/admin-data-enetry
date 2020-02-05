
export const DIRECTIONS = {
    UP: [true, false],
    DOWN: [true, true],
    LEFT: [false, true],
    RIGHT: [false, false],
    VCENTER: [true, null],
    HCENTER: [false, null],
};

export const GET_RELATIVE_DIRECTIONS = ([vertical, first]) => ({
    FORWARD: [
        vertical,
        first,
    ],
    BACKWARD: [
        vertical,
        !first,
    ],
    LEFT: [
        !vertical,
        vertical ?
            !first
            :
            first,
    ],
    RIGHT: [
        !vertical,
        vertical ?
            first
            :
            !first,
    ],
});

export const getDirectionFromArrowKey = key => DIRECTIONS[
    key === "ArrowUp" ? "UP"
        :
        key === "ArrowDown" ? "DOWN"
            :
            key === "ArrowLeft" ? "LEFT"
                :
                key === "ArrowRight" ? "RIGHT"
                    :
                    ""];


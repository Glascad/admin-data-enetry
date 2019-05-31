import RecursiveElevation from "../../utils/recursive-elevation/elevation";

// VALIDATION TEST

const validateElevation = (rawElevation) => {
    const recursiveElevation = new RecursiveElevation(rawElevation);
    
    // no orphans
    // no invalid references
    // no overlapping containers
    // no exceeding rough opening
    // no missing details
    // no duplicate details
}

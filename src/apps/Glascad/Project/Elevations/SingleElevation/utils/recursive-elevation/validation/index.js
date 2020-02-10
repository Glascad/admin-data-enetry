import orphans from './orphans';
import RecursiveElevation from "../elevation";
import duplicateDetails from './duplicate-details';
// import missingDetails from './missing-details';
import roughOpening from './rough-opening';
import invalidReferences from './invalid-references';

export default rawElevation => {
    const recursiveElevation = new RecursiveElevation(rawElevation);
    orphans(recursiveElevation);
    invalidReferences(recursiveElevation);
    roughOpening(recursiveElevation);
    // missingDetails(recursiveElevation);
    duplicateDetails(recursiveElevation);
}

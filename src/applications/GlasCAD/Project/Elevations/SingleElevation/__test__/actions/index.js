import RecursiveElevation from "../../utils/recursive-elevation/elevation";

import orphans from './orphans';
import invalidReferences from './invalid-references';
import roughOpening from './rough-opening';
import missingDetails from './missing-details';
import duplicateDetails from './duplicate-details';

export default rawElevation => {
    const recursiveElevation = new RecursiveElevation(rawElevation);
    orphans(recursiveElevation);
    invalidReferences(recursiveElevation);
    roughOpening(recursiveElevation);
    missingDetails(recursiveElevation);
    duplicateDetails(recursiveElevation);
}

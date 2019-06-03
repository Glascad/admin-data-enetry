import RecursiveElevation from "../../utils/recursive-elevation/elevation";

import orphans from '../../BuildElevation/ducks/actions/__test__/orphans';
import invalidReferences from './invalid-references';
import roughOpening from '../../BuildElevation/ducks/actions/__test__/rough-opening';
import missingDetails from '../../BuildElevation/ducks/actions/__test__/missing-details';
import duplicateDetails from './duplicate-details';

export default rawElevation => {
    const recursiveElevation = new RecursiveElevation(rawElevation);
    orphans(recursiveElevation);
    invalidReferences(recursiveElevation);
    roughOpening(recursiveElevation);
    missingDetails(recursiveElevation);
    duplicateDetails(recursiveElevation);
}

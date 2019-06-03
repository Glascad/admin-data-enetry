import mergeElevationInput from '../../merge-input';
// import MERGE_CONTAINERS from '../merge-containers';
import defaultElevationInput from '../../default-elevation-update';
import RecursiveElevation from '../../../../utils/recursive-elevation/elevation';

export default function applyActionToElevation(sampleElevation, ACTION, getPayload) {

    const initialRecursiveElevation = new RecursiveElevation(sampleElevation);

    const result = ACTION({ elevationInput: defaultElevationInput }, getPayload(initialRecursiveElevation));

    const { recursiveElevation } = mergeElevationInput(result, { _elevation: sampleElevation });

    return recursiveElevation;
}

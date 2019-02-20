
import {
    elevation as defaultElevation,
    elevationContainer as defaultElevationContainer,
    container as defaultContainer,
} from './default-elevation';

export default {
    UPDATE({
        elevation,
    }, update) {
        return {
            elevation: {
                ...elevation,
                ...update,
            },
        };
    }
};

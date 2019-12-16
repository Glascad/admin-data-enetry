import { match } from "../../utils";
import getConfigurationPartIdFromPath from "./get-configuration-part-id-from-path";

export default window.getPathPrefix = ({ path, __typename = '', id, fakeId }) => match(__typename)
    .regex(/detail$/i, '__DT__.')
    .regex(/configuration$/i, `__CT__.`)
    .regex(/part$/i, `__PT${id || fakeId || getConfigurationPartIdFromPath(path)}__.`)
    .otherwise('');

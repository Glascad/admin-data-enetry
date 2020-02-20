import { getConfigurationTypeFromPath } from ".";
import getChildren from "./get-children";
import getDefaultPath from "./get-default-path";

export default window.getDefaultConfigurationPaths = ({ path = '' } = {}, systemMap, includeOptionalConfigurations = true) => {

    const defaultPath = getDefaultPath(path, systemMap).replace(/\.__CT__\..*/, '');

    const detail = systemMap[defaultPath];

    const configurations = getChildren(detail, systemMap);

    return configurations.reduce((paths, { path, optional }) => ({
        ...paths,
        ...(!optional || includeOptionalConfigurations ?
            {
                [getConfigurationTypeFromPath(path)]: getDefaultPath(path, systemMap).replace(/\.__PT\d+__\..*/, ''),
            }
            :
            null),
    }), {});
}

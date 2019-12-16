import { getConfigurationTypeFromPath } from ".";
import getChildren from "./get-children";
import getDefaultPath from "./get-default-path";

export default window.getDefaultConfigurationPaths = (detail, systemMap) => {

    const children = getChildren(detail, systemMap);

    return children.reduce((paths, { path }) => ({
        ...paths,
        [getConfigurationTypeFromPath(path)]: getDefaultPath(path, systemMap).replace(/\.__PT\d+__\..*/, ''),
    }), {});
}

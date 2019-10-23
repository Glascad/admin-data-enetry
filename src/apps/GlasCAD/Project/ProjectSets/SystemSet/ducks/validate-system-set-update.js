import { getDetailTypeFromPath, getConfigurationTypeFromPath } from "../../../../../../app-logic/system-utils";

export default function validateSystemSetUpdate({
    systemId,
    systemOptionValuePath,
    detailOptionValues = [],
    configurationOptionValues = [],
}) {

    if (systemId && systemOptionValuePath) {

        if (!systemOptionValuePath.startsWith(`${
            systemId}`)) throw new Error(`Invalid systemOptionValuePath: ${
                systemOptionValuePath
                }, must start with systemId: ${
                systemId
                }`);

        const { newPath: invalidDOVUpdate, oldPath: previousDOVPath } = detailOptionValues.find(({ oldPath, newPath }) => (
            oldPath
            &&
            newPath
            &&
            getDetailTypeFromPath(oldPath) !== getDetailTypeFromPath(newPath)
        ));

        if (invalidDOVUpdate) throw new Error(`Invalid detail option value newPath: ${invalidDOVUpdate}, must have same detail type as ${previousDOVPath}`);

        const { newPath: invalidDetailOptionValuePath } = detailOptionValues
            .find(({ newPath }) => !newPath.startsWith(systemOptionValuePath)) || {};

        if (invalidDetailOptionValuePath) throw new Error(`Invalid detail option value newPath: ${
            invalidDetailOptionValuePath
            }, must start with ${
            systemOptionValuePath
            }`);

        const { newPath: invalidCOVUpdate, oldPath: previousCOVPath } = configurationOptionValues.find(({ oldPath, newPath }) => (
            oldPath
            &&
            newPath
            &&
            getConfigurationTypeFromPath(oldPath) !== getConfigurationTypeFromPath(newPath)
        ));

        if (invalidCOVUpdate) throw new Error(`Invalid configuration option value newPath: ${invalidCOVUpdate}, must have same configuration type as ${previousCOVPath}`);

        const { newPath: invalidConfigurationOptionValuePath } = configurationOptionValues
            .find(({ newPath: covPath }) => !detailOptionValues
                .some(({ newPath: dovPath }) => covPath.startsWith(dovPath))) || {};

        if (invalidConfigurationOptionValuePath) throw new Error(`Invalid configuration option value newPath: ${
            invalidConfigurationOptionValuePath
            }, must start with one of ${
            detailOptionValues.map(({ newPath }) => newPath).join(', ')
            }`);
    }
}

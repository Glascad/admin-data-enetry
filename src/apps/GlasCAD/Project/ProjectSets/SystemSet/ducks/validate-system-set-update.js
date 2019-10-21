
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

        const { newPath: invalidDetailOptionValuePath } = detailOptionValues
            .find(({ newPath }) => !newPath.startsWith(systemOptionValuePath)) || {};

        if (invalidDetailOptionValuePath) throw new Error(`Invalid detail option value newPath: ${
            invalidDetailOptionValuePath
            }, must start with ${
            systemOptionValuePath
            }`);

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

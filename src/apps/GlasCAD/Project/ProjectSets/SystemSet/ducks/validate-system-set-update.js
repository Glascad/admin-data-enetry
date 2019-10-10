
export default function validateSystemSetUpdate({
    systemId,
    systemOptionValuePath = "",
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

        const { detailOptionValuePath: invalidDetailOptionValuePath } = detailOptionValues.find(({ detailOptionValuePath }) => !detailOptionValuePath.startsWith(systemOptionValuePath)) || {};

        if (invalidDetailOptionValuePath) throw new Error(`Invalid detailOptionValuePath: ${
            invalidDetailOptionValuePath
            }, must start with ${
            systemOptionValuePath
            }`);

        const { configurationOptionValuePath: invalidConfigurationOptionValuePath } = configurationOptionValues.find(({ configurationOptionValuePath }) => !detailOptionValues.some(({ detailOptionValuePath }) => configurationOptionValuePath.startsWith(detailOptionValuePath)));

        if (invalidConfigurationOptionValuePath) throw new Error(`Invalid configurationOptionValuePath: ${
            invalidConfigurationOptionValuePath
            }, must start with one of ${
            detailOptionValues.map(({ detailOptionValuePath }) => detailOptionValuePath).join(', ')
            }`);

    }

}


export const configurationOptionValueUpdate = {
    __typename: "ConfigurationOptionValue",
    path: undefined,
};

export const configurationOptionUpdate = {
    __typename: "ConfigurationOption",
    path: undefined,
};

export const systemConfigurationUpdate = {
    __typename: "SystemConfiguration",
    path: undefined,
    optional: false,
};

export const detailOptionValueUpdate = {
    __typename: "DetailOptionValue",
    path: undefined,
};

export const detailOptionUpdate = {
    __typename: "DetailOption",
    path: undefined,
};

export const systemDetailUpdate = {
    __typename: "SystemDetail",
    path: undefined,
};

export const systemOptionValueUpdate = {
    __typename: "SystemOptionValue",
    path: undefined,
    raisedOptionNames: [],
    raisedConfigurationTypes: [],
};

export const systemOptionUpdate = {
    __typename: "SystemOption",
    path: undefined,
};

export const systemUpdate = {
    __typename: "System",
    path: undefined,
    manufacturerId: undefined,
    systemType: undefined,
    pathsToDelete: [],
    systemOptions: [],
    detailOptions: [],
    configurationOptions: [],
    systemOptionValues: [],
    detailOptionValues: [],
    configurationOptionValues: [],
    systemDetails: [],
    systemConfigurations: [],
    newSystemOption: [],
    newDetailOption: [],
    newConfigurationOption: [],
    newSystemOptionValue: [],
    newDetailOptionValue: [],
    newConfigurationOptionValue: [],
    newSystemDetail: [],
    newSystemConfiguration: [],
};

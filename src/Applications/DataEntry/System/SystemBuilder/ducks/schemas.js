
export const configurationOptionValueUpdate = {
    __typename: "ConfigurationOptionValue",
    id: undefined,
    fakeId: undefined,
    name: undefined,
};

export const configurationOptionUpdate = {
    __typename: "ConfigurationOption",
    id: undefined,
    fakeId: undefined,
    name: undefined,
    systemConfigurationTypeId: undefined,
    systemConfigurationTypeFakeId: undefined,
    parentConfigurationOptionValueId: undefined,
    parentConfigurationOptionValueFakeId: undefined,
    configurationOptionValues: [],
};

export const systemConfigurationTypeUpdate = {
    __typename: "SystemConfigurationType",
    id: undefined,
    fakeId: undefined,
    configurationType: undefined,
    optional: false,
};

export const detailOptionValueUpdate = {
    __typename: "DetailOptionValue",
    id: undefined,
    fakeId: undefined,
    name: undefined,
    systemConfigurationTypes: [],
};

export const detailOptionUpdate = {
    __typename: "DetailOption",
    id: undefined,
    fakeId: undefined,
    name: undefined,
    systemDetailTypeId: undefined,
    systemDetailTypeFakeId: undefined,
    parentDetailOptionValueId: undefined,
    parentDetailOptionValueFakeId: undefined,
    detailOptionValues: [],
};

export const systemDetailTypeUpdate = {
    __typename: "SystemDetailType",
    id: undefined,
    fakeId: undefined,
    detailType: undefined
};

export const systemOptionValueUpdate = {
    __typename: "SystemOptionValue",
    id: undefined,
    fakeId: undefined,
    name: undefined,
    raisedOptionNames: [],
    raisedConfigurationTypes: [],
    systemDetailTypes: [],
};

export const systemOptionUpdate = {
    __typename: "SystemOption",
    id: undefined,
    fakeId: undefined,
    name: undefined,
    parentSystemOptionValueId: undefined,
    parentSystemOptionValueFakeId: undefined,
    systemOptionValues: [],
};

export const systemUpdate = {
    __typename: "System",
    id: undefined,
    name: undefined,
    manufacturerId: undefined,
    systemType: undefined,
    systemOptions: [],
    detailOptions: [],
    configurationOptions: [],
    systemOptionIdsToDelete: [],
    detailOptionIdsToDelete: [],
    configurationOptionIdsToDelete: [],
    systemOptionValueIdsToDelete: [],
    detailOptionValueIdsToDelete: [],
    configurationOptionValueIdsToDelete: [],
    systemDetailTypeIdsToDelete: [],
    systemConfigurationTypeIdsToDelete: [],
};

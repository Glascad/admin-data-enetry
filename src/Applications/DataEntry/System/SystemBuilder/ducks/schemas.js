
export const configurationOptionValueUpdate = {
    __typename: "ConfigurationOptionValue",
    id: undefined,
    fakeId: undefined,
    name: undefined,
    parentConfigurationOptionId: undefined,
    parentConfigurationOptionFakeId: undefined,
};

export const configurationOptionUpdate = {
    __typename: "ConfigurationOption",
    id: undefined,
    fakeId: undefined,
    name: undefined,
    parentSystemConfigurationTypeId: undefined,
    parentSystemConfigurationTypeFakeId: undefined,
    parentConfigurationOptionValueId: undefined,
    parentConfigurationOptionValueFakeId: undefined,
};

export const systemConfigurationTypeUpdate = {
    __typename: "SystemConfigurationType",
    id: undefined,
    fakeId: undefined,
    configurationType: undefined,
    optional: false,
    parentDetailOptionValueId: undefined,
    parentDetailOptionValueFakeId: undefined,
};

export const detailOptionValueUpdate = {
    __typename: "DetailOptionValue",
    id: undefined,
    fakeId: undefined,
    name: undefined,
    parentDetailOptionId: undefined,
    parentDetailOptionFakeId: undefined,
};

export const detailOptionUpdate = {
    __typename: "DetailOption",
    id: undefined,
    fakeId: undefined,
    name: undefined,
    parentSystemDetailTypeId: undefined,
    parentSystemDetailTypeFakeId: undefined,
    parentDetailOptionValueId: undefined,
    parentDetailOptionValueFakeId: undefined,
};

export const systemDetailTypeUpdate = {
    __typename: "SystemDetailType",
    id: undefined,
    fakeId: undefined,
    detailType: undefined,
    parentSystemOptionValueId: undefined,
    parentSystemOptionValueFakeId: undefined,
};

export const systemOptionValueUpdate = {
    __typename: "SystemOptionValue",
    id: undefined,
    fakeId: undefined,
    name: undefined,
    raisedOptionNames: [],
    raisedConfigurationTypes: [],
    parentSystemOptionId: undefined,
    parentSystemOptionFakeId: undefined,
};

export const systemOptionUpdate = {
    __typename: "SystemOption",
    id: undefined,
    fakeId: undefined,
    name: undefined,
    parentSystemOptionValueId: undefined,
    parentSystemOptionValueFakeId: undefined,
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
    systemOptionValues: [],
    detailOptionValues: [],
    configurationOptionValues: [],
    systemDetailTypes: [],
    systemConfigurationTypes: [],
    systemOptionIdsToDelete: [],
    detailOptionIdsToDelete: [],
    configurationOptionIdsToDelete: [],
    systemOptionValueIdsToDelete: [],
    detailOptionValueIdsToDelete: [],
    configurationOptionValueIdsToDelete: [],
    systemDetailTypeIdsToDelete: [],
    systemConfigurationTypeIdsToDelete: [],
};

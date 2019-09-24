
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
    parentSystemConfigurationId: undefined,
    parentSystemConfigurationFakeId: undefined,
    parentConfigurationOptionValueId: undefined,
    parentConfigurationOptionValueFakeId: undefined,
};

export const systemConfigurationUpdate = {
    __typename: "SystemConfiguration",
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
    parentSystemDetailId: undefined,
    parentSystemDetailFakeId: undefined,
    parentDetailOptionValueId: undefined,
    parentDetailOptionValueFakeId: undefined,
};

export const systemDetailUpdate = {
    __typename: "SystemDetail",
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
    systemDetails: [],
    systemConfigurations: [],
    systemOptionIdsToDelete: [],
    detailOptionIdsToDelete: [],
    configurationOptionIdsToDelete: [],
    systemOptionValueIdsToDelete: [],
    detailOptionValueIdsToDelete: [],
    configurationOptionValueIdsToDelete: [],
    systemDetailIdsToDelete: [],
    systemConfigurationIdsToDelete: [],
};

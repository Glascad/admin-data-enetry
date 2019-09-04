
export const configurationOptionValueUpdate = {
    id: 0,
    fakeId: 0,
    name: "",
};

export const configurationOptionUpdate = {
    id: 0,
    fakeId: 0,
    name: "",
    systemConfigurationTypeId: 0,
    systemConfigurationTypeFakeId: 0,
    parentConfigurationOptionValueId: 0,
    parentConfigurationOptionValueFakeId: 0,
    configurationOptionValues: [],
};

export const systemConfigurationTypeUpdate = {
    id: 0,
    fakeId: 0,
    configurationType: "",
    optional: false,
};

export const detailOptionValueUpdate = {
    id: 0,
    fakeId: 0,
    name: "",
    systemConfigurationTypes: [],
};

export const detailOptionUpdate = {
    id: 0,
    fakeId: 0,
    name: "",
    systemDetailTypeId: 0,
    systemDetailTypeFakeId: 0,
    parentDetailOptionValueId: 0,
    parentDetailOptionValueFakeId: 0,
    detailOptionValues: [],
};

export const systemDetailTypeUpdate = {
    id: 0,
    fakeId: 0,
    detailType: ""
};

export const systemOptionValueUpdate = {
    id: 0,
    fakeId: 0,
    name: "",
    raisedOptionNames: [],
    raisedConfigurationTypes: [],
    systemDetailTypes: [],
};

export const systemOptionUpdate = {
    id: 0,
    fakeId: 0,
    name: "",
    parentSystemOptionValueId: 0,
    parentSystemOptionValueFakeId: 0,
    systemOptionValues: [],
};

export const systemUpdate = {
    id: 0,
    fakeId: 0,
    name: "",
    manufacturerId: 0,
    systemType: "",
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

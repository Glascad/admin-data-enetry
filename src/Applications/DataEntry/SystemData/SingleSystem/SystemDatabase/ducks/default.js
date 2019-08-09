export const system = {
    manufacturerId: undefined,
    systemType: undefined,
    name: undefined,
    // depth: undefined,
    // shimSize: undefined,
    // defaultGlassSize: undefined,
    // defaultGlassBite: undefined,
    // defaultSightline: undefined,
    // inset: undefined,
    // frontInset: undefined,
    // topGap: undefined,
    // bottomGap: undefined,
    // sideGap: undefined,
    // glassGap: undefined,
    // meetingStileGap: undefined,

    // systemTagIds: [],
    // systemTagIdsToDelete: [],

    // infillSizes: [],
    // infillSizesToDelete: [],

    // infillPocketSizes: [],
    // infillPocketSizesToDelete: [],

    // infillPocketTypeIds: [],
    // infillPocketTypeIdsToDelete: [],

    systemOptions: [],
    systemOptionsToDelete: [],

    invalidSystemConfigurationTypes: [],
    invalidSystemConfigurationTypesToDelete: [],

    configurationOverrides: [],
    configurationOverridesToDelete: [],
};

export const override = {
    systemId: undefined,
    systemType: undefined,
    detailType: undefined,
    configurationType: undefined,
    requiredOverride: undefined,
    // mirrorableOverride: undefined,
    // presentationLevelOverride: undefined,
    // overrideLevelOverride: undefined,
};

export const option = {
    name: undefined,
    // presentationLevel: undefined,
    // overrideLevel: undefined,
    // optionOrder: undefined,

    // configurationTypes: [],
    // configurationTypesToDelete: [],
    
    optionValues: [],
    optionValuesToDelete: [],
};

export const value = {
    name: undefined,
    value: undefined,
    // valueOrder: undefined,
    // mirrorFromOptionValueId: undefined,
};

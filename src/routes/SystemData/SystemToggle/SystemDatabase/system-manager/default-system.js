export const system = {

    manufacturerId: undefined,
    systemTypeId: undefined,
    name: undefined,
    depth: undefined,
    shimSize: undefined,
    defaultGlassSize: undefined,
    defaultGlassBite: undefined,
    defaultSightline: undefined,
    inset: undefined,
    frontInset: undefined,
    topGap: undefined,
    bottomGap: undefined,
    sideGap: undefined,
    glassGap: undefined,
    meetingStileGap: undefined,

    systemTagIds: [],
    systemTagIdsToDelete: [],

    infillSizes: [],
    infillSizesToDelete: [],

    infillPocketSizes: [],
    infillPocketSizesToDelete: [],

    infillPocketTypeIds: [],
    infillPocketTypeIdsToDelete: [],

    systemOptions: [],
    systemOptionIdsToDelete: [],

    invalidConfigurationTypeIds: [],
    invalidConfigurationTypeIdsToDelete: [],

    configurationOverrides: [],
    configurationOverridesToDelete: [],
};

export const option = {
    id: '1',
    name: undefined,
    presentationLevel: undefined,
    overrideLevel: undefined,
    optionOrder: undefined,

    configurationTypeIds: [],
    configurationTypeIdsToDelete: [],

    optionValues: [],
    optionValueIdsToDelete: [],
};

export const value = {
    id: '1',
    name: undefined,
    value: undefined,
    valueOrder: undefined,
    mirrorFromOptionValueId: undefined,
};

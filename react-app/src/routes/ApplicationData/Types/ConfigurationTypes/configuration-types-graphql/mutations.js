import createConfigurationType from './configuration-types/create';
import updateConfigurationType from './configuration-types/update';
import deleteConfigurationType from './configuration-types/delete';

import createConfigurationNameOverride from './overrides/create';
import updateConfigurationNameOverride from './overrides/update';
import deleteConfigurationNameOverride from './overrides/delete';

import createConfigurationTypePartType from './part-types/create';
import deleteConfigurationTypePartType from './part-types/delete';

export default {
    updateConfigurationType,
    createConfigurationType,
    deleteConfigurationType,
    createConfigurationTypePartType,
    deleteConfigurationTypePartType,
    createConfigurationNameOverride,
    updateConfigurationNameOverride,
    deleteConfigurationNameOverride,
};

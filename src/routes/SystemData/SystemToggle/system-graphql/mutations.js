import createSystemInfillPocketSize from './infill-pocket-size/create';
import deleteSystemInfillPocketSize from './infill-pocket-size/delete';

import createSystemInfillPocketType from './infill-pocket-type/create';
import deleteSystemInfillPocketType from './infill-pocket-type/delete';

import createSystemInfillSize from './infill-size/create';
import deleteSystemInfillSize from './infill-size/delete';

import createInvalidSystemConfigurationType from './invalid-configuration-type/create';
import deleteInvalidSystemConfigurationType from './invalid-configuration-type/delete';

import createSystemConfigurationOverride from './configuration-override/create';
import updateSystemConfigurationOverride from './configuration-override/update';
import deleteSystemConfigurationOverride from './configuration-override/delete';

import createSystemOption from './option/create';
import updateSystemOption from './option/update';
// import deleteSystemOption from './option/delete';

import createOptionCombination from './option-combination/create';
import deleteOptionCombination from './option-combination/delete';

import createOptionCombinationOptionValue from './option-combination-option-value/create';
import deleteOptionCombinationOptionValue from './option-combination-option-value/delete';

import createOptionCombinationConfigurationType from './option-combination-configuration-type/create';
import deleteOptionCombinationConfigurationType from './option-combination-configuration-type/delete';

import createSystemOptionConfigurationType from './option-configuration-type/create';
import deleteSystemOptionConfigurationType from './option-configuration-type/delete';

import createOptionValue from './option-value/create';
import deleteOptionValue from './option-value/delete';

import updateSystem from './system/update';

import createSystemSystemTag from './tag/create';
import deleteSystemSystemTag from './tag/delete';


import updateEntireSystem from './update-entire-system';


export default {
    createSystemInfillPocketSize,
    deleteSystemInfillPocketSize,
    createSystemInfillPocketType,
    deleteSystemInfillPocketType,
    createSystemInfillSize,
    deleteSystemInfillSize,
    createInvalidSystemConfigurationType,
    deleteInvalidSystemConfigurationType,
    createSystemConfigurationOverride,
    updateSystemConfigurationOverride,
    deleteSystemConfigurationOverride,
    createSystemOption,
    updateSystemOption,
    // deleteSystemOption,
    createSystemOptionConfigurationType,
    deleteSystemOptionConfigurationType,
    createOptionValue,
    deleteOptionValue,
    createOptionCombination,
    deleteOptionCombination,
    createOptionCombinationOptionValue,
    deleteOptionCombinationOptionValue,
    createOptionCombinationConfigurationType,
    deleteOptionCombinationConfigurationType,
    updateSystem,
    createSystemSystemTag,
    deleteSystemSystemTag,
    updateEntireSystem,
}
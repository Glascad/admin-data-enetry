const { _require, removeEmptyLines, DEFAULT_USERS, } = require('./utils');

module.exports = function generateSeedFile() {

    const require = _require;

    return removeEmptyLines(`

DO $seed$ BEGIN

-- SCHEMAS;
${require('../../db/schemas/schemas.sql')}

-- TYPES;
-- GC_CONTROLLED TYPES;
${require('../../db/schemas/gc_controlled/types/util_types.sql')}
${require('../../db/schemas/gc_controlled/types/auth_types.sql')}
${require('../../db/schemas/gc_controlled/types/storage_types.sql')}
${require('../../db/schemas/gc_controlled/types/architecture_types.sql')}
-- GC_PUBLIC TYPES;
${require('../../db/schemas/gc_public/types')}
-- OUTPUT_TYPES
-- GC_DATA TYPES
${require('../../db/schemas/gc_data/types.sql')}

-- TABLES;
-- GC_CONTROLLED TABLES;
${require('../../db/schemas/gc_controlled/tables.sql')}
-- GC_DATA TABLES;
${require('../../db/schemas/gc_data/tables/app_data.sql')}
${require('../../db/schemas/gc_data/tables/manufacturer_data.sql')}
${require('../../db/schemas/gc_data/tables/system_data.sql')}
-- CONFIGURATION_DATA
-- GC_PRIVATE TABLES;
${require('../../db/schemas/gc_private/tables.sql')}
-- GC_PUBLIC TABLES;
${require('../../db/schemas/gc_public/tables.sql')}
-- GC_PROTECTED TABLES;
${require('../../db/schemas/gc_protected/tables/system.sql')}
-- SYSTEM_SET
${require('../../db/schemas/gc_protected/tables/elevation.sql')}


-- INVOKER ROLE
${require('../../db/schemas/invoker.sql')}


-- FUNCTIONS;
-- GC_UTIL FUNCTIONS;
${require('../../db/schemas/gc_utils/functions/get_real_id.sql')}
-- GC PRIVATE FUNCTIONS
${require('../../db/schemas/gc_private/functions/create_a_user.sql')}
${require('../../db/schemas/gc_private/functions/update_password.sql')}
-- GC_PROTECTED FUNCTIONS;
-- ELEVATION
${require('../../db/schemas/gc_protected/functions/elevation/create_or_update_elevation_container.sql')}
${require('../../db/schemas/gc_protected/functions/elevation/create_or_update_container_detail.sql')}
${require('../../db/schemas/gc_protected/functions/elevation/create_or_update_elevation.sql')}
-- SYSTEM
${require('../../db/schemas/gc_protected/functions/system/create_or_update_system_option.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_system_option_value.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_system_detail_type.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_detail_option.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_detail_option_value.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_system_configuration_type.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_configuration_option.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_configuration_option_value.sql')}
-- DELETE_ENTIRE_CONFIGURATION_OPTION
-- DELETE_ENTIRE_SYSTEM_CONFIGURATION_TYPE
${require('../../db/schemas/gc_protected/functions/system/create_or_update_system.sql')}
-- CREATE_OR_UPDATE_SYSTEM_SET
-- CREATE_OR_UPDATE_OPTION_VALUE
-- CREATE_OR_UPDATE_SYSTEM_OPTION
-- UPDATE_ENTIRE_SYSTEM_CONFIGURATION_OVERRIDE
-- UPDATE_ENTIRE_SYSTEM_OPTION
-- GC_DATA FUNCTIONS;
${require('../../db/schemas/gc_data/functions/update_entire_system.sql')}
-- GC_PUBLIC MUTATIONS;
${require('../../db/schemas/gc_public/functions/mutations/authenticate.sql')}
${require('../../db/schemas/gc_public/functions/mutations/copy_elevation.sql')}
${require('../../db/schemas/gc_public/functions/mutations/create_or_update_project.sql')}
${require('../../db/schemas/gc_public/functions/mutations/delete_entire_elevation.sql')}
${require('../../db/schemas/gc_public/functions/mutations/delete_entire_project.sql')}
${require('../../db/schemas/gc_public/functions/mutations/get_all_projects.sql')}
${require('../../db/schemas/gc_public/functions/mutations/report_bug.sql')}
${require('../../db/schemas/gc_public/functions/mutations/update_entire_elevation.sql')}
-- UPDATE_ENTIRE_SYSTEM_SET
-- GC_PUBLIC QUERIES;
${require('../../db/schemas/gc_public/functions/queries/get_current_user.sql')}
${require('../../db/schemas/gc_public/functions/queries/get_current_user_id.sql')}
-- SELECT_SYSTEM
-- SELECT_SYSTEM_SET
-- SELECT_SYSTEM_TYPE

-- INSERTIONS
${require('../../db/schemas/gc_controlled/values.sql')}

-- ROLES
${require('../../db/schemas/roles.sql')}

-- PRIVILEGES;
${require('../../db/schemas/privileges.sql')}
GRANT gc_invoker TO glascad;
GRANT glascad TO doadmin;

DO $users$ DECLARE ___ INTEGER; BEGIN

-- DEFAULT USERS;
${DEFAULT_USERS.map(user => `
SELECT 1 FROM create_a_user('${user.split(/,/g).join(`', '`)}') INTO ___;
`).join('')}

END $users$;

-- SEED DATA;
${require('../../db/schemas/seed_data.sql')}

-- POLICIES;
${require('../../db/schemas/policies.sql')}

END $seed$;
`);
};

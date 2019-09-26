const { _require, removeEmptyLines, DEFAULT_USERS, } = require('./utils');

module.exports = function generateSeedFile() {

    const require = _require;

    return removeEmptyLines`

DO $seed$ BEGIN

----- SCHEMAS -----;

${require('../../db/schemas/schemas.sql')}


----- TYPES -----;

${require('../../db/schemas/gc_controlled/types/util_types.sql')}
${require('../../db/schemas/gc_controlled/types/auth_types.sql')}
${require('../../db/schemas/gc_controlled/types/storage_types.sql')}
${require('../../db/schemas/gc_controlled/types/architecture_types.sql')}
${require('../../db/schemas/gc_public/types')}
-- output_types
${require('../../db/schemas/gc_data/types.sql')}


----- UTILITY FUNCTIONS -----;

${require('../../db/schemas/gc_utils/functions/either_or.sql')}
${require('../../db/schemas/gc_utils/functions/sum_bools.sql')}
${require('../../db/schemas/gc_utils/functions/get_real_id.sql')}
${require('../../db/schemas/gc_utils/functions/ltree=ltree.sql')}


----- TABLES -----;

${require('../../db/schemas/gc_controlled/tables.sql')}
${require('../../db/schemas/gc_data/tables/app_data.sql')}
${require('../../db/schemas/gc_data/tables/manufacturer_data.sql')}
-- configuration_data
${require('../../db/schemas/gc_private/tables.sql')}
${require('../../db/schemas/gc_public/tables.sql')}
${require('../../db/schemas/gc_protected/tables/system.sql')}
${require('../../db/schemas/gc_protected/tables/system_set.sql')}
${require('../../db/schemas/gc_protected/tables/elevation.sql')}


----- TRIGGERS -----;

${require('../../db/schemas/gc_protected/tables/system_triggers.sql')}


----- INVOKER ROLE -----;

${require('../../db/schemas/invoker.sql')}


----- FUNCTIONS -----;

${require('../../db/schemas/gc_private/functions/create_a_user.sql')}
${require('../../db/schemas/gc_private/functions/update_password.sql')}
${require('../../db/schemas/gc_protected/functions/elevation/create_or_update_elevation_container.sql')}
${require('../../db/schemas/gc_protected/functions/elevation/create_or_update_container_detail.sql')}
${require('../../db/schemas/gc_protected/functions/elevation/create_or_update_elevation.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_option/system.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_option/detail.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_option/configuration.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_option_value/system.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_option_value/detail.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_option_value/configuration.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_type/system.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_type/detail.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_type/configuration.sql')}
${require('../../db/schemas/gc_protected/functions/system/set_default_option_value/system.sql')}
${require('../../db/schemas/gc_protected/functions/system/set_default_option_value/detail.sql')}
${require('../../db/schemas/gc_protected/functions/system/set_default_option_value/configuration.sql')}
-- delete_entire_configuration_option
-- delete_entire_system_configuration
${require('../../db/schemas/gc_protected/functions/project/create_or_update_raised_option_value.sql')}
${require('../../db/schemas/gc_protected/functions/project/create_or_update_system_set.sql')}
-- create_or_update_option_value
-- create_or_update_system_option
-- update_entire_system_configuration_override
-- update_entire_system_option
${require('../../db/schemas/gc_data/functions/update_entire_system.sql')}
${require('../../db/schemas/gc_public/functions/mutations/authenticate.sql')}
${require('../../db/schemas/gc_public/functions/mutations/copy_elevation.sql')}
${require('../../db/schemas/gc_public/functions/mutations/create_or_update_project.sql')}
${require('../../db/schemas/gc_public/functions/mutations/delete_entire_elevation.sql')}
${require('../../db/schemas/gc_public/functions/mutations/delete_entire_project.sql')}
${require('../../db/schemas/gc_public/functions/mutations/get_all_projects.sql')}
${require('../../db/schemas/gc_public/functions/mutations/report_bug.sql')}
${require('../../db/schemas/gc_public/functions/mutations/update_entire_elevation.sql')}
${require('../../db/schemas/gc_public/functions/mutations/update_entire_system_set.sql')}
${require('../../db/schemas/gc_public/functions/queries/get_current_user.sql')}
${require('../../db/schemas/gc_public/functions/queries/get_current_user_id.sql')}
-- select_system
-- select_system_set
-- select_system_type


----- INSERTIONS -----;

${require('../../db/schemas/gc_controlled/values.sql')}


----- ROLES -----;

${require('../../db/schemas/roles.sql')}


----- PRIVILEGES -----;

${require('../../db/schemas/privileges.sql')}
GRANT gc_invoker TO glascad;
GRANT glascad TO doadmin;


----- USERS -----;

DO $users$ DECLARE ___ INTEGER; BEGIN

-- DEFAULT USERS;
${DEFAULT_USERS.map(user => `
SELECT 1 FROM create_a_user('${user.split(/,/g).join(`', '`)}') INTO ___;
`).join('')}

END $users$;


----- SEED DATA -----;

${require('../../db/schemas/seed_data.sql')}


----- POLICIES -----;

${require('../../db/schemas/policies.sql')}

END $seed$;
`;
};

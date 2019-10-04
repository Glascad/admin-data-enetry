const { _require, removeEmptyLines, DEFAULT_USERS, } = require('./utils');

module.exports = function generateSeedFile() {

    const require = _require;

    return removeEmptyLines(`

DO $seed$ BEGIN

----- SCHEMAS -----;

${require('../../db/schemas.sql')}


----- TYPES -----;

${require('../../db/gc_controlled/types/util_types.sql')}
${require('../../db/gc_controlled/types/auth_types.sql')}
${require('../../db/gc_controlled/types/storage_types.sql')}
${require('../../db/gc_controlled/types/architecture_types.sql')}
${require('../../db/gc_public/types')}
-- output_types;
${require('../../db/gc_data/types.sql')}


----- UTILITY FUNCTIONS -----;

${require('../../db/gc_utils/functions/either_or.sql')}
${require('../../db/gc_utils/functions/sum_bools.sql')}
${require('../../db/gc_utils/functions/get_real_id.sql')}
${require('../../db/gc_utils/functions/ltree=ltree.sql')}


----- TABLES -----;

${require('../../db/gc_controlled/tables.sql')}
${require('../../db/gc_data/tables/app_data.sql')}
${require('../../db/gc_data/tables/manufacturer_data.sql')}
-- configuration_data;
${require('../../db/gc_private/tables.sql')}
${require('../../db/gc_public/tables.sql')}
${require('../../db/gc_protected/tables/system.sql')}
${require('../../db/gc_protected/tables/system_set.sql')}
${require('../../db/gc_protected/tables/elevation.sql')}


----- TRIGGERS -----;

${require('../../db/gc_protected/triggers/system_paths.sql')}
${require('../../db/gc_protected/triggers/option_groups.sql')}
${require('../../db/gc_protected/triggers/system_set_paths.sql')}


----- INVOKER ROLE -----;

${require('../../db/invoker.sql')}


----- FUNCTIONS -----;

${require('../../db/gc_private/functions/c_a_user.sql')}
${require('../../db/gc_private/functions/u_password.sql')}
${require('../../db/gc_protected/functions/elevation/c|u_elevation_container.sql')}
${require('../../db/gc_protected/functions/elevation/c|u_container_detail.sql')}
${require('../../db/gc_protected/functions/elevation/c|u_elevation.sql')}
${require('../../db/gc_protected/functions/system/c|u_system.sql')}
${require('../../db/gc_protected/functions/system/c+d_option_groups.sql')}
${require('../../db/gc_protected/functions/system/c,u_option.sql')}
${require('../../db/gc_protected/functions/system/c,u_option_value.sql')}
${require('../../db/gc_protected/functions/system/c,u_type.sql')}
-- set_default_option_value - system
-- set_default_option_value - detail
-- set_default_option_value - configuration
-- d_configuration_option;
-- d_system_configuration;
${require('../../db/gc_protected/functions/project/c|u_raised_option_value.sql')}
${require('../../db/gc_protected/functions/project/c|u_system_set.sql')}
-- c|u_option_value;
-- c|u_system_option;
-- u_system_configuration_override;
-- u_system_option;
${require('../../db/gc_data/functions/u_system.sql')}
${require('../../db/gc_data/functions/get_option_value_child_type.sql')}
${require('../../db/gc_data/functions/check_entire_system.sql')}
${require('../../db/gc_public/functions/mutations/authenticate.sql')}
${require('../../db/gc_public/functions/mutations/copy_elevation.sql')}
${require('../../db/gc_public/functions/mutations/c|u_project.sql')}
${require('../../db/gc_public/functions/mutations/d_elevation.sql')}
${require('../../db/gc_public/functions/mutations/d_project.sql')}
${require('../../db/gc_public/functions/mutations/get_all_projects.sql')}
${require('../../db/gc_public/functions/mutations/report_bug.sql')}
${require('../../db/gc_public/functions/mutations/u_elevation.sql')}
${require('../../db/gc_public/functions/mutations/u_system_set.sql')}
${require('../../db/gc_public/functions/mutations/check_entire_system_set.sql')}
${require('../../db/gc_public/functions/queries/get_current_user.sql')}
${require('../../db/gc_public/functions/queries/get_current_user_id.sql')}
-- select_system;
-- select_system_set;
-- select_system_type;


----- INSERTIONS -----;

${require('../../db/gc_controlled/values.sql')}


----- ROLES -----;

${require('../../db/roles.sql')}


----- PRIVILEGES -----;

${require('../../db/privileges.sql')}
GRANT gc_invoker TO glascad;
GRANT glascad TO doadmin;


----- USERS -----;

${require('../../db/users.sql')}


----- SEED DATA -----;

${require('../../db/seed_data.sql')}


----- POLICIES -----;

${require('../../db/policies.sql')}

END $seed$;

`);

};

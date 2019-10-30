const { _require } = require('./utils');

module.exports = function generateSeedFile() {

    const require = _require;

    return `

DO $seed$ BEGIN

----- SCHEMAS -----

${require('../../db/schemas.sql')}


----- TYPES -----

${require('../../db/gc_controlled/types/util_types.sql')}
${require('../../db/gc_controlled/types/auth_types.sql')}
${require('../../db/gc_controlled/types/storage_types.sql')}
${require('../../db/gc_controlled/types/architecture_types.sql')}
${require('../../db/gc_public/types')}
${require('../../db/gc_data/types.sql')}


----- OPERATOR FUNCTIONS -----

${require('../../db/gc_utils/operators/ltree=ltree.sql')}


----- UTILITY FUNCTIONS -----

${require('../../db/gc_utils/functions/either_or.sql')}
${require('../../db/gc_utils/functions/sum_bools.sql')}
${require('../../db/gc_utils/functions/get_real_id.sql')}
${require('../../db/gc_data/functions/utils/get_option_value_child_type.sql')}
${require('../../db/gc_data/functions/utils/get_dt~ct_from_path.sql')}
${require('../../db/gc_data/functions/utils/get_sov~dov_subpath.sql')}


----- TABLES -----

${require('../../db/gc_controlled/tables.sql')}
${require('../../db/gc_data/tables/app_data.sql')}
${require('../../db/gc_data/tables/manufacturer_data.sql')}
-- configuration_data
${require('../../db/gc_private/tables.sql')}
${require('../../db/gc_public/tables.sql')}
${require('../../db/gc_protected/tables/system.sql')}
${require('../../db/gc_protected/tables/system_set.sql')}
${require('../../db/gc_protected/tables/elevation.sql')}


----- TRIGGERS -----

${require('../../db/gc_protected/triggers/system_paths.sql')}
${require('../../db/gc_protected/triggers/system_set_paths.sql')}


----- INVOKER ROLE -----

${require('../../db/invoker.sql')}


----- FUNCTIONS -----

${require('../../db/gc_private/functions/c_a_user.sql')}
${require('../../db/gc_private/functions/u_password.sql')}
${require('../../db/gc_protected/functions/elevation/c~u_elevation_container.sql')}
${require('../../db/gc_protected/functions/elevation/c~u_container_detail.sql')}
${require('../../db/gc_protected/functions/elevation/c~u_elevation.sql')}
${require('../../db/gc_protected/functions/system/c~u_system.sql')}
${require('../../db/gc_protected/functions/system/c+d_option_groups.sql')}
${require('../../db/gc_protected/functions/system/c,u_option.sql')}
${require('../../db/gc_protected/functions/system/c,u_option_value.sql')}
${require('../../db/gc_protected/functions/system/c,u_type.sql')}
${require('../../db/gc_protected/functions/system_set/c~u_system_set.sql')}
${require('../../db/gc_protected/functions/system_set/c~u~d_system_set_option_value.sql')}
${require('../../db/gc_protected/functions/system_set/c~u_system_set_option_group_value.sql')}
${require('../../db/gc_data/functions/u_system.sql')}
${require('../../db/gc_data/functions/ch_system.sql')}
${require('../../db/gc_public/functions/mutations/elevation/u_elevation.sql')}
${require('../../db/gc_public/functions/mutations/elevation/copy_elevation.sql')}
${require('../../db/gc_public/functions/mutations/elevation/d_elevation.sql')}
${require('../../db/gc_public/functions/mutations/project/c~u_project.sql')}
${require('../../db/gc_public/functions/mutations/project/d_project.sql')}
${require('../../db/gc_public/functions/mutations/project/get_all_projects.sql')}
${require('../../db/gc_public/functions/mutations/system_set/u_system_set.sql')}
${require('../../db/gc_public/functions/mutations/system_set/ch_system_set.sql')}
${require('../../db/gc_public/functions/mutations/report_bug.sql')}
${require('../../db/gc_public/functions/queries/get_current_user_id.sql')}
${require('../../db/gc_public/functions/queries/get_current_user.sql')}
${require('../../db/gc_public/functions/mutations/authenticate.sql')}


----- INSERTIONS -----

${require('../../db/gc_controlled/values.sql')}


----- ROLES -----

${require('../../db/roles.sql')}


----- PRIVILEGES -----

${require('../../db/privileges.sql')}


----- USERS -----

${require('../../db/users.sql')}


----- SEED DATA -----

${require('../../db/seed_data.sql')}


----- POLICIES -----

${require('../../db/policies.sql')}

END $seed$

`;

}

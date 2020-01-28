const { _require } = require('./utils');

module.exports = function generateSeedFile() {

    const require = _require;

    return `

DO $seed$ BEGIN

----- SCHEMAS -----

${require('../../db/schemas/schemas.sql')}


----- TYPES -----

${require('../../db/schemas/gc_controlled/types/util_types.sql')}
${require('../../db/schemas/gc_controlled/types/auth_types.sql')}
${require('../../db/schemas/gc_controlled/types/storage_types.sql')}
${require('../../db/schemas/gc_controlled/types/architecture_types.sql')}
${require('../../db/schemas/gc_public/types')}
${require('../../db/schemas/gc_data/types.sql')}


----- OPERATOR FUNCTIONS -----

${require('../../db/schemas/gc_utils/operators/ltree=ltree.sql')}


----- CAST FUNCTIONS -----
${require('../../db/schemas/gc_utils/casts/rectangle_to_rectangle_quad.sql')}


----- UTILITY FUNCTIONS -----

${require('../../db/schemas/gc_utils/functions/either_or.sql')}
${require('../../db/schemas/gc_utils/functions/sum_bools.sql')}
${require('../../db/schemas/gc_utils/functions/get_real_id.sql')}
${require('../../db/schemas/gc_utils/functions/path_contains_option_group_value.sql')}
${require('../../db/schemas/gc_utils/functions/rectangles/validate_rectangle.sql')}
${require('../../db/schemas/gc_utils/functions/rectangles/values_overlap.sql')}
${require('../../db/schemas/gc_utils/functions/rectangles/rectangles_overlap.sql')}
${require('../../db/schemas/gc_utils/functions/rectangles/no_rectangles_overlap.sql')}
${require('../../db/schemas/gc_utils/functions/rectangles/rectangle_area.sql')}
${require('../../db/schemas/gc_utils/functions/rectangles/sum_rectangle_area.sql')}
${require('../../db/schemas/gc_utils/functions/rectangles/rectangle_is_contained.sql')}
${require('../../db/schemas/gc_utils/functions/rectangles/rectangles_are_contained.sql')}
${require('../../db/schemas/gc_utils/functions/rectangles/rectangles_fill_space.sql')}
${require('../../db/schemas/gc_data/functions/utils/get_child_type.sql')}
${require('../../db/schemas/gc_data/functions/utils/get_dt~ct_from_path.sql')}
${require('../../db/schemas/gc_data/functions/utils/get_subpath.sql')}
${require('../../db/schemas/gc_data/functions/utils/prepend_system_id.sql')}


----- TABLES -----

${require('../../db/schemas/gc_controlled/tables.sql')}
${require('../../db/schemas/gc_data/tables/d,dc_types.sql')}
${require('../../db/schemas/gc_data/tables/manufacturer.sql')}
${require('../../db/schemas/gc_private/tables.sql')}
${require('../../db/schemas/gc_public/tables.sql')}
${require('../../db/schemas/gc_protected/tables/system.sql')}
${require('../../db/schemas/gc_protected/tables/system_set.sql')}
${require('../../db/schemas/gc_protected/tables/elevation.sql')}


----- TRIGGERS -----

${require('../../db/schemas/gc_protected/triggers/g_system_paths.sql')}
${require('../../db/schemas/gc_protected/triggers/g_system_set_types.sql')}
${require('../../db/schemas/gc_protected/triggers/g_system_set_parent_paths.sql')}
${require('../../db/schemas/gc_protected/triggers/ch_system_set_no_missing_items.sql')}
${require('../../db/schemas/gc_protected/triggers/ch_system_set_no_unselected_options.sql')}
${require('../../db/schemas/gc_protected/triggers/ch_system_set_option_group_values.sql')}
${require('../../db/schemas/gc_protected/triggers/ch_system_option_groups.sql')}
${require('../../db/schemas/gc_protected/triggers/ch_system_option_value_children.sql')}
${require('../../db/schemas/gc_protected/triggers/ch_elevation_placement.sql')}
${require('../../db/schemas/gc_protected/triggers/ch_elevation_container_placement.sql')}


----- INVOKER ROLE -----

${require('../../db/security/invoker.sql')}


----- FUNCTIONS -----

${require('../../db/schemas/gc_private/functions/c_a_user.sql')}
${require('../../db/schemas/gc_private/functions/u_password.sql')}
${require('../../db/schemas/gc_protected/functions/elevation/c~u_elevation_container.sql')}
${require('../../db/schemas/gc_protected/functions/elevation/c~u_container_detail.sql')}
${require('../../db/schemas/gc_protected/functions/elevation/c_elevation_frame.sql')}
${require('../../db/schemas/gc_protected/functions/elevation/c~u_elevation.sql')}
${require('../../db/schemas/gc_protected/functions/system/c~u_system.sql')}
${require('../../db/schemas/gc_protected/functions/system/c+d_option_groups.sql')}
${require('../../db/schemas/gc_protected/functions/system/c,u_option.sql')}
${require('../../db/schemas/gc_protected/functions/system/c,u_option_value.sql')}
${require('../../db/schemas/gc_protected/functions/system/c,u_type.sql')}
${require('../../db/schemas/gc_protected/functions/system_set/c~u_system_set.sql')}
${require('../../db/schemas/gc_protected/functions/system_set/d&c_system_set_node.sql')}
${require('../../db/schemas/gc_protected/functions/system_set/c~u_system_set_option_group_value.sql')}
${require('../../db/schemas/gc_protected/functions/system_set/d_system_set_optional_configuration.sql')}
${require('../../db/schemas/gc_data/functions/u_system.sql')}
${require('../../db/schemas/gc_public/functions/mutations/elevation/u_elevation.sql')}
${require('../../db/schemas/gc_public/functions/mutations/elevation/copy_elevation.sql')}
${require('../../db/schemas/gc_public/functions/mutations/elevation/d_elevation.sql')}
${require('../../db/schemas/gc_public/functions/mutations/project/c~u_project.sql')}
${require('../../db/schemas/gc_public/functions/mutations/project/d_project.sql')}
${require('../../db/schemas/gc_public/functions/mutations/project/get_all_projects.sql')}
${require('../../db/schemas/gc_public/functions/mutations/system_set/u_system_set.sql')}
${require('../../db/schemas/gc_public/functions/mutations/report_bug.sql')}
${require('../../db/schemas/gc_public/functions/queries/get_current_user_id.sql')}
${require('../../db/schemas/gc_public/functions/queries/get_current_user.sql')}
${require('../../db/schemas/gc_public/functions/mutations/authenticate.sql')}


----- COMPUTED COLUMNS -----

${require('../../db/schemas/gc_protected/computed_columns/configuration_parts_path.sql')}


----- INSERTIONS -----

${require('../../db/schemas/gc_controlled/values.sql')}


----- ROLES -----

${require('../../db/security/roles.sql')}


----- PRIVILEGES -----

${require('../../db/security/privileges.sql')}


----- USERS -----

${require('../../db/seed_data/users.sql')}


----- SEED DATA -----

${require('../../db/seed_data/seed_data.sql')}
${require('./seed-data')}
${require('../../db/seed_data/system.sql')}
${require('../../db/seed_data/system_set.sql')}
${require('../../db/seed_data/elevation.sql')}


----- POLICIES -----

${require('../../db/security/policies.sql')}


-- for preventing updates until they are ready
-- RAISE EXCEPTION '========== SUCCESS! ==========';

END $seed$

`;

}

const createSQLImporter = require('../build/require-sql');

module.exports = async run => {

    const require = createSQLImporter(__dirname, run);

    console.log('----- PG WATCH -----')
    await require('../../sql/postgraphile_watch.sql');

    console.log('----- SCHEMAS -----');
    await require('../../sql/seed/schemas/schemas.sql');

    console.log('----- TYPES -----');
    await require(
        '../../sql/seed/schemas/gc_controlled/types/util_types.sql',
        '../../sql/seed/schemas/gc_controlled/types/auth_types.sql',
        '../../sql/seed/schemas/gc_controlled/types/geometric_types.sql',
        '../../sql/seed/schemas/gc_controlled/types/architecture_types.sql',
        '../../sql/seed/schemas/gc_public/types.sql',
        '../../sql/seed/schemas/gc_data/types.sql',
    );

    console.log('----- OPERATOR FUNCTIONS -----');
    await require('../../sql/seed/schemas/gc_utils/operators/ltree=ltree.sql');

    console.log('----- CAST FUNCTIONS -----');
    await require('../../sql/seed/schemas/gc_utils/casts/rectangle_to_rectangle_quad.sql');

    console.log('----- UTILITY FUNCTIONS -----');
    await require(
        '../../sql/seed/schemas/gc_utils/functions/either_or.sql',
        '../../sql/seed/schemas/gc_utils/functions/sum_bools.sql',
        '../../sql/seed/schemas/gc_utils/functions/get_real_id.sql',
        '../../sql/seed/schemas/gc_utils/functions/path_contains_option_group_value.sql',
        '../../sql/seed/schemas/gc_utils/functions/rectangles/validate_rectangle.sql',
        '../../sql/seed/schemas/gc_utils/functions/rectangles/values_overlap.sql',
        '../../sql/seed/schemas/gc_utils/functions/rectangles/rectangles_overlap.sql',
        '../../sql/seed/schemas/gc_utils/functions/rectangles/no_rectangles_overlap.sql',
        '../../sql/seed/schemas/gc_utils/functions/rectangles/combine_rectangles.sql',
        '../../sql/seed/schemas/gc_utils/functions/rectangles/rectangle_area.sql',
        '../../sql/seed/schemas/gc_utils/functions/rectangles/sum_rectangle_area.sql',
        '../../sql/seed/schemas/gc_utils/functions/rectangles/rectangle_is_contained.sql',
        '../../sql/seed/schemas/gc_utils/functions/rectangles/rectangles_are_contained.sql',
        '../../sql/seed/schemas/gc_utils/functions/rectangles/rectangles_fill_space.sql',
        '../../sql/seed/schemas/gc_data/functions/utils/get_child_type.sql',
        '../../sql/seed/schemas/gc_data/functions/utils/get_dt~ct_from_path.sql',
        '../../sql/seed/schemas/gc_data/functions/utils/get_subpath.sql',
        '../../sql/seed/schemas/gc_data/functions/utils/prepend_system_id.sql',
    );

    console.log('----- TABLES -----');
    await require(
        '../../sql/seed/schemas/gc_controlled/tables.sql',
        '../../sql/seed/schemas/gc_data/tables/d,dc_types.sql',
        '../../sql/seed/schemas/gc_data/tables/manufacturer.sql',
        '../../sql/seed/schemas/gc_private/tables.sql',
        '../../sql/seed/schemas/gc_public/tables.sql',
        '../../sql/seed/schemas/gc_protected/tables/system.sql',
        '../../sql/seed/schemas/gc_protected/tables/system_set.sql',
        '../../sql/seed/schemas/gc_protected/tables/elevation.sql',
    );

    console.log('----- TRIGGERS -----');
    await require(
        '../../sql/seed/schemas/gc_protected/triggers/g_system_paths.sql',
        '../../sql/seed/schemas/gc_protected/triggers/g_system_set_types.sql',
        '../../sql/seed/schemas/gc_protected/triggers/g_system_set_parent_paths.sql',
        '../../sql/seed/schemas/gc_protected/triggers/ch_system_set_no_missing_items.sql',
        '../../sql/seed/schemas/gc_protected/triggers/ch_system_set_no_unselected_options.sql',
        '../../sql/seed/schemas/gc_protected/triggers/ch_system_set_option_group_values.sql',
        '../../sql/seed/schemas/gc_protected/triggers/ch_system_option_groups.sql',
        '../../sql/seed/schemas/gc_protected/triggers/ch_system_option_value_children.sql',
        '../../sql/seed/schemas/gc_protected/triggers/ch_elevation_placement.sql',
        '../../sql/seed/schemas/gc_protected/triggers/ch_elevation_container_placement.sql',
        '../../sql/seed/schemas/gc_protected/triggers/ch_void_elevation_container_neighbors.sql',
        '../../sql/seed/schemas/gc_protected/triggers/ch_container_detail_placement.sql',
        '../../sql/seed/schemas/gc_protected/triggers/ch_container_detail_has_frame_or_no_sightline.sql',
        '../../sql/seed/schemas/gc_protected/triggers/ch_container_detail_deletion.sql',
        '../../sql/seed/schemas/gc_protected/triggers/ch_elevation_frame_placement.sql',
    );

    console.log('----- INVOKER ROLE -----');
    await require('../../sql/seed/security/invoker.sql');

    console.log('----- FUNCTIONS -----');
    await require(
        '../../sql/seed/schemas/gc_private/functions/c_a_user.sql',
        '../../sql/seed/schemas/gc_private/functions/u_password.sql',
        '../../sql/seed/schemas/gc_protected/functions/elevation/c~u_elevation_container.sql',
        '../../sql/seed/schemas/gc_protected/functions/elevation/c~u_container_detail.sql',
        '../../sql/seed/schemas/gc_protected/functions/elevation/c_elevation_frame.sql',
        '../../sql/seed/schemas/gc_protected/functions/elevation/c~u_elevation.sql',
        '../../sql/seed/schemas/gc_protected/functions/system/c~u_system.sql',
        '../../sql/seed/schemas/gc_protected/functions/system/c+d_option_groups.sql',
        '../../sql/seed/schemas/gc_protected/functions/system/c,u_option.sql',
        '../../sql/seed/schemas/gc_protected/functions/system/c,u_option_value.sql',
        '../../sql/seed/schemas/gc_protected/functions/system/c,u_type.sql',
        '../../sql/seed/schemas/gc_protected/functions/system_set/c~u_system_set.sql',
        '../../sql/seed/schemas/gc_protected/functions/system_set/d&c_system_set_node.sql',
        '../../sql/seed/schemas/gc_protected/functions/system_set/c~u_system_set_option_group_value.sql',
        '../../sql/seed/schemas/gc_protected/functions/system_set/d_system_set_optional_configuration.sql',
        '../../sql/seed/schemas/gc_data/functions/u_system.sql',
        '../../sql/seed/schemas/gc_public/functions/mutations/elevation/u_elevation.sql',
        '../../sql/seed/schemas/gc_public/functions/mutations/elevation/copy_elevation.sql',
        '../../sql/seed/schemas/gc_public/functions/mutations/elevation/d_elevation.sql',
        '../../sql/seed/schemas/gc_public/functions/mutations/project/c~u_project.sql',
        '../../sql/seed/schemas/gc_public/functions/mutations/project/d_project.sql',
        '../../sql/seed/schemas/gc_public/functions/mutations/project/get_all_projects.sql',
        '../../sql/seed/schemas/gc_public/functions/mutations/system_set/u_system_set.sql',
        '../../sql/seed/schemas/gc_public/functions/mutations/report_bug.sql',
        '../../sql/seed/schemas/gc_public/functions/queries/get_current_user_id.sql',
        '../../sql/seed/schemas/gc_public/functions/queries/get_current_user.sql',
        '../../sql/seed/schemas/gc_public/functions/mutations/authenticate.sql',
    );

    console.log('----- COMPUTED COLUMNS -----');
    await require('../../sql/seed/schemas/gc_protected/computed_columns/configuration_parts_path.sql');

    console.log('----- INSERTIONS -----');
    await require('../../sql/seed/schemas/gc_controlled/values.sql');

    console.log('----- ROLES -----');
    await require('../../sql/seed/security/roles.sql');

    console.log('----- PRIVILEGES -----');
    await require('../../sql/seed/security/privileges.sql');

    console.log('----- SEED DATA -----');
    await require(
        '../../sql/seed/seed_data/users.sql',
        '../../sql/seed/seed_data/seed_data.sql',
        './data',
        '../../sql/seed/seed_data/system.sql',
        '../../sql/seed/seed_data/system_set.sql',
        '../../sql/seed/seed_data/elevation.sql',
    );

    console.log('----- POLICIES -----');
    await require('../../sql/seed/security/policies.sql');
}

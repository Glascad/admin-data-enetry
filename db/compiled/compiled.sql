-- COMPILED



-- functions.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 



-- create_or_update_container_detail.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


DROP FUNCTION IF EXISTS create_or_update_container_detail;

CREATE OR REPLACE FUNCTION create_or_update_container_detail(
    container_detail ENTIRE_CONTAINER_DETAIL,
    id_pairs ID_PAIR[],
    elevation_id INTEGER
) RETURNS SETOF CONTAINER_DETAILS AS $$
DECLARE
    cd ALIAS FOR container_detail;
    eid ALIAS FOR elevation_id;
BEGIN
    IF cd.id IS NULL
    THEN RETURN QUERY
        INSERT INTO container_details (
            elevation_id,
            first_container_id,
            second_container_id,
            vertical
        ) VALUES (
            eid,
            CASE
                WHEN cd.first_container_id IS NOT NULL
                    THEN cd.first_container_id
                ELSE get_real_id(id_pairs, cd.first_container_fake_id) END,
            CASE
                WHEN cd.second_container_id IS NOT NULL
                    THEN cd.second_container_id
                ELSE get_real_id(id_pairs, cd.second_container_fake_id) END,
            cd.vertical
        )
        RETURNING *;
    ELSE RETURN QUERY
        UPDATE container_details SET
            first_container_id = CASE
                WHEN cd.first_container_id IS NOT NULL
                    THEN cd.first_container_id
                WHEN cd.first_container_fake_id IS NOT NULL
                    THEN get_real_id(id_pairs, cd.first_container_fake_id)
                ELSE container_details.first_container_id END,
            second_container_id = CASE
                WHEN cd.second_container_id IS NOT NULL
                    THEN cd.second_container_id
                WHEN cd.second_container_fake_id IS NOT NULL
                    THEN get_real_id(id_pairs, cd.second_container_fake_id)
                ELSE container_details.second_container_id END
        WHERE container_details.elevation_id = eid
        AND container_details.vertical = cd.vertical
        AND container_details.id = cd.id
        RETURNING *;
    END IF;
END;
$$ LANGUAGE plpgsql;


-- create_or_update_elevation.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP FUNCTION IF EXISTS create_or_update_elevation;

CREATE OR REPLACE FUNCTION create_or_update_elevation(elevation ENTIRE_ELEVATION)
RETURNS SETOF ELEVATIONS AS $$
DECLARE
    e ALIAS FOR elevation;
BEGIN
    IF e.id IS NULL
    THEN RETURN QUERY
        INSERT INTO elevations (
            project_id,
            name,
            rough_opening,
            finished_floor_height
        ) VALUES (
            e.project_id,
            e.name,
            e.rough_opening,
            e.finished_floor_height
        )
        RETURNING *;
    ELSE RETURN QUERY
        UPDATE elevations SET
            project_id = CASE
                WHEN e.project_id IS NOT NULL
                    THEN e.project_id
                ELSE elevations.project_id END,
            name = CASE
                WHEN e.name IS NOT NULL
                    THEN e.name
                ELSE elevations.name END,
            rough_opening = CASE
                WHEN e.rough_opening IS NOT NULL
                    THEN e.rough_opening
                ELSE elevations.rough_opening END,
            finished_floor_height = CASE
                WHEN e.finished_floor_height IS NOT NULL
                    THEN e.finished_floor_height
                ELSE elevations.finished_floor_height END
        WHERE elevations.id = e.id
        RETURNING *;
    END IF;
END;
$$ LANGUAGE plpgsql;


-- create_or_update_elevation_container.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP FUNCTION IF EXISTS create_or_update_elevation_container;

CREATE OR REPLACE FUNCTION create_or_update_elevation_container(
    elevation_container ENTIRE_ELEVATION_CONTAINER,
    elevation_id INTEGER
) RETURNS SETOF ELEVATION_CONTAINERS AS $$
DECLARE
    ec ALIAS FOR elevation_container;
    eid INTEGER = elevation_id;
BEGIN
    IF ec.id IS NULL
    THEN RETURN QUERY
        INSERT INTO elevation_containers (
            elevation_id,
            original,
            contents,
            daylight_opening,
            custom_rough_opening
        ) VALUES (
            eid,
            ec.original,
            ec.contents,
            ec.daylight_opening,
            ec.custom_rough_opening
        )
        RETURNING *;
    ELSE RETURN QUERY
        UPDATE elevation_containers SET
            original = CASE
                WHEN ec.original IS NOT NULL
                    THEN ec.original
                ELSE elevation_containers.original END,
            contents = CASE
                WHEN ec.contents IS NOT NULL
                    THEN ec.contents
                ELSE elevation_containers.contents END,
            daylight_opening = CASE
                WHEN ec.daylight_opening IS NOT NULL
                    THEN ec.daylight_opening
                ELSE elevation_containers.daylight_opening END,
            custom_rough_opening = CASE
                WHEN ec.custom_rough_opening IS NOT NULL
                    THEN ec.custom_rough_opening
                ELSE elevation_containers.custom_rough_opening END
        WHERE elevation_containers.elevation_id = eid
        AND elevation_containers.id = ec.id
        RETURNING *;
    END IF;
END;
$$ LANGUAGE plpgsql;


-- delete_entire_elevation.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP FUNCTION IF EXISTS delete_entire_elevation;

CREATE OR REPLACE FUNCTION delete_entire_elevation(elevation_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    eid ALIAS FOR elevation_id;
BEGIN
    DELETE FROM container_details
        WHERE container_details.elevation_id = eid;

    DELETE FROM elevation_containers
        WHERE elevation_containers.elevation_id = eid;

    DELETE FROM elevations
        WHERE elevations.id = eid;
    
    RETURN eid;
END;
$$ LANGUAGE plpgsql;


-- update_entire_elevation.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP FUNCTION IF EXISTS update_entire_elevation;

CREATE OR REPLACE FUNCTION update_entire_elevation(elevation ENTIRE_ELEVATION)
RETURNS SETOF ELEVATIONS AS $$
DECLARE
    -- ELEVATION
    e ALIAS FOR elevation;
    -- LOOP
    ec ENTIRE_ELEVATION_CONTAINER;
    cd ENTIRE_CONTAINER_DETAIL;
    ___ INTEGER;
    real_id INTEGER;
    id_pairs ID_PAIR[];
    -- OUT
    ue ELEVATIONS%ROWTYPE;
BEGIN
    SELECT * FROM create_or_update_elevation(e) INTO ue;

    -- CREATE OR UPDATE CONTAINERS
    IF e.containers IS NOT NULL
    THEN
        FOREACH ec IN ARRAY e.containers
        LOOP
            SELECT id FROM create_or_update_elevation_container(ec, ue.id) INTO real_id;
            id_pairs := id_pairs || ROW(real_id, ec.fake_id)::ID_PAIR;
        END LOOP;
    END IF;

    -- DELETE DETAILS
    DELETE FROM container_details
    WHERE elevation_id = e.id
    AND id IN (
        SELECT * FROM UNNEST (e.detail_ids_to_delete)
    );

    -- CREATE OR UPDATE DETAILS
    IF e.details IS NOT NULL
    THEN
        FOREACH cd IN ARRAY e.details
        LOOP
            SELECT id FROM create_or_update_container_detail(cd, id_pairs, ue.id) INTO ___;
        END LOOP;
    END IF;

    -- DELETE CONTAINERS
    DELETE FROM elevation_containers
    WHERE elevation_id = e.id
    AND id IN (
        SELECT * FROM UNNEST (e.container_ids_to_delete)
    );

    RETURN QUERY SELECT * FROM (SELECT ue.*) ue;

END;
$$ LANGUAGE plpgsql;


-- seed-data.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 



-- application_data.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


INSERT INTO detail_types
(type)
VALUES
('Head'),
('Sill'),
('Jamb'),
('Post'),
('Horizontal'),
('Mullion'),
('Transom Bar'),
('Door Header'),
('Transom Head'),
('Door Jamb'),
('Corner');

INSERT INTO configuration_types
(type)
VALUES
('Head'),
('Stool Trim'),
('Sill Flashing'),
('Jamb'),
('Shim Support'),
('Mullion'),
('Corner'),
('Post'),
('Door Jamb'),
('Door Stop'),
('Compensating Receptor'),
('Shear Block Package'),
('Sill'),
('T-Bar/Header'),
('Horizontal'),
('Pocket Insert'),
('Steel Reinforcing');


-- types.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 



-- input-types.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


CREATE TYPE
entire_option_value AS (
    id INTEGER,
    system_option_id INTEGER,
    name TEXT,
    value FLOAT,
    value_order INTEGER,
    mirror_from_option_value_id INTEGER
);

CREATE TYPE
entire_system_option AS (
    id INTEGER,
    system_id INTEGER,
    name TEXT,
    presentation_level PRESENTATION_LEVEL,
    override_level PRESENTATION_LEVEL,
    option_order INTEGER,
    option_values ENTIRE_OPTION_VALUE[],
    option_value_ids_to_delete INTEGER[],
    configuration_type_ids INTEGER[],
    configuration_type_ids_to_delete INTEGER[]
);

CREATE TYPE
entire_system_configuration_override AS (
    system_id INTEGER,
    system_type_id INTEGER,
    detail_type_id INTEGER,
    configuration_type_id INTEGER,
    required_override BOOLEAN,
    mirrorable_override BOOLEAN,
    presentation_level_override PRESENTATION_LEVEL,
    override_level_override PRESENTATION_LEVEL
);

CREATE TYPE
entire_system AS (
    -- SYSTEM INFO
    id INTEGER,
    manufacturer_id INTEGER,
    system_type_id INTEGER,
    name TEXT,
    depth FLOAT,
    default_glass_size FLOAT,
    default_glass_bite FLOAT,
    default_sightline FLOAT,
    top_gap FLOAT,
    bottom_gap FLOAT,
    side_gap FLOAT,
    meeting_stile_gap FLOAT,
    inset FLOAT,
    glass_gap FLOAT,
    shim_size FLOAT,
    front_inset BOOLEAN,
    system_tag_ids INTEGER[],
    system_tag_ids_to_delete INTEGER[],
    -- GLAZING INFO
    infill_sizes FLOAT[],
    infill_sizes_to_delete FLOAT[],
    infill_pocket_type_ids INTEGER[],
    infill_pocket_type_ids_to_delete INTEGER[],
    infill_pocket_sizes FLOAT[],
    infill_pocket_sizes_to_delete FLOAT[],
    -- VALID TYPES
    invalid_configuration_type_ids INTEGER[],
    invalid_configuration_type_ids_to_delete INTEGER[],
    configuration_overrides ENTIRE_SYSTEM_CONFIGURATION_OVERRIDE[],
    configuration_overrides_to_delete ENTIRE_SYSTEM_CONFIGURATION_OVERRIDE[],
    -- OPTIONS
    system_options ENTIRE_SYSTEM_OPTION[],
    system_option_ids_to_delete INTEGER[]
);

CREATE TYPE
entire_elevation_container AS (
    id INTEGER,
    fake_id INTEGER,
    original BOOLEAN,
    contents TEXT,
    daylight_opening COORDINATE,
    custom_rough_opening BOOLEAN
);

CREATE TYPE
entire_container_detail AS (
    id INTEGER,
    vertical BOOLEAN,
    first_container_id INTEGER,
    first_container_fake_id INTEGER,
    second_container_id INTEGER,
    second_container_fake_id INTEGER
);

CREATE TYPE
entire_elevation AS (
    id INTEGER,
    project_id INTEGER,
    name TEXT,
    rough_opening COORDINATE,
    finished_floor_height INTEGER,
    containers ENTIRE_ELEVATION_CONTAINER[],
    container_ids_to_delete INTEGER[],
    details ENTIRE_CONTAINER_DETAIL[],
    detail_ids_to_delete INTEGER[]
);


-- output-types.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


CREATE TYPE
name_output AS (
    id INTEGER,
    name TEXT
);

CREATE TYPE
type_output AS (
    id INTEGER,
    type TEXT,
);

CREATE TYPE
tag_output AS (
    id INTEGER,
    tag TEXT
);

CREATE TYPE
system_option_output AS (
    id INTEGER,
    name TEXT,
    presentation_level INTEGER,
    override_level INTEGER,
    
)

CREATE TYPE
system_output AS (
    id INTEGER,
    name TEXT,
    depth FLOAT,
    default_glass_size FLOAT,
    default_glass_bite FLOAT,
    default_sightline FLOAT,
    top_gap FLOAT,
    bottom_gap FLOAT,
    side_gap FLOAT,
    meeting_stile_gap FLOAT,
    inset FLOAT,
    glass_gap FLOAT,
    shim_size FLOAT,
    front_inset BOOLEAN,
    manufacturer NAME_OUTPUT,
    system_type TYPE_OUTPUT,
    system_tags TAG_OUTPUT[],
    infill_sizes FLOAT[],
    system_options SYSTEM_OPTION_OUTPUT[],
    detail_types SYSTEM_DETAIL_TYPE_OUTPUT[]
);


-- types.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


CREATE TYPE
id_pair AS (
    id INTEGER,
    fake_id INTEGER
);

CREATE TYPE
coordinate AS (
    x FLOAT,
    y FLOAT
);

CREATE TYPE
presentation_level AS ENUM (
    'system',
    'elevation',
    'lite',
    'frame',
    'detail'
);


-- utils.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 



-- get_real_id.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP FUNCTION IF EXISTS get_real_id;

CREATE OR REPLACE FUNCTION get_real_id (
    id_pairs ID_PAIR[],
    fake_id INTEGER
) RETURNS INTEGER AS $$
DECLARE
    f ALIAS FOR fake_id;
    real_id INTEGER;
BEGIN
    SELECT p.id
        FROM UNNEST (id_pairs) p
        INTO real_id
        WHERE p.fake_id = f;
    RETURN real_id;
END;
$$ LANGUAGE plpgsql;


-- test.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


SELECT * FROM update_entire_system(
    ROW(
        -- SYSTEM INFO
        -- id INTEGER,
        40,
        -- manufacturer_id INTEGER,
        1,
        -- system_type_id INTEGER,
        1,
        -- name VARCHAR(50),
        'Testing SQL Functions #1',
        -- depth FLOAT,
        NULL,
        -- default_glass_size FLOAT,
        NULL,
        -- default_glass_bite FLOAT,
        NULL,
        -- default_sightline FLOAT,
        NULL,
        -- top_gap FLOAT,
        NULL,
        -- bottom_gap FLOAT,
        NULL,
        -- side_gap FLOAT,
        NULL,
        -- meeting_stile_gap FLOAT,
        NULL,
        -- inset FLOAT,
        NULL,
        -- glass_gap FLOAT,
        NULL,
        -- shim_size FLOAT,
        NULL,
        -- front_inset BOOLEAN,
        NULL,
        -- system_tag_ids INTEGER[],
        ARRAY [1,2,3],
        -- system_tag_ids_to_delete INTEGER[],
        NULL,
        -- -- GLAZING INFO
        -- infill_sizes FLOAT[],
        ARRAY [1],
        -- infill_sizes_to_delete FLOAT[],
        NULL,
        -- infill_pocket_type_ids INTEGER[],
        ARRAY [1,2],
        -- infill_pocket_type_ids_to_delete INTEGER[],
        NULL,
        -- infill_pocket_sizes FLOAT[],
        ARRAY [1],
        -- infill_pocket_sizes_to_delete FLOAT[],
        NULL,
        -- -- VALID TYPES
        -- invalid_system_configuration_type_ids INTEGER[],
        NULL,
        -- invalid_system_configuration_type_ids_to_delete INTEGER[],
        NULL,
        -- configuration_overrides entire_system_configuration_override[],
        NULL,
        -- configuration_overrides_to_delete entire_system_configuration_override[],
        NULL,
        -- -- OPTIONS
        -- system_options entire_system_option[],
        ARRAY[ROW(
            -- id INTEGER,
            50,
            -- system_id INTEGER,
            NULL,
            -- name VARCHAR(50),
            NULL,
            -- presentation_level INTEGER,
            NULL,
            -- override_level INTEGER,
            NULL,
            -- option_order INTEGER,
            NULL,
            -- option_values entire_option_value[],
            ARRAY[ROW(
                -- id INTEGER,
                NULL,
                -- system_option_id INTEGER,
                NULL,
                -- name TEXT,
                'Test Option Value #1',
                -- value FLOAT,
                NULL,
                -- value_order INTEGER,
                1,
                -- mirror_from_option_value_id INTEGER
                NULL
            )::entire_option_value],
            -- option_value_ids_to_delete INTEGER[],
            NULL,
            -- configuration_type_ids INTEGER[],
            NULL,
            -- configuration_type_ids_to_delete INTEGER[]
            NULL
        )::entire_system_option],
        -- system_option_ids_to_delete INTEGER[]
        NULL
    )::entire_system
);


-- tables.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 



-- elevation.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


-- ELEVATIONS

DROP TABLE IF EXISTS detail_option_values;
DROP TABLE IF EXISTS container_details;
DROP TABLE IF EXISTS elevation_containers;
DROP TABLE IF EXISTS elevations;

CREATE TABLE
elevations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects,
    system_set_id INTEGER REFERENCES system_sets,
    name VARCHAR(50),
    rough_opening COORDINATE,
    finished_floor_height FLOAT
);

CREATE TABLE
elevation_containers (
    id SERIAL PRIMARY KEY,
    elevation_id INTEGER REFERENCES elevations,
    original BOOLEAN DEFAULT FALSE,
    contents VARCHAR(50),
    daylight_opening COORDINATE,
    custom_rough_opening BOOLEAN DEFAULT FALSE
);

CREATE TABLE
container_details (
    id SERIAL PRIMARY KEY,
    elevation_id INTEGER REFERENCES elevations,
    first_container_id INTEGER REFERENCES elevation_containers,
    second_container_id INTEGER REFERENCES elevation_containers,
    vertical BOOLEAN,
    UNIQUE (first_container_id, second_container_id, vertical)
);

CREATE TABLE
detail_option_values (
    id SERIAL PRIMARY KEY,
    container_detail_id INTEGER REFERENCES container_details,
    option_value_id INTEGER REFERENCES option_values
);


-- project.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS system_sets CASCADE;
DROP TABLE IF EXISTS system_set_option_values CASCADE;
DROP TABLE IF EXISTS system_set_detail_type_configuration_types CASCADE;

CREATE TABLE
projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE
system_sets (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects,
    system_id INTEGER,
    system_type_id INTEGER,
    FOREIGN KEY (
        system_id,
        system_type_id
    )
    REFERENCES systems (
        id,
        system_type_id
    ),
    UNIQUE (id, system_id, system_type_id)
);

CREATE TABLE
system_set_option_values (
    system_set_id INTEGER,
    system_id INTEGER,
    system_type_id INTEGER,
    system_option_id INTEGER,
    option_value_id INTEGER REFERENCES option_values,
    PRIMARY KEY (system_id, system_option_id),
    FOREIGN KEY (
        system_set_id,
        system_id,
        system_type_id
    )
    REFERENCES system_sets (
        id,
        system_id,
        system_type_id
    ),
    FOREIGN KEY (
        system_id,
        system_option_id
    )
    REFERENCES system_options (
        system_id,
        id
    ),
    FOREIGN KEY (
        system_option_id,
        option_value_id
    )
    REFERENCES option_values (
        system_option_id,
        id
    )
);

CREATE TABLE
system_set_detail_type_configuration_types (
    system_set_id INTEGER,
    system_id INTEGER,
    system_type_id INTEGER,
    detail_type_id INTEGER,
    configuration_type_id INTEGER,
    FOREIGN KEY (
        system_set_id,
        system_id,
        system_type_id
    )
    REFERENCES system_sets (
        id,
        system_id,
        system_type_id
    ),
)


-- tables.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP TABLE IF EXISTS manufacturers CASCADE;
DROP TABLE IF EXISTS system_tags CASCADE;
DROP TABLE IF EXISTS system_types CASCADE;
DROP TABLE IF EXISTS infill_sizes CASCADE;
DROP TABLE IF EXISTS systems CASCADE;
DROP TABLE IF EXISTS system_infill_sizes CASCADE;
DROP TABLE IF EXISTS system_system_tags CASCADE;
DROP TABLE IF EXISTS system_options CASCADE;
DROP TABLE IF EXISTS option_values CASCADE;
DROP TABLE IF EXISTS option_combinations CASCADE;
DROP TABLE IF EXISTS detail_types CASCADE;
DROP TABLE IF EXISTS configuration_types CASCADE;
DROP TABLE IF EXISTS line_weights CASCADE;
DROP TABLE IF EXISTS linetypes CASCADE;
DROP TABLE IF EXISTS orientations CASCADE;
DROP TABLE IF EXISTS part_types CASCADE;
DROP TABLE IF EXISTS part_tags CASCADE;
DROP TABLE IF EXISTS infill_pocket_types CASCADE;
DROP TABLE IF EXISTS infill_pocket_sizes CASCADE;
DROP TABLE IF EXISTS fastener_types CASCADE;
DROP TABLE IF EXISTS fastener_head_types CASCADE;
DROP TABLE IF EXISTS thread_representations CASCADE;
DROP TABLE IF EXISTS parts CASCADE;
DROP TABLE IF EXISTS part_orientations CASCADE;
DROP TABLE IF EXISTS thermal_pocket_types CASCADE;
DROP TABLE IF EXISTS thermal_pockets CASCADE;
DROP TABLE IF EXISTS brake_metal_pockets CASCADE;
DROP TABLE IF EXISTS fastener_locations CASCADE;
DROP TABLE IF EXISTS infill_pocket_locations CASCADE;
DROP TABLE IF EXISTS part_part_types CASCADE;
DROP TABLE IF EXISTS part_part_tags CASCADE;
DROP TABLE IF EXISTS configuration_type_part_types CASCADE;
DROP TABLE IF EXISTS configurations CASCADE;
DROP TABLE IF EXISTS configuration_transformations CASCADE;
DROP TABLE IF EXISTS configuration_parts CASCADE;
DROP TABLE IF EXISTS option_combination_option_values CASCADE;
DROP TABLE IF EXISTS option_combination_configuration_types CASCADE;
DROP TABLE IF EXISTS system_option_configuration_types CASCADE;
DROP TABLE IF EXISTS configuration_option_values CASCADE;
DROP TABLE IF EXISTS configuration_name_override CASCADE;
DROP TABLE IF EXISTS system_infill_pocket_types CASCADE;
DROP TABLE IF EXISTS system_infill_pocket_sizes CASCADE;
DROP TABLE IF EXISTS invalid_system_configuration_types CASCADE;
DROP TABLE IF EXISTS system_type_detail_type_configuration_types CASCADE;
DROP TABLE IF EXISTS system_configuration_overrides CASCADE;


CREATE TABLE
manufacturers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE
system_tags (
    id SERIAL PRIMARY KEY,
    tag VARCHAR(50)
);

CREATE TABLE
system_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
infill_sizes (
    size FLOAT PRIMARY KEY
);

CREATE TABLE
systems (
    id SERIAL PRIMARY KEY,
    manufacturer_id INTEGER REFERENCES manufacturers,
    system_type_id INTEGER REFERENCES system_types,
    name VARCHAR(50),
    depth FLOAT,
    default_glass_size FLOAT,
    default_glass_bite FLOAT,
    default_sightline FLOAT,
    top_gap FLOAT,
    bottom_gap FLOAT,
    side_gap FLOAT,
    meeting_stile_gap FLOAT,
    inset FLOAT,
    glass_gap FLOAT,
    shim_size FLOAT,
    front_inset BOOLEAN,
    UNIQUE (
        id,
        system_type_id
    )
);



CREATE TABLE
system_infill_sizes (
    system_id INTEGER REFERENCES systems,
    infill_size FLOAT REFERENCES infill_sizes,
    PRIMARY KEY (system_id, infill_size)
);

CREATE TABLE
system_system_tags (
    system_id INTEGER REFERENCES systems,
    system_tag_id INTEGER REFERENCES system_tags,
    PRIMARY KEY (system_id, system_tag_id)
);



CREATE TABLE
system_options (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems,
    name VARCHAR(50),
    presentation_level PRESENTATION_LEVEL,
    override_level PRESENTATION_LEVEL,
    option_order INTEGER,
    UNIQUE (id, system_id)
);

CREATE TABLE
option_values (
    id SERIAL PRIMARY KEY,
    system_option_id INTEGER REFERENCES system_options,
    name VARCHAR(50),
    value FLOAT,
    value_order INTEGER,
    UNIQUE (id, system_option_id)
);

ALTER TABLE
option_values
ADD COLUMN
mirror_from_option_value_id INTEGER REFERENCES option_values;

CREATE TABLE
option_combinations (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems,
    invalid BOOLEAN,
    depth_override FLOAT,
    glass_size_override FLOAT,
    glass_bite_override FLOAT,
    sightline_override FLOAT,
    top_gap_override FLOAT,
    bottom_gap_override FLOAT,
    side_gap_override FLOAT,
    meeting_stile_gap_override FLOAT,
    glass_gap_override FLOAT,
    shim_size_override FLOAT,
    inset_override FLOAT,
    front_inset_override BOOLEAN
);



CREATE TABLE
detail_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    entrance BOOLEAN,
    vertical BOOLEAN
);

CREATE TABLE
configuration_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    door BOOLEAN
);



CREATE TABLE
line_weights (
    name VARCHAR(50),
    weight FLOAT PRIMARY KEY
);

CREATE TABLE
linetypes (
    id SERIAL PRIMARY KEY,
    line_weight INTEGER REFERENCES line_weights,
    name VARCHAR(50),
    pattern VARCHAR(50)
);



CREATE TABLE
orientations (
    id SERIAL PRIMARY KEY,
    orientation VARCHAR(50)
);

CREATE TABLE
part_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
part_tags (
    id SERIAL PRIMARY KEY,
    tag VARCHAR(50)
);

CREATE TABLE
infill_pocket_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    description VARCHAR(5000),
    captured BOOLEAN
);

CREATE TABLE
infill_pocket_sizes (
    size FLOAT PRIMARY KEY
);

CREATE TABLE
fastener_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
fastener_head_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
thread_representations (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);



CREATE TABLE
parts (
    id SERIAL PRIMARY KEY,
    manufacturer_id INTEGER REFERENCES manufacturers,
    system_id INTEGER REFERENCES systems,
    fastener_type_id INTEGER REFERENCES fastener_types,
    fastener_head_type_id INTEGER REFERENCES fastener_head_types,
    thread_representation_id INTEGER REFERENCES thread_representations,
    name VARCHAR(50),
    part_number VARCHAR(50),
    system_agnostic BOOLEAN,
    pocket_count INTEGER,
    door BOOLEAN,
    diameter FLOAT,
    length FLOAT
);

CREATE TABLE
part_orientations (
    id SERIAL PRIMARY KEY,
    part_id INTEGER REFERENCES parts,
    orientation_id INTEGER REFERENCES orientations,
    path VARCHAR(25000),
    UNIQUE(part_id, orientation_id)
);

CREATE TABLE
thermal_pocket_types (
    id SERIAL PRIMARY KEY,
    path VARCHAR(10000)
);

CREATE TABLE
thermal_pockets (
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    thermal_pocket_type_id INTEGER REFERENCES thermal_pocket_types,
    transform FLOAT[3][3]
);

CREATE TABLE
brake_metal_pockets (
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    angle FLOAT,
    back FLOAT,
    inside FLOAT,
    outside FLOAT
);



CREATE TABLE
fastener_locations (
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    orientation_id INTEGER REFERENCES orientations,
    transform fLOAT[3][3]
);

CREATE TABLE
infill_pocket_locations (
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    transform FLOAT[3][3]
);

CREATE TABLE
part_part_types (
    part_id INTEGER REFERENCES parts,
    part_type_id INTEGER REFERENCES part_types,
    PRIMARY KEY (part_id, part_type_id)
);

CREATE TABLE
part_part_tags (
    part_id INTEGER REFERENCES parts,
    part_tag_id INTEGER REFERENCES part_tags,
    PRIMARY KEY (part_id, part_tag_id)
);



CREATE TABLE
configuration_type_part_types (
    configuration_type_id INTEGER REFERENCES configuration_types,
    part_type_id INTEGER REFERENCES part_types,
    PRIMARY KEY (configuration_type_id, part_type_id)
);

CREATE TABLE
configurations (
    id SERIAL PRIMARY KEY,
    configuration_type_id INTEGER REFERENCES configuration_types,
    infill_pocket_type_id INTEGER REFERENCES infill_pocket_types,
    infill_size INTEGER REFERENCES infill_sizes,
    brake_metal BOOLEAN,
    sightline FLOAT,
    complete BOOLEAN,
    completed_at TIMESTAMP
);

CREATE TABLE
configuration_transformations (
    id SERIAL PRIMARY KEY,
    detail_type_id INTEGER REFERENCES detail_types,
    configuration_id INTEGER REFERENCES configurations,
    configuration_transform FLOAT[3][3],
    detail_transform FLOAT[3][3],
    center_point FLOAT[2],
    direction FLOAT,
    range NUMRANGE
);

CREATE TABLE
configuration_parts (
    id SERIAL PRIMARY KEY,
    configuration_id INTEGER REFERENCES configurations,
    linetype_id INTEGER REFERENCES linetypes,
    part_orientation_id INTEGER REFERENCES part_orientations,
    transform FLOAT[3][3]
);




CREATE TABLE
option_combination_option_values (
    option_combination_id INTEGER REFERENCES option_combinations,
    option_value_id INTEGER REFERENCES option_values,
    PRIMARY KEY (option_combination_id, option_value_id)
);

CREATE TABLE
option_combination_configuration_types (
    option_combination_id INTEGER REFERENCES option_combinations,
    configuration_type_id INTEGER REFERENCES configuration_types,
    PRIMARY KEY (option_combination_id, configuration_type_id)
);

CREATE TABLE
system_option_configuration_types (
    system_option_id INTEGER REFERENCES system_options,
    configuration_type_id INTEGER REFERENCES configuration_types,
    PRIMARY KEY (system_option_id, configuration_type_id)
);

CREATE TABLE
configuration_option_values (
    configuration_id INTEGER REFERENCES configurations,
    option_value_id INTEGER REFERENCES option_values,
    PRIMARY KEY (configuration_id, option_value_id)
);



CREATE TABLE
configuration_name_override (
    manufacturer_id INTEGER REFERENCES manufacturers,
    configuration_type_id INTEGER REFERENCES configuration_types,
    name_override VARCHAR(50),
    PRIMARY KEY (manufacturer_id, configuration_type_id)
);

CREATE TABLE
system_infill_pocket_types (
    system_id INTEGER REFERENCES systems,
    infill_pocket_type_id INTEGER REFERENCES infill_pocket_types,
    PRIMARY KEY (system_id, infill_pocket_type_id)
);

CREATE TABLE
system_infill_pocket_sizes (
    system_id INTEGER REFERENCES systems,
    infill_pocket_size FLOAT REFERENCES infill_pocket_sizes,
    PRIMARY KEY (system_id, infill_pocket_size)
);

CREATE TABLE
invalid_system_configuration_types (
    system_id INTEGER REFERENCES systems,
    invalid_configuration_type_id INTEGER REFERENCES configuration_types,
    PRIMARY KEY (system_id, invalid_configuration_type_id)
);

CREATE TABLE
system_type_detail_type_configuration_types (
    id SERIAL PRIMARY KEY,
    system_type_id INTEGER REFERENCES system_types,
    detail_type_id INTEGER REFERENCES detail_types,
    configuration_type_id INTEGER REFERENCES configuration_types,
    required BOOLEAN,
    mirrorable BOOLEAN,
    presentation_level PRESENTATION_LEVEL,
    override_level PRESENTATION_LEVEL,
    UNIQUE (system_type_id, detail_type_id, configuration_type_id)
);

CREATE TABLE
system_configuration_overrides (
    system_id INTEGER REFERENCES systems,
    system_type_id INTEGER,
    detail_type_id INTEGER,
    configuration_type_id INTEGER,
    required_override BOOLEAN,
    mirrorable_override BOOLEAN,
    presentation_level_override INTEGER,
    override_level_override INTEGER,
    PRIMARY KEY (system_id, detail_type_id, configuration_type_id),
    FOREIGN KEY (
        system_type_id, 
        detail_type_id, 
        configuration_type_id
    )
    REFERENCES system_type_detail_type_configuration_types (
        system_type_id,
        detail_type_id,
        configuration_type_id
    )
);



-- compiled.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 



-- functions.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

elevation,[object Object]

-- seed-data.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

application_data.sql,
INSERT INTO detail_types
(type)
VALUES
('Head'),
('Sill'),
('Jamb'),
('Post'),
('Horizontal'),
('Mullion'),
('Transom Bar'),
('Door Header'),
('Transom Head'),
('Door Jamb'),
('Corner');

INSERT INTO configuration_types
(type)
VALUES
('Head'),
('Stool Trim'),
('Sill Flashing'),
('Jamb'),
('Shim Support'),
('Mullion'),
('Corner'),
('Post'),
('Door Jamb'),
('Door Stop'),
('Compensating Receptor'),
('Shear Block Package'),
('Sill'),
('T-Bar/Header'),
('Horizontal'),
('Pocket Insert'),
('Steel Reinforcing');


-- types.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

input-types.sql,
CREATE TYPE
entire_option_value AS (
    id INTEGER,
    system_option_id INTEGER,
    name TEXT,
    value FLOAT,
    value_order INTEGER,
    mirror_from_option_value_id INTEGER
);

CREATE TYPE
entire_system_option AS (
    id INTEGER,
    system_id INTEGER,
    name TEXT,
    presentation_level PRESENTATION_LEVEL,
    override_level PRESENTATION_LEVEL,
    option_order INTEGER,
    option_values ENTIRE_OPTION_VALUE[],
    option_value_ids_to_delete INTEGER[],
    configuration_type_ids INTEGER[],
    configuration_type_ids_to_delete INTEGER[]
);

CREATE TYPE
entire_system_configuration_override AS (
    system_id INTEGER,
    system_type_id INTEGER,
    detail_type_id INTEGER,
    configuration_type_id INTEGER,
    required_override BOOLEAN,
    mirrorable_override BOOLEAN,
    presentation_level_override PRESENTATION_LEVEL,
    override_level_override PRESENTATION_LEVEL
);

CREATE TYPE
entire_system AS (
    -- SYSTEM INFO
    id INTEGER,
    manufacturer_id INTEGER,
    system_type_id INTEGER,
    name TEXT,
    depth FLOAT,
    default_glass_size FLOAT,
    default_glass_bite FLOAT,
    default_sightline FLOAT,
    top_gap FLOAT,
    bottom_gap FLOAT,
    side_gap FLOAT,
    meeting_stile_gap FLOAT,
    inset FLOAT,
    glass_gap FLOAT,
    shim_size FLOAT,
    front_inset BOOLEAN,
    system_tag_ids INTEGER[],
    system_tag_ids_to_delete INTEGER[],
    -- GLAZING INFO
    infill_sizes FLOAT[],
    infill_sizes_to_delete FLOAT[],
    infill_pocket_type_ids INTEGER[],
    infill_pocket_type_ids_to_delete INTEGER[],
    infill_pocket_sizes FLOAT[],
    infill_pocket_sizes_to_delete FLOAT[],
    -- VALID TYPES
    invalid_configuration_type_ids INTEGER[],
    invalid_configuration_type_ids_to_delete INTEGER[],
    configuration_overrides ENTIRE_SYSTEM_CONFIGURATION_OVERRIDE[],
    configuration_overrides_to_delete ENTIRE_SYSTEM_CONFIGURATION_OVERRIDE[],
    -- OPTIONS
    system_options ENTIRE_SYSTEM_OPTION[],
    system_option_ids_to_delete INTEGER[]
);

CREATE TYPE
entire_elevation_container AS (
    id INTEGER,
    fake_id INTEGER,
    original BOOLEAN,
    contents TEXT,
    daylight_opening COORDINATE,
    custom_rough_opening BOOLEAN
);

CREATE TYPE
entire_container_detail AS (
    id INTEGER,
    vertical BOOLEAN,
    first_container_id INTEGER,
    first_container_fake_id INTEGER,
    second_container_id INTEGER,
    second_container_fake_id INTEGER
);

CREATE TYPE
entire_elevation AS (
    id INTEGER,
    project_id INTEGER,
    name TEXT,
    rough_opening COORDINATE,
    finished_floor_height INTEGER,
    containers ENTIRE_ELEVATION_CONTAINER[],
    container_ids_to_delete INTEGER[],
    details ENTIRE_CONTAINER_DETAIL[],
    detail_ids_to_delete INTEGER[]
);


-- output-types.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


CREATE TYPE
name_output AS (
    id INTEGER,
    name TEXT
);

CREATE TYPE
type_output AS (
    id INTEGER,
    type TEXT,
);

CREATE TYPE
tag_output AS (
    id INTEGER,
    tag TEXT
);

CREATE TYPE
system_option_output AS (
    id INTEGER,
    name TEXT,
    presentation_level INTEGER,
    override_level INTEGER,
    
)

CREATE TYPE
system_output AS (
    id INTEGER,
    name TEXT,
    depth FLOAT,
    default_glass_size FLOAT,
    default_glass_bite FLOAT,
    default_sightline FLOAT,
    top_gap FLOAT,
    bottom_gap FLOAT,
    side_gap FLOAT,
    meeting_stile_gap FLOAT,
    inset FLOAT,
    glass_gap FLOAT,
    shim_size FLOAT,
    front_inset BOOLEAN,
    manufacturer NAME_OUTPUT,
    system_type TYPE_OUTPUT,
    system_tags TAG_OUTPUT[],
    infill_sizes FLOAT[],
    system_options SYSTEM_OPTION_OUTPUT[],
    detail_types SYSTEM_DETAIL_TYPE_OUTPUT[]
);


-- types.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


CREATE TYPE
id_pair AS (
    id INTEGER,
    fake_id INTEGER
);

CREATE TYPE
coordinate AS (
    x FLOAT,
    y FLOAT
);

CREATE TYPE
presentation_level AS ENUM (
    'system',
    'elevation',
    'lite',
    'frame',
    'detail'
);


-- utils.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

get_real_id.sql,DROP FUNCTION IF EXISTS get_real_id;

CREATE OR REPLACE FUNCTION get_real_id (
    id_pairs ID_PAIR[],
    fake_id INTEGER
) RETURNS INTEGER AS $$
DECLARE
    f ALIAS FOR fake_id;
    real_id INTEGER;
BEGIN
    SELECT p.id
        FROM UNNEST (id_pairs) p
        INTO real_id
        WHERE p.fake_id = f;
    RETURN real_id;
END;
$$ LANGUAGE plpgsql;


-- test.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


SELECT * FROM update_entire_system(
    ROW(
        -- SYSTEM INFO
        -- id INTEGER,
        40,
        -- manufacturer_id INTEGER,
        1,
        -- system_type_id INTEGER,
        1,
        -- name VARCHAR(50),
        'Testing SQL Functions #1',
        -- depth FLOAT,
        NULL,
        -- default_glass_size FLOAT,
        NULL,
        -- default_glass_bite FLOAT,
        NULL,
        -- default_sightline FLOAT,
        NULL,
        -- top_gap FLOAT,
        NULL,
        -- bottom_gap FLOAT,
        NULL,
        -- side_gap FLOAT,
        NULL,
        -- meeting_stile_gap FLOAT,
        NULL,
        -- inset FLOAT,
        NULL,
        -- glass_gap FLOAT,
        NULL,
        -- shim_size FLOAT,
        NULL,
        -- front_inset BOOLEAN,
        NULL,
        -- system_tag_ids INTEGER[],
        ARRAY [1,2,3],
        -- system_tag_ids_to_delete INTEGER[],
        NULL,
        -- -- GLAZING INFO
        -- infill_sizes FLOAT[],
        ARRAY [1],
        -- infill_sizes_to_delete FLOAT[],
        NULL,
        -- infill_pocket_type_ids INTEGER[],
        ARRAY [1,2],
        -- infill_pocket_type_ids_to_delete INTEGER[],
        NULL,
        -- infill_pocket_sizes FLOAT[],
        ARRAY [1],
        -- infill_pocket_sizes_to_delete FLOAT[],
        NULL,
        -- -- VALID TYPES
        -- invalid_system_configuration_type_ids INTEGER[],
        NULL,
        -- invalid_system_configuration_type_ids_to_delete INTEGER[],
        NULL,
        -- configuration_overrides entire_system_configuration_override[],
        NULL,
        -- configuration_overrides_to_delete entire_system_configuration_override[],
        NULL,
        -- -- OPTIONS
        -- system_options entire_system_option[],
        ARRAY[ROW(
            -- id INTEGER,
            50,
            -- system_id INTEGER,
            NULL,
            -- name VARCHAR(50),
            NULL,
            -- presentation_level INTEGER,
            NULL,
            -- override_level INTEGER,
            NULL,
            -- option_order INTEGER,
            NULL,
            -- option_values entire_option_value[],
            ARRAY[ROW(
                -- id INTEGER,
                NULL,
                -- system_option_id INTEGER,
                NULL,
                -- name TEXT,
                'Test Option Value #1',
                -- value FLOAT,
                NULL,
                -- value_order INTEGER,
                1,
                -- mirror_from_option_value_id INTEGER
                NULL
            )::entire_option_value],
            -- option_value_ids_to_delete INTEGER[],
            NULL,
            -- configuration_type_ids INTEGER[],
            NULL,
            -- configuration_type_ids_to_delete INTEGER[]
            NULL
        )::entire_system_option],
        -- system_option_ids_to_delete INTEGER[]
        NULL
    )::entire_system
);


-- tables.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

elevation.sql,
-- ELEVATIONS

DROP TABLE IF EXISTS detail_option_values;
DROP TABLE IF EXISTS container_details;
DROP TABLE IF EXISTS elevation_containers;
DROP TABLE IF EXISTS elevations;

CREATE TABLE
elevations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects,
    system_set_id INTEGER REFERENCES system_sets,
    name VARCHAR(50),
    rough_opening COORDINATE,
    finished_floor_height FLOAT
);

CREATE TABLE
elevation_containers (
    id SERIAL PRIMARY KEY,
    elevation_id INTEGER REFERENCES elevations,
    original BOOLEAN DEFAULT FALSE,
    contents VARCHAR(50),
    daylight_opening COORDINATE,
    custom_rough_opening BOOLEAN DEFAULT FALSE
);

CREATE TABLE
container_details (
    id SERIAL PRIMARY KEY,
    elevation_id INTEGER REFERENCES elevations,
    first_container_id INTEGER REFERENCES elevation_containers,
    second_container_id INTEGER REFERENCES elevation_containers,
    vertical BOOLEAN,
    UNIQUE (first_container_id, second_container_id, vertical)
);

CREATE TABLE
detail_option_values (
    id SERIAL PRIMARY KEY,
    container_detail_id INTEGER REFERENCES container_details,
    option_value_id INTEGER REFERENCES option_values
);


-- project.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS system_sets CASCADE;
DROP TABLE IF EXISTS system_set_option_values CASCADE;
DROP TABLE IF EXISTS system_set_detail_type_configuration_types CASCADE;

CREATE TABLE
projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE
system_sets (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects,
    system_id INTEGER,
    system_type_id INTEGER,
    FOREIGN KEY (
        system_id,
        system_type_id
    )
    REFERENCES systems (
        id,
        system_type_id
    ),
    UNIQUE (id, system_id, system_type_id)
);

CREATE TABLE
system_set_option_values (
    system_set_id INTEGER,
    system_id INTEGER,
    system_type_id INTEGER,
    system_option_id INTEGER,
    option_value_id INTEGER REFERENCES option_values,
    PRIMARY KEY (system_id, system_option_id),
    FOREIGN KEY (
        system_set_id,
        system_id,
        system_type_id
    )
    REFERENCES system_sets (
        id,
        system_id,
        system_type_id
    ),
    FOREIGN KEY (
        system_id,
        system_option_id
    )
    REFERENCES system_options (
        system_id,
        id
    ),
    FOREIGN KEY (
        system_option_id,
        option_value_id
    )
    REFERENCES option_values (
        system_option_id,
        id
    )
);

CREATE TABLE
system_set_detail_type_configuration_types (
    system_set_id INTEGER,
    system_id INTEGER,
    system_type_id INTEGER,
    detail_type_id INTEGER,
    configuration_type_id INTEGER,
    FOREIGN KEY (
        system_set_id,
        system_id,
        system_type_id
    )
    REFERENCES system_sets (
        id,
        system_id,
        system_type_id
    ),
)


-- tables.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP TABLE IF EXISTS manufacturers CASCADE;
DROP TABLE IF EXISTS system_tags CASCADE;
DROP TABLE IF EXISTS system_types CASCADE;
DROP TABLE IF EXISTS infill_sizes CASCADE;
DROP TABLE IF EXISTS systems CASCADE;
DROP TABLE IF EXISTS system_infill_sizes CASCADE;
DROP TABLE IF EXISTS system_system_tags CASCADE;
DROP TABLE IF EXISTS system_options CASCADE;
DROP TABLE IF EXISTS option_values CASCADE;
DROP TABLE IF EXISTS option_combinations CASCADE;
DROP TABLE IF EXISTS detail_types CASCADE;
DROP TABLE IF EXISTS configuration_types CASCADE;
DROP TABLE IF EXISTS line_weights CASCADE;
DROP TABLE IF EXISTS linetypes CASCADE;
DROP TABLE IF EXISTS orientations CASCADE;
DROP TABLE IF EXISTS part_types CASCADE;
DROP TABLE IF EXISTS part_tags CASCADE;
DROP TABLE IF EXISTS infill_pocket_types CASCADE;
DROP TABLE IF EXISTS infill_pocket_sizes CASCADE;
DROP TABLE IF EXISTS fastener_types CASCADE;
DROP TABLE IF EXISTS fastener_head_types CASCADE;
DROP TABLE IF EXISTS thread_representations CASCADE;
DROP TABLE IF EXISTS parts CASCADE;
DROP TABLE IF EXISTS part_orientations CASCADE;
DROP TABLE IF EXISTS thermal_pocket_types CASCADE;
DROP TABLE IF EXISTS thermal_pockets CASCADE;
DROP TABLE IF EXISTS brake_metal_pockets CASCADE;
DROP TABLE IF EXISTS fastener_locations CASCADE;
DROP TABLE IF EXISTS infill_pocket_locations CASCADE;
DROP TABLE IF EXISTS part_part_types CASCADE;
DROP TABLE IF EXISTS part_part_tags CASCADE;
DROP TABLE IF EXISTS configuration_type_part_types CASCADE;
DROP TABLE IF EXISTS configurations CASCADE;
DROP TABLE IF EXISTS configuration_transformations CASCADE;
DROP TABLE IF EXISTS configuration_parts CASCADE;
DROP TABLE IF EXISTS option_combination_option_values CASCADE;
DROP TABLE IF EXISTS option_combination_configuration_types CASCADE;
DROP TABLE IF EXISTS system_option_configuration_types CASCADE;
DROP TABLE IF EXISTS configuration_option_values CASCADE;
DROP TABLE IF EXISTS configuration_name_override CASCADE;
DROP TABLE IF EXISTS system_infill_pocket_types CASCADE;
DROP TABLE IF EXISTS system_infill_pocket_sizes CASCADE;
DROP TABLE IF EXISTS invalid_system_configuration_types CASCADE;
DROP TABLE IF EXISTS system_type_detail_type_configuration_types CASCADE;
DROP TABLE IF EXISTS system_configuration_overrides CASCADE;


CREATE TABLE
manufacturers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE
system_tags (
    id SERIAL PRIMARY KEY,
    tag VARCHAR(50)
);

CREATE TABLE
system_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
infill_sizes (
    size FLOAT PRIMARY KEY
);

CREATE TABLE
systems (
    id SERIAL PRIMARY KEY,
    manufacturer_id INTEGER REFERENCES manufacturers,
    system_type_id INTEGER REFERENCES system_types,
    name VARCHAR(50),
    depth FLOAT,
    default_glass_size FLOAT,
    default_glass_bite FLOAT,
    default_sightline FLOAT,
    top_gap FLOAT,
    bottom_gap FLOAT,
    side_gap FLOAT,
    meeting_stile_gap FLOAT,
    inset FLOAT,
    glass_gap FLOAT,
    shim_size FLOAT,
    front_inset BOOLEAN,
    UNIQUE (
        id,
        system_type_id
    )
);



CREATE TABLE
system_infill_sizes (
    system_id INTEGER REFERENCES systems,
    infill_size FLOAT REFERENCES infill_sizes,
    PRIMARY KEY (system_id, infill_size)
);

CREATE TABLE
system_system_tags (
    system_id INTEGER REFERENCES systems,
    system_tag_id INTEGER REFERENCES system_tags,
    PRIMARY KEY (system_id, system_tag_id)
);



CREATE TABLE
system_options (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems,
    name VARCHAR(50),
    presentation_level PRESENTATION_LEVEL,
    override_level PRESENTATION_LEVEL,
    option_order INTEGER,
    UNIQUE (id, system_id)
);

CREATE TABLE
option_values (
    id SERIAL PRIMARY KEY,
    system_option_id INTEGER REFERENCES system_options,
    name VARCHAR(50),
    value FLOAT,
    value_order INTEGER,
    UNIQUE (id, system_option_id)
);

ALTER TABLE
option_values
ADD COLUMN
mirror_from_option_value_id INTEGER REFERENCES option_values;

CREATE TABLE
option_combinations (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems,
    invalid BOOLEAN,
    depth_override FLOAT,
    glass_size_override FLOAT,
    glass_bite_override FLOAT,
    sightline_override FLOAT,
    top_gap_override FLOAT,
    bottom_gap_override FLOAT,
    side_gap_override FLOAT,
    meeting_stile_gap_override FLOAT,
    glass_gap_override FLOAT,
    shim_size_override FLOAT,
    inset_override FLOAT,
    front_inset_override BOOLEAN
);



CREATE TABLE
detail_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    entrance BOOLEAN,
    vertical BOOLEAN
);

CREATE TABLE
configuration_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    door BOOLEAN
);



CREATE TABLE
line_weights (
    name VARCHAR(50),
    weight FLOAT PRIMARY KEY
);

CREATE TABLE
linetypes (
    id SERIAL PRIMARY KEY,
    line_weight INTEGER REFERENCES line_weights,
    name VARCHAR(50),
    pattern VARCHAR(50)
);



CREATE TABLE
orientations (
    id SERIAL PRIMARY KEY,
    orientation VARCHAR(50)
);

CREATE TABLE
part_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
part_tags (
    id SERIAL PRIMARY KEY,
    tag VARCHAR(50)
);

CREATE TABLE
infill_pocket_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    description VARCHAR(5000),
    captured BOOLEAN
);

CREATE TABLE
infill_pocket_sizes (
    size FLOAT PRIMARY KEY
);

CREATE TABLE
fastener_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
fastener_head_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
thread_representations (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);



CREATE TABLE
parts (
    id SERIAL PRIMARY KEY,
    manufacturer_id INTEGER REFERENCES manufacturers,
    system_id INTEGER REFERENCES systems,
    fastener_type_id INTEGER REFERENCES fastener_types,
    fastener_head_type_id INTEGER REFERENCES fastener_head_types,
    thread_representation_id INTEGER REFERENCES thread_representations,
    name VARCHAR(50),
    part_number VARCHAR(50),
    system_agnostic BOOLEAN,
    pocket_count INTEGER,
    door BOOLEAN,
    diameter FLOAT,
    length FLOAT
);

CREATE TABLE
part_orientations (
    id SERIAL PRIMARY KEY,
    part_id INTEGER REFERENCES parts,
    orientation_id INTEGER REFERENCES orientations,
    path VARCHAR(25000),
    UNIQUE(part_id, orientation_id)
);

CREATE TABLE
thermal_pocket_types (
    id SERIAL PRIMARY KEY,
    path VARCHAR(10000)
);

CREATE TABLE
thermal_pockets (
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    thermal_pocket_type_id INTEGER REFERENCES thermal_pocket_types,
    transform FLOAT[3][3]
);

CREATE TABLE
brake_metal_pockets (
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    angle FLOAT,
    back FLOAT,
    inside FLOAT,
    outside FLOAT
);



CREATE TABLE
fastener_locations (
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    orientation_id INTEGER REFERENCES orientations,
    transform fLOAT[3][3]
);

CREATE TABLE
infill_pocket_locations (
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    transform FLOAT[3][3]
);

CREATE TABLE
part_part_types (
    part_id INTEGER REFERENCES parts,
    part_type_id INTEGER REFERENCES part_types,
    PRIMARY KEY (part_id, part_type_id)
);

CREATE TABLE
part_part_tags (
    part_id INTEGER REFERENCES parts,
    part_tag_id INTEGER REFERENCES part_tags,
    PRIMARY KEY (part_id, part_tag_id)
);



CREATE TABLE
configuration_type_part_types (
    configuration_type_id INTEGER REFERENCES configuration_types,
    part_type_id INTEGER REFERENCES part_types,
    PRIMARY KEY (configuration_type_id, part_type_id)
);

CREATE TABLE
configurations (
    id SERIAL PRIMARY KEY,
    configuration_type_id INTEGER REFERENCES configuration_types,
    infill_pocket_type_id INTEGER REFERENCES infill_pocket_types,
    infill_size INTEGER REFERENCES infill_sizes,
    brake_metal BOOLEAN,
    sightline FLOAT,
    complete BOOLEAN,
    completed_at TIMESTAMP
);

CREATE TABLE
configuration_transformations (
    id SERIAL PRIMARY KEY,
    detail_type_id INTEGER REFERENCES detail_types,
    configuration_id INTEGER REFERENCES configurations,
    configuration_transform FLOAT[3][3],
    detail_transform FLOAT[3][3],
    center_point FLOAT[2],
    direction FLOAT,
    range NUMRANGE
);

CREATE TABLE
configuration_parts (
    id SERIAL PRIMARY KEY,
    configuration_id INTEGER REFERENCES configurations,
    linetype_id INTEGER REFERENCES linetypes,
    part_orientation_id INTEGER REFERENCES part_orientations,
    transform FLOAT[3][3]
);




CREATE TABLE
option_combination_option_values (
    option_combination_id INTEGER REFERENCES option_combinations,
    option_value_id INTEGER REFERENCES option_values,
    PRIMARY KEY (option_combination_id, option_value_id)
);

CREATE TABLE
option_combination_configuration_types (
    option_combination_id INTEGER REFERENCES option_combinations,
    configuration_type_id INTEGER REFERENCES configuration_types,
    PRIMARY KEY (option_combination_id, configuration_type_id)
);

CREATE TABLE
system_option_configuration_types (
    system_option_id INTEGER REFERENCES system_options,
    configuration_type_id INTEGER REFERENCES configuration_types,
    PRIMARY KEY (system_option_id, configuration_type_id)
);

CREATE TABLE
configuration_option_values (
    configuration_id INTEGER REFERENCES configurations,
    option_value_id INTEGER REFERENCES option_values,
    PRIMARY KEY (configuration_id, option_value_id)
);



CREATE TABLE
configuration_name_override (
    manufacturer_id INTEGER REFERENCES manufacturers,
    configuration_type_id INTEGER REFERENCES configuration_types,
    name_override VARCHAR(50),
    PRIMARY KEY (manufacturer_id, configuration_type_id)
);

CREATE TABLE
system_infill_pocket_types (
    system_id INTEGER REFERENCES systems,
    infill_pocket_type_id INTEGER REFERENCES infill_pocket_types,
    PRIMARY KEY (system_id, infill_pocket_type_id)
);

CREATE TABLE
system_infill_pocket_sizes (
    system_id INTEGER REFERENCES systems,
    infill_pocket_size FLOAT REFERENCES infill_pocket_sizes,
    PRIMARY KEY (system_id, infill_pocket_size)
);

CREATE TABLE
invalid_system_configuration_types (
    system_id INTEGER REFERENCES systems,
    invalid_configuration_type_id INTEGER REFERENCES configuration_types,
    PRIMARY KEY (system_id, invalid_configuration_type_id)
);

CREATE TABLE
system_type_detail_type_configuration_types (
    id SERIAL PRIMARY KEY,
    system_type_id INTEGER REFERENCES system_types,
    detail_type_id INTEGER REFERENCES detail_types,
    configuration_type_id INTEGER REFERENCES configuration_types,
    required BOOLEAN,
    mirrorable BOOLEAN,
    presentation_level PRESENTATION_LEVEL,
    override_level PRESENTATION_LEVEL,
    UNIQUE (system_type_id, detail_type_id, configuration_type_id)
);

CREATE TABLE
system_configuration_overrides (
    system_id INTEGER REFERENCES systems,
    system_type_id INTEGER,
    detail_type_id INTEGER,
    configuration_type_id INTEGER,
    required_override BOOLEAN,
    mirrorable_override BOOLEAN,
    presentation_level_override INTEGER,
    override_level_override INTEGER,
    PRIMARY KEY (system_id, detail_type_id, configuration_type_id),
    FOREIGN KEY (
        system_type_id, 
        detail_type_id, 
        configuration_type_id
    )
    REFERENCES system_type_detail_type_configuration_types (
        system_type_id,
        detail_type_id,
        configuration_type_id
    )
);



-- compiled.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

functions,elevation,[object Object]

-- seed-data
-- Automatically generated in /dev-utils/compile-database-seed.js 

application_data.sql,
INSERT INTO detail_types
(type)
VALUES
('Head'),
('Sill'),
('Jamb'),
('Post'),
('Horizontal'),
('Mullion'),
('Transom Bar'),
('Door Header'),
('Transom Head'),
('Door Jamb'),
('Corner');

INSERT INTO configuration_types
(type)
VALUES
('Head'),
('Stool Trim'),
('Sill Flashing'),
('Jamb'),
('Shim Support'),
('Mullion'),
('Corner'),
('Post'),
('Door Jamb'),
('Door Stop'),
('Compensating Receptor'),
('Shear Block Package'),
('Sill'),
('T-Bar/Header'),
('Horizontal'),
('Pocket Insert'),
('Steel Reinforcing');


-- types
-- Automatically generated in /dev-utils/compile-database-seed.js 

output-types.sql,
CREATE TYPE
name_output AS (
    id INTEGER,
    name TEXT
);

CREATE TYPE
type_output AS (
    id INTEGER,
    type TEXT,
);

CREATE TYPE
tag_output AS (
    id INTEGER,
    tag TEXT
);

CREATE TYPE
system_option_output AS (
    id INTEGER,
    name TEXT,
    presentation_level INTEGER,
    override_level INTEGER,
    
)

CREATE TYPE
system_output AS (
    id INTEGER,
    name TEXT,
    depth FLOAT,
    default_glass_size FLOAT,
    default_glass_bite FLOAT,
    default_sightline FLOAT,
    top_gap FLOAT,
    bottom_gap FLOAT,
    side_gap FLOAT,
    meeting_stile_gap FLOAT,
    inset FLOAT,
    glass_gap FLOAT,
    shim_size FLOAT,
    front_inset BOOLEAN,
    manufacturer NAME_OUTPUT,
    system_type TYPE_OUTPUT,
    system_tags TAG_OUTPUT[],
    infill_sizes FLOAT[],
    system_options SYSTEM_OPTION_OUTPUT[],
    detail_types SYSTEM_DETAIL_TYPE_OUTPUT[]
);


-- types.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


CREATE TYPE
id_pair AS (
    id INTEGER,
    fake_id INTEGER
);

CREATE TYPE
coordinate AS (
    x FLOAT,
    y FLOAT
);

CREATE TYPE
presentation_level AS ENUM (
    'system',
    'elevation',
    'lite',
    'frame',
    'detail'
);


-- input-types.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


CREATE TYPE
entire_option_value AS (
    id INTEGER,
    system_option_id INTEGER,
    name TEXT,
    value FLOAT,
    value_order INTEGER,
    mirror_from_option_value_id INTEGER
);

CREATE TYPE
entire_system_option AS (
    id INTEGER,
    system_id INTEGER,
    name TEXT,
    presentation_level PRESENTATION_LEVEL,
    override_level PRESENTATION_LEVEL,
    option_order INTEGER,
    option_values ENTIRE_OPTION_VALUE[],
    option_value_ids_to_delete INTEGER[],
    configuration_type_ids INTEGER[],
    configuration_type_ids_to_delete INTEGER[]
);

CREATE TYPE
entire_system_configuration_override AS (
    system_id INTEGER,
    system_type_id INTEGER,
    detail_type_id INTEGER,
    configuration_type_id INTEGER,
    required_override BOOLEAN,
    mirrorable_override BOOLEAN,
    presentation_level_override PRESENTATION_LEVEL,
    override_level_override PRESENTATION_LEVEL
);

CREATE TYPE
entire_system AS (
    -- SYSTEM INFO
    id INTEGER,
    manufacturer_id INTEGER,
    system_type_id INTEGER,
    name TEXT,
    depth FLOAT,
    default_glass_size FLOAT,
    default_glass_bite FLOAT,
    default_sightline FLOAT,
    top_gap FLOAT,
    bottom_gap FLOAT,
    side_gap FLOAT,
    meeting_stile_gap FLOAT,
    inset FLOAT,
    glass_gap FLOAT,
    shim_size FLOAT,
    front_inset BOOLEAN,
    system_tag_ids INTEGER[],
    system_tag_ids_to_delete INTEGER[],
    -- GLAZING INFO
    infill_sizes FLOAT[],
    infill_sizes_to_delete FLOAT[],
    infill_pocket_type_ids INTEGER[],
    infill_pocket_type_ids_to_delete INTEGER[],
    infill_pocket_sizes FLOAT[],
    infill_pocket_sizes_to_delete FLOAT[],
    -- VALID TYPES
    invalid_configuration_type_ids INTEGER[],
    invalid_configuration_type_ids_to_delete INTEGER[],
    configuration_overrides ENTIRE_SYSTEM_CONFIGURATION_OVERRIDE[],
    configuration_overrides_to_delete ENTIRE_SYSTEM_CONFIGURATION_OVERRIDE[],
    -- OPTIONS
    system_options ENTIRE_SYSTEM_OPTION[],
    system_option_ids_to_delete INTEGER[]
);

CREATE TYPE
entire_elevation_container AS (
    id INTEGER,
    fake_id INTEGER,
    original BOOLEAN,
    contents TEXT,
    daylight_opening COORDINATE,
    custom_rough_opening BOOLEAN
);

CREATE TYPE
entire_container_detail AS (
    id INTEGER,
    vertical BOOLEAN,
    first_container_id INTEGER,
    first_container_fake_id INTEGER,
    second_container_id INTEGER,
    second_container_fake_id INTEGER
);

CREATE TYPE
entire_elevation AS (
    id INTEGER,
    project_id INTEGER,
    name TEXT,
    rough_opening COORDINATE,
    finished_floor_height INTEGER,
    containers ENTIRE_ELEVATION_CONTAINER[],
    container_ids_to_delete INTEGER[],
    details ENTIRE_CONTAINER_DETAIL[],
    detail_ids_to_delete INTEGER[]
);


-- utils
-- Automatically generated in /dev-utils/compile-database-seed.js 

get_real_id.sql,DROP FUNCTION IF EXISTS get_real_id;

CREATE OR REPLACE FUNCTION get_real_id (
    id_pairs ID_PAIR[],
    fake_id INTEGER
) RETURNS INTEGER AS $$
DECLARE
    f ALIAS FOR fake_id;
    real_id INTEGER;
BEGIN
    SELECT p.id
        FROM UNNEST (id_pairs) p
        INTO real_id
        WHERE p.fake_id = f;
    RETURN real_id;
END;
$$ LANGUAGE plpgsql;


-- test.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 


SELECT * FROM update_entire_system(
    ROW(
        -- SYSTEM INFO
        -- id INTEGER,
        40,
        -- manufacturer_id INTEGER,
        1,
        -- system_type_id INTEGER,
        1,
        -- name VARCHAR(50),
        'Testing SQL Functions #1',
        -- depth FLOAT,
        NULL,
        -- default_glass_size FLOAT,
        NULL,
        -- default_glass_bite FLOAT,
        NULL,
        -- default_sightline FLOAT,
        NULL,
        -- top_gap FLOAT,
        NULL,
        -- bottom_gap FLOAT,
        NULL,
        -- side_gap FLOAT,
        NULL,
        -- meeting_stile_gap FLOAT,
        NULL,
        -- inset FLOAT,
        NULL,
        -- glass_gap FLOAT,
        NULL,
        -- shim_size FLOAT,
        NULL,
        -- front_inset BOOLEAN,
        NULL,
        -- system_tag_ids INTEGER[],
        ARRAY [1,2,3],
        -- system_tag_ids_to_delete INTEGER[],
        NULL,
        -- -- GLAZING INFO
        -- infill_sizes FLOAT[],
        ARRAY [1],
        -- infill_sizes_to_delete FLOAT[],
        NULL,
        -- infill_pocket_type_ids INTEGER[],
        ARRAY [1,2],
        -- infill_pocket_type_ids_to_delete INTEGER[],
        NULL,
        -- infill_pocket_sizes FLOAT[],
        ARRAY [1],
        -- infill_pocket_sizes_to_delete FLOAT[],
        NULL,
        -- -- VALID TYPES
        -- invalid_system_configuration_type_ids INTEGER[],
        NULL,
        -- invalid_system_configuration_type_ids_to_delete INTEGER[],
        NULL,
        -- configuration_overrides entire_system_configuration_override[],
        NULL,
        -- configuration_overrides_to_delete entire_system_configuration_override[],
        NULL,
        -- -- OPTIONS
        -- system_options entire_system_option[],
        ARRAY[ROW(
            -- id INTEGER,
            50,
            -- system_id INTEGER,
            NULL,
            -- name VARCHAR(50),
            NULL,
            -- presentation_level INTEGER,
            NULL,
            -- override_level INTEGER,
            NULL,
            -- option_order INTEGER,
            NULL,
            -- option_values entire_option_value[],
            ARRAY[ROW(
                -- id INTEGER,
                NULL,
                -- system_option_id INTEGER,
                NULL,
                -- name TEXT,
                'Test Option Value #1',
                -- value FLOAT,
                NULL,
                -- value_order INTEGER,
                1,
                -- mirror_from_option_value_id INTEGER
                NULL
            )::entire_option_value],
            -- option_value_ids_to_delete INTEGER[],
            NULL,
            -- configuration_type_ids INTEGER[],
            NULL,
            -- configuration_type_ids_to_delete INTEGER[]
            NULL
        )::entire_system_option],
        -- system_option_ids_to_delete INTEGER[]
        NULL
    )::entire_system
);


-- tables
-- Automatically generated in /dev-utils/compile-database-seed.js 

elevation.sql,
-- ELEVATIONS

DROP TABLE IF EXISTS detail_option_values;
DROP TABLE IF EXISTS container_details;
DROP TABLE IF EXISTS elevation_containers;
DROP TABLE IF EXISTS elevations;

CREATE TABLE
elevations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects,
    system_set_id INTEGER REFERENCES system_sets,
    name VARCHAR(50),
    rough_opening COORDINATE,
    finished_floor_height FLOAT
);

CREATE TABLE
elevation_containers (
    id SERIAL PRIMARY KEY,
    elevation_id INTEGER REFERENCES elevations,
    original BOOLEAN DEFAULT FALSE,
    contents VARCHAR(50),
    daylight_opening COORDINATE,
    custom_rough_opening BOOLEAN DEFAULT FALSE
);

CREATE TABLE
container_details (
    id SERIAL PRIMARY KEY,
    elevation_id INTEGER REFERENCES elevations,
    first_container_id INTEGER REFERENCES elevation_containers,
    second_container_id INTEGER REFERENCES elevation_containers,
    vertical BOOLEAN,
    UNIQUE (first_container_id, second_container_id, vertical)
);

CREATE TABLE
detail_option_values (
    id SERIAL PRIMARY KEY,
    container_detail_id INTEGER REFERENCES container_details,
    option_value_id INTEGER REFERENCES option_values
);


-- project.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS system_sets CASCADE;
DROP TABLE IF EXISTS system_set_option_values CASCADE;
DROP TABLE IF EXISTS system_set_detail_type_configuration_types CASCADE;

CREATE TABLE
projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE
system_sets (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects,
    system_id INTEGER,
    system_type_id INTEGER,
    FOREIGN KEY (
        system_id,
        system_type_id
    )
    REFERENCES systems (
        id,
        system_type_id
    ),
    UNIQUE (id, system_id, system_type_id)
);

CREATE TABLE
system_set_option_values (
    system_set_id INTEGER,
    system_id INTEGER,
    system_type_id INTEGER,
    system_option_id INTEGER,
    option_value_id INTEGER REFERENCES option_values,
    PRIMARY KEY (system_id, system_option_id),
    FOREIGN KEY (
        system_set_id,
        system_id,
        system_type_id
    )
    REFERENCES system_sets (
        id,
        system_id,
        system_type_id
    ),
    FOREIGN KEY (
        system_id,
        system_option_id
    )
    REFERENCES system_options (
        system_id,
        id
    ),
    FOREIGN KEY (
        system_option_id,
        option_value_id
    )
    REFERENCES option_values (
        system_option_id,
        id
    )
);

CREATE TABLE
system_set_detail_type_configuration_types (
    system_set_id INTEGER,
    system_id INTEGER,
    system_type_id INTEGER,
    detail_type_id INTEGER,
    configuration_type_id INTEGER,
    FOREIGN KEY (
        system_set_id,
        system_id,
        system_type_id
    )
    REFERENCES system_sets (
        id,
        system_id,
        system_type_id
    ),
)


-- tables.sql
-- Automatically generated in /dev-utils/compile-database-seed.js 

DROP TABLE IF EXISTS manufacturers CASCADE;
DROP TABLE IF EXISTS system_tags CASCADE;
DROP TABLE IF EXISTS system_types CASCADE;
DROP TABLE IF EXISTS infill_sizes CASCADE;
DROP TABLE IF EXISTS systems CASCADE;
DROP TABLE IF EXISTS system_infill_sizes CASCADE;
DROP TABLE IF EXISTS system_system_tags CASCADE;
DROP TABLE IF EXISTS system_options CASCADE;
DROP TABLE IF EXISTS option_values CASCADE;
DROP TABLE IF EXISTS option_combinations CASCADE;
DROP TABLE IF EXISTS detail_types CASCADE;
DROP TABLE IF EXISTS configuration_types CASCADE;
DROP TABLE IF EXISTS line_weights CASCADE;
DROP TABLE IF EXISTS linetypes CASCADE;
DROP TABLE IF EXISTS orientations CASCADE;
DROP TABLE IF EXISTS part_types CASCADE;
DROP TABLE IF EXISTS part_tags CASCADE;
DROP TABLE IF EXISTS infill_pocket_types CASCADE;
DROP TABLE IF EXISTS infill_pocket_sizes CASCADE;
DROP TABLE IF EXISTS fastener_types CASCADE;
DROP TABLE IF EXISTS fastener_head_types CASCADE;
DROP TABLE IF EXISTS thread_representations CASCADE;
DROP TABLE IF EXISTS parts CASCADE;
DROP TABLE IF EXISTS part_orientations CASCADE;
DROP TABLE IF EXISTS thermal_pocket_types CASCADE;
DROP TABLE IF EXISTS thermal_pockets CASCADE;
DROP TABLE IF EXISTS brake_metal_pockets CASCADE;
DROP TABLE IF EXISTS fastener_locations CASCADE;
DROP TABLE IF EXISTS infill_pocket_locations CASCADE;
DROP TABLE IF EXISTS part_part_types CASCADE;
DROP TABLE IF EXISTS part_part_tags CASCADE;
DROP TABLE IF EXISTS configuration_type_part_types CASCADE;
DROP TABLE IF EXISTS configurations CASCADE;
DROP TABLE IF EXISTS configuration_transformations CASCADE;
DROP TABLE IF EXISTS configuration_parts CASCADE;
DROP TABLE IF EXISTS option_combination_option_values CASCADE;
DROP TABLE IF EXISTS option_combination_configuration_types CASCADE;
DROP TABLE IF EXISTS system_option_configuration_types CASCADE;
DROP TABLE IF EXISTS configuration_option_values CASCADE;
DROP TABLE IF EXISTS configuration_name_override CASCADE;
DROP TABLE IF EXISTS system_infill_pocket_types CASCADE;
DROP TABLE IF EXISTS system_infill_pocket_sizes CASCADE;
DROP TABLE IF EXISTS invalid_system_configuration_types CASCADE;
DROP TABLE IF EXISTS system_type_detail_type_configuration_types CASCADE;
DROP TABLE IF EXISTS system_configuration_overrides CASCADE;


CREATE TABLE
manufacturers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE
system_tags (
    id SERIAL PRIMARY KEY,
    tag VARCHAR(50)
);

CREATE TABLE
system_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
infill_sizes (
    size FLOAT PRIMARY KEY
);

CREATE TABLE
systems (
    id SERIAL PRIMARY KEY,
    manufacturer_id INTEGER REFERENCES manufacturers,
    system_type_id INTEGER REFERENCES system_types,
    name VARCHAR(50),
    depth FLOAT,
    default_glass_size FLOAT,
    default_glass_bite FLOAT,
    default_sightline FLOAT,
    top_gap FLOAT,
    bottom_gap FLOAT,
    side_gap FLOAT,
    meeting_stile_gap FLOAT,
    inset FLOAT,
    glass_gap FLOAT,
    shim_size FLOAT,
    front_inset BOOLEAN,
    UNIQUE (
        id,
        system_type_id
    )
);



CREATE TABLE
system_infill_sizes (
    system_id INTEGER REFERENCES systems,
    infill_size FLOAT REFERENCES infill_sizes,
    PRIMARY KEY (system_id, infill_size)
);

CREATE TABLE
system_system_tags (
    system_id INTEGER REFERENCES systems,
    system_tag_id INTEGER REFERENCES system_tags,
    PRIMARY KEY (system_id, system_tag_id)
);



CREATE TABLE
system_options (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems,
    name VARCHAR(50),
    presentation_level PRESENTATION_LEVEL,
    override_level PRESENTATION_LEVEL,
    option_order INTEGER,
    UNIQUE (id, system_id)
);

CREATE TABLE
option_values (
    id SERIAL PRIMARY KEY,
    system_option_id INTEGER REFERENCES system_options,
    name VARCHAR(50),
    value FLOAT,
    value_order INTEGER,
    UNIQUE (id, system_option_id)
);

ALTER TABLE
option_values
ADD COLUMN
mirror_from_option_value_id INTEGER REFERENCES option_values;

CREATE TABLE
option_combinations (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems,
    invalid BOOLEAN,
    depth_override FLOAT,
    glass_size_override FLOAT,
    glass_bite_override FLOAT,
    sightline_override FLOAT,
    top_gap_override FLOAT,
    bottom_gap_override FLOAT,
    side_gap_override FLOAT,
    meeting_stile_gap_override FLOAT,
    glass_gap_override FLOAT,
    shim_size_override FLOAT,
    inset_override FLOAT,
    front_inset_override BOOLEAN
);



CREATE TABLE
detail_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    entrance BOOLEAN,
    vertical BOOLEAN
);

CREATE TABLE
configuration_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    door BOOLEAN
);



CREATE TABLE
line_weights (
    name VARCHAR(50),
    weight FLOAT PRIMARY KEY
);

CREATE TABLE
linetypes (
    id SERIAL PRIMARY KEY,
    line_weight INTEGER REFERENCES line_weights,
    name VARCHAR(50),
    pattern VARCHAR(50)
);



CREATE TABLE
orientations (
    id SERIAL PRIMARY KEY,
    orientation VARCHAR(50)
);

CREATE TABLE
part_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
part_tags (
    id SERIAL PRIMARY KEY,
    tag VARCHAR(50)
);

CREATE TABLE
infill_pocket_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    description VARCHAR(5000),
    captured BOOLEAN
);

CREATE TABLE
infill_pocket_sizes (
    size FLOAT PRIMARY KEY
);

CREATE TABLE
fastener_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
fastener_head_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
thread_representations (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);



CREATE TABLE
parts (
    id SERIAL PRIMARY KEY,
    manufacturer_id INTEGER REFERENCES manufacturers,
    system_id INTEGER REFERENCES systems,
    fastener_type_id INTEGER REFERENCES fastener_types,
    fastener_head_type_id INTEGER REFERENCES fastener_head_types,
    thread_representation_id INTEGER REFERENCES thread_representations,
    name VARCHAR(50),
    part_number VARCHAR(50),
    system_agnostic BOOLEAN,
    pocket_count INTEGER,
    door BOOLEAN,
    diameter FLOAT,
    length FLOAT
);

CREATE TABLE
part_orientations (
    id SERIAL PRIMARY KEY,
    part_id INTEGER REFERENCES parts,
    orientation_id INTEGER REFERENCES orientations,
    path VARCHAR(25000),
    UNIQUE(part_id, orientation_id)
);

CREATE TABLE
thermal_pocket_types (
    id SERIAL PRIMARY KEY,
    path VARCHAR(10000)
);

CREATE TABLE
thermal_pockets (
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    thermal_pocket_type_id INTEGER REFERENCES thermal_pocket_types,
    transform FLOAT[3][3]
);

CREATE TABLE
brake_metal_pockets (
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    angle FLOAT,
    back FLOAT,
    inside FLOAT,
    outside FLOAT
);



CREATE TABLE
fastener_locations (
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    orientation_id INTEGER REFERENCES orientations,
    transform fLOAT[3][3]
);

CREATE TABLE
infill_pocket_locations (
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    transform FLOAT[3][3]
);

CREATE TABLE
part_part_types (
    part_id INTEGER REFERENCES parts,
    part_type_id INTEGER REFERENCES part_types,
    PRIMARY KEY (part_id, part_type_id)
);

CREATE TABLE
part_part_tags (
    part_id INTEGER REFERENCES parts,
    part_tag_id INTEGER REFERENCES part_tags,
    PRIMARY KEY (part_id, part_tag_id)
);



CREATE TABLE
configuration_type_part_types (
    configuration_type_id INTEGER REFERENCES configuration_types,
    part_type_id INTEGER REFERENCES part_types,
    PRIMARY KEY (configuration_type_id, part_type_id)
);

CREATE TABLE
configurations (
    id SERIAL PRIMARY KEY,
    configuration_type_id INTEGER REFERENCES configuration_types,
    infill_pocket_type_id INTEGER REFERENCES infill_pocket_types,
    infill_size INTEGER REFERENCES infill_sizes,
    brake_metal BOOLEAN,
    sightline FLOAT,
    complete BOOLEAN,
    completed_at TIMESTAMP
);

CREATE TABLE
configuration_transformations (
    id SERIAL PRIMARY KEY,
    detail_type_id INTEGER REFERENCES detail_types,
    configuration_id INTEGER REFERENCES configurations,
    configuration_transform FLOAT[3][3],
    detail_transform FLOAT[3][3],
    center_point FLOAT[2],
    direction FLOAT,
    range NUMRANGE
);

CREATE TABLE
configuration_parts (
    id SERIAL PRIMARY KEY,
    configuration_id INTEGER REFERENCES configurations,
    linetype_id INTEGER REFERENCES linetypes,
    part_orientation_id INTEGER REFERENCES part_orientations,
    transform FLOAT[3][3]
);




CREATE TABLE
option_combination_option_values (
    option_combination_id INTEGER REFERENCES option_combinations,
    option_value_id INTEGER REFERENCES option_values,
    PRIMARY KEY (option_combination_id, option_value_id)
);

CREATE TABLE
option_combination_configuration_types (
    option_combination_id INTEGER REFERENCES option_combinations,
    configuration_type_id INTEGER REFERENCES configuration_types,
    PRIMARY KEY (option_combination_id, configuration_type_id)
);

CREATE TABLE
system_option_configuration_types (
    system_option_id INTEGER REFERENCES system_options,
    configuration_type_id INTEGER REFERENCES configuration_types,
    PRIMARY KEY (system_option_id, configuration_type_id)
);

CREATE TABLE
configuration_option_values (
    configuration_id INTEGER REFERENCES configurations,
    option_value_id INTEGER REFERENCES option_values,
    PRIMARY KEY (configuration_id, option_value_id)
);



CREATE TABLE
configuration_name_override (
    manufacturer_id INTEGER REFERENCES manufacturers,
    configuration_type_id INTEGER REFERENCES configuration_types,
    name_override VARCHAR(50),
    PRIMARY KEY (manufacturer_id, configuration_type_id)
);

CREATE TABLE
system_infill_pocket_types (
    system_id INTEGER REFERENCES systems,
    infill_pocket_type_id INTEGER REFERENCES infill_pocket_types,
    PRIMARY KEY (system_id, infill_pocket_type_id)
);

CREATE TABLE
system_infill_pocket_sizes (
    system_id INTEGER REFERENCES systems,
    infill_pocket_size FLOAT REFERENCES infill_pocket_sizes,
    PRIMARY KEY (system_id, infill_pocket_size)
);

CREATE TABLE
invalid_system_configuration_types (
    system_id INTEGER REFERENCES systems,
    invalid_configuration_type_id INTEGER REFERENCES configuration_types,
    PRIMARY KEY (system_id, invalid_configuration_type_id)
);

CREATE TABLE
system_type_detail_type_configuration_types (
    id SERIAL PRIMARY KEY,
    system_type_id INTEGER REFERENCES system_types,
    detail_type_id INTEGER REFERENCES detail_types,
    configuration_type_id INTEGER REFERENCES configuration_types,
    required BOOLEAN,
    mirrorable BOOLEAN,
    presentation_level PRESENTATION_LEVEL,
    override_level PRESENTATION_LEVEL,
    UNIQUE (system_type_id, detail_type_id, configuration_type_id)
);

CREATE TABLE
system_configuration_overrides (
    system_id INTEGER REFERENCES systems,
    system_type_id INTEGER,
    detail_type_id INTEGER,
    configuration_type_id INTEGER,
    required_override BOOLEAN,
    mirrorable_override BOOLEAN,
    presentation_level_override INTEGER,
    override_level_override INTEGER,
    PRIMARY KEY (system_id, detail_type_id, configuration_type_id),
    FOREIGN KEY (
        system_type_id, 
        detail_type_id, 
        configuration_type_id
    )
    REFERENCES system_type_detail_type_configuration_types (
        system_type_id,
        detail_type_id,
        configuration_type_id
    )
);


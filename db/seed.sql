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
DROP TABLE IF EXISTS elevations CASCADE;
DROP TABLE IF EXISTS frames CASCADE;
DROP TABLE IF EXISTS containers CASCADE;
elevation_containers


CREATE TABLE
manufacturers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE
system_tags(
    id SERIAL PRIMARY KEY,
    tag VARCHAR(50)
);

CREATE TABLE
system_types(
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
infill_sizes(
    size FLOAT PRIMARY KEY
);

CREATE TABLE
systems(
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
    front_inset BOOLEAN
);



CREATE TABLE
system_infill_sizes(
    system_id INTEGER REFERENCES systems,
    infill_size FLOAT REFERENCES infill_sizes,
    PRIMARY KEY (system_id, infill_size)
);

CREATE TABLE
system_system_tags(
    system_id INTEGER REFERENCES systems,
    system_tag_id INTEGER REFERENCES system_tags,
    PRIMARY KEY (system_id, system_tag_id)
);



CREATE TABLE
system_options(
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems,
    name VARCHAR(50),
    presentation_level INTEGER,
    override_level INTEGER,
    option_order INTEGER
);

CREATE TABLE
option_values(
    id SERIAL PRIMARY KEY,
    system_option_id INTEGER REFERENCES system_options,
    name VARCHAR(50),
    value FLOAT,
    value_order INTEGER
);

ALTER TABLE
option_values
ADD COLUMN
mirror_from_option_value_id INTEGER REFERENCES option_values;

CREATE TABLE
option_combinations(
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
detail_types(
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    entrance BOOLEAN,
    vertical BOOLEAN
);

CREATE TABLE
configuration_types(
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    door BOOLEAN
);



CREATE TABLE
line_weights(
    name VARCHAR(50),
    weight FLOAT PRIMARY KEY
);

CREATE TABLE
linetypes(
    id SERIAL PRIMARY KEY,
    line_weight INTEGER REFERENCES line_weights,
    name VARCHAR(50),
    pattern VARCHAR(50)
);



CREATE TABLE
orientations(
    id SERIAL PRIMARY KEY,
    orientation VARCHAR(50)
);

CREATE TABLE
part_types(
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
part_tags(
    id SERIAL PRIMARY KEY,
    tag VARCHAR(50)
);

CREATE TABLE
infill_pocket_types(
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    description VARCHAR(5000),
    captured BOOLEAN
);

CREATE TABLE
infill_pocket_sizes(
    size FLOAT PRIMARY KEY
);

CREATE TABLE
fastener_types(
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
fastener_head_types(
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);

CREATE TABLE
thread_representations(
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);



CREATE TABLE
parts(
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
part_orientations(
    id SERIAL PRIMARY KEY,
    part_id INTEGER REFERENCES parts,
    orientation_id INTEGER REFERENCES orientations,
    path VARCHAR(25000),
    UNIQUE(part_id, orientation_id)
);

CREATE TABLE
thermal_pocket_types(
    id SERIAL PRIMARY KEY,
    path VARCHAR(10000)
);

CREATE TABLE
thermal_pockets(
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    thermal_pocket_type_id INTEGER REFERENCES thermal_pocket_types,
    transform FLOAT[3][3]
);

CREATE TABLE
brake_metal_pockets(
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    angle FLOAT,
    back FLOAT,
    inside FLOAT,
    outside FLOAT
);



CREATE TABLE
fastener_locations(
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    orientation_id INTEGER REFERENCES orientations,
    transform fLOAT[3][3]
);

CREATE TABLE
infill_pocket_locations(
    id SERIAL PRIMARY KEY,
    part_orientation_id INTEGER REFERENCES part_orientations,
    transform FLOAT[3][3]
);

CREATE TABLE
part_part_types(
    part_id INTEGER REFERENCES parts,
    part_type_id INTEGER REFERENCES part_types,
    PRIMARY KEY (part_id, part_type_id)
);

CREATE TABLE
part_part_tags(
    part_id INTEGER REFERENCES parts,
    part_tag_id INTEGER REFERENCES part_tags,
    PRIMARY KEY (part_id, part_tag_id)
);



CREATE TABLE
configuration_type_part_types(
    configuration_type_id INTEGER REFERENCES configuration_types,
    part_type_id INTEGER REFERENCES part_types,
    PRIMARY KEY (configuration_type_id, part_type_id)
);

CREATE TABLE
configurations(
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
configuration_transformations(
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
configuration_parts(
    id SERIAL PRIMARY KEY,
    configuration_id INTEGER REFERENCES configurations,
    linetype_id INTEGER REFERENCES linetypes,
    part_orientation_id INTEGER REFERENCES part_orientations,
    transform FLOAT[3][3]
);




CREATE TABLE
option_combination_option_values(
    option_combination_id INTEGER REFERENCES option_combinations,
    option_value_id INTEGER REFERENCES option_values,
    PRIMARY KEY (option_combination_id, option_value_id)
);

CREATE TABLE
option_combination_configuration_types(
    option_combination_id INTEGER REFERENCES option_combinations,
    configuration_type_id INTEGER REFERENCES configuration_types,
    PRIMARY KEY (option_combination_id, configuration_type_id)
);

CREATE TABLE
system_option_configuration_types(
    system_option_id INTEGER REFERENCES system_options,
    configuration_type_id INTEGER REFERENCES configuration_types,
    PRIMARY KEY (system_option_id, configuration_type_id)
);

CREATE TABLE
configuration_option_values(
    configuration_id INTEGER REFERENCES configurations,
    option_value_id INTEGER REFERENCES option_values,
    PRIMARY KEY (configuration_id, option_value_id)
);



CREATE TABLE
configuration_name_override(
    manufacturer_id INTEGER REFERENCES manufacturers,
    configuration_type_id INTEGER REFERENCES configuration_types,
    name_override VARCHAR(50),
    PRIMARY KEY (manufacturer_id, configuration_type_id)
);

CREATE TABLE
system_infill_pocket_types(
    system_id INTEGER REFERENCES systems,
    infill_pocket_type_id INTEGER REFERENCES infill_pocket_types,
    PRIMARY KEY (system_id, infill_pocket_type_id)
);

CREATE TABLE
system_infill_pocket_sizes(
    system_id INTEGER REFERENCES systems,
    infill_pocket_size FLOAT REFERENCES infill_pocket_sizes,
    PRIMARY KEY (system_id, infill_pocket_size)
);

CREATE TABLE
invalid_system_configuration_types(
    system_id INTEGER REFERENCES systems,
    invalid_configuration_type_id INTEGER REFERENCES configuration_types,
    PRIMARY KEY (system_id, invalid_configuration_type_id)
);

CREATE TABLE
system_type_detail_type_configuration_types(
    id SERIAL PRIMARY KEY,
    system_type_id INTEGER REFERENCES system_types,
    detail_type_id INTEGER REFERENCES detail_types,
    configuration_type_id INTEGER REFERENCES configuration_types,
    required BOOLEAN,
    mirrorable BOOLEAN,
    presentation_level INTEGER,
    override_level INTEGER,
    UNIQUE (system_type_id, detail_type_id, configuration_type_id)
);

CREATE TABLE
system_configuration_overrides(
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


-- ELEVATIONS

CREATE TABLE
elevations(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    horizontal_rough_opening FLOAT,
    vertical_rough_opening FLOAT,
    finished_floor_offset FLOAT
);

CREATE TABLE
frames(
    id SERIAL PRIMARY KEY
);

CREATE TABLE
containers(
    id SERIAL PRIMARY KEY,
    horizontal BOOLEAN,
    size FLOAT,
    infill VARCHAR(50),
    left_frame_id INTEGER REFERENCES frames,
    right_frame_id INTEGER REFERENCES frames,
    top_frame_id INTEGER REFERENCES frames,
    bottom_frame_id INTEGER REFERENCES frames,
    UNIQUE (horizontal, id)
);

ALTER TABLE
containers
ADD COLUMN parent_container_id INTEGER REFERENCES containers;

CREATE TABLE
elevation_containers(
    elevation_id INTEGER REFERENCES elevations,
    container_id INTEGER,
    horizontal BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (elevation_id, container_id),
    FOREIGN KEY (horizontal, container_id) REFERENCES containers (horizontal, id),
    CHECK (horizontal = FALSE) -- can only add vertical containers as root level containers
);

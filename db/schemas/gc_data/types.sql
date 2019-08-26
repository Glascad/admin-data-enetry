
CREATE TYPE
gc_data.entire_configuration_option_value AS (
    id INTEGER,
    fake_id INTEGER,
    name OPTION_VALUE_NAME
);

CREATE TYPE
gc_data.entire_configuration_option AS (
    id INTEGER,
    fake_id INTEGER,
    name OPTION_NAME,
    system_configuration_type_id INTEGER,
    system_configuration_type_fake_id INTEGER,
    parent_configuration_option_value_id INTEGER,
    parent_configuration_option_value_fake_id INTEGER,
    values ENTIRE_CONFIGURATION_OPTION_VALUE[]
);

CREATE TYPE
gc_data.entire_system_configuration_type AS (
    id INTEGER,
    fake_id INTEGER,
    configuration_type CONFIGURATION_TYPE,
    optional BOOLEAN
);

CREATE TYPE
gc_data.entire_detail_option_value AS (
    id INTEGER,
    fake_id INTEGER,
    name OPTION_VALUE_NAME,
    configuration_types ENTIRE_SYSTEM_CONFIGURATION_TYPE[]
);

CREATE TYPE
gc_data.entire_detail_option AS (
    id INTEGER,
    fake_id INTEGER,
    name OPTION_NAME,
    system_detail_type_id INTEGER,
    system_detail_type_fake_id INTEGER,
    parent_detail_option_value_id INTEGER,
    parent_detail_option_value_fake_id INTEGER,
    values ENTIRE_DETAIL_OPTION_VALUE[]
);

CREATE TYPE
gc_data.entire_system_detail_type AS (
    id INTEGER,
    fake_id INTEGER,
    detail_type DETAIL_TYPE
);

CREATE TYPE
gc_data.entire_system_option_value AS (
    id INTEGER,
    fake_id INTEGER,
    name OPTION_VALUE_NAME,
    raised_option_names OPTION_NAME[],
    raised_configuration_types CONFIGURATION_TYPE[],
    detail_types ENTIRE_SYSTEM_DETAIL_TYPE[]
);

CREATE TYPE
gc_data.entire_system_option AS (
    id INTEGER,
    fake_id INTEGER,
    name OPTION_NAME,
    parent_system_option_value_id INTEGER,
    parent_system_option_value_fake_id INTEGER,
    values ENTIRE_SYSTEM_OPTION_VALUE[]
);

-- CREATE TYPE

CREATE TYPE
gc_data.entire_system AS (
    id INTEGER,
    fake_id INTEGER,
    name TEXT,
    manufacturer_id INTEGER,
    system_type SYSTEM_TYPE,
    system_options ENTIRE_SYSTEM_OPTION[],
    detail_options ENTIRE_DETAIL_OPTION[],
    configuration_options ENTIRE_CONFIGURATION_OPTION[],
    system_option_ids_to_delete INTEGER[],
    detail_option_ids_to_delete INTEGER[],
    configuration_option_ids_to_delete INTEGER[],
    system_option_value_ids_to_delete INTEGER[],
    detail_option_value_ids_to_delete INTEGER[],
    configuration_option_value_ids_to_delete INTEGER[],
    system_detail_type_ids_to_delete INTEGER[],
    system_configuration_type_ids_to_delete INTEGER[]
);

CREATE TYPE
gc_data.entire_system_id_map AS (
    system_option_id_pairs ID_PAIR[],
    system_option_value_id_pairs ID_PAIR[],
    detail_option_id_pairs ID_PAIR[],
    detail_option_value_id_pairs ID_PAIR[],
    system_detail_type_id_pairs ID_PAIR[],
    configuration_option_id_pairs ID_PAIR[],
    configuration_option_value_id_pairs ID_PAIR[],
    system_configuration_type_id_pairs ID_PAIR[]
);

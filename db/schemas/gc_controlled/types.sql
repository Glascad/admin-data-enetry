
CREATE TYPE
gc_controlled.gc_role AS ENUM (
    'gc_admin',
    'gc_data_entry',
    'gc_client'
);

CREATE TYPE
gc_controlled.system_type AS ENUM (
    'storefront'
);

CREATE TYPE
gc_controlled.detail_type AS ENUM (
    'Head',
    'Jamb',
    'Sill',
    'Horizontal',
    'Mullion'
    -- 'Post',
    -- 'Transom Bar',
    -- 'Door Header',
    -- 'Transom Head',
    -- 'Door Jamb',
    -- 'Corner'
);

CREATE TYPE
gc_controlled.configuration_type AS ENUM (
    'Head',
    'Jamb',
    'Sill',
    'Horizontal',
    'Mullion',
    'Compensating Receptor',
    'Shim Support',
    'Stool Trim',
    'Sill Flashing'
    -- 'Corner',
    -- 'Post',
    -- 'Door Jamb',
    -- 'Door Stop',
    -- 'Shear Block Package',
    -- 'T-Bar/Header',
    -- 'Pocket Insert',
    -- 'Steel Reinforcing'
);

CREATE TYPE
gc_controlled.system_option_name AS ENUM (
    'glazing',
    'stops',
    'joinery'
);

CREATE TYPE
gc_controlled.option_value_name AS ENUM (
    'inside',
    'outside',
    'up',
    'down',
    'screw-spline',
    'shear-block',
    'stick'
);

CREATE TYPE
gc_controlled.presentation_level AS ENUM (
    'system',
    'elevation',
    'lite',
    'frame',
    'detail'
);

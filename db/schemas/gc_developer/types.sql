
CREATE TYPE
gc_developer.system_type AS ENUM (
    'storefront'
);

CREATE TYPE
gc_developer.detail_type AS ENUM (
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
gc_developer.configuration_type AS ENUM (
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
gc_developer.system_option_name AS ENUM (
    'glazing',
    'stops'
);

CREATE TYPE
gc_developer.option_value_name AS ENUM (
    'inside',
    'outside',
    'up',
    'down'
);

CREATE TYPE
gc_developer.presentation_level AS ENUM (
    'system',
    'elevation',
    'lite',
    'frame',
    'detail'
);

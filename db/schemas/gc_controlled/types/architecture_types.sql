
CREATE TYPE
gc_controlled.system_type AS ENUM (
    'STOREFRONT',
    'ALL_GLASS',
    'CURTAINWALL'
);

COMMENT ON TYPE gc_controlled.system_type IS '@name _systemType';

CREATE TYPE
gc_controlled.elevation_contents AS ENUM (
    'GLASS',
    'VOID_STEPPED_HEAD',
    'VOID_RAISED_CURB',
    'VOID_LEFT_NOTCH',
    'VOID_RIGHT_NOTCH',
    'VOID_INTERNAL'
);

CREATE TYPE
gc_controlled.detail_type AS ENUM (
    'HEAD',
    'JAMB',
    'SILL',
    'HORIZONTAL',
    'MULLION'
    -- 'Post',
    -- 'Transom Bar',
    -- 'Door Header',
    -- 'Transom Head',
    -- 'Door Jamb',
    -- 'Corner'
);

COMMENT ON TYPE gc_controlled.detail_type IS '@name _detailType';

CREATE TYPE
gc_controlled.configuration_type AS ENUM (
    'HEAD',
    'JAMB',
    'SILL',
    'HORIZONTAL',
    'MULLION',
    'COMPENSATING_RECEPTOR',
    'SHIM_SUPPORT',
    'STOOL_TRIM',
    'SILL_FLASHING'
    -- 'Corner',
    -- 'Post',
    -- 'Door Jamb',
    -- 'Door Stop',
    -- 'Shear Block Package',
    -- 'T-Bar/Header',
    -- 'Pocket Insert',
    -- 'Steel Reinforcing'
);

COMMENT ON TYPE gc_controlled.configuration_type IS '@name _configurationType';

CREATE TYPE
gc_controlled.option_name AS ENUM (
    'SET',
    'JOINERY',
    'STOPS',
    'GLAZING',
    'DURABILITY'
);

CREATE TYPE
gc_controlled.option_value_name AS ENUM (
    'FRONT',
    'CENTER',
    'BACK',
    'MULTI_PLANE',
    'SCREW_SPLINE',
    'SHEAR_BLOCK',
    'STICK',
    'UP',
    'DOWN',
    'INSIDE',
    'OUTSIDE',
    'STANDARD_DUTY',
    'HIGH_PERFORMANCE'
);

-- CREATE TYPE
-- gc_controlled.presentation_level AS ENUM (
--     'SYSTEM',
--     'ELEVATION',
--     'LITE',
--     'FRAME',
--     'DETAIL'
-- );

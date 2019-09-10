
INSERT INTO system_types
(type)
SELECT UNNEST(ENUM_RANGE(NULL::SYSTEM_TYPE));

INSERT INTO detail_types
(type)
SELECT UNNEST(ENUM_RANGE(NULL::DETAIL_TYPE));

INSERT INTO configuration_types
(type)
SELECT UNNEST(ENUM_RANGE(NULL::CONFIGURATION_TYPE));

INSERT INTO valid_options
(name)
SELECT UNNEST(ENUM_RANGE(NULL::OPTION_NAME));

INSERT INTO system_type_detail_types
(system_type, detail_type)
VALUES
('STOREFRONT', 'HEAD'),
('STOREFRONT', 'JAMB'),
('STOREFRONT', 'SILL'),
('STOREFRONT', 'HORIZONTAL'),
('STOREFRONT', 'MULLION');

INSERT INTO system_type_detail_type_configuration_types
(system_type, detail_type, configuration_type, required)
VALUES
('STOREFRONT', 'HEAD', 'HEAD', true),
('STOREFRONT', 'HEAD', 'COMPENSATING_RECEPTOR', false),
('STOREFRONT', 'JAMB', 'JAMB', true),
('STOREFRONT', 'JAMB', 'COMPENSATING_RECEPTOR', false),
('STOREFRONT', 'SILL', 'SILL', true),
('STOREFRONT', 'SILL', 'SILL_FLASHING', false),
('STOREFRONT', 'HORIZONTAL', 'HORIZONTAL', true),
('STOREFRONT', 'MULLION', 'MULLION', false);

INSERT INTO valid_option_values
(option_name, name)
VALUES
('GLAZING', 'INSIDE'),
('GLAZING', 'OUTSIDE'),
('STOPS', 'UP'),
('STOPS', 'DOWN'),
('JOINERY', 'SCREW_SPLINE'),
('JOINERY', 'SHEAR_BLOCK'),
('JOINERY', 'STICK'),
('SET', 'FRONT'),
('SET', 'BACK'),
('SET', 'CENTER'),
('SET', 'MULTI-PLANE'),
('DURABILITY', 'STANDARD_DUTY'),
('DURABILITY', 'HIGH-PERFORMANCE');

-- INSERT INTO ordered_presentation_levels
-- (value, level)
-- VALUES
-- (5, 'SYSTEM'),
-- (4, 'ELEVATION'),
-- (3, 'LITE'),
-- (2, 'FRAME'),
-- (1, 'DETAIL');

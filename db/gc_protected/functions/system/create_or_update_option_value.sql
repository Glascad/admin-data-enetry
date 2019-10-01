

<<LOOP TYPE (system, detail, configuration)>>

DROP FUNCTION IF EXISTS create_or_update_<<TYPE>>_option_value;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_<<TYPE>>_option_value(
    <<TYPE>>_option_value ENTIRE_<<TYPE>>_OPTION_VALUE,
    system SYSTEMS
) RETURNS <<TYPE>>OPTION_VALUES AS $$
DECLARE
    cov ALIAS FOR <<TYPE>>_option_value;
    s ALIAS FOR system;
    ucov <<TYPE>>_option_values%ROWTYPE;
    real_id INTEGER;
    co_id_pairs ID_PAIR[];
    -- fake <<TYPE>> option id
    fake_coid INTEGER;
    -- <<TYPE>> option id
    coid INTEGER;
    -- <<TYPE>> option name
    con OPTION_NAME;
BEGIN

    -- get real parent <<TYPE>> option id

    coid := COALESCE(
        cov.parent_<<TYPE>>_option_id,
        get_real_id(
            co_id_pairs,
            cov.parent_<<TYPE>>_option_fake_id
        )
    );

    SELECT name FROM <<TYPE>>_options INTO con WHERE id = coid;

    IF cov.id IS NOT NULL THEN
        -- update
        UPDATE <<TYPE>>_option_values SET
            name = CASE WHEN cov.name IS NOT NULL
                THEN cov.name
                ELSE <<TYPE>>_option_values.name END,
            parent_<<TYPE>>_option_id = CASE WHEN coid IS NOT NULL
                THEN coid
                ELSE <<TYPE>>_option_values.parent_<<TYPE>>_option_id END
        WHERE id = cov.id
        AND system_id = s.id;
    ELSIF cov.fake_id IS NOT NULL THEN
        -- insert and update id map
        INSERT INTO <<TYPE>>_option_values (
            system_id,
            name,
            parent_<<TYPE>>_option_id,
            option_name
        ) VALUES (
            s.id,
            cov.name,
            coid,
            con
        )
        RETURNING * INTO ucov;

        -- add option value id to updated id map
            -- link fake id to real id
            ucov.id,
            cov.fake_id
        )::ID_PAIR;
    ELSE
        RAISE EXCEPTION 'Must specify <<TYPE>> option value `id` or `fake_id`';
    END IF;


END;
$$ LANGUAGE plpgsql;

<<END LOOP>>

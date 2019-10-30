
<<LOOP
    TYPE (system, detail)
    DELINEATOR ('__DT__', '__CT__')
>>

    CREATE OR REPLACE FUNCTION gc_data.get_<<TYPE>>_option_value_subpath(
        path LTREE
    ) RETURNS LTREE AS $$
    DECLARE
    BEGIN

        RETURN subpath(path, 0, index(path, <<DELINEATOR>>));

    END;
    $$ LANGUAGE plpgsql IMMUTABLE;

<<END LOOP>>

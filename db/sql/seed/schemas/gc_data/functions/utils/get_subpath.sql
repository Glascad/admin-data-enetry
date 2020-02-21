
<<LOOP
    TYPE (system, detail)
    CHILD (detail, configuration)
    DELINEATOR ('__DT__', '__CT__')
>>

    CREATE OR REPLACE FUNCTION gc_data.get_<<TYPE>>_option_value_subpath(path LTREE)
    RETURNS LTREE AS $$
    BEGIN

        RETURN subpath(path, 0, index(path, <<DELINEATOR>>));

    END;
    $$ LANGUAGE plpgsql STRICT IMMUTABLE;

    CREATE OR REPLACE FUNCTION gc_data.get_<<TYPE>>_<<CHILD>>_subpath(path LTREE)
    RETURNS LTREE AS $$
    BEGIN

        RETURN subpath(path, 0, index(path, <<DELINEATOR>>) + 2);

    END;
    $$ LANGUAGE plpgsql STRICT IMMUTABLE;

<<END LOOP>>

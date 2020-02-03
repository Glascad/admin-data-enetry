
<<LOOP
    TYPE (detail, configuration)
    PREFIX ('__DT__', '__CT__')
>>

    DROP FUNCTION IF EXISTS get_<<TYPE>>_type_from_path;
    
    CREATE OR REPLACE FUNCTION gc_data.get_<<TYPE>>_type_from_path(path LTREE)
    RETURNS <<TYPE>>_TYPE AS $$
    DECLARE
    BEGIN

        RETURN subpath(
            path,
            index(path, <<PREFIX>>::LTREE) + 1,
            1
        );

    END;
    $$ LANGUAGE plpgsql STRICT IMMUTABLE;

<<END LOOP>>

PGDMP     %    6                w           df7riinqn4vsh5     10.9 (Ubuntu 10.9-1.pgdg16.04+1)     11.3 (Ubuntu 11.3-1.pgdg19.04+1) 
   �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �           1262    3316604    df7riinqn4vsh5    DATABASE     �   CREATE DATABASE df7riinqn4vsh5 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE df7riinqn4vsh5;
             apcdmrglhzyezl    false                        2615    35145655    practice    SCHEMA        CREATE SCHEMA practice;
    DROP SCHEMA practice;
             apcdmrglhzyezl    false            �           0    0    SCHEMA practice    COMMENT     7   COMMENT ON SCHEMA practice IS 'for postgres practice';
                  apcdmrglhzyezl    false    13                        2615    35190603    users    SCHEMA        CREATE SCHEMA users;
    DROP SCHEMA users;
             apcdmrglhzyezl    false                        3079    35190735    pgcrypto 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
    DROP EXTENSION pgcrypto;
                  false            �           0    0    EXTENSION pgcrypto    COMMENT     <   COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
                       false    2            �           1247    35145740    person    TYPE     s   CREATE TYPE public.person AS (
	id integer,
	first_name character varying(50),
	last_name character varying(50)
);
    DROP TYPE public.person;
       public       apcdmrglhzyezl    false            �           1247    35145743    class    TYPE     �   CREATE TYPE public.class AS (
	id integer,
	subject character varying(50),
	teacher public.person,
	students public.person[]
);
    DROP TYPE public.class;
       public       apcdmrglhzyezl    false    941    941            !           1247    34983726    presentation_level    TYPE     x   CREATE TYPE public.presentation_level AS ENUM (
    'system',
    'elevation',
    'lite',
    'frame',
    'detail'
);
 %   DROP TYPE public.presentation_level;
       public       apcdmrglhzyezl    false            .           1247    35001755    configuration_type_output    TYPE     �   CREATE TYPE public.configuration_type_output AS (
	id integer,
	type text,
	door boolean,
	required boolean,
	mirrorable boolean,
	presentation_level public.presentation_level,
	override_level public.presentation_level
);
 ,   DROP TYPE public.configuration_type_output;
       public       apcdmrglhzyezl    false    801    801            �           1247    32015835 
   coordinate    TYPE     O   CREATE TYPE public.coordinate AS (
	x double precision,
	y double precision
);
    DROP TYPE public.coordinate;
       public       apcdmrglhzyezl    false            7           1247    35001764    detail_type    TYPE     e   CREATE TYPE public.detail_type AS (
	id integer,
	type text,
	entrance boolean,
	vertical boolean
);
    DROP TYPE public.detail_type;
       public       apcdmrglhzyezl    false            �           0    0    TYPE detail_type    COMMENT     ;   COMMENT ON TYPE public.detail_type IS '@name _detailType';
            public       apcdmrglhzyezl    false    823            :           1247    35001767    detail_type_output    TYPE     �   CREATE TYPE public.detail_type_output AS (
	detail_type public.detail_type,
	configuration_types public.configuration_type_output[]
);
 %   DROP TYPE public.detail_type_output;
       public       apcdmrglhzyezl    false    814    823            �           1247    35584741    entire_bug_report    TYPE     �   CREATE TYPE public.entire_bug_report AS (
	id integer,
	username text,
	location text,
	report text,
	state jsonb,
	"timestamp" timestamp without time zone
);
 $   DROP TYPE public.entire_bug_report;
       public       apcdmrglhzyezl    false            �           1247    30714414    entire_container    TYPE     �   CREATE TYPE public.entire_container AS (
	id integer,
	parent_container_id integer,
	size double precision,
	infill character varying(50),
	left_frame_id integer,
	right_frame_id integer,
	top_frame_id integer,
	bottom_frame_id integer
);
 #   DROP TYPE public.entire_container;
       public       apcdmrglhzyezl    false            �           1247    33839722    entire_container_detail    TYPE     �   CREATE TYPE public.entire_container_detail AS (
	id integer,
	vertical boolean,
	first_container_id integer,
	first_container_fake_id integer,
	second_container_id integer,
	second_container_fake_id integer
);
 *   DROP TYPE public.entire_container_detail;
       public       apcdmrglhzyezl    false            �           1247    34612164    entire_elevation_container    TYPE     �   CREATE TYPE public.entire_elevation_container AS (
	id integer,
	fake_id integer,
	original boolean,
	contents text,
	daylight_opening public.coordinate,
	custom_rough_opening boolean
);
 -   DROP TYPE public.entire_elevation_container;
       public       apcdmrglhzyezl    false    903            �           1247    34612169    entire_elevation    TYPE     q  CREATE TYPE public.entire_elevation AS (
	id integer,
	project_id integer,
	name text,
	rough_opening public.coordinate,
	finished_floor_height double precision,
	containers public.entire_elevation_container[],
	container_ids_to_delete integer[],
	details public.entire_container_detail[],
	detail_ids_to_delete integer[],
	sightline double precision,
	preview text
);
 #   DROP TYPE public.entire_elevation;
       public       apcdmrglhzyezl    false    935    903    925            x           1247    26956200    entire_option_value    TYPE     �   CREATE TYPE public.entire_option_value AS (
	id integer,
	system_option_id integer,
	name text,
	value double precision,
	value_order integer,
	mirror_from_option_value_id integer
);
 &   DROP TYPE public.entire_option_value;
       public       apcdmrglhzyezl    false            ~           1247    26956206 $   entire_system_configuration_override    TYPE     K  CREATE TYPE public.entire_system_configuration_override AS (
	system_id integer,
	system_type_id integer,
	detail_type_id integer,
	configuration_type_id integer,
	required_override boolean,
	mirrorable_override boolean,
	presentation_level_override public.presentation_level,
	override_level_override public.presentation_level
);
 7   DROP TYPE public.entire_system_configuration_override;
       public       apcdmrglhzyezl    false    801    801            {           1247    26956203    entire_system_option    TYPE     �  CREATE TYPE public.entire_system_option AS (
	id integer,
	system_id integer,
	name character varying(50),
	presentation_level public.presentation_level,
	override_level public.presentation_level,
	option_order integer,
	option_values public.entire_option_value[],
	option_value_ids_to_delete integer[],
	configuration_type_ids integer[],
	configuration_type_ids_to_delete integer[]
);
 '   DROP TYPE public.entire_system_option;
       public       apcdmrglhzyezl    false    801    801    888            �           1247    26956209    entire_system    TYPE     }  CREATE TYPE public.entire_system AS (
	id integer,
	manufacturer_id integer,
	system_type_id integer,
	name character varying(50),
	depth double precision,
	default_glass_size double precision,
	default_glass_bite double precision,
	default_sightline double precision,
	top_gap double precision,
	bottom_gap double precision,
	side_gap double precision,
	meeting_stile_gap double precision,
	inset double precision,
	glass_gap double precision,
	shim_size double precision,
	front_inset boolean,
	system_tag_ids integer[],
	system_tag_ids_to_delete integer[],
	infill_sizes double precision[],
	infill_sizes_to_delete double precision[],
	infill_pocket_type_ids integer[],
	infill_pocket_type_ids_to_delete integer[],
	infill_pocket_sizes double precision[],
	infill_pocket_sizes_to_delete double precision[],
	invalid_configuration_type_ids integer[],
	invalid_configuration_type_ids_to_delete integer[],
	configuration_overrides public.entire_system_configuration_override[],
	configuration_overrides_to_delete public.entire_system_configuration_override[],
	system_options public.entire_system_option[],
	system_option_ids_to_delete integer[]
);
     DROP TYPE public.entire_system;
       public       apcdmrglhzyezl    false    894    894    891            �           1247    35025712 '   selected_detail_type_configuration_type    TYPE     {   CREATE TYPE public.selected_detail_type_configuration_type AS (
	detail_type_id integer,
	configuration_type_id integer
);
 :   DROP TYPE public.selected_detail_type_configuration_type;
       public       apcdmrglhzyezl    false            �           1247    35025709    selected_option_value    TYPE     e   CREATE TYPE public.selected_option_value AS (
	option_value_id integer,
	system_option_id integer
);
 (   DROP TYPE public.selected_option_value;
       public       apcdmrglhzyezl    false            �           1247    35025715    entire_system_set    TYPE     �  CREATE TYPE public.entire_system_set AS (
	id integer,
	project_id integer,
	system_id integer,
	system_type_id integer,
	infill_size double precision,
	selected_option_values public.selected_option_value[],
	detail_type_configuration_types public.selected_detail_type_configuration_type[],
	detail_type_configuration_types_to_unselect public.selected_detail_type_configuration_type[]
);
 $   DROP TYPE public.entire_system_set;
       public       apcdmrglhzyezl    false    947    950    950            �           1247    33853449    id_pair    TYPE     A   CREATE TYPE public.id_pair AS (
	id integer,
	fake_id integer
);
    DROP TYPE public.id_pair;
       public       apcdmrglhzyezl    false            �           1247    34601066    my_special_enumerable    TYPE     _   CREATE TYPE public.my_special_enumerable AS ENUM (
    'type-1',
    'type-2',
    'type-3'
);
 (   DROP TYPE public.my_special_enumerable;
       public       apcdmrglhzyezl    false            %           1247    35001746    name_output    TYPE     ?   CREATE TYPE public.name_output AS (
	id integer,
	name text
);
    DROP TYPE public.name_output;
       public       apcdmrglhzyezl    false            o           1247    26939199    option_value_input    TYPE     �   CREATE TYPE public.option_value_input AS (
	id integer,
	system_option_id integer,
	name text,
	value double precision,
	value_order integer,
	mirror_from_option_value_id integer
);
 %   DROP TYPE public.option_value_input;
       public       apcdmrglhzyezl    false            I           1247    35001779    option_value_output    TYPE     �   CREATE TYPE public.option_value_output AS (
	id integer,
	name character varying,
	value double precision,
	value_order integer
);
 &   DROP TYPE public.option_value_output;
       public       apcdmrglhzyezl    false            +           1247    35001752 
   tag_output    TYPE     =   CREATE TYPE public.tag_output AS (
	id integer,
	tag text
);
    DROP TYPE public.tag_output;
       public       apcdmrglhzyezl    false            (           1247    35001749    type_output    TYPE     ?   CREATE TYPE public.type_output AS (
	id integer,
	type text
);
    DROP TYPE public.type_output;
       public       apcdmrglhzyezl    false            U           1247    35001791    system    TYPE     �  CREATE TYPE public.system AS (
	id integer,
	name text,
	depth double precision,
	default_glass_size double precision,
	default_glass_bite double precision,
	default_sightline double precision,
	top_gap double precision,
	bottom_gap double precision,
	side_gap double precision,
	meeting_stile_gap double precision,
	inset double precision,
	glass_gap double precision,
	shim_size double precision,
	front_inset boolean,
	manufacturer public.name_output,
	system_type public.type_output,
	system_tags public.tag_output[],
	infill_sizes double precision[],
	infill_pocket_sizes double precision[],
	infill_pocket_types public.type_output[]
);
    DROP TYPE public.system;
       public       apcdmrglhzyezl    false    808    805    808    811            �           0    0    TYPE system    COMMENT     2   COMMENT ON TYPE public.system IS '@name _system';
            public       apcdmrglhzyezl    false    853            1           1247    35001758     system_configuration_type_output    TYPE     �   CREATE TYPE public.system_configuration_type_output AS (
	invalid boolean,
	configuration_type public.configuration_type_output,
	system_type_default public.configuration_type_output
);
 3   DROP TYPE public.system_configuration_type_output;
       public       apcdmrglhzyezl    false    814    814            =           1247    34985178    system_configuration_type_value    TYPE     �   CREATE TYPE public.system_configuration_type_value AS (
	required boolean,
	mirrorable boolean,
	presentation_level public.presentation_level,
	override_level public.presentation_level
);
 2   DROP TYPE public.system_configuration_type_value;
       public       apcdmrglhzyezl    false    801    801            @           1247    35001770    system_detail_type_output    TYPE     �   CREATE TYPE public.system_detail_type_output AS (
	detail_type public.detail_type,
	configuration_types public.system_configuration_type_output[]
);
 ,   DROP TYPE public.system_detail_type_output;
       public       apcdmrglhzyezl    false    823    817            r           1247    26939963    system_option_input    TYPE       CREATE TYPE public.system_option_input AS (
	id integer,
	system_id integer,
	name character varying(50),
	presentation_level integer,
	override_level integer,
	option_order integer,
	new_option_values public.option_value_input[],
	old_option_values integer[]
);
 &   DROP TYPE public.system_option_input;
       public       apcdmrglhzyezl    false    879            u           1247    26939966    system_input    TYPE     B  CREATE TYPE public.system_input AS (
	id integer,
	manufacturer_id integer,
	system_type_id integer,
	name character varying(50),
	depth double precision,
	default_glass_size double precision,
	default_glass_bite double precision,
	default_sightline double precision,
	top_gap double precision,
	bottom_gap double precision,
	side_gap double precision,
	meeting_stile_gap double precision,
	inset double precision,
	glass_gap double precision,
	shim_size double precision,
	front_inset boolean,
	new_system_options public.system_option_input[],
	old_system_options integer[]
);
    DROP TYPE public.system_input;
       public       apcdmrglhzyezl    false    882            L           1247    35001782    system_option    TYPE     �   CREATE TYPE public.system_option AS (
	id integer,
	name text,
	option_order integer,
	presentation_level public.presentation_level,
	override_level public.presentation_level
);
     DROP TYPE public.system_option;
       public       apcdmrglhzyezl    false    801    801            �           0    0    TYPE system_option    COMMENT     ?   COMMENT ON TYPE public.system_option IS '@name _systemOption';
            public       apcdmrglhzyezl    false    844            O           1247    35001785    system_option_output    TYPE     �   CREATE TYPE public.system_option_output AS (
	system_option public.system_option,
	option_values public.option_value_output[]
);
 '   DROP TYPE public.system_option_output;
       public       apcdmrglhzyezl    false    844    841            X           1247    35001794    system_output    TYPE     �   CREATE TYPE public.system_output AS (
	system public.system,
	system_options public.system_option_output[],
	detail_types public.system_detail_type_output[]
);
     DROP TYPE public.system_output;
       public       apcdmrglhzyezl    false    847    853    832            4           1247    35001761 $   system_set_configuration_type_output    TYPE     �   CREATE TYPE public.system_set_configuration_type_output AS (
	selected boolean,
	system_default public.system_configuration_type_output
);
 7   DROP TYPE public.system_set_configuration_type_output;
       public       apcdmrglhzyezl    false    817            C           1247    35001773    system_set_detail_type_output    TYPE     �   CREATE TYPE public.system_set_detail_type_output AS (
	detail_type public.detail_type,
	configuration_types public.system_set_configuration_type_output[]
);
 0   DROP TYPE public.system_set_detail_type_output;
       public       apcdmrglhzyezl    false    823    820            R           1247    35001788    system_set_option_output    TYPE     �   CREATE TYPE public.system_set_option_output AS (
	selected_value_id integer,
	system_option public.system_option,
	option_values public.option_value_output[]
);
 +   DROP TYPE public.system_set_option_output;
       public       apcdmrglhzyezl    false    841    844            �           1247    35003422    system_set_output    TYPE     �   CREATE TYPE public.system_set_output AS (
	id integer,
	system public.system,
	infill_size integer,
	selected_option_values public.system_set_option_output[],
	detail_type_configuration_types public.system_set_detail_type_output[]
);
 $   DROP TYPE public.system_set_output;
       public       apcdmrglhzyezl    false    835    853    850            F           1247    35001776    system_type_output    TYPE     q   CREATE TYPE public.system_type_output AS (
	id integer,
	type text,
	detail_types public.detail_type_output[]
);
 %   DROP TYPE public.system_type_output;
       public       apcdmrglhzyezl    false    826            �           1247    35220471    role    TYPE     P   CREATE TYPE users.role AS ENUM (
    'admin',
    'client',
    'data-entry'
);
    DROP TYPE users.role;
       users       apcdmrglhzyezl    false    4            �           1247    35220506    current_user    TYPE     l   CREATE TYPE users."current_user" AS (
	id integer,
	username text,
	role users.role,
	project_id integer
);
     DROP TYPE users."current_user";
       users       apcdmrglhzyezl    false    4    959            �           1247    35190606    jwt    TYPE     g   CREATE TYPE users.jwt AS (
	role character varying(100),
	expiration_date integer,
	user_id integer
);
    DROP TYPE users.jwt;
       users       apcdmrglhzyezl    false    4            �           1255    35220524 2   authenticate(character varying, character varying)    FUNCTION       CREATE FUNCTION public.authenticate(username character varying, password character varying) RETURNS users.jwt
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
DECLARE
    un ALIAS FOR username;
    pw ALIAS FOR password;
    authenticatee users.users%ROWTYPE;
BEGIN
    SELECT * FROM users.users
    INTO authenticatee
    WHERE users.users.username = un;

    IF authenticatee.password_hash = CRYPT(pw, authenticatee.password_hash) THEN
        UPDATE users.users
        SET last_auth = CURRENT_TIMESTAMP
        WHERE users.users.username = un;
        
        RETURN ROW(
            'apcdmrglhzyezl',
            EXTRACT(EPOCH FROM NOW() + INTERVAL '7 days'),
            authenticatee.id
        )::users.JWT;
    ELSE
        RETURN NULL;
    END IF;
END;
$$;
 [   DROP FUNCTION public.authenticate(username character varying, password character varying);
       public       apcdmrglhzyezl    false    956            �            1259    32048446 
   elevations    TABLE     �  CREATE TABLE public.elevations (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    rough_opening public.coordinate NOT NULL,
    finished_floor_height double precision,
    project_id integer NOT NULL,
    system_set_id integer,
    sightline double precision,
    preview character varying(25000),
    last_updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_updated_by integer
);
    DROP TABLE public.elevations;
       public         apcdmrglhzyezl    false    903            �           1255    35561712    copy_elevation(integer, text)    FUNCTION     �	  CREATE FUNCTION public.copy_elevation(elevation_id integer, new_name text) RETURNS public.elevations
    LANGUAGE plpgsql
    AS $$
DECLARE
    eid ALIAS FOR elevation_id;
    e elevations%ROWTYPE;
    ne elevations%ROWTYPE;
    ec elevation_containers%ROWTYPE;
    pid INTEGER;
    ecid INTEGER;
    cd container_details%ROWTYPE;
    id_pairs ID_PAIR[];
BEGIN

    SELECT * FROM elevations
    INTO e
    WHERE id = eid;

    -- CHECK CURRENT USER

    pid := e.project_id;

    IF pid NOT IN (
        SELECT id FROM projects
        WHERE owner_id = get_current_user_id()
    ) THEN

        RAISE EXCEPTION 'Elevation not owned by user %', get_current_user_id();

    ELSE

        -- IF AUTHORIZED

        -- CREATE ELEVATION

        INSERT INTO elevations (
            name,
            rough_opening,
            finished_floor_height,
            project_id,
            system_set_id,
            sightline,
            preview
        ) VALUES (
            new_name,
            e.rough_opening,
            e.finished_floor_height,
            e.project_id,
            e.system_set_id,
            e.sightline,
            e.preview
        ) RETURNING * INTO ne;

        -- CREATE ELEVATION CONTAINERS

        FOR ec IN (
            SELECT * FROM elevation_containers
            WHERE elevation_containers.elevation_id = eid
        ) LOOP
            INSERT INTO elevation_containers (
                elevation_id,
                original,
                contents,
                daylight_opening,
                custom_rough_opening
            ) VALUES (
                ne.id,
                ec.original,
                ec.contents,
                ec.daylight_opening,
                ec.custom_rough_opening
            ) RETURNING id INTO ecid;

            id_pairs := id_pairs || ROW(
                ecid, -- NEW/REAL ID
                ec.id -- OLD/FAKE ID
            )::ID_PAIR;
        END LOOP;

        -- CREATE CONTAINER DETAILS

        FOR cd IN (
            SELECT * FROM container_details
            WHERE container_details.elevation_id = eid
        ) LOOP
            INSERT INTO container_details (
                elevation_id,
                first_container_id,
                second_container_id,
                vertical
            ) VALUES (
                ne.id,
                get_real_id(id_pairs, cd.first_container_id),
                get_real_id(id_pairs, cd.second_container_id),
                cd.vertical
            );
        END LOOP;

        RETURN ne;

    END IF;
END;
$$;
 J   DROP FUNCTION public.copy_elevation(elevation_id integer, new_name text);
       public       apcdmrglhzyezl    false    217            /           1259    34991971    projects    TABLE     �   CREATE TABLE public.projects (
    id integer NOT NULL,
    name character varying(50),
    owner_id integer,
    default_elevation jsonb,
    last_updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_updated_by integer
);
    DROP TABLE public.projects;
       public         apcdmrglhzyezl    false            �           1255    35522956    create_a_project(text)    FUNCTION       CREATE FUNCTION public.create_a_project(name text, OUT project public.projects) RETURNS public.projects
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO projects (name, owner_id)
    VALUES (name, get_current_user_id())
    RETURNING * INTO project;
END;
$$;
 O   DROP FUNCTION public.create_a_project(name text, OUT project public.projects);
       public       apcdmrglhzyezl    false    303    303            ,           1259    34630292    system_configuration_overrides    TABLE     v  CREATE TABLE public.system_configuration_overrides (
    system_id integer NOT NULL,
    system_type_id integer,
    detail_type_id integer NOT NULL,
    configuration_type_id integer NOT NULL,
    required_override boolean,
    mirrorable_override boolean,
    presentation_level_override public.presentation_level,
    override_level_override public.presentation_level
);
 2   DROP TABLE public.system_configuration_overrides;
       public         apcdmrglhzyezl    false    801    801            �           1255    34642818 f   create_or_update_configuration_override(public.entire_system_configuration_override, integer, integer)    FUNCTION     �	  CREATE FUNCTION public.create_or_update_configuration_override(system_configuration_override public.entire_system_configuration_override, _system_id integer, _system_type_id integer) RETURNS SETOF public.system_configuration_overrides
    LANGUAGE plpgsql
    AS $$
DECLARE
    sco ALIAS FOR system_configuration_override;
    sid INTEGER = CASE WHEN _system_id IS NOT NULL
        THEN _system_id
        ELSE sco.system_id END;
    stid INTEGER = CASE WHEN _system_type_id IS NOT NULL
        THEN _system_type_id
        ELSE sco.system_type_id END;
    did INTEGER = sco.detail_type_id;
    cid INTEGER = sco.configuration_type_id;
BEGIN
    RETURN QUERY INSERT INTO system_configuration_overrides (
        system_id,
        system_type_id,
        detail_type_id,
        configuration_type_id,
        required_override,
        mirrorable_override,
        presentation_level_override,
        override_level_override
    )
    VALUES (
        sid,
        stid,
        sco.detail_type_id,
        sco.configuration_type_id,
        sco.required_override,
        sco.mirrorable_override,
        sco.presentation_level_override,
        sco.override_level_override
    )
    ON CONFLICT (system_id, detail_type_id, configuration_type_id)
        DO UPDATE SET
            required_override = CASE
                WHEN EXCLUDED.required_override IS NOT NULL
                    THEN EXCLUDED.required_override
                ELSE system_configuration_overrides.required_override END,
            mirrorable_override = CASE
                WHEN EXCLUDED.mirrorable_override IS NOT NULL
                    THEN EXCLUDED.mirrorable_override
                ELSE system_configuration_overrides.mirrorable_override END,
            presentation_level_override = CASE
                WHEN EXCLUDED.presentation_level_override IS NOT NULL
                    THEN EXCLUDED.presentation_level_override
                ELSE system_configuration_overrides.presentation_level_override END,
            override_level_override = CASE
                WHEN EXCLUDED.override_level_override IS NOT NULL
                    THEN EXCLUDED.override_level_override
                ELSE system_configuration_overrides.override_level_override END
        WHERE system_configuration_overrides.system_id = sid
        AND system_configuration_overrides.system_type_id = stid
        AND system_configuration_overrides.detail_type_id = did
        AND system_configuration_overrides.configuration_type_id = cid
    RETURNING *;
END;
$$;
 �   DROP FUNCTION public.create_or_update_configuration_override(system_configuration_override public.entire_system_configuration_override, _system_id integer, _system_type_id integer);
       public       apcdmrglhzyezl    false    300    894            �            1259    32048474    container_details    TABLE     �   CREATE TABLE public.container_details (
    id integer NOT NULL,
    elevation_id integer,
    first_container_id integer,
    second_container_id integer,
    vertical boolean
);
 %   DROP TABLE public.container_details;
       public         apcdmrglhzyezl    false            �           1255    35523270 \   create_or_update_container_detail(public.entire_container_detail, public.id_pair[], integer)    FUNCTION     v	  CREATE FUNCTION public.create_or_update_container_detail(container_detail public.entire_container_detail, id_pairs public.id_pair[], elevation_id integer) RETURNS SETOF public.container_details
    LANGUAGE plpgsql
    AS $$
DECLARE
    pid INTEGER;
    cd ALIAS FOR container_detail;
    eid ALIAS FOR elevation_id;
BEGIN


    -- CHECK CURRENT USER

    SELECT project_id FROM elevations INTO pid
    WHERE id = eid;

    IF pid NOT IN (
        SELECT id FROM projects
        WHERE owner_id = get_current_user_id()
    ) THEN

        RAISE EXCEPTION 'Elevation not owned by user %', get_current_user_id();

    ELSE

        -- IF AUTHORIZED

        IF cd.id IS NULL
        THEN RETURN QUERY
            INSERT INTO container_details (
                elevation_id,
                first_container_id,
                second_container_id,
                vertical
            ) VALUES (
                eid,
                CASE
                    WHEN cd.first_container_id IS NOT NULL
                        THEN cd.first_container_id
                    ELSE get_real_id(id_pairs, cd.first_container_fake_id) END,
                CASE
                    WHEN cd.second_container_id IS NOT NULL
                        THEN cd.second_container_id
                    ELSE get_real_id(id_pairs, cd.second_container_fake_id) END,
                cd.vertical
            )
            RETURNING *;
        ELSE RETURN QUERY
            UPDATE container_details SET
                first_container_id = CASE
                    WHEN cd.first_container_id IS NOT NULL
                        THEN cd.first_container_id
                    WHEN cd.first_container_fake_id IS NOT NULL
                        THEN get_real_id(id_pairs, cd.first_container_fake_id)
                    ELSE container_details.first_container_id END,
                second_container_id = CASE
                    WHEN cd.second_container_id IS NOT NULL
                        THEN cd.second_container_id
                    WHEN cd.second_container_fake_id IS NOT NULL
                        THEN get_real_id(id_pairs, cd.second_container_fake_id)
                    ELSE container_details.second_container_id END
            WHERE container_details.elevation_id = eid
            AND container_details.vertical = cd.vertical
            AND container_details.id = cd.id
            RETURNING *;
        END IF;
    END IF;
END;
$$;
 �   DROP FUNCTION public.create_or_update_container_detail(container_detail public.entire_container_detail, id_pairs public.id_pair[], elevation_id integer);
       public       apcdmrglhzyezl    false    221    925    928            �           1255    35557807 3   create_or_update_elevation(public.entire_elevation)    FUNCTION     �  CREATE FUNCTION public.create_or_update_elevation(elevation public.entire_elevation) RETURNS SETOF public.elevations
    LANGUAGE plpgsql
    AS $$
DECLARE
    pid INTEGER;
    e ALIAS FOR elevation;
BEGIN

    -- CHECK CURRENT USER

    IF e.id IS NOT NULL THEN
        SELECT project_id FROM elevations INTO pid
        WHERE id = e.id;
    ELSE
        pid := e.project_id;
    END IF;

    IF pid NOT IN (
        SELECT id FROM projects
        WHERE owner_id = get_current_user_id()
    ) THEN

        RAISE EXCEPTION 'Elevation not owned by user %', get_current_user_id();

    ELSE

        -- IF AUTHORIZED
            
        IF e.id IS NULL
        THEN RETURN QUERY
            INSERT INTO elevations (
                project_id,
                name,
                rough_opening,
                finished_floor_height,
                sightline,
                preview
            ) VALUES (
                e.project_id,
                e.name,
                e.rough_opening,
                e.finished_floor_height,
                e.sightline,
                e.preview
            )
            RETURNING *;
        ELSE RETURN QUERY
            UPDATE elevations SET
                project_id = CASE
                    WHEN e.project_id IS NOT NULL
                        THEN e.project_id
                    ELSE elevations.project_id END,
                name = CASE
                    WHEN e.name IS NOT NULL
                        THEN e.name
                    ELSE elevations.name END,
                rough_opening = CASE
                    WHEN e.rough_opening IS NOT NULL
                        THEN e.rough_opening
                    ELSE elevations.rough_opening END,
                finished_floor_height = CASE
                    WHEN e.finished_floor_height IS NOT NULL
                        THEN e.finished_floor_height
                    ELSE elevations.finished_floor_height END,
                preview = CASE
                    WHEN e.preview IS NOT NULL
                        THEN e.preview
                    ELSE elevations.preview END
            WHERE elevations.id = e.id
            RETURNING *;
        END IF;
    END IF;
END;
$$;
 T   DROP FUNCTION public.create_or_update_elevation(elevation public.entire_elevation);
       public       apcdmrglhzyezl    false    217    938            �            1259    32048457    elevation_containers    TABLE     �   CREATE TABLE public.elevation_containers (
    id integer NOT NULL,
    elevation_id integer,
    original boolean DEFAULT false,
    contents character varying(50),
    daylight_opening public.coordinate,
    custom_rough_opening boolean
);
 (   DROP TABLE public.elevation_containers;
       public         apcdmrglhzyezl    false    903            �           1255    35523272 P   create_or_update_elevation_container(public.entire_elevation_container, integer)    FUNCTION     r  CREATE FUNCTION public.create_or_update_elevation_container(elevation_container public.entire_elevation_container, elevation_id integer) RETURNS SETOF public.elevation_containers
    LANGUAGE plpgsql
    AS $$
DECLARE
    pid INTEGER;
    ec ALIAS FOR elevation_container;
    eid INTEGER = elevation_id;
BEGIN

     -- CHECK CURRENT USER

    SELECT project_id FROM elevations INTO pid
    WHERE id = eid;

    IF pid NOT IN (
        SELECT id FROM projects
        WHERE owner_id = get_current_user_id()
    ) THEN

        RAISE EXCEPTION 'Elevation not owned by user %', get_current_user_id();

    ELSE

        -- IF AUTHORIZED
            
        IF ec.id IS NULL
        THEN RETURN QUERY
            INSERT INTO elevation_containers (
                elevation_id,
                original,
                contents,
                daylight_opening,
                custom_rough_opening
            ) VALUES (
                eid,
                ec.original,
                ec.contents,
                ec.daylight_opening,
                ec.custom_rough_opening
            )
            RETURNING *;
        ELSE RETURN QUERY
            UPDATE elevation_containers SET
                original = CASE
                    WHEN ec.original IS NOT NULL
                        THEN ec.original
                    ELSE elevation_containers.original END,
                contents = CASE
                    WHEN ec.contents IS NOT NULL
                        THEN ec.contents
                    ELSE elevation_containers.contents END,
                daylight_opening = CASE
                    WHEN ec.daylight_opening IS NOT NULL
                        THEN ec.daylight_opening
                    ELSE elevation_containers.daylight_opening END,
                custom_rough_opening = CASE
                    WHEN ec.custom_rough_opening IS NOT NULL
                        THEN ec.custom_rough_opening
                    ELSE elevation_containers.custom_rough_opening END
            WHERE elevation_containers.elevation_id = eid
            AND elevation_containers.id = ec.id
            RETURNING *;
        END IF;
    END IF;
END;
$$;
 �   DROP FUNCTION public.create_or_update_elevation_container(elevation_container public.entire_elevation_container, elevation_id integer);
       public       apcdmrglhzyezl    false    219    935            �            1259    34629767    option_values    TABLE     �   CREATE TABLE public.option_values (
    id integer NOT NULL,
    system_option_id integer,
    name character varying(50),
    value double precision,
    value_order integer,
    mirror_from_option_value_id integer
);
 !   DROP TABLE public.option_values;
       public         apcdmrglhzyezl    false            �           1255    34642816 B   create_or_update_option_value(public.entire_option_value, integer)    FUNCTION     �  CREATE FUNCTION public.create_or_update_option_value(option_value public.entire_option_value, system_option_id integer) RETURNS SETOF public.option_values
    LANGUAGE plpgsql
    AS $$
DECLARE
    ov ALIAS FOR option_value;
    soid INTEGER = CASE WHEN system_option_id IS NOT NULL
        THEN system_option_id
        ELSE ov.system_option_id END;
BEGIN
    RAISE NOTICE 'Creating Option Value: %', soid;
    IF ov.id IS NULL
    THEN RETURN QUERY
        INSERT INTO option_values (        
            system_option_id,
            name,
            value,
            value_order,
            mirror_from_option_value_id
        )
        VALUES (
            soid,
            ov.name,
            ov.value,
            ov.value_order,
            ov.mirror_from_option_value_id
        )
        RETURNING *;
    ELSE RETURN QUERY
        UPDATE option_values SET
            name = CASE
                WHEN ov.name IS NOT NULL
                    THEN ov.name
                ELSE option_values.name END,
            value = CASE
                WHEN ov.value IS NOT NULL
                    THEN ov.value
                ELSE option_values.value END,
            value_order = CASE
                WHEN ov.value_order IS NOT NULL
                    THEN ov.value_order
                ELSE option_values.value_order END,
            mirror_from_option_value_id = CASE
                WHEN ov.mirror_from_option_value_id IS NOT NULL
                    THEN ov.mirror_from_option_value_id
                ELSE option_values.mirror_from_option_value_id END
        WHERE option_values.id = ov.id
        AND option_values.system_option_id = soid
        RETURNING *;
    END IF;
END;
$$;
 w   DROP FUNCTION public.create_or_update_option_value(option_value public.entire_option_value, system_option_id integer);
       public       apcdmrglhzyezl    false    242    888            �            1259    34629706    systems    TABLE     #  CREATE TABLE public.systems (
    id integer NOT NULL,
    manufacturer_id integer,
    system_type_id integer,
    name character varying(50),
    depth double precision,
    default_glass_size double precision,
    default_glass_bite double precision,
    default_sightline double precision,
    top_gap double precision,
    bottom_gap double precision,
    side_gap double precision,
    meeting_stile_gap double precision,
    inset double precision,
    glass_gap double precision,
    shim_size double precision,
    front_inset boolean
);
    DROP TABLE public.systems;
       public         apcdmrglhzyezl    false            �           1255    34642810 -   create_or_update_system(public.entire_system)    FUNCTION     		  CREATE FUNCTION public.create_or_update_system(system public.entire_system) RETURNS SETOF public.systems
    LANGUAGE plpgsql
    AS $$
DECLARE
    s ALIAS FOR system;
BEGIN
    IF s.id IS NULL
    THEN RETURN QUERY
        INSERT INTO systems(
            name,
            manufacturer_id,
            system_type_id,
            depth,
            default_sightline,
            shim_size,
            default_glass_size,
            default_glass_bite
        )
        VALUES (
            s.name,
            s.manufacturer_id,
            s.system_type_id,
            s.depth,
            s.default_sightline,
            s.shim_size,
            s.default_glass_bite,
            s.default_glass_size
        )
        RETURNING *;
    ELSE RETURN QUERY
    -- BEFORE QUERY MUST DELETE ALL OVERRIDES FROM PREVIOUS SYSTEM TYPE IF SYSTEM TYPE IS UPDATED
        UPDATE systems SET
            name = CASE
                WHEN s.name IS NOT NULL
                    THEN s.name
                ELSE systems.name END,
            manufacturer_id = CASE
                WHEN s.manufacturer_id IS NOT NULL
                    THEN s.manufacturer_id
                ELSE systems.manufacturer_id END,
            system_type_id = CASE
                WHEN s.system_type_id IS NOT NULL
                    THEN s.system_type_id
                ELSE systems.system_type_id END,
            depth = CASE
                WHEN s.depth IS NOT NULL
                    THEN s.depth
                ELSE systems.depth END,
            default_sightline = CASE
                WHEN s.default_sightline IS NOT NULL
                    THEN s.default_sightline
                ELSE systems.default_sightline END,
            shim_size = CASE
                WHEN s.shim_size IS NOT NULL
                    THEN s.shim_size
                ELSE systems.shim_size END,
            default_glass_size = CASE
                WHEN s.default_glass_size IS NOT NULL
                    THEN s.default_glass_size
                ELSE systems.default_glass_size END,
            default_glass_bite = CASE
                WHEN s.default_glass_bite IS NOT NULL
                    THEN s.default_glass_bite
                ELSE systems.default_glass_bite END
        WHERE systems.id = s.id
        RETURNING *;
    END IF;
END;
$$;
 K   DROP FUNCTION public.create_or_update_system(system public.entire_system);
       public       apcdmrglhzyezl    false    236    897            �            1259    34629754    system_options    TABLE     �   CREATE TABLE public.system_options (
    id integer NOT NULL,
    system_id integer,
    name character varying(50),
    presentation_level public.presentation_level,
    override_level public.presentation_level,
    option_order integer
);
 "   DROP TABLE public.system_options;
       public         apcdmrglhzyezl    false    801    801            �           1255    34642813 D   create_or_update_system_option(public.entire_system_option, integer)    FUNCTION     n  CREATE FUNCTION public.create_or_update_system_option(entire_system_option public.entire_system_option, system_id integer) RETURNS SETOF public.system_options
    LANGUAGE plpgsql
    AS $$
DECLARE
    eso ALIAS FOR entire_system_option;
    sid INTEGER = CASE WHEN eso.system_id IS NOT NULL
        THEN eso.system_id
        ELSE system_id END;
BEGIN
    IF eso.id IS NULL
    THEN RETURN QUERY
        INSERT INTO system_options(
            system_id,
            name,
            presentation_level,
            override_level,
            option_order
        )
        VALUES (
            sid,
            eso.name,
            eso.presentation_level,
            eso.override_level,
            eso.option_order
        )
        RETURNING *;
    ELSE RETURN QUERY
        UPDATE system_options SET
            name = CASE
                WHEN eso.name IS NOT NULL
                    THEN eso.name
                ELSE system_options.name END,
            presentation_level = CASE
                WHEN eso.presentation_level IS NOT NULL
                    THEN eso.presentation_level
                ELSE system_options.presentation_level END,
            override_level = CASE
                WHEN eso.override_level IS NOT NULL
                    THEN eso.override_level
                ELSE system_options.override_level END,
            option_order = CASE
                WHEN eso.option_order IS NOT NULL
                    THEN eso.option_order
                ELSE system_options.option_order END
        WHERE system_options.system_id = sid
        AND system_options.id = eso.id
        RETURNING *;
    END IF;
END;
$$;
 z   DROP FUNCTION public.create_or_update_system_option(entire_system_option public.entire_system_option, system_id integer);
       public       apcdmrglhzyezl    false    891    240            C           1259    35007167    system_sets    TABLE     �   CREATE TABLE public.system_sets (
    id integer NOT NULL,
    project_id integer,
    system_id integer,
    system_type_id integer,
    infill_size double precision
);
    DROP TABLE public.system_sets;
       public         apcdmrglhzyezl    false            �           1255    35025811 5   create_or_update_system_set(public.entire_system_set)    FUNCTION     	  CREATE FUNCTION public.create_or_update_system_set(system_set public.entire_system_set) RETURNS SETOF public.system_sets
    LANGUAGE plpgsql
    AS $$
DECLARE
    ss ALIAS FOR system_set;
BEGIN
    IF ss.id IS NULL
    THEN RETURN QUERY
        INSERT INTO system_sets (
            project_id,
            system_id,
            system_type_id,
            infill_size
        )
        VALUES (
            ss.project_id,
            ss.system_id,
            CASE WHEN ss.system_type_id IS NOT NULL
                THEN ss.system_type_id
                ELSE (
                    SELECT system_type_id FROM systems
                    WHERE systems.id = ss.system_id
                ) END,
            ss.infill_size
        )
        RETURNING *;
    ELSE RETURN QUERY
        UPDATE system_sets SET
            infill_size = CASE WHEN ss.infill_size IS NOT NULL
                THEN ss.infill_size
                ELSE system_sets.infill_size END
        WHERE system_sets.id = ss.id
        RETURNING *;
    END IF;
END;
$$;
 W   DROP FUNCTION public.create_or_update_system_set(system_set public.entire_system_set);
       public       apcdmrglhzyezl    false    323    953            �           1255    34642822 \   delete_configuration_override(public.entire_system_configuration_override, integer, integer)    FUNCTION     �  CREATE FUNCTION public.delete_configuration_override(system_configuration_override public.entire_system_configuration_override, system_id integer, system_type_id integer) RETURNS SETOF public.system_configuration_overrides
    LANGUAGE plpgsql
    AS $$
DECLARE
    sco ALIAS FOR system_configuration_override;
    sid INTEGER = CASE WHEN system_id IS NOT NULL
        THEN system_id
        ELSE sco.system_id END;
    stid INTEGER = CASE WHEN system_type_id IS NOT NULL
        THEN system_type_id
        ELSE sco.system_type_id END;
BEGIN
    RETURN QUERY DELETE FROM system_configuration_overrides
    WHERE system_configuration_overrides.system_id = sid
    AND system_configuration_overrides.system_type_id = stid
    AND system_configuration_overrides.detail_type_id = sco.detail_type_id
    AND system_configuration_overrides.configuration_type_id = sco.configuration_type_id
    RETURNING *;
END;
$$;
 �   DROP FUNCTION public.delete_configuration_override(system_configuration_override public.entire_system_configuration_override, system_id integer, system_type_id integer);
       public       apcdmrglhzyezl    false    300    894            �           1255    34630891     delete_entire_elevation(integer)    FUNCTION     <  CREATE FUNCTION public.delete_entire_elevation(elevation_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
    pid INTEGER;
    eid ALIAS FOR elevation_id;
BEGIN

    -- CHECK CURRENT USER

    SELECT project_id FROM elevations INTO pid
    WHERE id = eid;

    IF pid NOT IN (
        SELECT id FROM projects
        WHERE owner_id = get_current_user_id()
    ) THEN

        RAISE EXCEPTION 'Elevation not owned by user %', get_current_user_id();
        
    ELSE

        -- IF AUTHORIZED

        DELETE FROM container_details
            WHERE container_details.elevation_id = eid;

        DELETE FROM elevation_containers
            WHERE elevation_containers.elevation_id = eid;

        DELETE FROM elevations
            WHERE elevations.id = eid;
        
        RETURN eid;

    END IF;
END;
$$;
 D   DROP FUNCTION public.delete_entire_elevation(elevation_id integer);
       public       apcdmrglhzyezl    false            �           1255    35566201    delete_entire_project(integer)    FUNCTION     �  CREATE FUNCTION public.delete_entire_project(project_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
    cuid INTEGER;
    pid ALIAS FOR project_id;
    e elevations%ROWTYPE;
    ___ INTEGER;
BEGIN
    cuid := get_current_user_id();
    IF pid NOT IN (
        SELECT id FROM projects
        WHERE owner_id = cuid
    )
    THEN RAISE EXCEPTION 'Project does not belong to user: %', cuid;
    ELSE
        FOR e IN (
            SELECT * FROM elevations
            WHERE elevations.project_id = pid
        ) LOOP
            ___ := delete_entire_elevation(e.id);
        END LOOP;
        DELETE FROM projects
        WHERE projects.id = pid;
    END IF;
    RETURN project_id;
END;
$$;
 @   DROP FUNCTION public.delete_entire_project(project_id integer);
       public       apcdmrglhzyezl    false            �           1255    35410172    get_all_projects()    FUNCTION     �   CREATE FUNCTION public.get_all_projects() RETURNS SETOF public.projects
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN QUERY SELECT * FROM projects
        WHERE owner_id = get_current_user_id();
END;
$$;
 )   DROP FUNCTION public.get_all_projects();
       public       apcdmrglhzyezl    false    303            �           1255    35584765    get_bug_reports()    FUNCTION     P  CREATE FUNCTION public.get_bug_reports() RETURNS public.entire_bug_report[]
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    brs entire_bug_report[];
    br bug_reports%ROWTYPE;
BEGIN
    EXECUTE users.admin_only();

    FOR br IN (
        SELECT * FROM bug_reports
        ORDER BY timestamp ASC
    ) LOOP
        brs := brs || ROW(
            br.id,
            (SELECT username FROM users.users WHERE id = br.user_id),
            br.location,
            br.report,
            br.state,
            br.timestamp
        )::entire_bug_report;
    END LOOP;

    RETURN brs;

END;
$$;
 (   DROP FUNCTION public.get_bug_reports();
       public       apcdmrglhzyezl    false    976            �           1255    35357023    get_current_user()    FUNCTION     �  CREATE FUNCTION public.get_current_user() RETURNS users."current_user"
    LANGUAGE plpgsql STABLE SECURITY DEFINER
    AS $$
DECLARE
    uid INTEGER;
    un TEXT;
    r users.ROLE;
    pid INTEGER;
BEGIN
    SELECT id, username, role
    INTO uid, un, r
    FROM users.users
    WHERE id = get_current_user_id();

    SELECT id
    INTO pid
    FROM projects
    WHERE owner_id = uid;

    RETURN ROW(
        uid,
        un,
        r,
        pid
    )::users.CURRENT_USER;
END;
$$;
 )   DROP FUNCTION public.get_current_user();
       public       apcdmrglhzyezl    false    966            �           1255    35220495    get_current_user_id()    FUNCTION     �   CREATE FUNCTION public.get_current_user_id() RETURNS integer
    LANGUAGE plpgsql STABLE SECURITY DEFINER
    AS $$
BEGIN
    RETURN NULLIF(CURRENT_SETTING('jwt.claims.user_id', true), '')::INTEGER;
END;
$$;
 ,   DROP FUNCTION public.get_current_user_id();
       public       apcdmrglhzyezl    false            V           1259    35681218    intermediate_private_table    TABLE     X   CREATE TABLE users.intermediate_private_table (
    id integer,
    other_id integer
);
 -   DROP TABLE users.intermediate_private_table;
       users         apcdmrglhzyezl    false    4            �           1255    35681240     get_intermediate_private_table()    FUNCTION       CREATE FUNCTION public.get_intermediate_private_table() RETURNS users.intermediate_private_table
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    result RECORD;
BEGIN
    SELECT * FROM users.intermediate_private_table INTO result;
    RETURN result;
END;
$$;
 7   DROP FUNCTION public.get_intermediate_private_table();
       public       apcdmrglhzyezl    false    342            U           1259    35681207    other_private_table    TABLE     ]   CREATE TABLE users.other_private_table (
    id integer NOT NULL,
    foreign_key integer
);
 &   DROP TABLE users.other_private_table;
       users         apcdmrglhzyezl    false    4            �           1255    35681239    get_other_private_table()    FUNCTION     �   CREATE FUNCTION public.get_other_private_table() RETURNS users.other_private_table
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    result RECORD;
BEGIN
    SELECT * FROM users.other_private_table INTO result;
    RETURN result;
END;
$$;
 0   DROP FUNCTION public.get_other_private_table();
       public       apcdmrglhzyezl    false    341            S           1259    35681199    private_table    TABLE     >   CREATE TABLE users.private_table (
    id integer NOT NULL
);
     DROP TABLE users.private_table;
       users         apcdmrglhzyezl    false    4            �           1255    35681238    get_private_table()    FUNCTION     �   CREATE FUNCTION public.get_private_table() RETURNS users.private_table
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    result RECORD;
BEGIN
    SELECT * FROM users.private_table INTO result;
    RETURN result;
END;
$$;
 *   DROP FUNCTION public.get_private_table();
       public       apcdmrglhzyezl    false    339            �           1255    34630313 &   get_real_id(public.id_pair[], integer)    FUNCTION     :  CREATE FUNCTION public.get_real_id(id_pairs public.id_pair[], fake_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
    f ALIAS FOR fake_id;
    real_id INTEGER;
BEGIN
    SELECT p.id
        FROM UNNEST (id_pairs) p
        INTO real_id
        WHERE p.fake_id = f;
    RETURN real_id;
END;
$$;
 N   DROP FUNCTION public.get_real_id(id_pairs public.id_pair[], fake_id integer);
       public       apcdmrglhzyezl    false    928            �           1255    35145783    read_entire_class(integer)    FUNCTION     �  CREATE FUNCTION public.read_entire_class(cid integer) RETURNS public.class
    LANGUAGE plpgsql
    AS $$
DECLARE
    subject TEXT;
    teacher PERSON;
    students PERSON[];
BEGIN

    SELECT c.subject FROM classes c
    INTO subject
    WHERE c.id = cid;

    SELECT t.id, t.first_name, t.last_name FROM people t
    INTO teacher
    WHERE t.id IN (
        SELECT c.teacher_id FROM classes c
        WHERE c.id = cid
    );

    SELECT ARRAY_AGG(ROW(s.id, s.first_name, s.last_name)::person) FROM people s
    INTO students
    WHERE s.id IN (
        SELECT e.student_id FROM student_class_enrollments e
        WHERE e.class_id = cid
    );

    RETURN ROW(
        cid,
        subject,
        teacher,
        students
    )::class;
END;
$$;
 5   DROP FUNCTION public.read_entire_class(cid integer);
       public       apcdmrglhzyezl    false    944            �           1255    35336480    report_bug(text, text, json)    FUNCTION     ]  CREATE FUNCTION public.report_bug(location text, report text, state json) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO bug_reports (
        user_id,
        location,
        report,
        state
    ) VALUES (
        get_current_user_id(),
        location,
        report,
        state
    );
    RETURN TRUE;
END;
$$;
 I   DROP FUNCTION public.report_bug(location text, report text, state json);
       public       apcdmrglhzyezl    false            �           1255    35006924    select_entire_system(integer)    FUNCTION     	  CREATE FUNCTION public.select_entire_system(system_id integer) RETURNS public.system_output
    LANGUAGE plpgsql STABLE STRICT
    AS $$
DECLARE
    sid ALIAS FOR system_id;
    s systems%ROWTYPE;
    m manufacturers%ROWTYPE;
    mo NAME_OUTPUT;
    stp system_types%ROWTYPE;
    stpo TYPE_OUTPUT;
    stg system_tags%ROWTYPE;
    stgs RECORD;
    stgos TAG_OUTPUT[];
    iss FLOAT[];
    ipss FLOAT[];
    ipt infill_pocket_types%ROWTYPE;
    ipts TYPE_OUTPUT[];
    ov option_values%ROWTYPE;
    ovos OPTION_VALUE_OUTPUT[];
    so system_options%ROWTYPE;
    soos SYSTEM_OPTION_OUTPUT[];
    sto SYSTEM_TYPE_OUTPUT;
    dt detail_types%ROWTYPE;
    dtp DETAIL_TYPE;
    dto DETAIL_TYPE_OUTPUT;
    dtos DETAIL_TYPE_OUTPUT[];
    sdto SYSTEM_DETAIL_TYPE_OUTPUT;
    sdtos SYSTEM_DETAIL_TYPE_OUTPUT[];
    ct RECORD;
    cto CONFIGURATION_TYPE_OUTPUT;
    ctos CONFIGURATION_TYPE_OUTPUT[];
    scto SYSTEM_CONFIGURATION_TYPE_OUTPUT;
    sctos SYSTEM_CONFIGURATION_TYPE_OUTPUT[];
    invalid BOOLEAN;
    sco RECORD;
BEGIN
    -- SYSTEM
    SELECT * FROM systems
    INTO s
    WHERE systems.id = sid;

    SELECT id, name FROM manufacturers
    INTO m
    WHERE manufacturers.id = s.manufacturer_id;

    -- MANUFACTURER
    mo := ROW(
        m.id,
        m.name
    )::NAME_OUTPUT;

    sto := select_entire_system_type(s.system_type_id);

    -- SYSTEM TYPE
    SELECT * FROM system_types
    INTO stp
    WHERE system_types.id = s.system_type_id;

    stpo := ROW(
        stp.id,
        stp.type
    )::TYPE_OUTPUT;

    -- SYSTEM TAGS
    IF EXISTS (
        SELECT * FROM system_system_tags
        WHERE system_system_tags.system_id = sid
    ) THEN
        FOR stg IN (
            SELECT * FROM system_tags
            WHERE system_tags.id IN (
                SELECT system_tag_id FROM system_system_tags
                WHERE system_system_tags.system_id = sid
            )
        )
        LOOP
            stgos := stgos || ROW(
                stg.id,
                stg.tag
            )::TAG_OUTPUT;
        END LOOP;
    END IF;

    -- INFILL SIZES
    SELECT array_agg(infill_size) FROM system_infill_sizes
    INTO iss
    WHERE system_infill_sizes.system_id = sid;

    -- INFILL POCKET SIZES
    SELECT infill_pocket_size FROM system_infill_pocket_sizes
    INTO ipss
    WHERE system_infill_pocket_sizes.system_id = sid;

    -- INFILL POCKET TYPES
    IF EXISTS (
        SELECT * FROM system_infill_pocket_types
        WHERE system_infill_pocket_types.system_id = sid
    ) THEN
        FOR ipt IN (
            SELECT * FROM infill_pocket_types
            WHERE infill_pocket_types.id IN (
                SELECT id FROM system_infill_pocket_types
                WHERE system_infill_pocket_types.system_id = sid
            )
        )
        LOOP
            ipts := ipts || ROW(
                ipt.id,
                ipt.type
            )::TYPE_OUTPUT;
        END LOOP;
    END IF;

    -- OPTIONS
    IF EXISTS (
        SELECT * FROM system_options
        WHERE system_options.system_id = sid
    ) THEN
        FOR so IN (
            SELECT * FROM system_options
            WHERE system_options.system_id = sid
        )
        LOOP
            ovos := NULL;
            IF EXISTS (
                SELECT * FROM option_values
                WHERE option_values.system_option_id = so.id
            ) THEN
                FOR ov IN (
                    SELECT * FROM option_values
                    WHERE option_values.system_option_id = so.id
                )
                LOOP
                    ovos := ovos || ROW(
                        ov.id,
                        ov.name,
                        ov.value,
                        ov.value_order
                    )::OPTION_VALUE_OUTPUT;
                END LOOP;
            END IF;
            soos := soos || ROW(
                ROW(
                    so.id,
                    so.name,
                    so.option_order,
                    so.presentation_level,
                    so.override_level
                )::SYSTEM_OPTION,
                ovos
            )::SYSTEM_OPTION_OUTPUT;
        END LOOP;
    END IF;

    -- DETAIL TYPES
    IF array_length(sto.detail_types, 1) > 0 THEN
        FOREACH dto IN ARRAY sto.detail_types
        LOOP
            sctos := NULL;
            dtp := dto.detail_type;

            IF array_length(dto.configuration_types, 1) > 0 THEN
                FOREACH cto IN ARRAY dto.configuration_types
                LOOP
                    invalid := EXISTS (
                        SELECT * FROM invalid_system_configuration_types
                        WHERE invalid_system_configuration_types.system_id = sid
                        AND invalid_system_configuration_types.invalid_configuration_type_id = cto.id
                    );

                    SELECT * FROM system_configuration_overrides
                    INTO sco
                    WHERE system_configuration_overrides.system_id = sid
                    AND system_configuration_overrides.system_type_id = s.system_type_id
                    AND system_configuration_overrides.detail_type_id = dtp.id
                    AND system_configuration_overrides.configuration_type_id = cto.id;

                    sctos := sctos || ROW(
                        invalid,
                        ROW(
                            cto.id,
                            cto.type,
                            cto.door,
                            CASE WHEN sco.required_override IS NOT NULL
                                THEN sco.required_override
                                ELSE cto.required END,
                            CASE WHEN sco.mirrorable_override IS NOT NULL
                                THEN sco.mirrorable_override
                                ELSE cto.mirrorable END,
                            CASE WHEN sco.presentation_level_override IS NOT NULL
                                THEN sco.presentation_level_override
                                ELSE cto.presentation_level END,
                            CASE WHEN sco.override_level_override IS NOT NULL
                                THEN sco.override_level_override
                                ELSE cto.override_level END
                        )::CONFIGURATION_TYPE_OUTPUT,
                        cto
                    )::SYSTEM_CONFIGURATION_TYPE_OUTPUT;
                END LOOP;
            END IF;

            sdtos := sdtos || ROW(
                dto.detail_type,
                sctos
            )::SYSTEM_DETAIL_TYPE_OUTPUT;
        END LOOP;
    END IF;

    RETURN ROW(
        ROW(
            s.id,
            s.name,
            s.depth,
            s.default_glass_size,
            s.default_glass_bite,
            s.default_sightline,
            s.top_gap,
            s.bottom_gap,
            s.side_gap,
            s.meeting_stile_gap,
            s.inset,
            s.glass_gap,
            s.shim_size,
            s.front_inset,
            mo,
            stpo,
            stgos,
            iss,
            ipss,
            ipts
        )::SYSTEM,
        soos,
        sdtos
    )::SYSTEM_OUTPUT;
END;
$$;
 >   DROP FUNCTION public.select_entire_system(system_id integer);
       public       apcdmrglhzyezl    false    856            �           1255    35025790 !   select_entire_system_set(integer)    FUNCTION     �
  CREATE FUNCTION public.select_entire_system_set(system_set_id integer) RETURNS public.system_set_output
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    ssid ALIAS FOR system_set_id;
    ss system_sets%ROWTYPE;
    so SYSTEM_OUTPUT;
    ssis FLOAT;
    selected_id INTEGER;
    ov option_values%ROWTYPE;
    sop SYSTEM_OPTION;
    soo SYSTEM_OPTION_OUTPUT;
    ssoos SYSTEM_SET_OPTION_OUTPUT[];
    selected BOOLEAN;
    cto CONFIGURATION_TYPE_OUTPUT;
    scto SYSTEM_CONFIGURATION_TYPE_OUTPUT;
    ssctos SYSTEM_SET_CONFIGURATION_TYPE_OUTPUT[];
    dt DETAIL_TYPE;
    sdto SYSTEM_DETAIL_TYPE_OUTPUT;
    ssdtos SYSTEM_SET_DETAIL_TYPE_OUTPUT[];
BEGIN
    SELECT * FROM system_sets
    INTO ss
    WHERE system_sets.id = ssid;

    so := select_entire_system(ss.system_id);

    -- OPTIONS
    IF array_length(so.system_options, 1) > 0 THEN
        FOREACH soo IN ARRAY so.system_options
        LOOP
            sop := soo.system_option;

            SELECT option_value_id FROM system_set_option_values
            INTO selected_id
            WHERE system_set_option_values.system_set_id = ssid
            AND system_set_option_values.system_option_id = sop.id;

            ssoos := ssoos || ROW(
                selected_id,
                soo.system_option,
                soo.option_values
            )::SYSTEM_SET_OPTION_OUTPUT;
        END LOOP;
    END IF;

    -- DETAIL TYPES
    IF array_length(so.detail_types, 1) > 0 THEN
        FOREACH sdto IN ARRAY so.detail_types
        LOOP
            dt := sdto.detail_type;
            ssctos := NULL;

            IF array_length(sdto.configuration_types, 1) > 0 THEN
                FOREACH scto IN ARRAY sdto.configuration_types
                LOOP
                    cto := scto.configuration_type;
                    selected := EXISTS (
                        SELECT * FROM system_set_detail_type_configuration_types
                        WHERE system_set_detail_type_configuration_types.system_set_id = ssid
                        AND system_set_detail_type_configuration_types.detail_type_id = dt.id
                        AND system_set_detail_type_configuration_types.configuration_type_id = cto.id
                    );
                    ssctos := ssctos || ROW(
                        selected,
                        scto
                    )::SYSTEM_SET_CONFIGURATION_TYPE_OUTPUT;
                END LOOP;
            END IF;

            ssdtos := ssdtos || ROW(
                sdto.detail_type,
                ssctos
            )::SYSTEM_SET_DETAIL_TYPE_OUTPUT;
        END LOOP;
    END IF;

    RETURN ROW(
        ss.id,
        so.system,
        ss.infill_size,
        ssoos,
        ssdtos
    )::SYSTEM_SET_OUTPUT; 
END;
$$;
 F   DROP FUNCTION public.select_entire_system_set(system_set_id integer);
       public       apcdmrglhzyezl    false    906            �           1255    35001798 "   select_entire_system_type(integer)    FUNCTION     �  CREATE FUNCTION public.select_entire_system_type(system_type_id integer) RETURNS public.system_type_output
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    stid ALIAS FOR system_type_id;
    st system_types%ROWTYPE;
    dt detail_types%ROWTYPE;
    ct RECORD;
    ctos CONFIGURATION_TYPE_OUTPUT[];
    dtos DETAIL_TYPE_OUTPUT[];
BEGIN
    SELECT * FROM system_types
    INTO st
    WHERE system_types.id = stid;

    FOR dt IN
        SELECT * FROM detail_types
        WHERE detail_types.id IN (
            SELECT detail_type_id FROM system_type_detail_type_configuration_types
            WHERE system_type_detail_type_configuration_types.system_type_id = stid
        )
    LOOP
        ctos := NULL;
        FOR ct IN
            SELECT
                configuration_types.id,
                configuration_types.type,
                configuration_types.door,
                system_type_detail_type_configuration_types.required,
                system_type_detail_type_configuration_types.mirrorable,
                system_type_detail_type_configuration_types.presentation_level,
                system_type_detail_type_configuration_types.override_level
            FROM configuration_types
            INNER JOIN system_type_detail_type_configuration_types ON system_type_detail_type_configuration_types.configuration_type_id = configuration_types.id
            WHERE system_type_detail_type_configuration_types.system_type_id = stid
            AND system_type_detail_type_configuration_types.detail_type_id = dt.id
        LOOP
            ctos := ctos || ROW(
                ct.id,
                ct.type,
                ct.door,
                ct.required,
                ct.mirrorable,
                ct.presentation_level,
                ct.override_level
            )::CONFIGURATION_TYPE_OUTPUT;
        END LOOP;
        dtos := dtos || ROW(
            ROW(
                dt.id,
                dt.type,
                dt.entrance,
                dt.vertical
            )::DETAIL_TYPE,
            ctos
        )::DETAIL_TYPE_OUTPUT;
    END LOOP;

    RETURN ROW(
        st.id,
        st.type,
        dtos
    )::SYSTEM_TYPE_OUTPUT;
END;
$$;
 H   DROP FUNCTION public.select_entire_system_type(system_type_id integer);
       public       apcdmrglhzyezl    false    838            �           1255    35523265 0   update_entire_elevation(public.entire_elevation)    FUNCTION     �  CREATE FUNCTION public.update_entire_elevation(elevation public.entire_elevation) RETURNS SETOF public.elevations
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- OWNER
    pid INTEGER;
    uid INTEGER;
    -- ELEVATION
    e ALIAS FOR elevation;
    -- LOOP
    ec ENTIRE_ELEVATION_CONTAINER;
    cd ENTIRE_CONTAINER_DETAIL;
    ___ INTEGER;
    real_id INTEGER;
    id_pairs ID_PAIR[];
    -- OUT
    ue ELEVATIONS%ROWTYPE;
BEGIN

    -- CHECK CURRENT USER

    IF e.id IS NOT NULL THEN
        SELECT project_id FROM elevations
        INTO pid
        WHERE id = e.id;
    ELSE
        pid := e.project_id;
    END IF;

    IF pid NOT IN (
        SELECT id FROM projects
        WHERE owner_id = get_current_user_id()
    ) THEN

        RAISE EXCEPTION 'Elevation not owned by user %', get_current_user_id();

    ELSE

        -- IF AUTHORIZED
        
        SELECT * FROM create_or_update_elevation(e) INTO ue;

        -- CREATE OR UPDATE CONTAINERS
        IF e.containers IS NOT NULL
        THEN
            FOREACH ec IN ARRAY e.containers
            LOOP
                SELECT id FROM create_or_update_elevation_container(ec, ue.id) INTO real_id;
                id_pairs := id_pairs || ROW(real_id, ec.fake_id)::ID_PAIR;
            END LOOP;
        END IF;

        -- DELETE DETAILS
        DELETE FROM container_details
        WHERE elevation_id = e.id
        AND id IN (
            SELECT * FROM UNNEST (e.detail_ids_to_delete)
        );

        -- CREATE OR UPDATE DETAILS
        IF e.details IS NOT NULL
        THEN
            FOREACH cd IN ARRAY e.details
            LOOP
                SELECT id FROM create_or_update_container_detail(cd, id_pairs, ue.id) INTO ___;
            END LOOP;
        END IF;

        -- DELETE CONTAINERS
        DELETE FROM elevation_containers
        WHERE elevation_id = e.id
        AND id IN (
            SELECT * FROM UNNEST (e.container_ids_to_delete)
        );

        RETURN QUERY SELECT * FROM (SELECT ue.*) ue;
    
    END IF;
END;
$$;
 Q   DROP FUNCTION public.update_entire_elevation(elevation public.entire_elevation);
       public       apcdmrglhzyezl    false    938    217            �           1255    34642808 *   update_entire_system(public.entire_system)    FUNCTION     �  CREATE FUNCTION public.update_entire_system(system public.entire_system) RETURNS SETOF public.systems
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- SYSTEM
    s ALIAS FOR system;
    -- LOOP
    so ENTIRE_SYSTEM_OPTION;
    sco ENTIRE_SYSTEM_CONFIGURATION_OVERRIDE;
    ___ INTEGER;
    -- OUT
    us SYSTEMS%ROWTYPE;
BEGIN
    SELECT * FROM create_or_update_system(s) INTO us;

    -- SYSTEM TAGS
    INSERT INTO system_system_tags (
        system_id,
        system_tag_id
    )
    SELECT
        us.id AS system_id,
        st AS system_tag_id
    FROM UNNEST (s.system_tag_ids) st
    ON CONFLICT DO NOTHING;

    DELETE FROM system_system_tags
    WHERE system_id = s.id
    AND system_tag_id IN (
        SELECT * FROM UNNEST (s.system_tag_ids_to_delete)
    );

    -- SYSTEM TAGS
    INSERT INTO system_system_tags (
        system_id,
        system_tag_id
    )
    SELECT
        us.id AS system_id,
        st AS system_tag_id
    FROM UNNEST (s.system_tag_ids) st
    ON CONFLICT DO NOTHING;

    DELETE FROM system_system_tags
    WHERE system_id = s.id
    AND system_tag_id IN (
        SELECT * FROM UNNEST (s.system_tag_ids_to_delete)
    );

    -- INFILL SIZES
    INSERT INTO system_infill_sizes (
        system_id,
        infill_size
    )
    SELECT
        us.id AS system_id,
        iz AS infill_size
    FROM UNNEST (s.infill_sizes) iz
    ON CONFLICT DO NOTHING;

    DELETE FROM system_infill_sizes
    WHERE system_id = s.id
    AND infill_size IN (
        SELECT * FROM UNNEST (s.infill_sizes_to_delete)
    );

    -- INFILL POCKET SIZES
    INSERT INTO system_infill_pocket_sizes (
        system_id,
        infill_pocket_size
    )
    SELECT
        us.id AS system_id,
        ips AS infill_pocket_size
    FROM UNNEST (s.infill_pocket_sizes) ips
    ON CONFLICT DO NOTHING;

    DELETE FROM system_infill_pocket_sizes
    WHERE system_id = s.id
    AND infill_pocket_size IN (
        SELECT * FROM UNNEST (s.infill_pocket_sizes_to_delete)
    );

    -- INFILL POCKET TYPES
    INSERT INTO system_infill_pocket_types (
        system_id,
        infill_pocket_type_id
    )
    SELECT
        us.id AS system_id,
        ipt AS infill_pocket_type_id
    FROM UNNEST (s.infill_pocket_type_ids) ipt
    ON CONFLICT DO NOTHING;

    DELETE FROM system_infill_pocket_types
    WHERE system_id = s.id
    AND infill_pocket_type_id IN (
        SELECT * FROM UNNEST (s.infill_pocket_type_ids_to_delete)
    );

    -- INVALID CONFIGURATIONS
    INSERT INTO invalid_system_configuration_types (
        system_id,
        invalid_configuration_type_id
    )
    SELECT
        us.id AS system_id,
        ict AS invalid_configuration_type_id
    FROM UNNEST (s.invalid_configuration_type_ids) ict
    ON CONFLICT DO NOTHING;

    DELETE FROM invalid_system_configuration_types
    WHERE system_id = s.id
    AND invalid_configuration_type_id IN (
        SELECT * FROM UNNEST (s.invalid_configuration_type_ids_to_delete)
    );

    -- CONFIGURATION OVERRIDES
    IF s.configuration_overrides IS NOT NULL
    THEN
        FOREACH sco IN ARRAY s.configuration_overrides
        LOOP
            SELECT system_id FROM create_or_update_configuration_override(sco, us.id, us.system_type_id) INTO ___;
        END LOOP;
    END IF;

    IF s.configuration_overrides_to_delete IS NOT NULL
    THEN
        FOREACH sco IN ARRAY s.configuration_overrides_to_delete
        LOOP
            SELECT system_id FROM delete_configuration_override(sco, us.id, us.system_type_id) INTO ___;
        END LOOP;
    END IF;

    -- OPTIONS
    IF s.system_options IS NOT NULL
    THEN
        FOREACH so IN ARRAY s.system_options
        LOOP
            SELECT id FROM update_entire_system_option(so, us.id) INTO ___;
        END LOOP;
    END IF;

    DELETE FROM system_options
    WHERE system_id = s.id
    AND id IN (
        SELECT * FROM UNNEST (s.system_option_ids_to_delete)
    );

    RETURN QUERY SELECT * FROM (SELECT us.*) us;
END;
$$;
 H   DROP FUNCTION public.update_entire_system(system public.entire_system);
       public       apcdmrglhzyezl    false    897    236            �           1255    34642815 A   update_entire_system_option(public.entire_system_option, integer)    FUNCTION     r  CREATE FUNCTION public.update_entire_system_option(system_option public.entire_system_option, system_id integer) RETURNS SETOF public.system_options
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- OPTION
    so ALIAS FOR system_option;
    sid INTEGER = CASE WHEN system_id IS NOT NULL
        THEN system_id
        ELSE so.system_id END;
    -- LOOP
    ov entire_option_value;
    ___ INTEGER;
    -- OUT
    uso system_options%ROWTYPE;
BEGIN
    SELECT * FROM create_or_update_system_option(so, sid) INTO uso;

    -- OPTION VALUES
    FOREACH ov IN ARRAY so.option_values
    LOOP
        SELECT id FROM create_or_update_option_value(ov, uso.id) INTO ___;
    END LOOP;

    DELETE FROM option_values
        WHERE system_option_id = uso.id
        AND id IN (
            SELECT * FROM UNNEST (so.option_value_ids_to_delete)
        );
    
    -- CONFIGURATION TYPES
    INSERT INTO system_option_configuration_types (
        system_option_id,
        configuration_type_id
    )
    SELECT
        uso.id AS system_option_id,
        ct AS configuration_type_id
    FROM UNNEST (so.configuration_type_ids) ct;

    DELETE FROM system_option_configuration_types
        WHERE system_option_id = uso.id
        AND configuration_type_id IN (
            SELECT * FROM UNNEST (so.configuration_type_ids_to_delete)
        );
    
    RETURN QUERY SELECT * FROM (SELECT uso.*) uso;
END;
$$;
 p   DROP FUNCTION public.update_entire_system_option(system_option public.entire_system_option, system_id integer);
       public       apcdmrglhzyezl    false    240    891            �           1255    35025791 2   update_entire_system_set(public.entire_system_set)    FUNCTION     g
  CREATE FUNCTION public.update_entire_system_set(system_set public.entire_system_set) RETURNS public.system_set_output
    LANGUAGE plpgsql
    AS $$
DECLARE
    ss ALIAS FOR system_set;
    uss system_sets%ROWTYPE;
    sov SELECTED_OPTION_VALUE;
    sdtct SELECTED_DETAIL_TYPE_CONFIGURATION_TYPE;
BEGIN
    SELECT * FROM create_or_update_system_set(ss) INTO uss;
    
    -- SELECTED OPTION VALUES
    IF ss.system_options IS NOT NULL
    THEN
        FOREACH sov IN ARRAY ss.system_options
        LOOP
            IF sov.system_option_id IS NOT NULL
            AND sov.option_value_id IS NOT NULL
            THEN
                DELETE FROM system_set_option_values
                WHERE system_set_option_values.system_set_id = uss.id
                AND system_set_option_values.system_option_id = sov.system_option_id;

                INSERT INTO system_set_option_values (
                    system_set_id,
                    system_id,
                    system_type_id,
                    system_option_id,
                    option_value_id
                ) VALUES (
                    uss.id,
                    uss.system_id,
                    uss.system_type_id,
                    sov.system_option_id,
                    sov.option_value_id
                );
            END IF;
        END LOOP;
    END IF;

    -- SELECTED CONFIGURATION TYPES
    IF ss.detail_type_configuration_types IS NOT NULL
    THEN
        INSERT INTO system_set_detail_type_configuration_types (
            system_set_id,
            system_id,
            system_type_id,
            detail_type_id,
            configuration_type_id
        )
        SELECT
            uss.id AS system_id,
            uss.system_id AS system_id,
            uss.system_type_id AS system_type_id,
            dtct.detail_type_id AS detail_type_id,
            dtct.configuration_type_id AS configuration_type_id
        FROM UNNEST (ss.detail_type_configuration_types) dtct
        ON CONFLICT DO NOTHING;
    END IF;

    -- UNSELECTED CONFIGURATION TYPES
    IF ss.detail_type_configuration_types_to_unselect IS NOT NULL
    THEN
        FOREACH sdtct IN ARRAY ss.detail_type_configuration_types_to_unselect
        LOOP
            DELETE FROM system_set_detail_type_configuration_types
            WHERE system_set_detail_type_configuration_types.system_set_id = uss.id
            AND system_set_detail_type_configuration_types.detail_type_id = sdtct.detail_type_id
            AND system_set_detail_type_configuration_types.configuration_type_id = sdtct.configuration_type_id;
        END LOOP;
    END IF;

    RETURN select_entire_system_set(uss.id);
END;
$$;
 T   DROP FUNCTION public.update_entire_system_set(system_set public.entire_system_set);
       public       apcdmrglhzyezl    false    953    906            �           1255    26955968 e   update_intermediate_table(text, text, text, double precision, double precision[], double precision[])    FUNCTION     �  CREATE FUNCTION public.update_intermediate_table(table_name text, main_fk_name text, other_fk_name text, main_fk_value double precision, other_fk_array double precision[], other_fk_to_delete_array double precision[]) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO "table_name" (
        "main_fk_name",
        "other_fk_name"
    )
    SELECT
        main_fk_value AS "main_fk_name",
        other_fk_value AS "other_fk_name"
    FROM UNNEST (other_fk_array) other_fk_value;

    DELETE FROM "table_name"
    WHERE "main_fk_name" = main_fk_value
    AND "other_fk_name" IN (
        SELECT * FROM UNNEST (other_fk_to_delete_array)
    );
END;
$$;
 �   DROP FUNCTION public.update_intermediate_table(table_name text, main_fk_name text, other_fk_name text, main_fk_value double precision, other_fk_array double precision[], other_fk_to_delete_array double precision[]);
       public       apcdmrglhzyezl    false            v           1255    35538235 !   update_password(text, text, text)    FUNCTION       CREATE FUNCTION public.update_password(username text, old_password text, new_password text) RETURNS users.jwt
    LANGUAGE plpgsql
    AS $$
DECLARE
    un ALIAS FOR username;
    opw ALIAS FOR old_password;
    npw ALIAS FOR new_password;
    jwt users.JWT;
BEGIN

    IF authenticate(un, opw) IS NOT NULL THEN
        UPDATE users.users
        SET password_hash = CRYPT(npw, GEN_SALT('md5'))
        WHERE users.users.username = un;
    ELSE RETURN NULL;
    END IF;

    RETURN authenticate(un, npw);

END;
$$;
 [   DROP FUNCTION public.update_password(username text, old_password text, new_password text);
       public       apcdmrglhzyezl    false    956            �           1255    35584735    admin_only()    FUNCTION     @  CREATE FUNCTION users.admin_only() RETURNS void
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    IF NOT EXISTS (
        SELECT id FROM users.users
        WHERE id = get_current_user_id()
        AND role = 'admin'
    ) THEN
        RAISE EXCEPTION 'User % is not an admin', get_current_user_id();
    END IF;
END;
$$;
 "   DROP FUNCTION users.admin_only();
       users       apcdmrglhzyezl    false    4            �           1255    35527459 =   create_user(character varying, character varying, users.role)    FUNCTION     �  CREATE FUNCTION users.create_user(username character varying, password character varying, role users.role) RETURNS users.jwt
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
DECLARE
    uid INTEGER;
    un ALIAS FOR username;
    pw ALIAS FOR password;
    r ALIAS FOR role;
    hash TEXT;
BEGIN
    hash := CRYPT(pw, GEN_SALT('md5'));

    INSERT INTO users.users (
        username,
        password_hash,
        role
    ) VALUES (
        un,
        hash,
        r
    ) RETURNING id INTO uid;

    INSERT INTO projects (
        name,
        owner_id
    ) VALUES (
        'Demo Project',
        uid
    );

    RETURN public.authenticate(un, pw);
END;
$$;
 j   DROP FUNCTION users.create_user(username character varying, password character varying, role users.role);
       users       apcdmrglhzyezl    false    4    959    956                       1259    34629984    brake_metal_pockets    TABLE     �   CREATE TABLE public.brake_metal_pockets (
    id integer NOT NULL,
    part_orientation_id integer,
    angle double precision,
    back double precision,
    inside double precision,
    outside double precision
);
 '   DROP TABLE public.brake_metal_pockets;
       public         apcdmrglhzyezl    false                       1259    34629982    brake_metal_pockets_id_seq    SEQUENCE     �   CREATE SEQUENCE public.brake_metal_pockets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.brake_metal_pockets_id_seq;
       public       apcdmrglhzyezl    false    276            �           0    0    brake_metal_pockets_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.brake_metal_pockets_id_seq OWNED BY public.brake_metal_pockets.id;
            public       apcdmrglhzyezl    false    275            P           1259    35336428    bug_reports    TABLE     �   CREATE TABLE public.bug_reports (
    id integer NOT NULL,
    user_id integer,
    location character varying(500),
    report character varying(2500),
    state jsonb,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.bug_reports;
       public         apcdmrglhzyezl    false            O           1259    35336426    bug_reports_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bug_reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.bug_reports_id_seq;
       public       apcdmrglhzyezl    false    336            �           0    0    bug_reports_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.bug_reports_id_seq OWNED BY public.bug_reports.id;
            public       apcdmrglhzyezl    false    335            &           1259    34630207    configuration_name_override    TABLE     �   CREATE TABLE public.configuration_name_override (
    manufacturer_id integer NOT NULL,
    configuration_type_id integer NOT NULL,
    name_override character varying(50)
);
 /   DROP TABLE public.configuration_name_override;
       public         apcdmrglhzyezl    false            %           1259    34630192    configuration_option_values    TABLE     �   CREATE TABLE public.configuration_option_values (
    configuration_id integer NOT NULL,
    option_value_id integer NOT NULL
);
 /   DROP TABLE public.configuration_option_values;
       public         apcdmrglhzyezl    false            !           1259    34630123    configuration_parts    TABLE     �   CREATE TABLE public.configuration_parts (
    id integer NOT NULL,
    configuration_id integer,
    linetype_id integer,
    part_orientation_id integer,
    transform double precision[]
);
 '   DROP TABLE public.configuration_parts;
       public         apcdmrglhzyezl    false                        1259    34630121    configuration_parts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.configuration_parts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.configuration_parts_id_seq;
       public       apcdmrglhzyezl    false    289            �           0    0    configuration_parts_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.configuration_parts_id_seq OWNED BY public.configuration_parts.id;
            public       apcdmrglhzyezl    false    288                       1259    34630102    configuration_transformations    TABLE     ;  CREATE TABLE public.configuration_transformations (
    id integer NOT NULL,
    detail_type_id integer,
    configuration_id integer,
    configuration_transform double precision[],
    detail_transform double precision[],
    center_point double precision[],
    direction double precision,
    range numrange
);
 1   DROP TABLE public.configuration_transformations;
       public         apcdmrglhzyezl    false                       1259    34630100 $   configuration_transformations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.configuration_transformations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.configuration_transformations_id_seq;
       public       apcdmrglhzyezl    false    287            �           0    0 $   configuration_transformations_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.configuration_transformations_id_seq OWNED BY public.configuration_transformations.id;
            public       apcdmrglhzyezl    false    286                       1259    34630062    configuration_type_part_types    TABLE     �   CREATE TABLE public.configuration_type_part_types (
    configuration_type_id integer NOT NULL,
    part_type_id integer NOT NULL
);
 1   DROP TABLE public.configuration_type_part_types;
       public         apcdmrglhzyezl    false            �            1259    34629806    configuration_types    TABLE     w   CREATE TABLE public.configuration_types (
    id integer NOT NULL,
    type character varying(50),
    door boolean
);
 '   DROP TABLE public.configuration_types;
       public         apcdmrglhzyezl    false            �            1259    34629804    configuration_types_id_seq    SEQUENCE     �   CREATE SEQUENCE public.configuration_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.configuration_types_id_seq;
       public       apcdmrglhzyezl    false    248            �           0    0    configuration_types_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.configuration_types_id_seq OWNED BY public.configuration_types.id;
            public       apcdmrglhzyezl    false    247                       1259    34630079    configurations    TABLE       CREATE TABLE public.configurations (
    id integer NOT NULL,
    configuration_type_id integer,
    infill_pocket_type_id integer,
    infill_size integer,
    brake_metal boolean,
    sightline double precision,
    complete boolean,
    completed_at timestamp without time zone
);
 "   DROP TABLE public.configurations;
       public         apcdmrglhzyezl    false                       1259    34630077    configurations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.configurations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.configurations_id_seq;
       public       apcdmrglhzyezl    false    285            �           0    0    configurations_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.configurations_id_seq OWNED BY public.configurations.id;
            public       apcdmrglhzyezl    false    284            �            1259    32048472    container_details_id_seq    SEQUENCE     �   CREATE SEQUENCE public.container_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.container_details_id_seq;
       public       apcdmrglhzyezl    false    221            �           0    0    container_details_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.container_details_id_seq OWNED BY public.container_details.id;
            public       apcdmrglhzyezl    false    220            �            1259    32048499    detail_option_values    TABLE     �   CREATE TABLE public.detail_option_values (
    id integer NOT NULL,
    container_detail_id integer,
    option_value_id integer
);
 (   DROP TABLE public.detail_option_values;
       public         apcdmrglhzyezl    false            �            1259    32048497    detail_option_values_id_seq    SEQUENCE     �   CREATE SEQUENCE public.detail_option_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.detail_option_values_id_seq;
       public       apcdmrglhzyezl    false    223            �           0    0    detail_option_values_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.detail_option_values_id_seq OWNED BY public.detail_option_values.id;
            public       apcdmrglhzyezl    false    222            �            1259    34629798    detail_types    TABLE     �   CREATE TABLE public.detail_types (
    id integer NOT NULL,
    type character varying(50),
    entrance boolean,
    vertical boolean
);
     DROP TABLE public.detail_types;
       public         apcdmrglhzyezl    false            �            1259    34629796    detail_types_id_seq    SEQUENCE     �   CREATE SEQUENCE public.detail_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.detail_types_id_seq;
       public       apcdmrglhzyezl    false    246            �           0    0    detail_types_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.detail_types_id_seq OWNED BY public.detail_types.id;
            public       apcdmrglhzyezl    false    245            �            1259    32048455    elevation_containers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.elevation_containers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.elevation_containers_id_seq;
       public       apcdmrglhzyezl    false    219            �           0    0    elevation_containers_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.elevation_containers_id_seq OWNED BY public.elevation_containers.id;
            public       apcdmrglhzyezl    false    218            �            1259    32048444    elevations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.elevations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.elevations_id_seq;
       public       apcdmrglhzyezl    false    217            �           0    0    elevations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.elevations_id_seq OWNED BY public.elevations.id;
            public       apcdmrglhzyezl    false    216                       1259    34629880    fastener_head_types    TABLE     e   CREATE TABLE public.fastener_head_types (
    id integer NOT NULL,
    type character varying(50)
);
 '   DROP TABLE public.fastener_head_types;
       public         apcdmrglhzyezl    false                       1259    34629878    fastener_head_types_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fastener_head_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.fastener_head_types_id_seq;
       public       apcdmrglhzyezl    false    264            �           0    0    fastener_head_types_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.fastener_head_types_id_seq OWNED BY public.fastener_head_types.id;
            public       apcdmrglhzyezl    false    263                       1259    34629997    fastener_locations    TABLE     �   CREATE TABLE public.fastener_locations (
    id integer NOT NULL,
    part_orientation_id integer,
    orientation_id integer,
    transform double precision[]
);
 &   DROP TABLE public.fastener_locations;
       public         apcdmrglhzyezl    false                       1259    34629995    fastener_locations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fastener_locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.fastener_locations_id_seq;
       public       apcdmrglhzyezl    false    278            �           0    0    fastener_locations_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.fastener_locations_id_seq OWNED BY public.fastener_locations.id;
            public       apcdmrglhzyezl    false    277                       1259    34629872    fastener_types    TABLE     `   CREATE TABLE public.fastener_types (
    id integer NOT NULL,
    type character varying(50)
);
 "   DROP TABLE public.fastener_types;
       public         apcdmrglhzyezl    false                       1259    34629870    fastener_types_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fastener_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.fastener_types_id_seq;
       public       apcdmrglhzyezl    false    262            �           0    0    fastener_types_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.fastener_types_id_seq OWNED BY public.fastener_types.id;
            public       apcdmrglhzyezl    false    261                       1259    34630018    infill_pocket_locations    TABLE     �   CREATE TABLE public.infill_pocket_locations (
    id integer NOT NULL,
    part_orientation_id integer,
    transform double precision[]
);
 +   DROP TABLE public.infill_pocket_locations;
       public         apcdmrglhzyezl    false                       1259    34630016    infill_pocket_locations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.infill_pocket_locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.infill_pocket_locations_id_seq;
       public       apcdmrglhzyezl    false    280            �           0    0    infill_pocket_locations_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.infill_pocket_locations_id_seq OWNED BY public.infill_pocket_locations.id;
            public       apcdmrglhzyezl    false    279                       1259    34629865    infill_pocket_sizes    TABLE     P   CREATE TABLE public.infill_pocket_sizes (
    size double precision NOT NULL
);
 '   DROP TABLE public.infill_pocket_sizes;
       public         apcdmrglhzyezl    false                       1259    34629856    infill_pocket_types    TABLE     �   CREATE TABLE public.infill_pocket_types (
    id integer NOT NULL,
    type character varying(50),
    description character varying(5000),
    captured boolean
);
 '   DROP TABLE public.infill_pocket_types;
       public         apcdmrglhzyezl    false                       1259    34629854    infill_pocket_types_id_seq    SEQUENCE     �   CREATE SEQUENCE public.infill_pocket_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.infill_pocket_types_id_seq;
       public       apcdmrglhzyezl    false    259            �           0    0    infill_pocket_types_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.infill_pocket_types_id_seq OWNED BY public.infill_pocket_types.id;
            public       apcdmrglhzyezl    false    258            �            1259    34629699    infill_sizes    TABLE     I   CREATE TABLE public.infill_sizes (
    size double precision NOT NULL
);
     DROP TABLE public.infill_sizes;
       public         apcdmrglhzyezl    false            )           1259    34630252 "   invalid_system_configuration_types    TABLE     �   CREATE TABLE public.invalid_system_configuration_types (
    system_id integer NOT NULL,
    invalid_configuration_type_id integer NOT NULL
);
 6   DROP TABLE public.invalid_system_configuration_types;
       public         apcdmrglhzyezl    false            �            1259    23357197 
   json_table    TABLE     L   CREATE TABLE public.json_table (
    id integer NOT NULL,
    data jsonb
);
    DROP TABLE public.json_table;
       public         apcdmrglhzyezl    false            �            1259    23357195    json_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.json_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.json_table_id_seq;
       public       apcdmrglhzyezl    false    204            �           0    0    json_table_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.json_table_id_seq OWNED BY public.json_table.id;
            public       apcdmrglhzyezl    false    203            �            1259    34629812    line_weights    TABLE     k   CREATE TABLE public.line_weights (
    name character varying(50),
    weight double precision NOT NULL
);
     DROP TABLE public.line_weights;
       public         apcdmrglhzyezl    false            �            1259    34629819 	   linetypes    TABLE     �   CREATE TABLE public.linetypes (
    id integer NOT NULL,
    line_weight integer,
    name character varying(50),
    pattern character varying(50)
);
    DROP TABLE public.linetypes;
       public         apcdmrglhzyezl    false            �            1259    34629817    linetypes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.linetypes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.linetypes_id_seq;
       public       apcdmrglhzyezl    false    251            �           0    0    linetypes_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.linetypes_id_seq OWNED BY public.linetypes.id;
            public       apcdmrglhzyezl    false    250            �            1259    34629677    manufacturers    TABLE     _   CREATE TABLE public.manufacturers (
    id integer NOT NULL,
    name character varying(50)
);
 !   DROP TABLE public.manufacturers;
       public         apcdmrglhzyezl    false            �            1259    34629675    manufacturers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.manufacturers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.manufacturers_id_seq;
       public       apcdmrglhzyezl    false    229            �           0    0    manufacturers_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.manufacturers_id_seq OWNED BY public.manufacturers.id;
            public       apcdmrglhzyezl    false    228            #           1259    34630162 &   option_combination_configuration_types    TABLE     �   CREATE TABLE public.option_combination_configuration_types (
    option_combination_id integer NOT NULL,
    configuration_type_id integer NOT NULL
);
 :   DROP TABLE public.option_combination_configuration_types;
       public         apcdmrglhzyezl    false            "           1259    34630147     option_combination_option_values    TABLE     �   CREATE TABLE public.option_combination_option_values (
    option_combination_id integer NOT NULL,
    option_value_id integer NOT NULL
);
 4   DROP TABLE public.option_combination_option_values;
       public         apcdmrglhzyezl    false            �            1259    34629785    option_combinations    TABLE     V  CREATE TABLE public.option_combinations (
    id integer NOT NULL,
    system_id integer,
    invalid boolean,
    depth_override double precision,
    glass_size_override double precision,
    glass_bite_override double precision,
    sightline_override double precision,
    top_gap_override double precision,
    bottom_gap_override double precision,
    side_gap_override double precision,
    meeting_stile_gap_override double precision,
    glass_gap_override double precision,
    shim_size_override double precision,
    inset_override double precision,
    front_inset_override boolean
);
 '   DROP TABLE public.option_combinations;
       public         apcdmrglhzyezl    false            �            1259    34629783    option_combinations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.option_combinations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.option_combinations_id_seq;
       public       apcdmrglhzyezl    false    244            �           0    0    option_combinations_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.option_combinations_id_seq OWNED BY public.option_combinations.id;
            public       apcdmrglhzyezl    false    243            �            1259    34629765    option_values_id_seq    SEQUENCE     �   CREATE SEQUENCE public.option_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.option_values_id_seq;
       public       apcdmrglhzyezl    false    242            �           0    0    option_values_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.option_values_id_seq OWNED BY public.option_values.id;
            public       apcdmrglhzyezl    false    241            �            1259    34629832    orientations    TABLE     e   CREATE TABLE public.orientations (
    id integer NOT NULL,
    orientation character varying(50)
);
     DROP TABLE public.orientations;
       public         apcdmrglhzyezl    false            �            1259    34629830    orientations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orientations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.orientations_id_seq;
       public       apcdmrglhzyezl    false    253            �           0    0    orientations_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.orientations_id_seq OWNED BY public.orientations.id;
            public       apcdmrglhzyezl    false    252                       1259    34629929    part_orientations    TABLE     �   CREATE TABLE public.part_orientations (
    id integer NOT NULL,
    part_id integer,
    orientation_id integer,
    path character varying(25000)
);
 %   DROP TABLE public.part_orientations;
       public         apcdmrglhzyezl    false                       1259    34629927    part_orientations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.part_orientations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.part_orientations_id_seq;
       public       apcdmrglhzyezl    false    270            �           0    0    part_orientations_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.part_orientations_id_seq OWNED BY public.part_orientations.id;
            public       apcdmrglhzyezl    false    269                       1259    34630047    part_part_tags    TABLE     g   CREATE TABLE public.part_part_tags (
    part_id integer NOT NULL,
    part_tag_id integer NOT NULL
);
 "   DROP TABLE public.part_part_tags;
       public         apcdmrglhzyezl    false                       1259    34630032    part_part_types    TABLE     i   CREATE TABLE public.part_part_types (
    part_id integer NOT NULL,
    part_type_id integer NOT NULL
);
 #   DROP TABLE public.part_part_types;
       public         apcdmrglhzyezl    false                       1259    34629848 	   part_tags    TABLE     Z   CREATE TABLE public.part_tags (
    id integer NOT NULL,
    tag character varying(50)
);
    DROP TABLE public.part_tags;
       public         apcdmrglhzyezl    false                        1259    34629846    part_tags_id_seq    SEQUENCE     �   CREATE SEQUENCE public.part_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.part_tags_id_seq;
       public       apcdmrglhzyezl    false    257            �           0    0    part_tags_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.part_tags_id_seq OWNED BY public.part_tags.id;
            public       apcdmrglhzyezl    false    256            �            1259    34629840 
   part_types    TABLE     \   CREATE TABLE public.part_types (
    id integer NOT NULL,
    type character varying(50)
);
    DROP TABLE public.part_types;
       public         apcdmrglhzyezl    false            �            1259    34629838    part_types_id_seq    SEQUENCE     �   CREATE SEQUENCE public.part_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.part_types_id_seq;
       public       apcdmrglhzyezl    false    255            �           0    0    part_types_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.part_types_id_seq OWNED BY public.part_types.id;
            public       apcdmrglhzyezl    false    254                       1259    34629896    parts    TABLE     �  CREATE TABLE public.parts (
    id integer NOT NULL,
    manufacturer_id integer,
    system_id integer,
    fastener_type_id integer,
    fastener_head_type_id integer,
    thread_representation_id integer,
    name character varying(50),
    part_number character varying(50),
    system_agnostic boolean,
    pocket_count integer,
    door boolean,
    diameter double precision,
    length double precision
);
    DROP TABLE public.parts;
       public         apcdmrglhzyezl    false                       1259    34629894    parts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.parts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.parts_id_seq;
       public       apcdmrglhzyezl    false    268            �           0    0    parts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.parts_id_seq OWNED BY public.parts.id;
            public       apcdmrglhzyezl    false    267            �            1259    24024030    practice_one    TABLE     M   CREATE TABLE public.practice_one (
    id integer NOT NULL,
    name text
);
     DROP TABLE public.practice_one;
       public         apcdmrglhzyezl    false            �            1259    24024028    practice_one_id_seq    SEQUENCE     �   CREATE SEQUENCE public.practice_one_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.practice_one_id_seq;
       public       apcdmrglhzyezl    false    206            �           0    0    practice_one_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.practice_one_id_seq OWNED BY public.practice_one.id;
            public       apcdmrglhzyezl    false    205            .           1259    34991969    projects_id_seq    SEQUENCE     �   CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.projects_id_seq;
       public       apcdmrglhzyezl    false    303            �           0    0    projects_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;
            public       apcdmrglhzyezl    false    302            (           1259    34630237    system_infill_pocket_sizes    TABLE     �   CREATE TABLE public.system_infill_pocket_sizes (
    system_id integer NOT NULL,
    infill_pocket_size double precision NOT NULL
);
 .   DROP TABLE public.system_infill_pocket_sizes;
       public         apcdmrglhzyezl    false            '           1259    34630222    system_infill_pocket_types    TABLE        CREATE TABLE public.system_infill_pocket_types (
    system_id integer NOT NULL,
    infill_pocket_type_id integer NOT NULL
);
 .   DROP TABLE public.system_infill_pocket_types;
       public         apcdmrglhzyezl    false            �            1259    34629722    system_infill_sizes    TABLE     w   CREATE TABLE public.system_infill_sizes (
    system_id integer NOT NULL,
    infill_size double precision NOT NULL
);
 '   DROP TABLE public.system_infill_sizes;
       public         apcdmrglhzyezl    false            $           1259    34630177 !   system_option_configuration_types    TABLE     �   CREATE TABLE public.system_option_configuration_types (
    system_option_id integer NOT NULL,
    configuration_type_id integer NOT NULL
);
 5   DROP TABLE public.system_option_configuration_types;
       public         apcdmrglhzyezl    false            �            1259    34629752    system_options_id_seq    SEQUENCE     �   CREATE SEQUENCE public.system_options_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.system_options_id_seq;
       public       apcdmrglhzyezl    false    240            �           0    0    system_options_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.system_options_id_seq OWNED BY public.system_options.id;
            public       apcdmrglhzyezl    false    239            E           1259    35007230 *   system_set_detail_type_configuration_types    TABLE     �   CREATE TABLE public.system_set_detail_type_configuration_types (
    system_set_id integer,
    system_id integer NOT NULL,
    system_type_id integer,
    detail_type_id integer NOT NULL,
    configuration_type_id integer NOT NULL
);
 >   DROP TABLE public.system_set_detail_type_configuration_types;
       public         apcdmrglhzyezl    false            D           1259    35007205    system_set_option_values    TABLE     �   CREATE TABLE public.system_set_option_values (
    system_set_id integer,
    system_id integer NOT NULL,
    system_type_id integer,
    system_option_id integer NOT NULL,
    option_value_id integer
);
 ,   DROP TABLE public.system_set_option_values;
       public         apcdmrglhzyezl    false            B           1259    35007165    system_sets_id_seq    SEQUENCE     �   CREATE SEQUENCE public.system_sets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.system_sets_id_seq;
       public       apcdmrglhzyezl    false    323            �           0    0    system_sets_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.system_sets_id_seq OWNED BY public.system_sets.id;
            public       apcdmrglhzyezl    false    322            �            1259    34629737    system_system_tags    TABLE     o   CREATE TABLE public.system_system_tags (
    system_id integer NOT NULL,
    system_tag_id integer NOT NULL
);
 &   DROP TABLE public.system_system_tags;
       public         apcdmrglhzyezl    false            �            1259    34629685    system_tags    TABLE     \   CREATE TABLE public.system_tags (
    id integer NOT NULL,
    tag character varying(50)
);
    DROP TABLE public.system_tags;
       public         apcdmrglhzyezl    false            �            1259    34629683    system_tags_id_seq    SEQUENCE     �   CREATE SEQUENCE public.system_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.system_tags_id_seq;
       public       apcdmrglhzyezl    false    231            �           0    0    system_tags_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.system_tags_id_seq OWNED BY public.system_tags.id;
            public       apcdmrglhzyezl    false    230            +           1259    34630269 +   system_type_detail_type_configuration_types    TABLE     F  CREATE TABLE public.system_type_detail_type_configuration_types (
    id integer NOT NULL,
    system_type_id integer,
    detail_type_id integer,
    configuration_type_id integer,
    required boolean,
    mirrorable boolean,
    presentation_level public.presentation_level,
    override_level public.presentation_level
);
 ?   DROP TABLE public.system_type_detail_type_configuration_types;
       public         apcdmrglhzyezl    false    801    801            *           1259    34630267 2   system_type_detail_type_configuration_types_id_seq    SEQUENCE     �   CREATE SEQUENCE public.system_type_detail_type_configuration_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 I   DROP SEQUENCE public.system_type_detail_type_configuration_types_id_seq;
       public       apcdmrglhzyezl    false    299            �           0    0 2   system_type_detail_type_configuration_types_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.system_type_detail_type_configuration_types_id_seq OWNED BY public.system_type_detail_type_configuration_types.id;
            public       apcdmrglhzyezl    false    298            �            1259    34629693    system_types    TABLE     ^   CREATE TABLE public.system_types (
    id integer NOT NULL,
    type character varying(50)
);
     DROP TABLE public.system_types;
       public         apcdmrglhzyezl    false            �            1259    34629691    system_types_id_seq    SEQUENCE     �   CREATE SEQUENCE public.system_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.system_types_id_seq;
       public       apcdmrglhzyezl    false    233            �           0    0    system_types_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.system_types_id_seq OWNED BY public.system_types.id;
            public       apcdmrglhzyezl    false    232            �            1259    34629704    systems_id_seq    SEQUENCE     �   CREATE SEQUENCE public.systems_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.systems_id_seq;
       public       apcdmrglhzyezl    false    236            �           0    0    systems_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.systems_id_seq OWNED BY public.systems.id;
            public       apcdmrglhzyezl    false    235                       1259    34629952    thermal_pocket_types    TABLE     i   CREATE TABLE public.thermal_pocket_types (
    id integer NOT NULL,
    path character varying(10000)
);
 (   DROP TABLE public.thermal_pocket_types;
       public         apcdmrglhzyezl    false                       1259    34629950    thermal_pocket_types_id_seq    SEQUENCE     �   CREATE SEQUENCE public.thermal_pocket_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.thermal_pocket_types_id_seq;
       public       apcdmrglhzyezl    false    272            �           0    0    thermal_pocket_types_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.thermal_pocket_types_id_seq OWNED BY public.thermal_pocket_types.id;
            public       apcdmrglhzyezl    false    271                       1259    34629963    thermal_pockets    TABLE     �   CREATE TABLE public.thermal_pockets (
    id integer NOT NULL,
    part_orientation_id integer,
    thermal_pocket_type_id integer,
    transform double precision[]
);
 #   DROP TABLE public.thermal_pockets;
       public         apcdmrglhzyezl    false                       1259    34629961    thermal_pockets_id_seq    SEQUENCE     �   CREATE SEQUENCE public.thermal_pockets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.thermal_pockets_id_seq;
       public       apcdmrglhzyezl    false    274            �           0    0    thermal_pockets_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.thermal_pockets_id_seq OWNED BY public.thermal_pockets.id;
            public       apcdmrglhzyezl    false    273            
           1259    34629888    thread_representations    TABLE     h   CREATE TABLE public.thread_representations (
    id integer NOT NULL,
    type character varying(50)
);
 *   DROP TABLE public.thread_representations;
       public         apcdmrglhzyezl    false            	           1259    34629886    thread_representations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.thread_representations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.thread_representations_id_seq;
       public       apcdmrglhzyezl    false    266            �           0    0    thread_representations_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.thread_representations_id_seq OWNED BY public.thread_representations.id;
            public       apcdmrglhzyezl    false    265            T           1259    35681205    other_private_table_id_seq    SEQUENCE     �   CREATE SEQUENCE users.other_private_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE users.other_private_table_id_seq;
       users       apcdmrglhzyezl    false    341    4            �           0    0    other_private_table_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE users.other_private_table_id_seq OWNED BY users.other_private_table.id;
            users       apcdmrglhzyezl    false    340            R           1259    35681197    private_table_id_seq    SEQUENCE     �   CREATE SEQUENCE users.private_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE users.private_table_id_seq;
       users       apcdmrglhzyezl    false    4    339            �           0    0    private_table_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE users.private_table_id_seq OWNED BY users.private_table.id;
            users       apcdmrglhzyezl    false    338            M           1259    35220482    users    TABLE       CREATE TABLE users.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password_hash character varying(1500) NOT NULL,
    role users.role DEFAULT 'client'::users.role NOT NULL,
    last_auth timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE users.users;
       users         apcdmrglhzyezl    false    959    4    959            L           1259    35220480    users_id_seq    SEQUENCE     �   CREATE SEQUENCE users.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE users.users_id_seq;
       users       apcdmrglhzyezl    false    4    333            �           0    0    users_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE users.users_id_seq OWNED BY users.users.id;
            users       apcdmrglhzyezl    false    332            �           2604    34629987    brake_metal_pockets id    DEFAULT     �   ALTER TABLE ONLY public.brake_metal_pockets ALTER COLUMN id SET DEFAULT nextval('public.brake_metal_pockets_id_seq'::regclass);
 E   ALTER TABLE public.brake_metal_pockets ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    275    276    276            �           2604    35336431    bug_reports id    DEFAULT     p   ALTER TABLE ONLY public.bug_reports ALTER COLUMN id SET DEFAULT nextval('public.bug_reports_id_seq'::regclass);
 =   ALTER TABLE public.bug_reports ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    336    335    336            �           2604    34630126    configuration_parts id    DEFAULT     �   ALTER TABLE ONLY public.configuration_parts ALTER COLUMN id SET DEFAULT nextval('public.configuration_parts_id_seq'::regclass);
 E   ALTER TABLE public.configuration_parts ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    288    289    289            �           2604    34630105     configuration_transformations id    DEFAULT     �   ALTER TABLE ONLY public.configuration_transformations ALTER COLUMN id SET DEFAULT nextval('public.configuration_transformations_id_seq'::regclass);
 O   ALTER TABLE public.configuration_transformations ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    286    287    287            �           2604    34629809    configuration_types id    DEFAULT     �   ALTER TABLE ONLY public.configuration_types ALTER COLUMN id SET DEFAULT nextval('public.configuration_types_id_seq'::regclass);
 E   ALTER TABLE public.configuration_types ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    248    247    248            �           2604    34630082    configurations id    DEFAULT     v   ALTER TABLE ONLY public.configurations ALTER COLUMN id SET DEFAULT nextval('public.configurations_id_seq'::regclass);
 @   ALTER TABLE public.configurations ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    285    284    285            �           2604    32048477    container_details id    DEFAULT     |   ALTER TABLE ONLY public.container_details ALTER COLUMN id SET DEFAULT nextval('public.container_details_id_seq'::regclass);
 C   ALTER TABLE public.container_details ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    220    221    221            �           2604    32048502    detail_option_values id    DEFAULT     �   ALTER TABLE ONLY public.detail_option_values ALTER COLUMN id SET DEFAULT nextval('public.detail_option_values_id_seq'::regclass);
 F   ALTER TABLE public.detail_option_values ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    223    222    223            �           2604    34629801    detail_types id    DEFAULT     r   ALTER TABLE ONLY public.detail_types ALTER COLUMN id SET DEFAULT nextval('public.detail_types_id_seq'::regclass);
 >   ALTER TABLE public.detail_types ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    245    246    246            �           2604    32048460    elevation_containers id    DEFAULT     �   ALTER TABLE ONLY public.elevation_containers ALTER COLUMN id SET DEFAULT nextval('public.elevation_containers_id_seq'::regclass);
 F   ALTER TABLE public.elevation_containers ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    218    219    219            �           2604    32048449    elevations id    DEFAULT     n   ALTER TABLE ONLY public.elevations ALTER COLUMN id SET DEFAULT nextval('public.elevations_id_seq'::regclass);
 <   ALTER TABLE public.elevations ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    216    217    217            �           2604    34629883    fastener_head_types id    DEFAULT     �   ALTER TABLE ONLY public.fastener_head_types ALTER COLUMN id SET DEFAULT nextval('public.fastener_head_types_id_seq'::regclass);
 E   ALTER TABLE public.fastener_head_types ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    263    264    264            �           2604    34630000    fastener_locations id    DEFAULT     ~   ALTER TABLE ONLY public.fastener_locations ALTER COLUMN id SET DEFAULT nextval('public.fastener_locations_id_seq'::regclass);
 D   ALTER TABLE public.fastener_locations ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    277    278    278            �           2604    34629875    fastener_types id    DEFAULT     v   ALTER TABLE ONLY public.fastener_types ALTER COLUMN id SET DEFAULT nextval('public.fastener_types_id_seq'::regclass);
 @   ALTER TABLE public.fastener_types ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    262    261    262            �           2604    34630021    infill_pocket_locations id    DEFAULT     �   ALTER TABLE ONLY public.infill_pocket_locations ALTER COLUMN id SET DEFAULT nextval('public.infill_pocket_locations_id_seq'::regclass);
 I   ALTER TABLE public.infill_pocket_locations ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    279    280    280            �           2604    34629859    infill_pocket_types id    DEFAULT     �   ALTER TABLE ONLY public.infill_pocket_types ALTER COLUMN id SET DEFAULT nextval('public.infill_pocket_types_id_seq'::regclass);
 E   ALTER TABLE public.infill_pocket_types ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    259    258    259            �           2604    23357200    json_table id    DEFAULT     n   ALTER TABLE ONLY public.json_table ALTER COLUMN id SET DEFAULT nextval('public.json_table_id_seq'::regclass);
 <   ALTER TABLE public.json_table ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    203    204    204            �           2604    34629822    linetypes id    DEFAULT     l   ALTER TABLE ONLY public.linetypes ALTER COLUMN id SET DEFAULT nextval('public.linetypes_id_seq'::regclass);
 ;   ALTER TABLE public.linetypes ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    251    250    251            �           2604    34629680    manufacturers id    DEFAULT     t   ALTER TABLE ONLY public.manufacturers ALTER COLUMN id SET DEFAULT nextval('public.manufacturers_id_seq'::regclass);
 ?   ALTER TABLE public.manufacturers ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    228    229    229            �           2604    34629788    option_combinations id    DEFAULT     �   ALTER TABLE ONLY public.option_combinations ALTER COLUMN id SET DEFAULT nextval('public.option_combinations_id_seq'::regclass);
 E   ALTER TABLE public.option_combinations ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    244    243    244            �           2604    34629770    option_values id    DEFAULT     t   ALTER TABLE ONLY public.option_values ALTER COLUMN id SET DEFAULT nextval('public.option_values_id_seq'::regclass);
 ?   ALTER TABLE public.option_values ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    241    242    242            �           2604    34629835    orientations id    DEFAULT     r   ALTER TABLE ONLY public.orientations ALTER COLUMN id SET DEFAULT nextval('public.orientations_id_seq'::regclass);
 >   ALTER TABLE public.orientations ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    252    253    253            �           2604    34629932    part_orientations id    DEFAULT     |   ALTER TABLE ONLY public.part_orientations ALTER COLUMN id SET DEFAULT nextval('public.part_orientations_id_seq'::regclass);
 C   ALTER TABLE public.part_orientations ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    270    269    270            �           2604    34629851    part_tags id    DEFAULT     l   ALTER TABLE ONLY public.part_tags ALTER COLUMN id SET DEFAULT nextval('public.part_tags_id_seq'::regclass);
 ;   ALTER TABLE public.part_tags ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    256    257    257            �           2604    34629843    part_types id    DEFAULT     n   ALTER TABLE ONLY public.part_types ALTER COLUMN id SET DEFAULT nextval('public.part_types_id_seq'::regclass);
 <   ALTER TABLE public.part_types ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    255    254    255            �           2604    34629899    parts id    DEFAULT     d   ALTER TABLE ONLY public.parts ALTER COLUMN id SET DEFAULT nextval('public.parts_id_seq'::regclass);
 7   ALTER TABLE public.parts ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    267    268    268            �           2604    24024033    practice_one id    DEFAULT     r   ALTER TABLE ONLY public.practice_one ALTER COLUMN id SET DEFAULT nextval('public.practice_one_id_seq'::regclass);
 >   ALTER TABLE public.practice_one ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    206    205    206            �           2604    34991974    projects id    DEFAULT     j   ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);
 :   ALTER TABLE public.projects ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    302    303    303            �           2604    34629757    system_options id    DEFAULT     v   ALTER TABLE ONLY public.system_options ALTER COLUMN id SET DEFAULT nextval('public.system_options_id_seq'::regclass);
 @   ALTER TABLE public.system_options ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    240    239    240            �           2604    35007170    system_sets id    DEFAULT     p   ALTER TABLE ONLY public.system_sets ALTER COLUMN id SET DEFAULT nextval('public.system_sets_id_seq'::regclass);
 =   ALTER TABLE public.system_sets ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    323    322    323            �           2604    34629688    system_tags id    DEFAULT     p   ALTER TABLE ONLY public.system_tags ALTER COLUMN id SET DEFAULT nextval('public.system_tags_id_seq'::regclass);
 =   ALTER TABLE public.system_tags ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    231    230    231            �           2604    34630272 .   system_type_detail_type_configuration_types id    DEFAULT     �   ALTER TABLE ONLY public.system_type_detail_type_configuration_types ALTER COLUMN id SET DEFAULT nextval('public.system_type_detail_type_configuration_types_id_seq'::regclass);
 ]   ALTER TABLE public.system_type_detail_type_configuration_types ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    299    298    299            �           2604    34629696    system_types id    DEFAULT     r   ALTER TABLE ONLY public.system_types ALTER COLUMN id SET DEFAULT nextval('public.system_types_id_seq'::regclass);
 >   ALTER TABLE public.system_types ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    233    232    233            �           2604    34629709 
   systems id    DEFAULT     h   ALTER TABLE ONLY public.systems ALTER COLUMN id SET DEFAULT nextval('public.systems_id_seq'::regclass);
 9   ALTER TABLE public.systems ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    236    235    236            �           2604    34629955    thermal_pocket_types id    DEFAULT     �   ALTER TABLE ONLY public.thermal_pocket_types ALTER COLUMN id SET DEFAULT nextval('public.thermal_pocket_types_id_seq'::regclass);
 F   ALTER TABLE public.thermal_pocket_types ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    272    271    272            �           2604    34629966    thermal_pockets id    DEFAULT     x   ALTER TABLE ONLY public.thermal_pockets ALTER COLUMN id SET DEFAULT nextval('public.thermal_pockets_id_seq'::regclass);
 A   ALTER TABLE public.thermal_pockets ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    273    274    274            �           2604    34629891    thread_representations id    DEFAULT     �   ALTER TABLE ONLY public.thread_representations ALTER COLUMN id SET DEFAULT nextval('public.thread_representations_id_seq'::regclass);
 H   ALTER TABLE public.thread_representations ALTER COLUMN id DROP DEFAULT;
       public       apcdmrglhzyezl    false    266    265    266            �           2604    35681210    other_private_table id    DEFAULT     ~   ALTER TABLE ONLY users.other_private_table ALTER COLUMN id SET DEFAULT nextval('users.other_private_table_id_seq'::regclass);
 D   ALTER TABLE users.other_private_table ALTER COLUMN id DROP DEFAULT;
       users       apcdmrglhzyezl    false    340    341    341            �           2604    35681202    private_table id    DEFAULT     r   ALTER TABLE ONLY users.private_table ALTER COLUMN id SET DEFAULT nextval('users.private_table_id_seq'::regclass);
 >   ALTER TABLE users.private_table ALTER COLUMN id DROP DEFAULT;
       users       apcdmrglhzyezl    false    339    338    339            �           2604    35220485    users id    DEFAULT     b   ALTER TABLE ONLY users.users ALTER COLUMN id SET DEFAULT nextval('users.users_id_seq'::regclass);
 6   ALTER TABLE users.users ALTER COLUMN id DROP DEFAULT;
       users       apcdmrglhzyezl    false    332    333    333            e          0    34629984    brake_metal_pockets 
   TABLE DATA               d   COPY public.brake_metal_pockets (id, part_orientation_id, angle, back, inside, outside) FROM stdin;
    public       apcdmrglhzyezl    false    276   �      �          0    35336428    bug_reports 
   TABLE DATA               X   COPY public.bug_reports (id, user_id, location, report, state, "timestamp") FROM stdin;
    public       apcdmrglhzyezl    false    336   6�      w          0    34630207    configuration_name_override 
   TABLE DATA               l   COPY public.configuration_name_override (manufacturer_id, configuration_type_id, name_override) FROM stdin;
    public       apcdmrglhzyezl    false    294   ��      v          0    34630192    configuration_option_values 
   TABLE DATA               X   COPY public.configuration_option_values (configuration_id, option_value_id) FROM stdin;
    public       apcdmrglhzyezl    false    293   �      r          0    34630123    configuration_parts 
   TABLE DATA               p   COPY public.configuration_parts (id, configuration_id, linetype_id, part_orientation_id, transform) FROM stdin;
    public       apcdmrglhzyezl    false    289   3�      p          0    34630102    configuration_transformations 
   TABLE DATA               �   COPY public.configuration_transformations (id, detail_type_id, configuration_id, configuration_transform, detail_transform, center_point, direction, range) FROM stdin;
    public       apcdmrglhzyezl    false    287   P�      l          0    34630062    configuration_type_part_types 
   TABLE DATA               \   COPY public.configuration_type_part_types (configuration_type_id, part_type_id) FROM stdin;
    public       apcdmrglhzyezl    false    283   m�      I          0    34629806    configuration_types 
   TABLE DATA               =   COPY public.configuration_types (id, type, door) FROM stdin;
    public       apcdmrglhzyezl    false    248   ��      n          0    34630079    configurations 
   TABLE DATA               �   COPY public.configurations (id, configuration_type_id, infill_pocket_type_id, infill_size, brake_metal, sightline, complete, completed_at) FROM stdin;
    public       apcdmrglhzyezl    false    285   I�      2          0    32048474    container_details 
   TABLE DATA               p   COPY public.container_details (id, elevation_id, first_container_id, second_container_id, vertical) FROM stdin;
    public       apcdmrglhzyezl    false    221   f�      4          0    32048499    detail_option_values 
   TABLE DATA               X   COPY public.detail_option_values (id, container_detail_id, option_value_id) FROM stdin;
    public       apcdmrglhzyezl    false    223   �      G          0    34629798    detail_types 
   TABLE DATA               D   COPY public.detail_types (id, type, entrance, vertical) FROM stdin;
    public       apcdmrglhzyezl    false    246   �      0          0    32048457    elevation_containers 
   TABLE DATA               |   COPY public.elevation_containers (id, elevation_id, original, contents, daylight_opening, custom_rough_opening) FROM stdin;
    public       apcdmrglhzyezl    false    219   0      .          0    32048446 
   elevations 
   TABLE DATA               �   COPY public.elevations (id, name, rough_opening, finished_floor_height, project_id, system_set_id, sightline, preview, last_updated_at, last_updated_by) FROM stdin;
    public       apcdmrglhzyezl    false    217   �      Y          0    34629880    fastener_head_types 
   TABLE DATA               7   COPY public.fastener_head_types (id, type) FROM stdin;
    public       apcdmrglhzyezl    false    264   O;      g          0    34629997    fastener_locations 
   TABLE DATA               `   COPY public.fastener_locations (id, part_orientation_id, orientation_id, transform) FROM stdin;
    public       apcdmrglhzyezl    false    278   l;      W          0    34629872    fastener_types 
   TABLE DATA               2   COPY public.fastener_types (id, type) FROM stdin;
    public       apcdmrglhzyezl    false    262   �;      i          0    34630018    infill_pocket_locations 
   TABLE DATA               U   COPY public.infill_pocket_locations (id, part_orientation_id, transform) FROM stdin;
    public       apcdmrglhzyezl    false    280   �;      U          0    34629865    infill_pocket_sizes 
   TABLE DATA               3   COPY public.infill_pocket_sizes (size) FROM stdin;
    public       apcdmrglhzyezl    false    260   �;      T          0    34629856    infill_pocket_types 
   TABLE DATA               N   COPY public.infill_pocket_types (id, type, description, captured) FROM stdin;
    public       apcdmrglhzyezl    false    259   �;      ;          0    34629699    infill_sizes 
   TABLE DATA               ,   COPY public.infill_sizes (size) FROM stdin;
    public       apcdmrglhzyezl    false    234   �;      z          0    34630252 "   invalid_system_configuration_types 
   TABLE DATA               f   COPY public.invalid_system_configuration_types (system_id, invalid_configuration_type_id) FROM stdin;
    public       apcdmrglhzyezl    false    297   "<      *          0    23357197 
   json_table 
   TABLE DATA               .   COPY public.json_table (id, data) FROM stdin;
    public       apcdmrglhzyezl    false    204   ?<      J          0    34629812    line_weights 
   TABLE DATA               4   COPY public.line_weights (name, weight) FROM stdin;
    public       apcdmrglhzyezl    false    249   a<      L          0    34629819 	   linetypes 
   TABLE DATA               C   COPY public.linetypes (id, line_weight, name, pattern) FROM stdin;
    public       apcdmrglhzyezl    false    251   ~<      6          0    34629677    manufacturers 
   TABLE DATA               1   COPY public.manufacturers (id, name) FROM stdin;
    public       apcdmrglhzyezl    false    229   �<      t          0    34630162 &   option_combination_configuration_types 
   TABLE DATA               n   COPY public.option_combination_configuration_types (option_combination_id, configuration_type_id) FROM stdin;
    public       apcdmrglhzyezl    false    291   �<      s          0    34630147     option_combination_option_values 
   TABLE DATA               b   COPY public.option_combination_option_values (option_combination_id, option_value_id) FROM stdin;
    public       apcdmrglhzyezl    false    290   �<      E          0    34629785    option_combinations 
   TABLE DATA               7  COPY public.option_combinations (id, system_id, invalid, depth_override, glass_size_override, glass_bite_override, sightline_override, top_gap_override, bottom_gap_override, side_gap_override, meeting_stile_gap_override, glass_gap_override, shim_size_override, inset_override, front_inset_override) FROM stdin;
    public       apcdmrglhzyezl    false    244   	=      C          0    34629767    option_values 
   TABLE DATA               t   COPY public.option_values (id, system_option_id, name, value, value_order, mirror_from_option_value_id) FROM stdin;
    public       apcdmrglhzyezl    false    242   &=      N          0    34629832    orientations 
   TABLE DATA               7   COPY public.orientations (id, orientation) FROM stdin;
    public       apcdmrglhzyezl    false    253   Z=      _          0    34629929    part_orientations 
   TABLE DATA               N   COPY public.part_orientations (id, part_id, orientation_id, path) FROM stdin;
    public       apcdmrglhzyezl    false    270   w=      k          0    34630047    part_part_tags 
   TABLE DATA               >   COPY public.part_part_tags (part_id, part_tag_id) FROM stdin;
    public       apcdmrglhzyezl    false    282   �=      j          0    34630032    part_part_types 
   TABLE DATA               @   COPY public.part_part_types (part_id, part_type_id) FROM stdin;
    public       apcdmrglhzyezl    false    281   �=      R          0    34629848 	   part_tags 
   TABLE DATA               ,   COPY public.part_tags (id, tag) FROM stdin;
    public       apcdmrglhzyezl    false    257   �=      P          0    34629840 
   part_types 
   TABLE DATA               .   COPY public.part_types (id, type) FROM stdin;
    public       apcdmrglhzyezl    false    255   �=      ]          0    34629896    parts 
   TABLE DATA               �   COPY public.parts (id, manufacturer_id, system_id, fastener_type_id, fastener_head_type_id, thread_representation_id, name, part_number, system_agnostic, pocket_count, door, diameter, length) FROM stdin;
    public       apcdmrglhzyezl    false    268   >      ,          0    24024030    practice_one 
   TABLE DATA               0   COPY public.practice_one (id, name) FROM stdin;
    public       apcdmrglhzyezl    false    206   %>                0    34991971    projects 
   TABLE DATA               k   COPY public.projects (id, name, owner_id, default_elevation, last_updated_at, last_updated_by) FROM stdin;
    public       apcdmrglhzyezl    false    303   f>      }          0    34630292    system_configuration_overrides 
   TABLE DATA               �   COPY public.system_configuration_overrides (system_id, system_type_id, detail_type_id, configuration_type_id, required_override, mirrorable_override, presentation_level_override, override_level_override) FROM stdin;
    public       apcdmrglhzyezl    false    300   R@      y          0    34630237    system_infill_pocket_sizes 
   TABLE DATA               S   COPY public.system_infill_pocket_sizes (system_id, infill_pocket_size) FROM stdin;
    public       apcdmrglhzyezl    false    296   o@      x          0    34630222    system_infill_pocket_types 
   TABLE DATA               V   COPY public.system_infill_pocket_types (system_id, infill_pocket_type_id) FROM stdin;
    public       apcdmrglhzyezl    false    295   �@      >          0    34629722    system_infill_sizes 
   TABLE DATA               E   COPY public.system_infill_sizes (system_id, infill_size) FROM stdin;
    public       apcdmrglhzyezl    false    237   �@      u          0    34630177 !   system_option_configuration_types 
   TABLE DATA               d   COPY public.system_option_configuration_types (system_option_id, configuration_type_id) FROM stdin;
    public       apcdmrglhzyezl    false    292   �@      A          0    34629754    system_options 
   TABLE DATA               o   COPY public.system_options (id, system_id, name, presentation_level, override_level, option_order) FROM stdin;
    public       apcdmrglhzyezl    false    240   �@      �          0    35007230 *   system_set_detail_type_configuration_types 
   TABLE DATA               �   COPY public.system_set_detail_type_configuration_types (system_set_id, system_id, system_type_id, detail_type_id, configuration_type_id) FROM stdin;
    public       apcdmrglhzyezl    false    325   .A      �          0    35007205    system_set_option_values 
   TABLE DATA                  COPY public.system_set_option_values (system_set_id, system_id, system_type_id, system_option_id, option_value_id) FROM stdin;
    public       apcdmrglhzyezl    false    324   YA      �          0    35007167    system_sets 
   TABLE DATA               ]   COPY public.system_sets (id, project_id, system_id, system_type_id, infill_size) FROM stdin;
    public       apcdmrglhzyezl    false    323   ~A      ?          0    34629737    system_system_tags 
   TABLE DATA               F   COPY public.system_system_tags (system_id, system_tag_id) FROM stdin;
    public       apcdmrglhzyezl    false    238   �A      8          0    34629685    system_tags 
   TABLE DATA               .   COPY public.system_tags (id, tag) FROM stdin;
    public       apcdmrglhzyezl    false    231   �A      |          0    34630269 +   system_type_detail_type_configuration_types 
   TABLE DATA               �   COPY public.system_type_detail_type_configuration_types (id, system_type_id, detail_type_id, configuration_type_id, required, mirrorable, presentation_level, override_level) FROM stdin;
    public       apcdmrglhzyezl    false    299   B      :          0    34629693    system_types 
   TABLE DATA               0   COPY public.system_types (id, type) FROM stdin;
    public       apcdmrglhzyezl    false    233   �B      =          0    34629706    systems 
   TABLE DATA               �   COPY public.systems (id, manufacturer_id, system_type_id, name, depth, default_glass_size, default_glass_bite, default_sightline, top_gap, bottom_gap, side_gap, meeting_stile_gap, inset, glass_gap, shim_size, front_inset) FROM stdin;
    public       apcdmrglhzyezl    false    236   3C      a          0    34629952    thermal_pocket_types 
   TABLE DATA               8   COPY public.thermal_pocket_types (id, path) FROM stdin;
    public       apcdmrglhzyezl    false    272   iC      c          0    34629963    thermal_pockets 
   TABLE DATA               e   COPY public.thermal_pockets (id, part_orientation_id, thermal_pocket_type_id, transform) FROM stdin;
    public       apcdmrglhzyezl    false    274   �C      [          0    34629888    thread_representations 
   TABLE DATA               :   COPY public.thread_representations (id, type) FROM stdin;
    public       apcdmrglhzyezl    false    266   �C      �          0    35681218    intermediate_private_table 
   TABLE DATA               A   COPY users.intermediate_private_table (id, other_id) FROM stdin;
    users       apcdmrglhzyezl    false    342   �C      �          0    35681207    other_private_table 
   TABLE DATA               =   COPY users.other_private_table (id, foreign_key) FROM stdin;
    users       apcdmrglhzyezl    false    341   �C      �          0    35681199    private_table 
   TABLE DATA               *   COPY users.private_table (id) FROM stdin;
    users       apcdmrglhzyezl    false    339   �C      �          0    35220482    users 
   TABLE DATA               L   COPY users.users (id, username, password_hash, role, last_auth) FROM stdin;
    users       apcdmrglhzyezl    false    333   D      �           0    0    brake_metal_pockets_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.brake_metal_pockets_id_seq', 1, false);
            public       apcdmrglhzyezl    false    275            �           0    0    bug_reports_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.bug_reports_id_seq', 27, true);
            public       apcdmrglhzyezl    false    335            �           0    0    configuration_parts_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.configuration_parts_id_seq', 1, false);
            public       apcdmrglhzyezl    false    288            �           0    0 $   configuration_transformations_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.configuration_transformations_id_seq', 1, false);
            public       apcdmrglhzyezl    false    286            �           0    0    configuration_types_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.configuration_types_id_seq', 19, true);
            public       apcdmrglhzyezl    false    247            �           0    0    configurations_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.configurations_id_seq', 1, false);
            public       apcdmrglhzyezl    false    284            �           0    0    container_details_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.container_details_id_seq', 7036, true);
            public       apcdmrglhzyezl    false    220            �           0    0    detail_option_values_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.detail_option_values_id_seq', 1, false);
            public       apcdmrglhzyezl    false    222            �           0    0    detail_types_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.detail_types_id_seq', 11, true);
            public       apcdmrglhzyezl    false    245            �           0    0    elevation_containers_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.elevation_containers_id_seq', 2645, true);
            public       apcdmrglhzyezl    false    218            �           0    0    elevations_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.elevations_id_seq', 339, true);
            public       apcdmrglhzyezl    false    216            �           0    0    fastener_head_types_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.fastener_head_types_id_seq', 1, false);
            public       apcdmrglhzyezl    false    263            �           0    0    fastener_locations_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.fastener_locations_id_seq', 1, false);
            public       apcdmrglhzyezl    false    277            �           0    0    fastener_types_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.fastener_types_id_seq', 1, false);
            public       apcdmrglhzyezl    false    261            �           0    0    infill_pocket_locations_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.infill_pocket_locations_id_seq', 1, false);
            public       apcdmrglhzyezl    false    279            �           0    0    infill_pocket_types_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.infill_pocket_types_id_seq', 1, false);
            public       apcdmrglhzyezl    false    258            �           0    0    json_table_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.json_table_id_seq', 1, true);
            public       apcdmrglhzyezl    false    203            �           0    0    linetypes_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.linetypes_id_seq', 1, false);
            public       apcdmrglhzyezl    false    250            �           0    0    manufacturers_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.manufacturers_id_seq', 13, true);
            public       apcdmrglhzyezl    false    228            �           0    0    option_combinations_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.option_combinations_id_seq', 1, false);
            public       apcdmrglhzyezl    false    243            �           0    0    option_values_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.option_values_id_seq', 2, true);
            public       apcdmrglhzyezl    false    241            �           0    0    orientations_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.orientations_id_seq', 1, false);
            public       apcdmrglhzyezl    false    252            �           0    0    part_orientations_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.part_orientations_id_seq', 1, false);
            public       apcdmrglhzyezl    false    269            �           0    0    part_tags_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.part_tags_id_seq', 1, false);
            public       apcdmrglhzyezl    false    256            �           0    0    part_types_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.part_types_id_seq', 1, false);
            public       apcdmrglhzyezl    false    254            �           0    0    parts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.parts_id_seq', 1, false);
            public       apcdmrglhzyezl    false    267            �           0    0    practice_one_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.practice_one_id_seq', 4, true);
            public       apcdmrglhzyezl    false    205            �           0    0    projects_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.projects_id_seq', 69, true);
            public       apcdmrglhzyezl    false    302            �           0    0    system_options_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.system_options_id_seq', 1, true);
            public       apcdmrglhzyezl    false    239            �           0    0    system_sets_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.system_sets_id_seq', 2, true);
            public       apcdmrglhzyezl    false    322            �           0    0    system_tags_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.system_tags_id_seq', 2, true);
            public       apcdmrglhzyezl    false    230            �           0    0 2   system_type_detail_type_configuration_types_id_seq    SEQUENCE SET     a   SELECT pg_catalog.setval('public.system_type_detail_type_configuration_types_id_seq', 35, true);
            public       apcdmrglhzyezl    false    298            �           0    0    system_types_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.system_types_id_seq', 2, true);
            public       apcdmrglhzyezl    false    232            �           0    0    systems_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.systems_id_seq', 6, true);
            public       apcdmrglhzyezl    false    235            �           0    0    thermal_pocket_types_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.thermal_pocket_types_id_seq', 1, false);
            public       apcdmrglhzyezl    false    271            �           0    0    thermal_pockets_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.thermal_pockets_id_seq', 1, false);
            public       apcdmrglhzyezl    false    273            �           0    0    thread_representations_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.thread_representations_id_seq', 1, false);
            public       apcdmrglhzyezl    false    265            �           0    0    other_private_table_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('users.other_private_table_id_seq', 1, false);
            users       apcdmrglhzyezl    false    340            �           0    0    private_table_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('users.private_table_id_seq', 1, false);
            users       apcdmrglhzyezl    false    338            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('users.users_id_seq', 33, true);
            users       apcdmrglhzyezl    false    332            !           2606    34629989 ,   brake_metal_pockets brake_metal_pockets_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.brake_metal_pockets
    ADD CONSTRAINT brake_metal_pockets_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.brake_metal_pockets DROP CONSTRAINT brake_metal_pockets_pkey;
       public         apcdmrglhzyezl    false    276            W           2606    35336437    bug_reports bug_reports_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.bug_reports
    ADD CONSTRAINT bug_reports_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.bug_reports DROP CONSTRAINT bug_reports_pkey;
       public         apcdmrglhzyezl    false    336            ;           2606    34630211 <   configuration_name_override configuration_name_override_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.configuration_name_override
    ADD CONSTRAINT configuration_name_override_pkey PRIMARY KEY (manufacturer_id, configuration_type_id);
 f   ALTER TABLE ONLY public.configuration_name_override DROP CONSTRAINT configuration_name_override_pkey;
       public         apcdmrglhzyezl    false    294    294            9           2606    34630196 <   configuration_option_values configuration_option_values_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.configuration_option_values
    ADD CONSTRAINT configuration_option_values_pkey PRIMARY KEY (configuration_id, option_value_id);
 f   ALTER TABLE ONLY public.configuration_option_values DROP CONSTRAINT configuration_option_values_pkey;
       public         apcdmrglhzyezl    false    293    293            1           2606    34630131 ,   configuration_parts configuration_parts_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.configuration_parts
    ADD CONSTRAINT configuration_parts_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.configuration_parts DROP CONSTRAINT configuration_parts_pkey;
       public         apcdmrglhzyezl    false    289            /           2606    34630110 @   configuration_transformations configuration_transformations_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.configuration_transformations
    ADD CONSTRAINT configuration_transformations_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.configuration_transformations DROP CONSTRAINT configuration_transformations_pkey;
       public         apcdmrglhzyezl    false    287            +           2606    34630066 @   configuration_type_part_types configuration_type_part_types_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.configuration_type_part_types
    ADD CONSTRAINT configuration_type_part_types_pkey PRIMARY KEY (configuration_type_id, part_type_id);
 j   ALTER TABLE ONLY public.configuration_type_part_types DROP CONSTRAINT configuration_type_part_types_pkey;
       public         apcdmrglhzyezl    false    283    283                       2606    34629811 ,   configuration_types configuration_types_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.configuration_types
    ADD CONSTRAINT configuration_types_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.configuration_types DROP CONSTRAINT configuration_types_pkey;
       public         apcdmrglhzyezl    false    248            -           2606    34630084 "   configurations configurations_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.configurations
    ADD CONSTRAINT configurations_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.configurations DROP CONSTRAINT configurations_pkey;
       public         apcdmrglhzyezl    false    285            �           2606    32048481 Q   container_details container_details_first_container_id_second_container_id_ve_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.container_details
    ADD CONSTRAINT container_details_first_container_id_second_container_id_ve_key UNIQUE (first_container_id, second_container_id, vertical);
 {   ALTER TABLE ONLY public.container_details DROP CONSTRAINT container_details_first_container_id_second_container_id_ve_key;
       public         apcdmrglhzyezl    false    221    221    221            �           2606    32048479 (   container_details container_details_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.container_details
    ADD CONSTRAINT container_details_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.container_details DROP CONSTRAINT container_details_pkey;
       public         apcdmrglhzyezl    false    221            �           2606    32048504 .   detail_option_values detail_option_values_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.detail_option_values
    ADD CONSTRAINT detail_option_values_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.detail_option_values DROP CONSTRAINT detail_option_values_pkey;
       public         apcdmrglhzyezl    false    223            �           2606    34629803    detail_types detail_types_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.detail_types
    ADD CONSTRAINT detail_types_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.detail_types DROP CONSTRAINT detail_types_pkey;
       public         apcdmrglhzyezl    false    246            �           2606    32048466 .   elevation_containers elevation_containers_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.elevation_containers
    ADD CONSTRAINT elevation_containers_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.elevation_containers DROP CONSTRAINT elevation_containers_pkey;
       public         apcdmrglhzyezl    false    219            �           2606    32048454    elevations elevations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.elevations
    ADD CONSTRAINT elevations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.elevations DROP CONSTRAINT elevations_pkey;
       public         apcdmrglhzyezl    false    217            �           2606    35523555 )   elevations elevations_project_id_name_key 
   CONSTRAINT     p   ALTER TABLE ONLY public.elevations
    ADD CONSTRAINT elevations_project_id_name_key UNIQUE (project_id, name);
 S   ALTER TABLE ONLY public.elevations DROP CONSTRAINT elevations_project_id_name_key;
       public         apcdmrglhzyezl    false    217    217                       2606    34629885 ,   fastener_head_types fastener_head_types_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.fastener_head_types
    ADD CONSTRAINT fastener_head_types_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.fastener_head_types DROP CONSTRAINT fastener_head_types_pkey;
       public         apcdmrglhzyezl    false    264            #           2606    34630005 *   fastener_locations fastener_locations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.fastener_locations
    ADD CONSTRAINT fastener_locations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.fastener_locations DROP CONSTRAINT fastener_locations_pkey;
       public         apcdmrglhzyezl    false    278                       2606    34629877 "   fastener_types fastener_types_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.fastener_types
    ADD CONSTRAINT fastener_types_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.fastener_types DROP CONSTRAINT fastener_types_pkey;
       public         apcdmrglhzyezl    false    262            %           2606    34630026 4   infill_pocket_locations infill_pocket_locations_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.infill_pocket_locations
    ADD CONSTRAINT infill_pocket_locations_pkey PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.infill_pocket_locations DROP CONSTRAINT infill_pocket_locations_pkey;
       public         apcdmrglhzyezl    false    280                       2606    34629869 ,   infill_pocket_sizes infill_pocket_sizes_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.infill_pocket_sizes
    ADD CONSTRAINT infill_pocket_sizes_pkey PRIMARY KEY (size);
 V   ALTER TABLE ONLY public.infill_pocket_sizes DROP CONSTRAINT infill_pocket_sizes_pkey;
       public         apcdmrglhzyezl    false    260                       2606    34629864 ,   infill_pocket_types infill_pocket_types_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.infill_pocket_types
    ADD CONSTRAINT infill_pocket_types_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.infill_pocket_types DROP CONSTRAINT infill_pocket_types_pkey;
       public         apcdmrglhzyezl    false    259            �           2606    34629703    infill_sizes infill_sizes_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.infill_sizes
    ADD CONSTRAINT infill_sizes_pkey PRIMARY KEY (size);
 H   ALTER TABLE ONLY public.infill_sizes DROP CONSTRAINT infill_sizes_pkey;
       public         apcdmrglhzyezl    false    234            A           2606    34630256 J   invalid_system_configuration_types invalid_system_configuration_types_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.invalid_system_configuration_types
    ADD CONSTRAINT invalid_system_configuration_types_pkey PRIMARY KEY (system_id, invalid_configuration_type_id);
 t   ALTER TABLE ONLY public.invalid_system_configuration_types DROP CONSTRAINT invalid_system_configuration_types_pkey;
       public         apcdmrglhzyezl    false    297    297            �           2606    23357205    json_table json_table_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.json_table
    ADD CONSTRAINT json_table_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.json_table DROP CONSTRAINT json_table_pkey;
       public         apcdmrglhzyezl    false    204                       2606    34629816    line_weights line_weights_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.line_weights
    ADD CONSTRAINT line_weights_pkey PRIMARY KEY (weight);
 H   ALTER TABLE ONLY public.line_weights DROP CONSTRAINT line_weights_pkey;
       public         apcdmrglhzyezl    false    249                       2606    34629824    linetypes linetypes_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.linetypes
    ADD CONSTRAINT linetypes_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.linetypes DROP CONSTRAINT linetypes_pkey;
       public         apcdmrglhzyezl    false    251            �           2606    34629682     manufacturers manufacturers_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.manufacturers
    ADD CONSTRAINT manufacturers_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.manufacturers DROP CONSTRAINT manufacturers_pkey;
       public         apcdmrglhzyezl    false    229            5           2606    34630166 R   option_combination_configuration_types option_combination_configuration_types_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.option_combination_configuration_types
    ADD CONSTRAINT option_combination_configuration_types_pkey PRIMARY KEY (option_combination_id, configuration_type_id);
 |   ALTER TABLE ONLY public.option_combination_configuration_types DROP CONSTRAINT option_combination_configuration_types_pkey;
       public         apcdmrglhzyezl    false    291    291            3           2606    34630151 F   option_combination_option_values option_combination_option_values_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.option_combination_option_values
    ADD CONSTRAINT option_combination_option_values_pkey PRIMARY KEY (option_combination_id, option_value_id);
 p   ALTER TABLE ONLY public.option_combination_option_values DROP CONSTRAINT option_combination_option_values_pkey;
       public         apcdmrglhzyezl    false    290    290            �           2606    34629790 ,   option_combinations option_combinations_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.option_combinations
    ADD CONSTRAINT option_combinations_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.option_combinations DROP CONSTRAINT option_combinations_pkey;
       public         apcdmrglhzyezl    false    244            �           2606    34907130 3   option_values option_values_id_system_option_id_key 
   CONSTRAINT     ~   ALTER TABLE ONLY public.option_values
    ADD CONSTRAINT option_values_id_system_option_id_key UNIQUE (id, system_option_id);
 ]   ALTER TABLE ONLY public.option_values DROP CONSTRAINT option_values_id_system_option_id_key;
       public         apcdmrglhzyezl    false    242    242            �           2606    34629772     option_values option_values_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.option_values
    ADD CONSTRAINT option_values_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.option_values DROP CONSTRAINT option_values_pkey;
       public         apcdmrglhzyezl    false    242                       2606    34629837    orientations orientations_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.orientations
    ADD CONSTRAINT orientations_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.orientations DROP CONSTRAINT orientations_pkey;
       public         apcdmrglhzyezl    false    253                       2606    34629939 >   part_orientations part_orientations_part_id_orientation_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.part_orientations
    ADD CONSTRAINT part_orientations_part_id_orientation_id_key UNIQUE (part_id, orientation_id);
 h   ALTER TABLE ONLY public.part_orientations DROP CONSTRAINT part_orientations_part_id_orientation_id_key;
       public         apcdmrglhzyezl    false    270    270                       2606    34629937 (   part_orientations part_orientations_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.part_orientations
    ADD CONSTRAINT part_orientations_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.part_orientations DROP CONSTRAINT part_orientations_pkey;
       public         apcdmrglhzyezl    false    270            )           2606    34630051 "   part_part_tags part_part_tags_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.part_part_tags
    ADD CONSTRAINT part_part_tags_pkey PRIMARY KEY (part_id, part_tag_id);
 L   ALTER TABLE ONLY public.part_part_tags DROP CONSTRAINT part_part_tags_pkey;
       public         apcdmrglhzyezl    false    282    282            '           2606    34630036 $   part_part_types part_part_types_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.part_part_types
    ADD CONSTRAINT part_part_types_pkey PRIMARY KEY (part_id, part_type_id);
 N   ALTER TABLE ONLY public.part_part_types DROP CONSTRAINT part_part_types_pkey;
       public         apcdmrglhzyezl    false    281    281                       2606    34629853    part_tags part_tags_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.part_tags
    ADD CONSTRAINT part_tags_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.part_tags DROP CONSTRAINT part_tags_pkey;
       public         apcdmrglhzyezl    false    257            	           2606    34629845    part_types part_types_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.part_types
    ADD CONSTRAINT part_types_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.part_types DROP CONSTRAINT part_types_pkey;
       public         apcdmrglhzyezl    false    255                       2606    34629901    parts parts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.parts
    ADD CONSTRAINT parts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.parts DROP CONSTRAINT parts_pkey;
       public         apcdmrglhzyezl    false    268            �           2606    24024038    practice_one practice_one_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.practice_one
    ADD CONSTRAINT practice_one_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.practice_one DROP CONSTRAINT practice_one_pkey;
       public         apcdmrglhzyezl    false    206            I           2606    34991976    projects projects_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_pkey;
       public         apcdmrglhzyezl    false    303            G           2606    34630296 B   system_configuration_overrides system_configuration_overrides_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.system_configuration_overrides
    ADD CONSTRAINT system_configuration_overrides_pkey PRIMARY KEY (system_id, detail_type_id, configuration_type_id);
 l   ALTER TABLE ONLY public.system_configuration_overrides DROP CONSTRAINT system_configuration_overrides_pkey;
       public         apcdmrglhzyezl    false    300    300    300            ?           2606    34630241 :   system_infill_pocket_sizes system_infill_pocket_sizes_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.system_infill_pocket_sizes
    ADD CONSTRAINT system_infill_pocket_sizes_pkey PRIMARY KEY (system_id, infill_pocket_size);
 d   ALTER TABLE ONLY public.system_infill_pocket_sizes DROP CONSTRAINT system_infill_pocket_sizes_pkey;
       public         apcdmrglhzyezl    false    296    296            =           2606    34630226 :   system_infill_pocket_types system_infill_pocket_types_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.system_infill_pocket_types
    ADD CONSTRAINT system_infill_pocket_types_pkey PRIMARY KEY (system_id, infill_pocket_type_id);
 d   ALTER TABLE ONLY public.system_infill_pocket_types DROP CONSTRAINT system_infill_pocket_types_pkey;
       public         apcdmrglhzyezl    false    295    295            �           2606    34629726 ,   system_infill_sizes system_infill_sizes_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.system_infill_sizes
    ADD CONSTRAINT system_infill_sizes_pkey PRIMARY KEY (system_id, infill_size);
 V   ALTER TABLE ONLY public.system_infill_sizes DROP CONSTRAINT system_infill_sizes_pkey;
       public         apcdmrglhzyezl    false    237    237            7           2606    34630181 H   system_option_configuration_types system_option_configuration_types_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.system_option_configuration_types
    ADD CONSTRAINT system_option_configuration_types_pkey PRIMARY KEY (system_option_id, configuration_type_id);
 r   ALTER TABLE ONLY public.system_option_configuration_types DROP CONSTRAINT system_option_configuration_types_pkey;
       public         apcdmrglhzyezl    false    292    292            �           2606    34907128 .   system_options system_options_id_system_id_key 
   CONSTRAINT     r   ALTER TABLE ONLY public.system_options
    ADD CONSTRAINT system_options_id_system_id_key UNIQUE (id, system_id);
 X   ALTER TABLE ONLY public.system_options DROP CONSTRAINT system_options_id_system_id_key;
       public         apcdmrglhzyezl    false    240    240            �           2606    34629759 "   system_options system_options_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.system_options
    ADD CONSTRAINT system_options_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.system_options DROP CONSTRAINT system_options_pkey;
       public         apcdmrglhzyezl    false    240            Q           2606    35007234 Z   system_set_detail_type_configuration_types system_set_detail_type_configuration_types_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.system_set_detail_type_configuration_types
    ADD CONSTRAINT system_set_detail_type_configuration_types_pkey PRIMARY KEY (system_id, detail_type_id, configuration_type_id);
 �   ALTER TABLE ONLY public.system_set_detail_type_configuration_types DROP CONSTRAINT system_set_detail_type_configuration_types_pkey;
       public         apcdmrglhzyezl    false    325    325    325            O           2606    35007209 6   system_set_option_values system_set_option_values_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.system_set_option_values
    ADD CONSTRAINT system_set_option_values_pkey PRIMARY KEY (system_id, system_option_id);
 `   ALTER TABLE ONLY public.system_set_option_values DROP CONSTRAINT system_set_option_values_pkey;
       public         apcdmrglhzyezl    false    324    324            K           2606    35007174 7   system_sets system_sets_id_system_id_system_type_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.system_sets
    ADD CONSTRAINT system_sets_id_system_id_system_type_id_key UNIQUE (id, system_id, system_type_id);
 a   ALTER TABLE ONLY public.system_sets DROP CONSTRAINT system_sets_id_system_id_system_type_id_key;
       public         apcdmrglhzyezl    false    323    323    323            M           2606    35007172    system_sets system_sets_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.system_sets
    ADD CONSTRAINT system_sets_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.system_sets DROP CONSTRAINT system_sets_pkey;
       public         apcdmrglhzyezl    false    323            �           2606    34629741 *   system_system_tags system_system_tags_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.system_system_tags
    ADD CONSTRAINT system_system_tags_pkey PRIMARY KEY (system_id, system_tag_id);
 T   ALTER TABLE ONLY public.system_system_tags DROP CONSTRAINT system_system_tags_pkey;
       public         apcdmrglhzyezl    false    238    238            �           2606    34629690    system_tags system_tags_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.system_tags
    ADD CONSTRAINT system_tags_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.system_tags DROP CONSTRAINT system_tags_pkey;
       public         apcdmrglhzyezl    false    231            C           2606    34630276 k   system_type_detail_type_configuration_types system_type_detail_type_confi_system_type_id_detail_type_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.system_type_detail_type_configuration_types
    ADD CONSTRAINT system_type_detail_type_confi_system_type_id_detail_type_id_key UNIQUE (system_type_id, detail_type_id, configuration_type_id);
 �   ALTER TABLE ONLY public.system_type_detail_type_configuration_types DROP CONSTRAINT system_type_detail_type_confi_system_type_id_detail_type_id_key;
       public         apcdmrglhzyezl    false    299    299    299            E           2606    34630274 \   system_type_detail_type_configuration_types system_type_detail_type_configuration_types_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.system_type_detail_type_configuration_types
    ADD CONSTRAINT system_type_detail_type_configuration_types_pkey PRIMARY KEY (id);
 �   ALTER TABLE ONLY public.system_type_detail_type_configuration_types DROP CONSTRAINT system_type_detail_type_configuration_types_pkey;
       public         apcdmrglhzyezl    false    299            �           2606    34629698    system_types system_types_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.system_types
    ADD CONSTRAINT system_types_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.system_types DROP CONSTRAINT system_types_pkey;
       public         apcdmrglhzyezl    false    233            �           2606    34907126 %   systems systems_id_system_type_id_key 
   CONSTRAINT     n   ALTER TABLE ONLY public.systems
    ADD CONSTRAINT systems_id_system_type_id_key UNIQUE (id, system_type_id);
 O   ALTER TABLE ONLY public.systems DROP CONSTRAINT systems_id_system_type_id_key;
       public         apcdmrglhzyezl    false    236    236            �           2606    34629711    systems systems_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.systems
    ADD CONSTRAINT systems_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.systems DROP CONSTRAINT systems_pkey;
       public         apcdmrglhzyezl    false    236                       2606    34629960 .   thermal_pocket_types thermal_pocket_types_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.thermal_pocket_types
    ADD CONSTRAINT thermal_pocket_types_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.thermal_pocket_types DROP CONSTRAINT thermal_pocket_types_pkey;
       public         apcdmrglhzyezl    false    272                       2606    34629971 $   thermal_pockets thermal_pockets_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.thermal_pockets
    ADD CONSTRAINT thermal_pockets_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.thermal_pockets DROP CONSTRAINT thermal_pockets_pkey;
       public         apcdmrglhzyezl    false    274                       2606    34629893 2   thread_representations thread_representations_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.thread_representations
    ADD CONSTRAINT thread_representations_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.thread_representations DROP CONSTRAINT thread_representations_pkey;
       public         apcdmrglhzyezl    false    266            [           2606    35681212 ,   other_private_table other_private_table_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY users.other_private_table
    ADD CONSTRAINT other_private_table_pkey PRIMARY KEY (id);
 U   ALTER TABLE ONLY users.other_private_table DROP CONSTRAINT other_private_table_pkey;
       users         apcdmrglhzyezl    false    341            Y           2606    35681204     private_table private_table_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY users.private_table
    ADD CONSTRAINT private_table_pkey PRIMARY KEY (id);
 I   ALTER TABLE ONLY users.private_table DROP CONSTRAINT private_table_pkey;
       users         apcdmrglhzyezl    false    339            S           2606    35220491    users users_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY users.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 9   ALTER TABLE ONLY users.users DROP CONSTRAINT users_pkey;
       users         apcdmrglhzyezl    false    333            U           2606    35220493    users users_username_key 
   CONSTRAINT     V   ALTER TABLE ONLY users.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 A   ALTER TABLE ONLY users.users DROP CONSTRAINT users_username_key;
       users         apcdmrglhzyezl    false    333            x           2606    34629990 @   brake_metal_pockets brake_metal_pockets_part_orientation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.brake_metal_pockets
    ADD CONSTRAINT brake_metal_pockets_part_orientation_id_fkey FOREIGN KEY (part_orientation_id) REFERENCES public.part_orientations(id);
 j   ALTER TABLE ONLY public.brake_metal_pockets DROP CONSTRAINT brake_metal_pockets_part_orientation_id_fkey;
       public       apcdmrglhzyezl    false    4379    276    270            �           2606    35336438 $   bug_reports bug_reports_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bug_reports
    ADD CONSTRAINT bug_reports_user_id_fkey FOREIGN KEY (user_id) REFERENCES users.users(id);
 N   ALTER TABLE ONLY public.bug_reports DROP CONSTRAINT bug_reports_user_id_fkey;
       public       apcdmrglhzyezl    false    333    4435    336            �           2606    34630217 R   configuration_name_override configuration_name_override_configuration_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.configuration_name_override
    ADD CONSTRAINT configuration_name_override_configuration_type_id_fkey FOREIGN KEY (configuration_type_id) REFERENCES public.configuration_types(id);
 |   ALTER TABLE ONLY public.configuration_name_override DROP CONSTRAINT configuration_name_override_configuration_type_id_fkey;
       public       apcdmrglhzyezl    false    4353    248    294            �           2606    34630212 L   configuration_name_override configuration_name_override_manufacturer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.configuration_name_override
    ADD CONSTRAINT configuration_name_override_manufacturer_id_fkey FOREIGN KEY (manufacturer_id) REFERENCES public.manufacturers(id);
 v   ALTER TABLE ONLY public.configuration_name_override DROP CONSTRAINT configuration_name_override_manufacturer_id_fkey;
       public       apcdmrglhzyezl    false    229    4325    294            �           2606    34630197 M   configuration_option_values configuration_option_values_configuration_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.configuration_option_values
    ADD CONSTRAINT configuration_option_values_configuration_id_fkey FOREIGN KEY (configuration_id) REFERENCES public.configurations(id);
 w   ALTER TABLE ONLY public.configuration_option_values DROP CONSTRAINT configuration_option_values_configuration_id_fkey;
       public       apcdmrglhzyezl    false    285    293    4397            �           2606    34630202 L   configuration_option_values configuration_option_values_option_value_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.configuration_option_values
    ADD CONSTRAINT configuration_option_values_option_value_id_fkey FOREIGN KEY (option_value_id) REFERENCES public.option_values(id);
 v   ALTER TABLE ONLY public.configuration_option_values DROP CONSTRAINT configuration_option_values_option_value_id_fkey;
       public       apcdmrglhzyezl    false    4347    293    242            �           2606    34630132 =   configuration_parts configuration_parts_configuration_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.configuration_parts
    ADD CONSTRAINT configuration_parts_configuration_id_fkey FOREIGN KEY (configuration_id) REFERENCES public.configurations(id);
 g   ALTER TABLE ONLY public.configuration_parts DROP CONSTRAINT configuration_parts_configuration_id_fkey;
       public       apcdmrglhzyezl    false    289    285    4397            �           2606    34630137 8   configuration_parts configuration_parts_linetype_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.configuration_parts
    ADD CONSTRAINT configuration_parts_linetype_id_fkey FOREIGN KEY (linetype_id) REFERENCES public.linetypes(id);
 b   ALTER TABLE ONLY public.configuration_parts DROP CONSTRAINT configuration_parts_linetype_id_fkey;
       public       apcdmrglhzyezl    false    251    289    4357            �           2606    34630142 @   configuration_parts configuration_parts_part_orientation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.configuration_parts
    ADD CONSTRAINT configuration_parts_part_orientation_id_fkey FOREIGN KEY (part_orientation_id) REFERENCES public.part_orientations(id);
 j   ALTER TABLE ONLY public.configuration_parts DROP CONSTRAINT configuration_parts_part_orientation_id_fkey;
       public       apcdmrglhzyezl    false    289    270    4379            �           2606    34630116 Q   configuration_transformations configuration_transformations_configuration_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.configuration_transformations
    ADD CONSTRAINT configuration_transformations_configuration_id_fkey FOREIGN KEY (configuration_id) REFERENCES public.configurations(id);
 {   ALTER TABLE ONLY public.configuration_transformations DROP CONSTRAINT configuration_transformations_configuration_id_fkey;
       public       apcdmrglhzyezl    false    285    287    4397            �           2606    34630111 O   configuration_transformations configuration_transformations_detail_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.configuration_transformations
    ADD CONSTRAINT configuration_transformations_detail_type_id_fkey FOREIGN KEY (detail_type_id) REFERENCES public.detail_types(id);
 y   ALTER TABLE ONLY public.configuration_transformations DROP CONSTRAINT configuration_transformations_detail_type_id_fkey;
       public       apcdmrglhzyezl    false    287    4351    246            �           2606    34630067 V   configuration_type_part_types configuration_type_part_types_configuration_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.configuration_type_part_types
    ADD CONSTRAINT configuration_type_part_types_configuration_type_id_fkey FOREIGN KEY (configuration_type_id) REFERENCES public.configuration_types(id);
 �   ALTER TABLE ONLY public.configuration_type_part_types DROP CONSTRAINT configuration_type_part_types_configuration_type_id_fkey;
       public       apcdmrglhzyezl    false    4353    248    283            �           2606    34630072 M   configuration_type_part_types configuration_type_part_types_part_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.configuration_type_part_types
    ADD CONSTRAINT configuration_type_part_types_part_type_id_fkey FOREIGN KEY (part_type_id) REFERENCES public.part_types(id);
 w   ALTER TABLE ONLY public.configuration_type_part_types DROP CONSTRAINT configuration_type_part_types_part_type_id_fkey;
       public       apcdmrglhzyezl    false    255    283    4361            �           2606    34630085 8   configurations configurations_configuration_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.configurations
    ADD CONSTRAINT configurations_configuration_type_id_fkey FOREIGN KEY (configuration_type_id) REFERENCES public.configuration_types(id);
 b   ALTER TABLE ONLY public.configurations DROP CONSTRAINT configurations_configuration_type_id_fkey;
       public       apcdmrglhzyezl    false    285    4353    248            �           2606    34630090 8   configurations configurations_infill_pocket_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.configurations
    ADD CONSTRAINT configurations_infill_pocket_type_id_fkey FOREIGN KEY (infill_pocket_type_id) REFERENCES public.infill_pocket_types(id);
 b   ALTER TABLE ONLY public.configurations DROP CONSTRAINT configurations_infill_pocket_type_id_fkey;
       public       apcdmrglhzyezl    false    259    285    4365            �           2606    34630095 .   configurations configurations_infill_size_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.configurations
    ADD CONSTRAINT configurations_infill_size_fkey FOREIGN KEY (infill_size) REFERENCES public.infill_sizes(size);
 X   ALTER TABLE ONLY public.configurations DROP CONSTRAINT configurations_infill_size_fkey;
       public       apcdmrglhzyezl    false    4331    285    234            `           2606    32048482 5   container_details container_details_elevation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.container_details
    ADD CONSTRAINT container_details_elevation_id_fkey FOREIGN KEY (elevation_id) REFERENCES public.elevations(id);
 _   ALTER TABLE ONLY public.container_details DROP CONSTRAINT container_details_elevation_id_fkey;
       public       apcdmrglhzyezl    false    217    4313    221            a           2606    32048487 ;   container_details container_details_first_container_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.container_details
    ADD CONSTRAINT container_details_first_container_id_fkey FOREIGN KEY (first_container_id) REFERENCES public.elevation_containers(id);
 e   ALTER TABLE ONLY public.container_details DROP CONSTRAINT container_details_first_container_id_fkey;
       public       apcdmrglhzyezl    false    4317    219    221            b           2606    32048492 <   container_details container_details_second_container_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.container_details
    ADD CONSTRAINT container_details_second_container_id_fkey FOREIGN KEY (second_container_id) REFERENCES public.elevation_containers(id);
 f   ALTER TABLE ONLY public.container_details DROP CONSTRAINT container_details_second_container_id_fkey;
       public       apcdmrglhzyezl    false    221    4317    219            c           2606    32048505 B   detail_option_values detail_option_values_container_detail_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detail_option_values
    ADD CONSTRAINT detail_option_values_container_detail_id_fkey FOREIGN KEY (container_detail_id) REFERENCES public.container_details(id);
 l   ALTER TABLE ONLY public.detail_option_values DROP CONSTRAINT detail_option_values_container_detail_id_fkey;
       public       apcdmrglhzyezl    false    223    221    4321            _           2606    32048467 ;   elevation_containers elevation_containers_elevation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.elevation_containers
    ADD CONSTRAINT elevation_containers_elevation_id_fkey FOREIGN KEY (elevation_id) REFERENCES public.elevations(id);
 e   ALTER TABLE ONLY public.elevation_containers DROP CONSTRAINT elevation_containers_elevation_id_fkey;
       public       apcdmrglhzyezl    false    217    219    4313            ]           2606    35572428 *   elevations elevations_last_updated_by_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.elevations
    ADD CONSTRAINT elevations_last_updated_by_fkey FOREIGN KEY (last_updated_by) REFERENCES users.users(id);
 T   ALTER TABLE ONLY public.elevations DROP CONSTRAINT elevations_last_updated_by_fkey;
       public       apcdmrglhzyezl    false    217    4435    333            ^           2606    34997678 %   elevations elevations_project_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.elevations
    ADD CONSTRAINT elevations_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);
 O   ALTER TABLE ONLY public.elevations DROP CONSTRAINT elevations_project_id_fkey;
       public       apcdmrglhzyezl    false    4425    217    303            \           2606    35007309 (   elevations elevations_system_set_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.elevations
    ADD CONSTRAINT elevations_system_set_id_fkey FOREIGN KEY (system_set_id) REFERENCES public.system_sets(id);
 R   ALTER TABLE ONLY public.elevations DROP CONSTRAINT elevations_system_set_id_fkey;
       public       apcdmrglhzyezl    false    4429    323    217            z           2606    34630011 9   fastener_locations fastener_locations_orientation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.fastener_locations
    ADD CONSTRAINT fastener_locations_orientation_id_fkey FOREIGN KEY (orientation_id) REFERENCES public.orientations(id);
 c   ALTER TABLE ONLY public.fastener_locations DROP CONSTRAINT fastener_locations_orientation_id_fkey;
       public       apcdmrglhzyezl    false    278    253    4359            y           2606    34630006 >   fastener_locations fastener_locations_part_orientation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.fastener_locations
    ADD CONSTRAINT fastener_locations_part_orientation_id_fkey FOREIGN KEY (part_orientation_id) REFERENCES public.part_orientations(id);
 h   ALTER TABLE ONLY public.fastener_locations DROP CONSTRAINT fastener_locations_part_orientation_id_fkey;
       public       apcdmrglhzyezl    false    278    270    4379            {           2606    34630027 H   infill_pocket_locations infill_pocket_locations_part_orientation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.infill_pocket_locations
    ADD CONSTRAINT infill_pocket_locations_part_orientation_id_fkey FOREIGN KEY (part_orientation_id) REFERENCES public.part_orientations(id);
 r   ALTER TABLE ONLY public.infill_pocket_locations DROP CONSTRAINT infill_pocket_locations_part_orientation_id_fkey;
       public       apcdmrglhzyezl    false    280    270    4379            �           2606    34630262 b   invalid_system_configuration_types invalid_system_configuration__invalid_configuration_type_i_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invalid_system_configuration_types
    ADD CONSTRAINT invalid_system_configuration__invalid_configuration_type_i_fkey FOREIGN KEY (invalid_configuration_type_id) REFERENCES public.configuration_types(id);
 �   ALTER TABLE ONLY public.invalid_system_configuration_types DROP CONSTRAINT invalid_system_configuration__invalid_configuration_type_i_fkey;
       public       apcdmrglhzyezl    false    248    297    4353            �           2606    34630257 T   invalid_system_configuration_types invalid_system_configuration_types_system_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invalid_system_configuration_types
    ADD CONSTRAINT invalid_system_configuration_types_system_id_fkey FOREIGN KEY (system_id) REFERENCES public.systems(id);
 ~   ALTER TABLE ONLY public.invalid_system_configuration_types DROP CONSTRAINT invalid_system_configuration_types_system_id_fkey;
       public       apcdmrglhzyezl    false    236    4335    297            n           2606    34629825 $   linetypes linetypes_line_weight_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.linetypes
    ADD CONSTRAINT linetypes_line_weight_fkey FOREIGN KEY (line_weight) REFERENCES public.line_weights(weight);
 N   ALTER TABLE ONLY public.linetypes DROP CONSTRAINT linetypes_line_weight_fkey;
       public       apcdmrglhzyezl    false    251    249    4355            �           2606    34630172 f   option_combination_configuration_types option_combination_configuration_typ_configuration_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.option_combination_configuration_types
    ADD CONSTRAINT option_combination_configuration_typ_configuration_type_id_fkey FOREIGN KEY (configuration_type_id) REFERENCES public.configuration_types(id);
 �   ALTER TABLE ONLY public.option_combination_configuration_types DROP CONSTRAINT option_combination_configuration_typ_configuration_type_id_fkey;
       public       apcdmrglhzyezl    false    291    248    4353            �           2606    34630167 f   option_combination_configuration_types option_combination_configuration_typ_option_combination_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.option_combination_configuration_types
    ADD CONSTRAINT option_combination_configuration_typ_option_combination_id_fkey FOREIGN KEY (option_combination_id) REFERENCES public.option_combinations(id);
 �   ALTER TABLE ONLY public.option_combination_configuration_types DROP CONSTRAINT option_combination_configuration_typ_option_combination_id_fkey;
       public       apcdmrglhzyezl    false    244    291    4349            �           2606    34630152 \   option_combination_option_values option_combination_option_values_option_combination_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.option_combination_option_values
    ADD CONSTRAINT option_combination_option_values_option_combination_id_fkey FOREIGN KEY (option_combination_id) REFERENCES public.option_combinations(id);
 �   ALTER TABLE ONLY public.option_combination_option_values DROP CONSTRAINT option_combination_option_values_option_combination_id_fkey;
       public       apcdmrglhzyezl    false    244    290    4349            �           2606    34630157 V   option_combination_option_values option_combination_option_values_option_value_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.option_combination_option_values
    ADD CONSTRAINT option_combination_option_values_option_value_id_fkey FOREIGN KEY (option_value_id) REFERENCES public.option_values(id);
 �   ALTER TABLE ONLY public.option_combination_option_values DROP CONSTRAINT option_combination_option_values_option_value_id_fkey;
       public       apcdmrglhzyezl    false    242    290    4347            m           2606    34629791 6   option_combinations option_combinations_system_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.option_combinations
    ADD CONSTRAINT option_combinations_system_id_fkey FOREIGN KEY (system_id) REFERENCES public.systems(id);
 `   ALTER TABLE ONLY public.option_combinations DROP CONSTRAINT option_combinations_system_id_fkey;
       public       apcdmrglhzyezl    false    236    244    4335            l           2606    34629778 <   option_values option_values_mirror_from_option_value_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.option_values
    ADD CONSTRAINT option_values_mirror_from_option_value_id_fkey FOREIGN KEY (mirror_from_option_value_id) REFERENCES public.option_values(id);
 f   ALTER TABLE ONLY public.option_values DROP CONSTRAINT option_values_mirror_from_option_value_id_fkey;
       public       apcdmrglhzyezl    false    4347    242    242            k           2606    34629773 1   option_values option_values_system_option_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.option_values
    ADD CONSTRAINT option_values_system_option_id_fkey FOREIGN KEY (system_option_id) REFERENCES public.system_options(id);
 [   ALTER TABLE ONLY public.option_values DROP CONSTRAINT option_values_system_option_id_fkey;
       public       apcdmrglhzyezl    false    4343    242    240            u           2606    34629945 7   part_orientations part_orientations_orientation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.part_orientations
    ADD CONSTRAINT part_orientations_orientation_id_fkey FOREIGN KEY (orientation_id) REFERENCES public.orientations(id);
 a   ALTER TABLE ONLY public.part_orientations DROP CONSTRAINT part_orientations_orientation_id_fkey;
       public       apcdmrglhzyezl    false    253    4359    270            t           2606    34629940 0   part_orientations part_orientations_part_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.part_orientations
    ADD CONSTRAINT part_orientations_part_id_fkey FOREIGN KEY (part_id) REFERENCES public.parts(id);
 Z   ALTER TABLE ONLY public.part_orientations DROP CONSTRAINT part_orientations_part_id_fkey;
       public       apcdmrglhzyezl    false    268    270    4375            ~           2606    34630052 *   part_part_tags part_part_tags_part_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.part_part_tags
    ADD CONSTRAINT part_part_tags_part_id_fkey FOREIGN KEY (part_id) REFERENCES public.parts(id);
 T   ALTER TABLE ONLY public.part_part_tags DROP CONSTRAINT part_part_tags_part_id_fkey;
       public       apcdmrglhzyezl    false    268    4375    282                       2606    34630057 .   part_part_tags part_part_tags_part_tag_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.part_part_tags
    ADD CONSTRAINT part_part_tags_part_tag_id_fkey FOREIGN KEY (part_tag_id) REFERENCES public.part_tags(id);
 X   ALTER TABLE ONLY public.part_part_tags DROP CONSTRAINT part_part_tags_part_tag_id_fkey;
       public       apcdmrglhzyezl    false    4363    257    282            |           2606    34630037 ,   part_part_types part_part_types_part_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.part_part_types
    ADD CONSTRAINT part_part_types_part_id_fkey FOREIGN KEY (part_id) REFERENCES public.parts(id);
 V   ALTER TABLE ONLY public.part_part_types DROP CONSTRAINT part_part_types_part_id_fkey;
       public       apcdmrglhzyezl    false    281    4375    268            }           2606    34630042 1   part_part_types part_part_types_part_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.part_part_types
    ADD CONSTRAINT part_part_types_part_type_id_fkey FOREIGN KEY (part_type_id) REFERENCES public.part_types(id);
 [   ALTER TABLE ONLY public.part_part_types DROP CONSTRAINT part_part_types_part_type_id_fkey;
       public       apcdmrglhzyezl    false    255    281    4361            r           2606    34629917 &   parts parts_fastener_head_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.parts
    ADD CONSTRAINT parts_fastener_head_type_id_fkey FOREIGN KEY (fastener_head_type_id) REFERENCES public.fastener_head_types(id);
 P   ALTER TABLE ONLY public.parts DROP CONSTRAINT parts_fastener_head_type_id_fkey;
       public       apcdmrglhzyezl    false    4371    264    268            q           2606    34629912 !   parts parts_fastener_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.parts
    ADD CONSTRAINT parts_fastener_type_id_fkey FOREIGN KEY (fastener_type_id) REFERENCES public.fastener_types(id);
 K   ALTER TABLE ONLY public.parts DROP CONSTRAINT parts_fastener_type_id_fkey;
       public       apcdmrglhzyezl    false    268    4369    262            o           2606    34629902     parts parts_manufacturer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.parts
    ADD CONSTRAINT parts_manufacturer_id_fkey FOREIGN KEY (manufacturer_id) REFERENCES public.manufacturers(id);
 J   ALTER TABLE ONLY public.parts DROP CONSTRAINT parts_manufacturer_id_fkey;
       public       apcdmrglhzyezl    false    229    4325    268            p           2606    34629907    parts parts_system_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.parts
    ADD CONSTRAINT parts_system_id_fkey FOREIGN KEY (system_id) REFERENCES public.systems(id);
 D   ALTER TABLE ONLY public.parts DROP CONSTRAINT parts_system_id_fkey;
       public       apcdmrglhzyezl    false    268    236    4335            s           2606    34629922 )   parts parts_thread_representation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.parts
    ADD CONSTRAINT parts_thread_representation_id_fkey FOREIGN KEY (thread_representation_id) REFERENCES public.thread_representations(id);
 S   ALTER TABLE ONLY public.parts DROP CONSTRAINT parts_thread_representation_id_fkey;
       public       apcdmrglhzyezl    false    266    268    4373            �           2606    35572423 &   projects projects_last_updated_by_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_last_updated_by_fkey FOREIGN KEY (last_updated_by) REFERENCES users.users(id);
 P   ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_last_updated_by_fkey;
       public       apcdmrglhzyezl    false    333    303    4435            �           2606    35356979    projects projects_owner_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES users.users(id);
 I   ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_owner_id_fkey;
       public       apcdmrglhzyezl    false    333    4435    303            �           2606    34630297 L   system_configuration_overrides system_configuration_overrides_system_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_configuration_overrides
    ADD CONSTRAINT system_configuration_overrides_system_id_fkey FOREIGN KEY (system_id) REFERENCES public.systems(id);
 v   ALTER TABLE ONLY public.system_configuration_overrides DROP CONSTRAINT system_configuration_overrides_system_id_fkey;
       public       apcdmrglhzyezl    false    4335    236    300            �           2606    34630302 Q   system_configuration_overrides system_configuration_overrides_system_type_id_fkey    FK CONSTRAINT     7  ALTER TABLE ONLY public.system_configuration_overrides
    ADD CONSTRAINT system_configuration_overrides_system_type_id_fkey FOREIGN KEY (system_type_id, detail_type_id, configuration_type_id) REFERENCES public.system_type_detail_type_configuration_types(system_type_id, detail_type_id, configuration_type_id);
 {   ALTER TABLE ONLY public.system_configuration_overrides DROP CONSTRAINT system_configuration_overrides_system_type_id_fkey;
       public       apcdmrglhzyezl    false    299    299    4419    299    300    300    300            �           2606    34630247 M   system_infill_pocket_sizes system_infill_pocket_sizes_infill_pocket_size_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_infill_pocket_sizes
    ADD CONSTRAINT system_infill_pocket_sizes_infill_pocket_size_fkey FOREIGN KEY (infill_pocket_size) REFERENCES public.infill_pocket_sizes(size);
 w   ALTER TABLE ONLY public.system_infill_pocket_sizes DROP CONSTRAINT system_infill_pocket_sizes_infill_pocket_size_fkey;
       public       apcdmrglhzyezl    false    4367    296    260            �           2606    34630242 D   system_infill_pocket_sizes system_infill_pocket_sizes_system_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_infill_pocket_sizes
    ADD CONSTRAINT system_infill_pocket_sizes_system_id_fkey FOREIGN KEY (system_id) REFERENCES public.systems(id);
 n   ALTER TABLE ONLY public.system_infill_pocket_sizes DROP CONSTRAINT system_infill_pocket_sizes_system_id_fkey;
       public       apcdmrglhzyezl    false    236    296    4335            �           2606    34630232 P   system_infill_pocket_types system_infill_pocket_types_infill_pocket_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_infill_pocket_types
    ADD CONSTRAINT system_infill_pocket_types_infill_pocket_type_id_fkey FOREIGN KEY (infill_pocket_type_id) REFERENCES public.infill_pocket_types(id);
 z   ALTER TABLE ONLY public.system_infill_pocket_types DROP CONSTRAINT system_infill_pocket_types_infill_pocket_type_id_fkey;
       public       apcdmrglhzyezl    false    4365    295    259            �           2606    34630227 D   system_infill_pocket_types system_infill_pocket_types_system_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_infill_pocket_types
    ADD CONSTRAINT system_infill_pocket_types_system_id_fkey FOREIGN KEY (system_id) REFERENCES public.systems(id);
 n   ALTER TABLE ONLY public.system_infill_pocket_types DROP CONSTRAINT system_infill_pocket_types_system_id_fkey;
       public       apcdmrglhzyezl    false    295    4335    236            g           2606    34629732 8   system_infill_sizes system_infill_sizes_infill_size_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_infill_sizes
    ADD CONSTRAINT system_infill_sizes_infill_size_fkey FOREIGN KEY (infill_size) REFERENCES public.infill_sizes(size);
 b   ALTER TABLE ONLY public.system_infill_sizes DROP CONSTRAINT system_infill_sizes_infill_size_fkey;
       public       apcdmrglhzyezl    false    237    234    4331            f           2606    34629727 6   system_infill_sizes system_infill_sizes_system_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_infill_sizes
    ADD CONSTRAINT system_infill_sizes_system_id_fkey FOREIGN KEY (system_id) REFERENCES public.systems(id);
 `   ALTER TABLE ONLY public.system_infill_sizes DROP CONSTRAINT system_infill_sizes_system_id_fkey;
       public       apcdmrglhzyezl    false    4335    237    236            �           2606    34630187 ^   system_option_configuration_types system_option_configuration_types_configuration_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_option_configuration_types
    ADD CONSTRAINT system_option_configuration_types_configuration_type_id_fkey FOREIGN KEY (configuration_type_id) REFERENCES public.configuration_types(id);
 �   ALTER TABLE ONLY public.system_option_configuration_types DROP CONSTRAINT system_option_configuration_types_configuration_type_id_fkey;
       public       apcdmrglhzyezl    false    292    4353    248            �           2606    34630182 Y   system_option_configuration_types system_option_configuration_types_system_option_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_option_configuration_types
    ADD CONSTRAINT system_option_configuration_types_system_option_id_fkey FOREIGN KEY (system_option_id) REFERENCES public.system_options(id);
 �   ALTER TABLE ONLY public.system_option_configuration_types DROP CONSTRAINT system_option_configuration_types_system_option_id_fkey;
       public       apcdmrglhzyezl    false    292    4343    240            j           2606    34629760 ,   system_options system_options_system_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_options
    ADD CONSTRAINT system_options_system_id_fkey FOREIGN KEY (system_id) REFERENCES public.systems(id);
 V   ALTER TABLE ONLY public.system_options DROP CONSTRAINT system_options_system_id_fkey;
       public       apcdmrglhzyezl    false    236    4335    240            �           2606    35007235 h   system_set_detail_type_configuration_types system_set_detail_type_configuration_types_system_set_id_fkey    FK CONSTRAINT     	  ALTER TABLE ONLY public.system_set_detail_type_configuration_types
    ADD CONSTRAINT system_set_detail_type_configuration_types_system_set_id_fkey FOREIGN KEY (system_set_id, system_id, system_type_id) REFERENCES public.system_sets(id, system_id, system_type_id);
 �   ALTER TABLE ONLY public.system_set_detail_type_configuration_types DROP CONSTRAINT system_set_detail_type_configuration_types_system_set_id_fkey;
       public       apcdmrglhzyezl    false    323    323    325    325    4427    325    323            �           2606    35007210 F   system_set_option_values system_set_option_values_option_value_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_set_option_values
    ADD CONSTRAINT system_set_option_values_option_value_id_fkey FOREIGN KEY (option_value_id) REFERENCES public.option_values(id);
 p   ALTER TABLE ONLY public.system_set_option_values DROP CONSTRAINT system_set_option_values_option_value_id_fkey;
       public       apcdmrglhzyezl    false    324    242    4347            �           2606    35007220 @   system_set_option_values system_set_option_values_system_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_set_option_values
    ADD CONSTRAINT system_set_option_values_system_id_fkey FOREIGN KEY (system_id, system_option_id) REFERENCES public.system_options(system_id, id);
 j   ALTER TABLE ONLY public.system_set_option_values DROP CONSTRAINT system_set_option_values_system_id_fkey;
       public       apcdmrglhzyezl    false    240    240    324    324    4341            �           2606    35007225 G   system_set_option_values system_set_option_values_system_option_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_set_option_values
    ADD CONSTRAINT system_set_option_values_system_option_id_fkey FOREIGN KEY (system_option_id, option_value_id) REFERENCES public.option_values(system_option_id, id);
 q   ALTER TABLE ONLY public.system_set_option_values DROP CONSTRAINT system_set_option_values_system_option_id_fkey;
       public       apcdmrglhzyezl    false    242    324    324    4345    242            �           2606    35007215 D   system_set_option_values system_set_option_values_system_set_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_set_option_values
    ADD CONSTRAINT system_set_option_values_system_set_id_fkey FOREIGN KEY (system_set_id, system_id, system_type_id) REFERENCES public.system_sets(id, system_id, system_type_id);
 n   ALTER TABLE ONLY public.system_set_option_values DROP CONSTRAINT system_set_option_values_system_set_id_fkey;
       public       apcdmrglhzyezl    false    4427    324    324    324    323    323    323            �           2606    35007190 (   system_sets system_sets_infill_size_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_sets
    ADD CONSTRAINT system_sets_infill_size_fkey FOREIGN KEY (infill_size) REFERENCES public.infill_sizes(size);
 R   ALTER TABLE ONLY public.system_sets DROP CONSTRAINT system_sets_infill_size_fkey;
       public       apcdmrglhzyezl    false    4331    323    234            �           2606    35007175 '   system_sets system_sets_project_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_sets
    ADD CONSTRAINT system_sets_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);
 Q   ALTER TABLE ONLY public.system_sets DROP CONSTRAINT system_sets_project_id_fkey;
       public       apcdmrglhzyezl    false    303    4425    323            �           2606    35007180 &   system_sets system_sets_system_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_sets
    ADD CONSTRAINT system_sets_system_id_fkey FOREIGN KEY (system_id) REFERENCES public.systems(id);
 P   ALTER TABLE ONLY public.system_sets DROP CONSTRAINT system_sets_system_id_fkey;
       public       apcdmrglhzyezl    false    323    4335    236            �           2606    35007195 '   system_sets system_sets_system_id_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_sets
    ADD CONSTRAINT system_sets_system_id_fkey1 FOREIGN KEY (system_id, system_type_id) REFERENCES public.systems(id, system_type_id);
 Q   ALTER TABLE ONLY public.system_sets DROP CONSTRAINT system_sets_system_id_fkey1;
       public       apcdmrglhzyezl    false    236    323    323    236    4333            �           2606    35007200 '   system_sets system_sets_system_id_fkey2    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_sets
    ADD CONSTRAINT system_sets_system_id_fkey2 FOREIGN KEY (system_id, infill_size) REFERENCES public.system_infill_sizes(system_id, infill_size);
 Q   ALTER TABLE ONLY public.system_sets DROP CONSTRAINT system_sets_system_id_fkey2;
       public       apcdmrglhzyezl    false    237    323    323    237    4337            �           2606    35007185 +   system_sets system_sets_system_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_sets
    ADD CONSTRAINT system_sets_system_type_id_fkey FOREIGN KEY (system_type_id) REFERENCES public.system_types(id);
 U   ALTER TABLE ONLY public.system_sets DROP CONSTRAINT system_sets_system_type_id_fkey;
       public       apcdmrglhzyezl    false    323    4329    233            h           2606    34629742 4   system_system_tags system_system_tags_system_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_system_tags
    ADD CONSTRAINT system_system_tags_system_id_fkey FOREIGN KEY (system_id) REFERENCES public.systems(id);
 ^   ALTER TABLE ONLY public.system_system_tags DROP CONSTRAINT system_system_tags_system_id_fkey;
       public       apcdmrglhzyezl    false    4335    238    236            i           2606    34629747 8   system_system_tags system_system_tags_system_tag_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_system_tags
    ADD CONSTRAINT system_system_tags_system_tag_id_fkey FOREIGN KEY (system_tag_id) REFERENCES public.system_tags(id);
 b   ALTER TABLE ONLY public.system_system_tags DROP CONSTRAINT system_system_tags_system_tag_id_fkey;
       public       apcdmrglhzyezl    false    238    4327    231            �           2606    34630287 k   system_type_detail_type_configuration_types system_type_detail_type_configuratio_configuration_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_type_detail_type_configuration_types
    ADD CONSTRAINT system_type_detail_type_configuratio_configuration_type_id_fkey FOREIGN KEY (configuration_type_id) REFERENCES public.configuration_types(id);
 �   ALTER TABLE ONLY public.system_type_detail_type_configuration_types DROP CONSTRAINT system_type_detail_type_configuratio_configuration_type_id_fkey;
       public       apcdmrglhzyezl    false    248    4353    299            �           2606    34630282 k   system_type_detail_type_configuration_types system_type_detail_type_configuration_types_detail_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_type_detail_type_configuration_types
    ADD CONSTRAINT system_type_detail_type_configuration_types_detail_type_id_fkey FOREIGN KEY (detail_type_id) REFERENCES public.detail_types(id);
 �   ALTER TABLE ONLY public.system_type_detail_type_configuration_types DROP CONSTRAINT system_type_detail_type_configuration_types_detail_type_id_fkey;
       public       apcdmrglhzyezl    false    299    246    4351            �           2606    34630277 k   system_type_detail_type_configuration_types system_type_detail_type_configuration_types_system_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.system_type_detail_type_configuration_types
    ADD CONSTRAINT system_type_detail_type_configuration_types_system_type_id_fkey FOREIGN KEY (system_type_id) REFERENCES public.system_types(id);
 �   ALTER TABLE ONLY public.system_type_detail_type_configuration_types DROP CONSTRAINT system_type_detail_type_configuration_types_system_type_id_fkey;
       public       apcdmrglhzyezl    false    233    299    4329            d           2606    34629712 $   systems systems_manufacturer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.systems
    ADD CONSTRAINT systems_manufacturer_id_fkey FOREIGN KEY (manufacturer_id) REFERENCES public.manufacturers(id);
 N   ALTER TABLE ONLY public.systems DROP CONSTRAINT systems_manufacturer_id_fkey;
       public       apcdmrglhzyezl    false    236    229    4325            e           2606    34629717 #   systems systems_system_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.systems
    ADD CONSTRAINT systems_system_type_id_fkey FOREIGN KEY (system_type_id) REFERENCES public.system_types(id);
 M   ALTER TABLE ONLY public.systems DROP CONSTRAINT systems_system_type_id_fkey;
       public       apcdmrglhzyezl    false    4329    236    233            v           2606    34629972 8   thermal_pockets thermal_pockets_part_orientation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.thermal_pockets
    ADD CONSTRAINT thermal_pockets_part_orientation_id_fkey FOREIGN KEY (part_orientation_id) REFERENCES public.part_orientations(id);
 b   ALTER TABLE ONLY public.thermal_pockets DROP CONSTRAINT thermal_pockets_part_orientation_id_fkey;
       public       apcdmrglhzyezl    false    4379    270    274            w           2606    34629977 ;   thermal_pockets thermal_pockets_thermal_pocket_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.thermal_pockets
    ADD CONSTRAINT thermal_pockets_thermal_pocket_type_id_fkey FOREIGN KEY (thermal_pocket_type_id) REFERENCES public.thermal_pocket_types(id);
 e   ALTER TABLE ONLY public.thermal_pockets DROP CONSTRAINT thermal_pockets_thermal_pocket_type_id_fkey;
       public       apcdmrglhzyezl    false    4381    272    274            �           2606    35681221 =   intermediate_private_table intermediate_private_table_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY users.intermediate_private_table
    ADD CONSTRAINT intermediate_private_table_id_fkey FOREIGN KEY (id) REFERENCES users.private_table(id);
 f   ALTER TABLE ONLY users.intermediate_private_table DROP CONSTRAINT intermediate_private_table_id_fkey;
       users       apcdmrglhzyezl    false    4441    339    342            �           2606    35681226 C   intermediate_private_table intermediate_private_table_other_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY users.intermediate_private_table
    ADD CONSTRAINT intermediate_private_table_other_id_fkey FOREIGN KEY (other_id) REFERENCES users.other_private_table(id);
 l   ALTER TABLE ONLY users.intermediate_private_table DROP CONSTRAINT intermediate_private_table_other_id_fkey;
       users       apcdmrglhzyezl    false    342    341    4443            �           2606    35681213 8   other_private_table other_private_table_foreign_key_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY users.other_private_table
    ADD CONSTRAINT other_private_table_foreign_key_fkey FOREIGN KEY (foreign_key) REFERENCES users.private_table(id);
 a   ALTER TABLE ONLY users.other_private_table DROP CONSTRAINT other_private_table_foreign_key_fkey;
       users       apcdmrglhzyezl    false    341    339    4441            e      x������ � �      �      x��ms�F��_˟��{�,	�$\�'�)��J�$��=^�+E��L�*��%n�_ �H��tc"��}�ǒ%���y��^���{G�ޤ�ݎG�iz���zӫ��d������pp�����/�^z�,�5������������t<��g�}�>��y:���7N7��� �;v�tr󗩓�O�쟦�����e�w�\�������{_N�������� ��>w����!�z�l��}w�]$��o+�ҳ�7�������_����_n��hvv�%x���r�ha�p�>~ru��G�%��^�\׽����n����Q�n5��h4\����������i��&�����I�;��no�y�������_�������?�'���ɏ�������Ǩf����R��k����!����u�"���^��^��7�K?d֯�����j���j<���T;�PHX��ǖ{��D��q~�6��H�.����v�&G��Wb�σ����ΐe��x'�Ub���U�QE�Ou��r������Z�.�ָ(�E��N���CŰhi����/T�~V]:�vij���P1��Z�uT鲆�P1,Z�zꜤ��M�E<-�
k���o���e�ߡ��m�������;����ַ q9D?J���!?a����tQ�~�N��8)�!��<�$��rd�Z�E:����5`F�Ӯ���
�qe���bĴ��	/�x.g�9��or�8�{.g&�9 <�{@0=�3A;�"�n��3̀8y.g����z�Og$�<�ؤ��M��13Ce�k�����
g�v�Ex�fp�8�{k�����<���kļ�R�3L�-�l*do��= �kļ^���u�X�н���n��8��{�	�>�!55y���椆�W����1����v�F�>k�y��48@�}Β<s@x����<`��	ڃ�R7��0C�8��饮��S�Il6�r��1����v�F�+k�6�����k��IO�PG̀5b΄71C��~X�
3�S��!?`��3�.�ae�63�J��!kTq�7�B�T�ڧCְ�
���f�w��vXh?�
Y�-Wx�e6�C񩛫�e:�~8���^]\N��e����
�y9����;?��������xȽ{}r����/�F㫋��w�[W�?5�=s���&�-��"���Ս�����֫{�S��5��2?l����&�?��/���/[�~�/QS�"
��o��+�?�Ҹ�����"�2��U��Bg�Qhg���b���VC���*�[���G��V=��k�*�[��n����oգp�[��n/���oգrݟ[��n����oգrݟ|tU�Oέ�>�?7���%_p�8��ۻi��`���K�~iW|�s:�H � ��    �* ��+wi p ��	   8 p �l"  �� � �Y{   � p �l=   �i p �   �� p �� � g� 8 p5�4 8�� ����kK�: �����i�����y ��4� � ���< �v} p-������(P6�lv}(P6�@ـ�մ(P6��@ـ�e�8 �(P��
P6�l� e�F�e�� (P6�@ـ����l@�,= ���<�e�f�P6�l4��e�i&P6�l���+���	��(P���1P�]v�l;�>P6�lu;P��F([�|���r[8{�)זڥ�j�{�f}[�S�
?h�!7���:�h�*ف�nDQ� &z!k���|���aj�&G���Q�.r�Z.)ն���*m�K �� � ��} 2 d� � ״ 2 d�� � @�8   2 ��
 d Ȗ @�L� @��  2 d� � �� �v ��O'�oNO~=9}s|�Cs� ���?~l��c��9ڀo_:��4(>������z��Pi6�|j]�p=�W^���2]��T�[�z5YG�8|��U6�:��n5����kG�8h���N�Z�x��Z|��-�F_x�b�9�-�"`E��v}�"`E��+ִ�"`E���+V�8 X�"`��
`E��� V�H�+V�� �"`E��+����vX���-�"y��\����x[*� � k��җT�m� ��� ޖ
����<���v�y���4�������<��v}�o-�%_p�m�x[�:�m��ވ���0��;L���[j���d:��K�GC�Ip��L�ɀ���
�d��4 'N�i'�d��TC'N��q p2�d����ɀ�-= �8�<�N�l��d��4 'N��+����p2ޤJu h2�d�@��&�MƛT&L�A=(ޤZ.�ěT��^��T�[���M����@��4� �A���< �w}�� ��v��;�>H�6�"G2��a�w������q�n�E���~��y���Ű7��G���uڟ-W��՗G�wW�����oW���%�Lz�o��2P///�gN��ǣ�7���_�{}�K���gpw;���4�NG�Ň�a�q���i���3���8�tr7���Xg�ja˾�� �<[m
 ��	D�&M �@4�h� �	D�&ͺ� �&M �@4i ��i{�h�$F�&M �@4�hZG�&Mk�hѴ� �&M�@4�h��	D�&M ��F��i�hv�����/U���M�7�������3zs����N�z�f��zs����F_���~Oz�p���V�Ň꽮\$�Hp��"�E���r \$�Țv��I5\$�Hp��E���@_	.��p��"�C>�Hp����Is \$�H��.\$�Hp��"7�	.\$�Hp��"�E��$�.�V8�E��	.�f>�Hp��"��y�E�4��"�E��<�"w}p�m�ņ�,Z��A8�p���#G�;A8�p���#G� A8V�� -= �<�p�h�G�4@8�p��+ A8�p��q#� A8�p���#G�� k��#G� i�p�±���N���c���q����F_}�f���8�Y_��Y)��%`�^��Y�}�ݢM� ����틾zk�����Q�=�*�?�D��@���� �Ę~��N���~�����x1���x/^�x1�b�H/^l� �b��� /^Lt x1�b[�/&Fx1�bk�/�� x1�b����/^�x1�b���̺,��UՀ����fQɥ
j��`��T��S�����z��S��n�S��胩n�/��� ���|�K����3C_��^�����M�y�^���Ű7��G���uڟ-���՗G�wW�����oW|��%�Lz�o��2�///�� I�Y������g�HΖ���v�-��i>O?��n� �0�8u���n8�8W7���j��o��Z6H+�V����ρ��;�k���`��Z�]X+���xk�
�X+�V�Hk�j� �V`�� k�Jt X+�V[��k%FX+�Vk��k�� X+�V��Z��k�
�X+�V`��F�l��[sAx�������Y����i�Ax���y@x�4� <��K�o��W���*��^�	.r�Lp��"��
�Hp�4�E���i'�Hp�TC�E���q \$�Hp��p��"-= 	.�<䃋i��Hp�4�E����+�"�E��	.r#��"�E��	.\$�H���"k�\$�Hp��"i惋	.��\�N�.\d��.r���F_l�Ȣ���#G� A8�p�ȱ�#G� A8�p���cU_����� �C>G���p�Hs �#G����#G� 7�	��#G� A8�p$�±V8@8�p�f>G� ��y@8�4� A8��< w}�m���7?�/vKWr෇Y9��%8�AO�p���%ڤ���<߾諷&Z��/���C�󇗨1�0�1c����ρ��wj��'��Y��xq�C/^�    O�����/^li����� ^�������� /^l��b���H/^l� �b�Ŗ /^Lt x1�b�����/^��k�dYx���U7Sw͢�K�d��T��S�LuC�L�N��Lu���z��S�F_�3�5A��?������g��p;/���xA�}�%{^�wt1�M�����xt���G�%�d������pp�����=x�u�oο����uF��yػ�8^��{�uo��>[Oţzɾ����������]�_�_s�k�ۅ���F�/���}�q�/��}�-oz7������g�����d����������q��ς2����3����W�W��yY,؋�D�Q�/_����:�8b5x�O�5��h8���v7����N�v�{np�o6n6͉�Z�Y-�v��F9qx���0'�Z󢝹dx��|�qtEW���&I��ܚ��/��	�`+��&=�+ߨoh��߫�<���Pv-vc	�&��>���77J�`l�n��Rwe��y�ԵG}���v��ͯU�e���֠+��U��7��@�u�[�%�m-Š:C�M�i�d��O�X�G"���6�ƣl*��Nq����0K���C���U-��?j�̿������6��ٻ{a͕l=��r��3C�!����!^H,���d��ev
��Y@i�虡���P�ƭ��ީʈ-C���@+�|`���>��KpeE䆊��xa@������N���E��ĺC��Qː�`����(n��L�:E@����T�▝BWn��9��.H��2��0ܮS�jz3;Y�NUn�)teM�Xo���|�Y�4����p;�SpJ�s;�Ӝ~JAD�3XPU�nׯ�����ʀ�ru�:d�ӕX�q&����V����ʛ3�-����ʛ*r������9�Λ�9
�˳R�
�s�0zR���E&\�E�����J�*��n�1�$������*��r�n)+ݺ�h�b��q����]JbtA<ۚ���lK�lX�d(+���V:�Ě��R�+�R���l����e�TW<��W�u�(b�T�)7j�>�r�'LUW��Ex�J����ְ���E�l�=���+�z�[Ô�:ӏX�֓^�vى���D�IK�q,e�[O>�����'+�z���e�7bebO�d�li�J��x��*n0�1+���;�YY�ړQ+�x1���|���O�=�Kp�/j��_�2��;�tnh|ە���[Y��\��ܨC�{�X8�����)nl��i�~�ô
_�!���y&P�Y�<|�^M���a�+�gu���<���W`@��Q��R���l<a������O;%s�ysy�����N�3�T(7\o�U�"Я �Yt&�EY3&�\�+��Y)�_��u�3��T6_�T��7���KS��C�7���n�&PM��
"g�"PM��u��	T�&PM��@5�j��	T�&�S ��Y� ��u,PM���BW��@59�PM���s��@5e*��j��	T�&PM����T�&P��]v��@5�jr,����@5�j��	TS�WST�юTS4� �l�pTsW3��O:��0���tY�q@�ͅ�%�K@��.]�t	��%�K@��.ن��-t	��%�����%�KZi-�K@�, ]��tɜ*�t	��%�K@��.]�tI\��tɚb�t��0�.]�tI7�%�K@��.]�4�貕 ��ү�|^�~̅���z�z���1�[r��T����_��v����&uq�wZ:��h,�BF�h��⇴���li���mO)�2��\�ݳ/�0b�v틻̬��﮴�,�Uި,�{�
�`���.9�FӜ�g~27[���n�U=��{�}�~ߎ������@�z5�MT[��U��g�����oUn�ӆu��&�bj9~��u�j_��z�̟&oF'��`�_�}^�^,>��t �H�@�-�h�D$Z �"۱!��Ž�D$Z��B�-��������ɯ'�o��~h�l-���h���h�F��h�@����_�FKC���I���8N�p�(�@ᤖP8��	N�p�(���N$�9!q�^_�����	4N��B��z���	4NX��ch��!�F0G�u,�8p�?����%�O߽~���^����v��4"��2��~$��z���z55�xj��H1�O1�@�ٞ��V��xj�!��%��,dj ����|�K����:����^x�a�^��w�<��b؛�{�����:�O��K���ˣ���`����_>��Y�^^z����������^8�g���N��.�Rgp�9��d���no��x���/���^�����xw������u�Ա
&�Ǔ������ ��q	l
�î��2�n�R�n�F��ۀ��f�M:�q斚4��~9H��4k�E$]I��&zu�]A��P�A`���*il���sXnW�� �y��J�Cw�OЄ���H�ف�_E+-a3��/R����F{��#���ZG�hpMƈ�S��u��6W��SL��O䎬�dbXjR$���"�-�t	Y"���Je\;[��گ
�e���_�K�C��V+�Vu�^C=˫Uvyɋ����@��R�Δf�M܌����FBލ�3������7/��֛w��y�<�o"�4�R�������w��(i��/ ��7q���-D�~a����_��{��X#7��=\��+<��/�Q����(����(99��+$g�Tv��Uv܈V��Tv��Uv�vj\��U�,�ky��:C�%�s�,ǵ�TgtF-�U��mH�ȵR�Ǯgk�7����,�k��e�&ǚ��\�+�̇
M�i���繖�1�@�/q�k�8��(B�9�<���<�j\�����9��<��@2��U
Cv�ւ�nD��|��е����ra%N�����I
92B�J!���]ݘ���,�ky!F�`eNi����5M�g�]+�,�X|����е����P���GTl��Ă��Ă�>�eeNi�����5u���
���
2�@�/��i�d9rĂ��ł�ո@]�qĂ��ł���9U�@v������UG+�Z�dk������{׬�P�Q�V*�u��PL]�q���\�e�!�
V�T����Z��SWAџky�����ʜ*�ۇ�:r�}���>vF�!S�rџky�F�`eNie����5u�Q���S�a�@�/͟k;�ˡ���sm%ء�~C�C]�q4���?���+X��Ϝ�͔u�2�/�9>��+s�dN�P�2�/�9;��u)�2�/�9齂�9}��IY��O����StX�1�O��hwX�1�N��r` �͆�)?��+�
8�x��U~�՞��������^mV���7��Wߟ��w�t��"ǞBxK�~N���"��5h;��9^.@��r��r]ڎ�s�D����V�{1Ze�rAڊ�o/Q��oU��R\��5j;��N��"��0����*�n�W��oU�g�_�U�w{	[m��?;���ʿ�+�j�����W�U��ʿ�k�j�[v�v�����J>���nZ43XI���_Z1���/�t �0�A':a�	S^:a�	�Nt�Hq�N�}ġ�0脭Z�Nt�j����@'Lq��&t�����r:a�	�Nt�vB':a>@':a�	�Nt �0��	�Nt �0�A'��t �0�A':a�	�� �0�A':a�	�Nt�jw
�Q��0��Z' :a�	�Nt �0��m��0�A':a�	�ڿ����܅q�����/(~A��_P�R^�_P����Hq��}ġ��/(~�Z���j�ů�@�Kq���%t���ů�r�_P����vB��_>@��_P�������/�P�������/(~A������/(~A��_P��� �/(~A��_P����jw
(~Q��/(~��������/(~A�j��(~A��_P�������|��W��˅����ݴhf�    E$x�[(�mo:(���o�����*růRw7�+�T��7���H�y�e��~�������;��u'�ʆ��;�ۥS#aދ�<�w/�bC����i�j�S�H:ˡ���[�����7�5�r�/>�y���<��y����Ǫ�����$ʦ�K��D�y�e�v1�}N�� *�P9��!T�r�C�*��C�B�*���B��>�P9��!TW-B�*��ۇ�a��r���P9�QP9���r��C�B�*�
;�4*��x���ף�	}�}��q�}=��	� }=��A_�z�׃���8>@_�z�׃�����}=��׃�����}=��A_�v���5�}�2�- h�?͉�N�  	qH�C�M��O'�oNO~����7�g�N���A��A%_ 	�ȧ�?D#w�F�6���m�!���C4�����T"o�{��%n���/|�w^�a�&I>�=/�;��&����v<�N�ӣ�~������j88X~����/�oV:��w�x���3���y���G���Ń`���ǽ/*����ޫ��d�t����'�"��y~�q��F�Q������� x�O�5��h8���v7����N�v�5R��ͦ�ͦ9�Xk�1�E�k�̶����Ɔ�k͋v���#�SU�ѫ�m:�+?��	�`+��&��l����:~�	���V��k�KX��0I����Dľ(14���i��]��R*��/��ͯU�e���i��MR5�Ƶ��.sk�����Tg��2M��ܼ�I�K�H�7��&�(�A1W�Рb�Q�3{woQ��<�}Znf(�'7T��,i58�����NE�UC��*�2CE8���%d�[�3Jmf�lJm�!�Vӆ>��9`i���^�2�pf�Z/a@��A����˼�jbM+\X�.3���e� �(7�Y鹨;��
Xr.3���e�Ж���e���L��b�)h��A�	���զa@+�X�33yݙ��kk���L�;�D�"`幙p�)�Sp�qfJy;;�S��:���̔�9v�:��XP\9gn��rWb%G�r�]W�ODZ�x��ԙ)%u,o�V��+o�k�0e�MiM����Y)U��c�a��N9�:3;Iuw���X�VZl'=�F�,����؎���t+��3_?h\�n�p�vf�j;ơ��+�Z����-�PVN�ۙ�#M��{A����؎qZ@���mU:<�>�e�T�ڎ���_��m"����Nl�=/ ��ʩ*��b�l�.�9:<3����cXTQw�8
=3�BOs�[��t+.�37�r�ϑ�)%z�F%���4��J��v�I���o�%zLz�QG�g&��cZV��p9�=3;�KK9=3;�����"���3�R�<�h�̔=������_E)��
�I���Kp��k[_�[�w����/�"�܌5� �>�vnq�\�*\)��Ś~^ژu�q/�e�~^
Ŷ(���'\����a�H��bxr䷏��]>U��~�а����:Q�^.���� q��	��<+|��d�@���W½�e.;o.��v�s٩p&�
����j_�u# ;�΄�(k��}�Wm�l�g=��G}U�ҙ�j*��B�W|���ݴ��`UϝO����}����" ��	T�&PM��@5�j�vl��@5��&PM��@5�j��	T��)�jլ]TӺ�&PMe�+PM��v�&PM�9
PM��2��@5�j��	T�&PMV�	T�f�.;PM��@59��T�l��@5�j��)ݫ����hG�)�v�j�c����
P�'��~�{��c���8������%�K@��.]�t	��%�K@�lC]ږ� �t	�������%���%�K��.�]�dN]�t	��%�K@��.]�$.n]�dM1]��t@��.]�����%�K@��.]�t���e���]>�z?��P�B[xn��]i-�WZ}�*jי6�Z6G��̤�g,����̍0g`�
�m�"0g`�u����30g`����9s���3�S s�\����u90�?������7�'����9>���� PΠ��A9�r�\k����3(gPΠ�A9�r�ʙ���ʙ5��ʙ�a@9�r�{0�UP��c����dm׾{����٫�_�H܁c7�O� 1V?)1bt[Ac7�qAc?eR'�"�!66����p?������7v|�E�}�u����3��󽽣�ao���nǣ�?=ZN�'�/��ﮆ�����.~�l��w�Y�ٷ����&u���s�S�d���q�9>8��ͅs{��Sg��ɯ<9t���_�}�fK�Q鳎���/W7�ї��e�oE�3�;�����_�����d�:O�6�39�W��Y�/ë��Թ�:W��������9��:���ԙ\��������U:�{�{���1Y{�o�79X�����4�6넖d��9VHP������j���h��]t��V��y\�.[^!�/�AbN���M��/���,�P��U��ش��j��Zo[�����L0��Wo~�ART[W�K����o���n�r��v��-�Ě��X%��
V��$��Tv�R��ka��~&�N��ea���M��V��nŘ�^/�d7^��b�g׋�0����Wߟ��w�f�	�Fۢ;f��$1��L3I�$1��L3I�$�$3����n�9�y/���� ����[o�z�Y��{s��ӿL��s�~qVӰ�ު�\��/��'����wÑӻd?	��������sz3ɚ̷N��_ӑ3�L�q�b?�uݎa�(���x	S�O�'My�U�J��p�D��.~��t�,d�x҄[2@�6W�]��G�<1�W�jiB��PZ煤�<%,��u"}������j���0�-]�f�)r{����khq�J�m.7ZLz��&�:��p��h����b����J[����ּ��(�+�2�2���<HXH�'�dU��D�$aqK�TܒM�o���&}R�IV%�QD$_��Ɋ@����蓊3���Z̈�+8��'fdl����M��D�8a�D��a�(�tQD�[L��&�5��}R!CV�`��p��(K��X�O�,Qi�-��$h��] ��J�*@�2ֆ�B͏1+?�z���ң/�#��},�Y�ї�0�����%1+q��B�CY��6�M�VM��/-z1�M���J��xJ���a��@>oj�^��K��7�i����`*���.E`���|s�9���a�=���ݙ:oo�T쉐u��wRm�n����z\_� sɾ�������˥��z"t_�����z"|��&�q���]��p��8���.wq���]��p��8���.wq���]��p��8���.wq���]��p��⇻��`pqL�cZ��Ǵ8��1-�iqL�cZ��Ǵ8��1-�iqL�cZ��Ǵ8��1-�iqL�cZ�☶5�£�u���n�E���/�d���X��(�h�#հ��pW��h��D=Q}z�t���[(��Z��q�-�8��L�6"vx�m|����ˊ���Y����������̰n,�l4L~,�$e���Ұ3�l��X��'���a��X��RM+����������g��WN[�H�f�v4E5��Y���e��}��_|�����E5?��\����5�����|�t6���d��i���ӿ����b��Y$wo��;X���y��y��y��y������d�w>6{�EA�
�Pp��;ܡ���;
�Pp�������j�V����P�R�?f���M6EF֣��ZRdT>��3N�q�g�<�'Ϩ�8_����ӓ_�{����٫�_X�d{����O_ԍ~u�O��
8���?jmG�ߞ�zɁ�9p�춼�/��0
� �<��=��;��&����v<�N�ӣe����<:�����*���\�Ň��gzy5q���ܹ��9���S�w���>f��:W7�t|5;ëi:qr��Ԙ�y���N�W��&�?z���e�g��7t��3    �3_�9�w���t���׃Qv���ԹH���ҁsw3L'��������8WY��|�L�>��{�ubP��6���+kS�ɵ)�����$��6�7�\;�[�W>���W�?�x���� �r��ƪ�x��:(^��aLm��W�a/��1����N�����e���P�e]�n���w)�u���'��Z!G��_�c_k_���08ԷY/������K�s��_"�GV(�L ����)������s`�D�D���<����q��0(/ X�/+_��8�}n�|�c�qxu��������%�?d�2N�rC�P���\�!�K���\`��.�0b�8d��9d������R��W��"��c��]���>e�w_�q��*]�İ�Q��[*<V�\bG���!wAz��w_��Mf�B�ƲW�-e��{�T����4�%��d.���te���RݽM��}�X��ޢ~NQ�ge�{E����TC}V>{��gu�&��_L�+��\���qC�s�:c�
0׿�����ӹ���ܚ��[�$��뎗�u-q�{~w�<�k������ �lC�f�����Ǿ��f��~���%�����}}��c_����Ǿ>�����}}��c_����Ǿ>����Ov�]w�+��/|@�=v�C��c�;�ء�=v�C�z��c�^�W`�;�ء�=v�C�z���=v�9o����P�	��;E+��(�w��Fì���q�1�����k�Fh��M�ڳ���4� �һR\cyz��e��9�&eT}�Jێaڔ�`!�����0V��\KI6hϮ��F�����z�$�g��07�D�����Z����n���Qd�w�2]�bx�U��}��t�o��J̜��$�;�L��00��d7����^`���x��:u���.7쓗	ղ�/�5��T�}����8g2�R��y3ԧNnr��y����M;�a%7_��	�E��2�n�͜*?���|�^w�Z�ι�䁰�NJ�]�.���	x���rKG��2�l��j�x��1	���<�'��%�VۼW�h��l[N��gq�)'�>������Ozu/�׹d��&֌�M�lӮ����$��H�+hʹ����M�y0���� �������k�v�~0���=� �00��l0y3:I��4�Y��E��y9Լ���@Pg7>��B�iUN�*�"D� "@D�� ��*qx|������+ X0Bj]�����}��N��NP{�W�����5�ǉV��rzԛ��ty�Pĉ"Nq��Q�竌D��c�(7D�!�Qn�rC���p�0*��m�RoQ��Ri��}��^�zs|���r5��w>=��2�TD7��*�����ٯ/�#:�UU�֮��oD�`E�Y���{~�t:p;n�xы�{�F����3?��⽣�ao���nǣ�?=Z��՗G�wW�����o�|6x�}�R������p�<�!�(K�8�q�܌�N��v4I��~a���^�S���\W��?�Ϸ���V�"�~�H��~�:IQ�QU���osV������(�^��x�OG]ڡ�D�;����_ы��'��_r�0y�@6wI}$��f�m��dǟ_�G�����'����[���e�h1n���$v�"o,���«*_w�2��eLer����!��\fs�Y�Յ|m�rA�$�1M�m7H��V�y^�����iSCsw΋��� �~�h��%]�)�6�r�^�5+�o}`�ƕ�
;��AW��`��p�æ�Ž��g��N?$������O;*���_p��=8����R�G��q���r�E;�)���`֨����Z�ꇴ\4���Q;�5�v`c�(8�5�i�Y?��[�D��;�ݎ`W�Sqe�I�!���b="M�T;4�~Ê�Ԁހ����&]�f�<�o 6�vfՀ���Kr��>�Il<u~n�g�nH��zu}�*�_m(?�iŤ���j��P�R兝b�t��pAV�֏:�:ȸ�]�b2ԓ���b���l�h1���k\ ��c.�tg��V1�Jg|C���ZD/G�-UT.��
]�^�#r��ȅ�c��23�NO�Zt_����<�T���j��G�`���g�)}�����PV��lR���r���uv�BW��=��`Ǭ$�ۼ�R�+h�ꙡ�T�ۤ:�-f�:_��z�ֳ2�oS����4b53���|�|f�4��/�e!���Ac�:_|UG7���|�U]Gǉf?"�lV���Wu]�l��C���$��]ُh�w�+	�IP����ʏ�,���S����\`%��f����}���H/��k\��tX�6_>v%|`%�@���n��'Q7":�<K�d���D�}`��@<E��d��@~w�0��nQtYy8��ö���m(���1�y��.+ن����I�V�ŗ���
u��e%�P|k���}`e��BJL�W�v��a�e%�P|�k���}`e�Pz�����;d]V��7x���D�
�,�Ը@]'�<���'=�>�Rt$���v��p$���-uឰ�p$���-��<I/z�v�rm$��5�t�	+�F�+[�	�V���W����.u�!a%�Hzek�1���ʵ����P��%.���l?}��|6��]������`�J�%}�.|��4�N�\�+qI�0d�s,�pC�`�"�,�C�����$X����%���մ�6�"t*��C�t��7N��&�a�n2}��\d����V����k��%o�:t�7
���m��=m�ՠ�m���ʛ����6|߶ϲ�=]ܷ��$�N_n�pw�����̢�-�%wdkBQi�㤢�w�=�X�r����'���V��,ay��j��Ӆ���;;�/���|G�Oɫ�Z�����l��W��5�v�w��K��3{ؖ̾}t^i�אٷOӫ�jIf�>E�6�+�����n��ag�p���xG�}�������ݴ��`�u��s���[����"@R9���6��T��2��@R�ʐTV�i�T��2$��AR�ʐT��2$�!�I����ʲ�$�!�IeH*CR�z���2$�!�IekZ�ʐT��2$�!�L1�ʐT��2$�)�BR�ʐT^��ʐTfHB@R�ʜ� I�}H*CRy�NH*CRY`.IeH*s&=�T��2$��>@R�ʐT~��ʴXCR�ʐT� Ie�� I�}H*CRya'$��!�I���@R��;���TO["*IeH*CR�ʐTnCG��2$�!�IeH*?���2$��T��Þ�zɁ�9�"��_�?g້=��=/�;��&����v<�N�ӣ��d������pp�����/�^��L
-��/��'߬Ԝ/}7�{s�:�ѭ���s}��v���:��G��>N�}���R��|sѹI��/d7)���ӏS'�Ͽ�y��q������.�&�d���z[���o�!E�����hꜧ���Anח����n��n�t<����g������b#�$6���V.6����%Il����R@sjӁ[@�C�����=\�GA�~�Q�P�mcp�s�%����ø	�פ�6���-�p9�-���&r�)���-sU��}��Q�P�A�i�(vl���"Q_��R46�}z8�Z��C�Z�e��êU��f���n/�5��y���F���[&սTU��_�:�'���^��we7[�r��g%��C�~vl�
����]*'|�;Sy�ʴau������j:�b)�ٴ\5�������.Os�v�p+�~ ��-b���Ok����s��բ�c�Z���f��?D��ƅj�,���&���Z��ް,/�i��:f��fza�؈�U[73T�V��4OުT?l�4�NL�%BEՔ�Pai���hE��lu��/*��>K_q:����J�òg�Cʨ�>y+,ӱ�S��ELf����V�*J�̆����Bk*ʓ�.��f���A,��Uiq؎"�1��UjvF�d?��y���[����I��1����b�'Pk��B�( 2� �} �V�T�q�>���ʜ*���C��Q�1T	�]Ϝ�!�#�q    �V%�ak��Ś&�*��.�gN����ʜV��C!+s
�g,"�	6M�!�8�'o��3�,����*k������N�Zm3N�`�G�F��H�6+=
Kap"�ʁ�R	Q,"q9���jX���і�G�#�~�5��̑*�E��GI�B^�����EX˰z���Q��|�_J��F	Q�+�X���iܰN���R渗V�J�bd	Q +�X�����Е�>��9����fB�J<�0ǽ�P�bZ`�+�KU��d%�{q5�D/
J��x�<|/����V��Ȣ��ʵ��*X�ᅨ���d� ����<dX��A\˔l�J^>+�>H�`%z12��\� ��e�zR��|V�}�V�L3O��\� �
�B�*F�������l��٢"�����/��%+F�;=��%�"X*�u���3�U3rH��w��?'ǋcf�o�W���7&#��֌l����g���͈��|n�DxfC�o<7L��ܷ���ʿ��7%�V�ኺ����ޔ�gj����zܢ�-_q�Z�! 9��H@���t���HB��n,5�ۧ�Վ�.�l��HB⨁���"	���QgKEGD�-jI�Ռ:[�(��1j �l�HB��f��RE��T�P��}���B���ݴ��`����~i-^|�s:�H���$x �	H�@�<* �	H�>$x �	�<���$x �S�\!�	H�@�<��!�<�����(!�	H�@�<���$xx�B�<���$xj�������:<���O �C7<��^ �	H���4 �	�����$x ��|n �	H�@�<�Ȁ�.�	�]D<��:$x�*�澌{_ �1��@Lb:Ӂ��tT>@Lb:�Q'|��@Lb:	�t �1��@L�2�BLb:Ӂ��t �C�5�t�!�#�CBLb:Ӂ��t �1������t �1���b8!�1�u�t �1�:>@L�n(�t �c?�@Lb:��i@Lb:C!�1��@L���@Lb:Ӂ��tv-u1�]Db:��:�tvu��<U��}�������nZ\b��gv^YK==l�6�z����@چ恗#�<'�w�e����x]/򍶾jmg���_Zq��Nwm�mE�-d��f�nq6���d#�4�������/6~�'�"'|N�� 
kPX��֠��5(�AaM�֠��5u�֠��@a
kPX���*�+֠��5(�Aa
k�XCam
k�`�Xa��O'�oNO~=9}s|��m� ��	!�f�8!��5��	�5��}!��5�ɯ�!��5�A`kX��� ��5��va� Y{֨[�� _cP(�	&�d����PЫ;�2q���Ld��d� �8����e�&߽~��L^��b��$�!t1��%�z�!�8���kz.�A��e�~���^r�v������"�#/H��3����{G�ޤ�ݎG�iz�\�NV_��]��]����e��J�-�.H��y��8g��t�{W�ԙ^�N�n|�>:ëi����N��\M��(�87���e4�t��m�%�-?w�>f�h?����?y}�?���eK�q�BP(���JP�_��׾�>�ZB�gC��Pd���UZB������؆8���C�2���ǃ�Yr�,}�j��اT6ކ�_&����~7z���a��h�M:���'���}����).���kW���\����kFݧ�h�{�Էt�|���O�|4wQ����5�G��?�]��|4xQ����5�׈�<�]T�|4wM����E��Gs5<^T�|4x��5�MA���5�Gs�?�]��|4xQ����E�G��>B׬�\�6���ڜ�vÎ~�as!�cwc(���Y�è�#x�xsr�ԅ�d�d��+mu�$Ү<�{�a�o������K�d�َjJ���\S���Y��nh�e�|�ٕŮ���b�evc��2;�\��]�׃W�;&܃�S^�0�^�׉/��Œ��uc�|h���Jwc�z��nl��n�v@��Ɔ�e����F�q7���K/��hV/��p��h�ӍE���ǢWfud�h�zrť��r47�o�4;��������F�_C�k��r�A/*J<����$�'M��O6��J�#��G�47T��۩v�������a��G���H��>k�p:�޳�4�)�S)���l-��Tʜ�i�� ޳>PYI��iX/�PK�R.��/�ϋ}*fΑ4�]F�>P�P8��ןT�����l(+s
��.�Ը@��9�����=֬��R.���V>!���;G�4sAX���5q4Ms,��9!G�4�T����j\�i�f.������jB√f>��T��^�S�����j��:�s�N�?��N�n�V�'���y�j��m ǚ�SUJ�v�����u&�B�]y�>�GO�Dj�M���pDRsK��:a���P�g�(���y���8���m$��6�Ss���m�肰*���8�J���*��N�m�͒;,����iqqj�;,E��P�X�݂�6��\`d�����m��|`����_�� ���T3Keu�ո@��e.0�m��<��m��|`����)f��Ih���F��]��b�| ��t�� �����6K�\`d���k����X��mk�"<�M03X�V%�mk��ѓ���� ��H�Ā��[*<��[uz����\�16�@�9z޹�SL�NBH��p��sħ���8ϑ��}�~���:K�H}g.�/n�f�T�ַ]����:��H}ώURߖ�6l�PGO��w��Yyb�Q��-����<B���ge��c��q�#K�� ���;	!u���%�]��b�|���]���!ԯ�C�,�ge���-=֬�� ����#VJ}_������r��&�Zf���9g������L|�7�o��G쀕8g��T����8_��������Lz-J���g�N����A�C��X�s�B��+t�^�	�<����&��k��ҫv��q{_��|U�<4$�.�W���CC�_�r���G�/�����(��ś`Z�W3��CC����+����</\U�w��E�0_����煝�z��/���y��l/K�|��6�o/\�}i�|l{q[�K[Ǳ�En�/O:�q�vޟ�6�o/��}i������������gO��9�;��Z��vޟ�v����ڼ�����~���nk�~���nk��!;ﻭ��!;��Z������7*���M�&�{�e%�����{��5��i-��t�+ꡫ��RUf�2t+��ʶQ<U�yC��P�������v鎺�@s�'�GNx�0���Q�j@��}����4Y��h���%͐-!Z1F��o4̓�h���Vٴ!S\���.��ԙ^���bS�'}F�����Ѹ��CSSLV��k�Oŗ�񼮨�.jO=�������;ni5ͦ������]�"о�>V}�E�\:7�p�M�����|��:QY�������R��S68R��M;d�[S�C���W�k~���t�@�e��ؙ���D�����l0y3:I��4w��\Qt�t6����-�A�9c�sͥD��Ƽ�k^�:?��O�������"��x�;��^�x�;��.�|��x�;�������������<x�;�������+��x�{��������b��[���w���x�܅��w����!�����x��u���'�3����y��۟N�ߜ��zr����F���h2�B0�����f�7z�����&r�`�U�OU��1�!Ɓ�c�o�ŋ��"oN�ǋ��;^�ݤ�q�(#�А�}�����i�!o��o�ֺ�7d��xC6ސ��7d��xA6^�]�^��u/Ȯ�̦����� �W�~l��/fƋ��bf�)!V�g/31���jx�1^i���4�+���+��J�mC�Jc�Ҙ�����+�CT^ؓ6��C�}��ע�ޜ5d�����ǅ�w�_e+�W����+n�ӿb]ėȌ��|iP �   ��ʗ5En�3
3��1hӝiP���iP��������^M�t����d_���X��������������/0�����黝ݯ�Y������-�~xqv;}��_�m�Ư��A��w�����=����s�Ŏ�p�Q�0q��=���g��?L�%!      w      x������ � �      v      x������ � �      r      x������ � �      p      x������ � �      l      x������ � �      I   �   x�5�K� EǏU�?��:Uc��;�J-	��W/��{��Y���^hnd\iM�Z���dm�"�3����
m%�[����CH�����[fGܤYL'� B���Jp*ay{�*��6�l��:��з�ol�� ���╿0H)���P>:�>D��B�rFF_      n      x������ � �      2      x�e]]�-��}^�1w��҉ۂ<���8Ŝ��<�J��@E(ET������_����OoK	��=z�S���6������Ӷ��a�)���XW+�������z%������؝}E�����Y�)q�Y�ysOͱf��q�]���<`+������)+��o�(���b2��t���utuݥ����t���̅%�<�tƩ&:͚ne <B���T��Q7*�R�S
)J�j��cPDO� �p�{�ϗ�����~�?־񴯳���0@���Ҭ��:��nyy����i���i!U?�}�ٺ���l�c�n�n�~�nCV����Ɔ����}��'��h�e�d���|}2������0)>P ~t�P��*�=(J�w\�#�F��d^�162t-!�fW�i��١}/B~׮�`�඗�[Off@#A���Y����R���Ĭ��Ng����x�^��4��]S`�I�=`%s�D+����Bp^��?�K�x��z�Nʝ*i�\���Q�5G�bC��wF{�I�����Q�c$ФeH#FI��\��8B�et���hM�&i3���L�Ϛ@��!��������y���߃�����)V{P�s]��8�C�_��BÍN���BJu���.I@�A7.9@r̠�A
Ѕt�������c`��M�;���3(ҍ����AS�|��a5	��iզ*�y5e�.O�Э��e��>MY �.�7�� I�Y��.{��Ťk���� ���Lw-Ng������,�N5��F:�`��JI�,Bу��
�m�����Y̊� �x�B�`b�lS�ӵo�8��	��N���.�ަm��tf8R��/x*ٮP{��%�|�JʤR)�\��>N8��/蕸$�F��x�U�$��$�2O:Ȫ���I�c�k�:���Y�b��/@�Eu_�+	I���^�o�+�)%K"�A�;&_*�f�k�'�'��s������y�p��=�`{@.
v�E��.s��^�A�-�&��߃>����. ���l��5Q�}�I������ld���J�T���y'�Ifufq�s������8+;u�Ne�o�ԏ�{`d�ꝺ��W����6��u-��^V���M��o�x�	0�gUB���L��`2�`R��:	�V�E>
Vk9�v�?i��u��_&�Qk��>��4�M� �a�f�k��ˡ�fоH�n��F7����n��8]-^�`���c���H��o[�H�������ڷ_|��+z�熊�k-��ת�N��Um^�	��]�����Tscy>�T{��~���`W�C6�ua��<X�O@����8I�o���B�:���hYa�+�X���&f��ؤ6
���'�&�pήz����0v�c��[�r�P�P5gߚғ��\�NW�U���*�rzl��ʜ
�i��0g�^oGy��۝��^�e�U����s�1s�(�_�ZJ̭V����!@����u���\���}A���V�'�R�bt+5ͭ�?�%�Q�"/`�<�T�d�1H7��2I�Q�T�d���$�W��������+-K2�$抬E�~�SII�%\tE�|@�"-K"�BS���۾�W��Q�[^����z��j�!�k ��׆���r���H�����T����N��V�h�1CDZ�Tz�-��#kk��m�1��P��S|Z=�b��!5� hP��� -%
	��3���t�յ���I�n =?QZ���f�j?�����T_���xl���	�����*��qs�;>>V��ns.
]�`�A��߄�u�Ð���U]jW`��+Tkx)�z=G��;���&é�H�\C����g����!M̿<�O���Gם�TS�D1��nc2��\�0���g�V�n_s,�|Bm��zy 8a�3J�༞Y=&���0�:�۔0�Qr��
�s��/����i��P+��}`{X�	Y��J�6�"��ʙ�\m��!ASd�^k����P��Z�_g���u��Q�酾��ARfyX���,�5��+�Q5/my�e���o`�>�p�?�d��t�/�,N��F7Ր��x��U"��?�3��9��U��!����5R5@��=�ů��S��G�/Ƕ�������h8���*;9��DZ�@��Es������id�`�l3�;�3�h������(��	�}����%�flr��o�S>�:r�2���J�Ҍ��&W��$͈��#��ie�E."�92|3N��$K�h���Nbw�S+������n%�M{�Yőc��͂���R9#��׍��HeO���obo��5/B�X�����&��E�����;�A�f[�����f%�f��n�f84ց�vmvS;���q;��/��w4��G9ۯ�Vb��<�QڌKJ۱�
��< (�S���U�f%�A9�Җ�W�b����'�=�W���}@Pn�ģ��%�4�V��|Vn������9�-
"�.^1>:�æ��ADv�<����[�j�i�c��}y��w�>-8�پ=���4U��Xm�+���b��mt�f�����&�4f�E��ڦ(�S.���Ni+��H��?)7APN�D+�]4R*AP�<��9��{)mp�6�� ����>t�^��K��Y]�R�C�|9v!�L��t�Й�<8JKU������80=~`*�V#-���h=����9�3i7���<Jۣ��$��#����f^��ƞF����r�{ �Z/\F��~�ex�����A�^�F�b�X�]��bȸ ��!�2�����6�	��5r��UY��ҫ=:A� ����d�U��M�O.�I�R%��u����d�JB�a!�<�$e�d
I�=��M/x*�!��c}��)�$B($�C�<.蕄$_����dp()�$�PH��LEu��d�$�gn�э��4��$���Kb{�mR�c\�+qI��t�!+��j.�����w���v�]�o^H�>T�<T`��D���5�r�a�j�v�}�V0�Ox3�A�
�g;�rX=�oG]2d�S|ɡ\�`���"���]ai:}�0p����ţ��& �n<n�rA�O�>sH+�C �諮��Sj�^��ȕ������X�Pu*[#��ļ� ��'�Eh8����`�-=tVI���r*�}��/謚X��+e �����<Z"�^u�H�8�͏2��G#8:����Ĉ!U&��vP֚���t�+aH�Y��d��D��*�����T� ��nFy�h�}1z���`��y�=�r�t^���c��zy@,F�tV0O�`wy}��q8�/lC�2b�k�"אv�D��gv��b\~Y{�!_c���ZJ>;&ʅ�mZ$�Q�ރ�1����qL;8ʥ��!s�+)�He�T+c���[~%���1�j��d�����Ђ�v�1F���a3�6�d�w��m����+�i���*�����S���/Tޮ�	���)����v��f'��l�2�D�����V�R�7��{}gE=��� s?m��ʹ���5@�ݸ�������mZH̀f@\r~���~7�?p=`%�N̕t�t���Pl�w�ȱ�C���y��b�o���p���B�>���A��|�8�Xm4w��h����[߂��|w�bu�(˕��8TY'���@���k��IJM�g������ZV�W�61>|`{(�`wJ!%؇��R�r^��5`H��=uF�e�h�?�8����Rl�"N�N�|�JL v �<J����08������I�H��MT ����*IN{�
��:���`)]�F��o�ʣ��+,:��&�47s��O�`��ƣ�}ZՑ:��ݹ�cp�sWvǯ3�|���@���_�tQ3�^���ϟ���0 �1���b�BV��.�J�Eݵq�N���KU��"�4����fھ�$�阯8�&�ұ8®����i~���5��4�~Z�5a����f�)nO|��ݤ�ܵj��A~s�j�k�!0�È���$޴ܾY��~���Q,��9
5��;�mP;G��C?v%��~k'#�j�L    �C�8�_��ǿ��@����A��z�3�=�?�4�Q9��ާK�,f���No���l�ݴ�!�Mv��t�&Ǿmr�����&g�mr�U*mr6G���k��&���cΐ�&1O��f*mr�@����n��	� Q����eҦj��G��?J#��?&��^<*�K>Zܷ��z*Z�%�/U*Z�#���]�u�r5k7N#���3K�>�.���(��fj��&�[>�FĻ�{6C��ߟUi6�/B�v��K�ݶ�E�I�ֵ�%�GKZ�"��u���d��k8tzi)�S.��%�ҖVLD\����G�.u�^g̺b�<t+������:K�������P�W᳛��M��O�EK]�_@�%�5�!\T��mWxtW�X��/�7�-SZ�H��^Z`g�%,��/�h�{�syo�p������x����>H*0��%��2Z'(�h{W��K�,҅K>s3��ө��w���h��Z�k���@8�V�8>��㮀�����`�(�Ea3�� n�LHVswR6&p�y&f��I:sv�]oW1<���!s�+���A����q+ل�ә��u���A.�˂��^z<��22��@u�l(�6�r�Q\;}2��!vt8�\4T׊m���@�	ȵ���00h�`�X�O�C(��ap:C�]����'_�<��*\�����x�K�Q��� v���`[����9lW�k�l�e�J��9�5X�a6%������̛QI����-/�c݉������c���G��:?�,
� s�i���#�2��V�}T�ҿ� ]�X����c��8�� I��-�)�t�ˋ�L8�u��Ր�҇��$�<=��v�x���M�8�*8�U�u�ZD]�$ys�N�%*��Z�PvŽ/�ȵ^�/��M5t��d0�#2ۨ����k@�#6{���#2�H��������}�����@���5ɋ��up��z�SIILu�1�? ��-K�݃��Fy��B,WE��Er�A@P��
��v �u��z��	F��SY���G��	�'��T�g=��֋c���r{��{e�����` z�,�Z�Hj�]I���ЙԖ1�B�z�:2F�Q]s +H���\�2 MRw�
�i�+���2ؘV�.5a��rq6g���ҋ�`��c��1��ˑ��]�eF�f92�f &UG�	�LF� ��z$��ά-�T������i}A%�����Ϡ���Sۼ�Q�ژ��N���o���_�mrk�n@'V���X5�P�"��й�!%�bԆ-�.�:�5k��;Ir���M;���+�	s��,����ЁḤ�刑.�6�#�O�r��$|+Ȉ��	_����Mh��u?��ԩ���ՄJ����j��t\�}ЄVD�Y�e�~�*<Y�κk%����\�>�Q��!l�p��{�3��)�t�;���AVqV#ghȦ� �)�!+K�fS|1.�$+����Ym�o��੤�� ����4�`�ـ�h~w	}�/e}���4ZJ�]�E��B���޺�[h)]��1r�̆w�݃.B[킧��]`�� ��4����$Z��FK���F�5���xo�,:F9S��x&�Y����Y1��a_��hk�d��q��h����ȅ{2��$3$��q�@�> %�,	u,��V�b��]�T"!����ԱdI�cqI�Y�F�Ⱥ�W��������V���}Y.Ǌqc�3��&�"O7�|@�Kf@+A7"�
斆xB��b��DUuqKB<'�i'+�ixZ)�L*ܫ�=.蕄�P�W�'�: McgIx���4&h.w������d9LF�eH�"H��,����1� Kҥw�¥@�p�A<A�i���<Rfo�WQSg k����4���A8HFZ%r`�;X%ɱy�����*&���U�Y��x���1�ۤڋ�Pm��Q%�U���y��Y���&ˈ����ѵKW�WT�Lh��i+�� ��B���VB���L��H�� �	�[����t���F���+�� �pi=T��@h�7c٠����	�^ O�g]�S�u?�̞N��Vy��ߕ��H#�|p�I�Y����\�-����C�\�-��`�0x%�P4��oY��jeС[X�
�we8�!�F���:V@�ցG;^���S���P������[(��B�Y}���*J�ъ��pa���]+Wu�CN������'�� ���V�AZ�x4�Az��Zy�ha�� 5��^	���t���w[�O%r��
h{�M�,�"�؃Ö�z%!��t<��t= �͒pLQ��yFm�rAV��K��)R�9V��p;а���
*��˛�m�`�9\)���>BA��i=##ּL��ĳ&b�-�ϗ���9��cuwϰ�as&ۄ�ԜE��=X�Y������E�Do���z���������2X�1}�5�:�(o8XX����E(�c}�� ��w����J܏%��C�J�Ŵ0��@�2{��Ȕ>�Ii���n�U�*�=��J�ar�o[ٝ[��2��\,-Rሧ�ٞnك-�`�
0@�߫�X����4�m�#|Uo���x�pE̣�	]IR+����^ގ*₯O��0EV%+�,��C��Ԫ�s�lF�T%�ը¥�u
�X�=I�(��t����6���|���O�v�Ζ�VP�ܒ��"����Q5�� zQ���X��O�Y���~��I�̈������vw� �::�b�����N�(���׍ ܅ڣ�j�y<t��ɳ鴖!��ȯ�+�qZQ���c?r(AM���Y.+�`��4�ٞ��F�k��cR��;)%��x����* 8�n��uyy��o7��f4f_:��!�}C?O�)%�b�B��B��l�Ο62gPH�`�����F� ��{��g�6T*_��6)�nTz���/V�<#�"���r%��f�J�;%���4LL����\-�Hk]����i��a�h�+e���%�fo��e�o�����o
�{J���<�]c�u�k�d�̌���]	Zs�����ܶg~ƒ�Γ�:'yf��5*#�H�K�VS��
&���1�/��q$�M̀j��*d�$���p�rM� c����aޤ�Ng�bS1������Z�Բ��RS%���C��=c�Z�r�.V�Hش�����1 �ٴ�줔�J��,��\�������,���V.x��BkC���R����)i!�5�qLm�i��"��GM�uAoNȂ~Tj�2B�=Y���C���{{@j��^Tk<��.K�7�˅P	�һ��&n����^�s�,� �����.+�m�H���4�1:����%mf�Dw<̜���
u�DG;���JZ���*��� ��q̕訵��q5���DG�K�@���!���yV�L5��# �$��*F��h����]��BA+i��~w�)��7]�n���;��<��ۧ�o��n_=��y�XwO���=r%�<s�<��;��6�~����K�N�6�7���Y��-����T2D��˲}ɠ��Y=t �����}�ƌd���|������!�ފ��5��h�6�;�Fc%�ޭ�k��(��P�A����!��a3؍t�<����M�Z�֠#hvs��4;B�l,%�T�yf��%���71-��� );�(qep3Z�|�h�f�����F�˳�f��M��J�9p���{;�6�t����,� A9������exe���H]�IkIMfJ�Q���܅��dm�4����K�Rf@-'�C ��
�Y�"�B�z	#_ ��� >g����Qݎ	�H,d�sB��&�=�40��n%]��*���E��c��Ȇs�f��o�4�*��8pe���t6W�7�\��x+�_�1+�m��:�Mm�ʿ���@�^�ھ_��������H����7�F�t���#By�O(��O�ӝdTq�,��f��
�`�y�,���Λ.�QÙ��S���xs� 	  gJ�w;3s�b��O>�f��!ێ��'�:M���}[Fz��IfN�S�r�a�J�L�$;g�A�}��Pl@6:4��`>P�Ix/�Y����
���+Ǒ5n���Ω����J.#?��m`���T^��Xg����g�D�>G��+7���H�������!����M5��|�D�`�򨉥Cb"E��ra��:�	L�Y<� h��G=g�'��03���S�Ltbd	E��A!�&Q�������0���{� ��6��p��h�lt�>%X�L���:k�+��>����n]F���l������ׅ��i����c��tꬦ��M��l�#�� y P���L�4p=��Bl��\�K�8=�<�\'��\���i�׉ �m�$^�Z��9��\V��D���n0�Z����$�����0�?����8�s�h�-���M��L���b�զr�;m�f��M ��J����ä!O�=(c��b��Ouy�(�ԑK�y��qc�ĩ��KW<(bo+����QR�K�gW�o6A&��QN�A�����E~��ȍ�~7�$?�3��M�LӮ�ޗLX�g��A�r�l�A'K@�В��=K]��u]K�(X��^zb���Z~7a$�($�Vo�&��ˉA�R$��<��t�X��x�Ȩ�>x�j��4�2����J��@	���D��4ZHS#	�h-3�n�h�2��h�w3�@�%S�7�k��/c~�(�/�0��6ʬ�f�N�5J[��z������S��#-m��qN�2(w6x��-� &���ag�������D�)`ϯ/��>R5�^���	yh$]R5�t���.[d��0�f�f[���q�林�R�F2	�h���rD�\=o(s��Qi�#�7f�v6q��V�D��2�;�+Y7Ӈ��L��=�ɋ���Ȭ 0'��D�����9tR~09��x)�)S~�)��X�\O�4���~�ȹi7�xq�`La!�NǴq� V;`�#Q�징2��i'Q�1�36�kǮP�3�FR]�6tӅ��Vy�i�fs9C�
y6� �,�`�"�&�ۿ��>����cݙRx�Y���'qgܷF�Nf�)5M�L}Sb*�_Û�ŧr�����e�jx/L�{!�wO���u�L�������ec�'��˚��[�q-Yڽ]�N�q;�o󞯼7��e�Fb���4��ʺ��$�0�f�U+��$	Y��8qߕ���E�����#ݴe֜�t����eG?3(��+�6lr�*v�3@oN\�uy��g@��Y�ß�1�PH�~������j����x6#�W8�-O�:����A���-p�\�Ȗ�����G��]#f$���NkD�#�-b_���<���/�5"�Qt�X�4̧U\�)��	?�*kh��."�B���|s81��]��벍�H���\椴���ʬ5gFF��|V {��3����1��P3��Q`��I���g%��vf��Po 5+�����\�I%Y��$y4��K�DU4W�09P�l���vy4���+��y����/��(q�
�^;$H�:It4�O�$i����]�
C5g�[�di�$G���HR��ک�A�m�w ��T3K.��𠼚ˣ�����K.�H�1b�};ʡ���I3wq���ms��	��-��	�S�� wY�8$��$��1r�p+�e�.h~�.;��<��#�AȢ�%�a�1�7ƥdc�� ^����2	jd��jo1mL4dnL3�*�f�1�\p�RS%��݊�ٛ� �n����r�؃�?��2K2	�$xl2�������~�M�,	lՎ%:9�Kf�z�SII�����i=KB��.��Q��R�c\z%.�-|�1R���-�$���Kb�&�P*v�0�S�pIģm{�5~OT�Hr�^�!�Vy P��0Ү�Kf�w�Me#Yͥ3V$�Y$i����DGkA"�E��o�~�$:jw.��vipf���!��L�imx�NGEJ?t+^i������-r��j��uV���b�o�w�E��9��{�h�)�F�KaY#�9�˻,{N��`������嵀��&��z�0�����	�*'{y%���9�S�ٻk��r��N�^�k^�a-�K�>�%�dlLa�w�i�����i�߾n������h ;u,:��{�����E�(w�
~kho�]эR˕�Qj}�t!Oag��g�0v�u�wf��?��U�M�����h�D�֝M��1������G�ť����g0�	�����b�L�˃�Y񴌫q~�X�gv!��N����@��7�,�5��Y�����Ѭ{��G3�k� ��V�4-29>�����f�LЅ���t�2���*ÇV�7�@��� �r?v�O��"����h�핆Zl�~- (��C�b��� A9�^�[�W���!*����Ə&�b�� ���2�	�%+f��ߍ�o�lA���3S���7#�@y@j���L����,�c[����t�,��t���GK��nFHb���!�c< �?BK�ؿy@*,�����,�����t�r3Bg��f�^��P�ΞAnF�i�ZĜH��.��B]�u����xjѩBs�N���덢�z��2��.����%��>˸Z:��ƫ+�@�Z�s3Hp�o7
CN��~���#M���7R� ld�H�8\f@#A4$x���&P�J�;p��W���YG ���w��1�.	������v�Ӈ�;djb�Z�x@�n�T	-a�$6
C��R�;d10b�[�����a'�z��pYL����2Z���������"'°��d�4ՐƔϰ��� Ch�!�=�Y�����łS���*�=`%e�1��V)�8	�9������.����V)�;)]8	� ���ixuY,�)8��J�8I�R�!׌��U�x@!eHc:D�d�*D�i�Ҙ�tZ��z�CS>T�J+D$j�VS�7�Ќ=���R7ͥ���*���b�Kc��b[<o.�8��*M/��]O������etg��Bh�\�1�n\�]�1�N��?�ߟ?��a�:      4      x������ � �      G   z   x�3������".cN���$(Ǆ3 ���1��-����σ��9C���s���b�.��E
��)�01K�:�0T�� ��2CCN���<�>CN��4�4.SN���̪���D�;c���� oD2G      0   �  x��\I�$!<w�dƬ,I����9_P��AD�Df u�C�#@b���������k^.��x������o��[�a��L����L�LgP��`��P��}gC~�����;Qo2�M�O��,��t�^1����WFN0����?+"�Ǚ���\U���@�85}�jK��t*�T�y�2���y�*�V%����<jB<-l��~\���ݡn{	���ܼ��a�Ҹhi� r���W(�ݡ:�%�)���9ğPkF�y);���s(̛1�F�jÚ�6��jÚ�6��jÚ�6��jÚ�6,+����:�,�ua�y��*I��#�W��Q��UG�3�TK
��ey%X���]逺u��j:+a՟o=��j��QT8��f� ��cuj�� ؾ��l%r�[]R��x�b)�مQ�$������_J�-�N��t�纆��eC�����D)��9���R�"QN��ow���w��SՔ�o�c��{sf��#;��n���g�>ݚr)fr+��5�i�"2���j���7��_��		W��\}1G�G�"��CV��Oy�S��:�u88�:�����f@��[��=,�v��d��?QGק#������ �
���h�(-PoT~3q�e��9�	y45�+�����*?�zK�H]��2����$�2M�0�*�� qvp��J[�3��@8�@��L��b4�l�I�~bԚ����A�y�e��l�E���}��d�a�Z�Xk�!�W�X�����y��cy�V~W�/�7�03��2�[��YSn�TpW�12�5Y��^����Ԧ���b~����f봱�e}�:�n��ŉ�[(QY�؆PZ2��6�D_����H&ꉉ--8]�rc�S
C�]0�h6� ���{�f���б���4Y}���O%;�-3��oC�1�
�F�׹s�����f��y�|v-<�E|6�X'���5�*Q�+[S���5$[�6���G�8����&pnY^��de�.�V8.��yse
�$���ΟTC �+@��ciʄO�,�[d�;��af��f&���$�	���z |=�t5�����ݎhNb �Gw(Rs�Ho,�S;g.��5]�V�CK,���uC q�����h��2o骱��F�[�~�IU��{�,-��\�q�1�qJ�	�Y���r|XW��"g���!��j���UG�F��v��Mc�p !�z_�����m�w;���b=,���b���4R�3��8����Nc��SM��,�C����@���:q�B#���J��	9>!��L�^#Yr$�Z�j}L�P&��{f��� M:wH��%i����Bz*��߯��Lbl�P�M�f��Ȭ;d�d}�F_�:�k7��l{Ȟ�d�Pv;#W*i�J���G��[�i�j�n����ºW�쟁[�P�<05�ԈR5���7 4�B(�� (4X(�B	ʸP��
.T`�Z2�5d�wN��#TR�W�`���o�K�Lo`&��{�e
̴p���a��F�����L�Fag�V{�٨˄mv6j��ɡikw��/9Rc���Ӂ*�|�aj�JM/����g �pj��z�ܩyx�X{(�ԿP�>�z��E�ZK�������&.��m�;��ֵ�jhh͘��Hi{O=�ci�l� :���Eru(M=�� 3#�L�m0�h�׈+�Ʃ2R��iL�jO\�q�N|SO�]\�*�gŹAo��c5�����G��fe�4I�%��w�������H�%��wM ��p���h��JCnud�G�&�p�2OЩL�f��2�����H�
T-ed��Ia��,##R���&�L��������d�i�����uɋ��(�A��<�ԏ<��r7�������*�`#A#��4r�A#G��4r�1#gӀ�@{D��G�@{$�	�G�@{$�	�G�0{d3H&b�D�$���$1�d"��,���%1�d"jB-C�e���!�2�ZF>o���cdJ0X߰��r�M)�T�ڌ>�15�����J8�aj����m93�$R3.�j�2ma����L�av��`���P��$��!�d2(�j>u��DZL�Ӿ��yY��}���z^]��]팕�qj���&�z^m�S)d/��]��Il�߀���by�7�����ֈR���X�ay������k����J����;cڢ,kb�F(Qӯ-�M�=��C֘�hn^;d�%v=��)��?.UK-��������O��)/��Bn��)f��[������zp�H�.�����~�kM�ա��P|סXQ8�8ڹ������VOi�g�~�j�g�&��	i/R�"fvH3���Xm��td���j�t`���ji$r2ypK΢�hM3@w�v��*T�>�����{�|�=��ޔ��b�v��;f���h��2=,3�2#,3�2�|���{�L�e
,ּ���a}zX��g��`}��Mey��.Q����_$���*�WE�wJ��N�ng��B!�����oA�Z�J�B��i�>h5����T8u�7�~��Òڄ
�������iL�M?��`c�iF�x*< �#֘&Ǳ_盬���v2�xؔGgͽL��6m�
yo��ގ_2��P�a��]s���8}���`��e�-����?X_��	՘>]���W�w���ʼ"����!�H�x3c���S�a��mWJ���:��<�j�x��������Lw���Q[�#቞O�D�~�B���GϗK��=��g�0ҁ�Ǉ��O�!���!_��C�{����K�K������������������������U�x����{��v+F=�'�l�^�qz{y���A��0��u�jɆJ\���m.����Pos![�A�'d��z ��o�q2?!?�`|���c�6��4`�Z��pӃ6<�[ m���ܟk����+t���T!���s��!?�+�K�9��}k��Esmз64�}k�ե�OC�������T��=Sw}�If�f�ם�)0��L���2̌0sg��N�m$;��`�o����~�Hn�����rs�ϡ�	�f�y�4��Pw��i3h��k��ڠ�6h��k�����6X� �žX��LQl5���{�sJ��< ����~��ۑ�%?�wgEz~�f�\�(���{޾0�[��G�U�4/�ա0�����R仁R���� ��	P>	V�n��+����,;��3 ̀8�G׻�^6�-:3�Vse��eW�j/�<&�a���[X����Y�k�٨˄mD;����_�����6��R|��y�B�3���ٽ1�tf�n�ËY�]?�>��w�>� Mo��pn0Wm�#N�05�h�7��%�J� T�ʰP��ZX�ÅzXh��FP�'�"�'�"���E��IÑ��"�.�Ld�t&��.2��#��GG&�-l#G����������L�      .      x��][�ܸ�~������ v�7Q�A&�璼$�Il�c|f��lo�ɯ_�Ւ(�(���g6>��4?�*�R�L��ys��RO�R�7���_�h՜~��ߟ����_���/���:?;�?{r�����{���_<y��7w�������W�_�{�����7/޿��ɷo����zݷ���_�^���O���韯_~x��c�s��~���-B��'rhS	b�ˏ��,(RY8�,0<jZ�'f���2��!e�QҵF�Z-�,b�Zj�{����q"&B\�ӵ��T��q����_}@H%Wx�u&9���x�M˓�Fb�.2�_����(�/�*H|%UY�3�I0�6�"��D�g�LU�웩*� �
����JU��@5�e-�*!Y�jX ��E���թ1J�g�{��I��V��:�����l��͝Am��-�ŗ%�zWl����9ƻ����|�ږ,en���蚯�j�lo'��v��h(���W'Ӛ};��ŇW�̯x�����g߽y�����/���zR��j�����hXn��ˌ��0��H�&h��/�U!X=����� s�`𹌅A��`���:c0X�1�.ca���0X��츬�Vg��X�. V��g�3]@�. b��0�MP8Զ�M��C��C�4��Р����!u�к�C� �hu�*��o�`DΎF�l�
����
��8uv)�e�F��F��0j�n
��t�lRȖ������¨9�)@V�f{��	i��ֻ��8{eJ�Q[	�-�ɻ�l�_�h��������hBP�rl%u��6Y�iKz')-9��6�'�.���CP�r6.v�z�P`eE��j%IVT2��rڎ�Ѵ�g��a�a9՗d�b�ס���@+�M��=�Њ�@A+�C�v�nI0BB�$� �&a�l�F=Lb����.p�es$�4
�`��p�R*�b���-(,�B��eT����X�@&��r�$�"�L�0�`��i�h"�a0���
�+)K!�[!�PQf�A�e|�*@���p��bj�X����ڭ�%L�$������C��Z��Ǌ�(��,o�,aj%�L��05���0�?Z�1Q,���\����� �������(vu�`�صg������mX�X[2�j�\��^l� � �%�;���	RBQbQ���9+�	�-D
.�J4�A�[�\��a�2DIZ
�R�F'���{Y�0$���4.ܤ��l%��t�ƦGk��b�O�Ơ���;�V�����
(I;�s�����%���F鉀����}d��P���(u���1�"�FB�i� zX+ Ie�&CDe ����}���@d������H� -��ҦM@k�J��"�4�OA��.�)�Q���hdC'��(<p���>�3L � ����%��	����!s���9a0(�&X�	�24�t^d^T^Dv�m�3���A�� tƨ�T��n,pݻfm�uF�5u��\yqm#�uն�,5v�����iZjs� �&�j��4u�����9��:ŘY�:ARڵ1��iy�4��kZTHʚ���*�#i�*DRUT� ���kY�H
[-��掔�:�(���ſ~xh��'�}�7{�c�y76��O�C��a����y��z5���>xu�ֈ�}�uN���.L�ˍ���B��+A��_��:��ZtM�e��A�e��2��2rf��2��$Ng@#��YX�XfA�,W�\<���>��]Qr�Hӑ0����.
�`^�}�����ޤ�\��F��)V�0\w륱�8+��ON��($/����^p�^f+��E&&�F;pb��8n.��J��?qt\$Rq5<p��W
���v)l�SX1خ� /SQ����ޡ���S=nY3<ܲf��5 oQ�?��{c�[u�!�1\��K��ʡ�V9<>@�� e���� ��(����6wΚ�:��Xl����[�9�Y/vs�vK⻽[�3���s/b|��W�&���6py�������/fќt��+����k����Pf�\��
�@�-lR��&��6)�l�rlR��&���-lR��&��6)�l�rlR��&�0�7�I�`���/ؤ`�M�uP�I�@�d��(>�:x)�+��!G[�c��w��<�q���&[p���~��	�C�$k������Y*1&jRC4:�1m
^Ӑ&��iP�>����iL<���������@�0P�)1;����11;�Y�.�9�:��`��6'x�*lN�`��9N���T��˚S�.Qs
��q7���eM>��!{A���=�{A�1�E�t��Xfe�J��S�#�Ӣ���G����;*pU卶����m�m<+߆`��3����͝j.@S���H��Vۥ�8�^�t�~�������qJǡc�0�E�ͮ��M���E�k�ZNt�F���v�����Q�d�l��ɖ9�13@k���̱؞�%����L�J�M���l������Rb���һ���I�q2`�+����lS�`��	Jǩ�5��@Ў�6%'���zD�]��(G1��JqFU�e�wT���f�~�<R�b��eAՌ&0�`��2�e������`=O� �]d�0���;��-i�w�/@��NYk6���8�W���"TM����&�+5�9�şH��SU �0��q7`M�߬?��gz�'͈J��뒖{g�R�i���Q�3G(U+Ȍ��8�U+V�%$��k��ت�
�U����p2�h�>�H]� ���_�\0"�{�}	�X%d1ǯrg����o�9}��0�!�B2\u�&K#m��Ī���q�cJE .G2q* }�(O��.²�WETf|m��D��A�3��ʶ�ټ";a��}0��, R�.�0�� �4˄�ʰ�dB��$�����r��(�����6CCf�
���\�2����EB�[Q�ݦ��3�aEg�L$3�1}��&�Y�DS��|�U�-B��>�T��0��?k�z�����İ���c��I��n���^J��(]���貪gRm�]���}�/�)�KqPC�ZP3>�ϬP�%��&N%=yF3�T7��c0L�.FLL5��9��t$pXk$��� ��+͓���.��}I�E��f��6(֞�5�6�~w�7-��%�� L���=�Q
ȋy��Z�"��q�����^�b��򤺋�	2��3�y\���)�秡b�RO�e���Ւ�:yɏ��nzs�[��j�Ԣ9�m ')�-%x�Λ;r���R�k����>c�^@�3�{�ë�Ap)ч����9	a�	ޮ/��Q�,:�����|g ?R	�3�r�e�W=bG(�-��xD�>^�W�I��Yצ�\2�wx����A�w�Iއ'��G{iyE��Tw����~�1m�E�I?�C�e�C�|�Q��uY#/���]�(�`�܃=�R�SD��wi�ԃ}�rvQE>�3Jl����p�?������N��5�zNX|��d���s@��Kd>X(>�{Kg��2R2b1Av>+U1+���UG2(�1ͺ�©�ru�~�
���e>�y�p�4�l���F��"���4Zt�7�ו�Kҍk�#|nO�|�/Zմ滟0ѣ�57@fBm���<4ml ��`bFus��ˮ�p< �.7��믛;�����nm��!-zϒ^!t��q�
�[�Jf�8f�P�ٻ�U����G �Z�!�9j��#8��H䝽�i>��k[X��kMߕ��N���n�Эi����!ogS8M0qSko��&�6���v����n�;ڥ�C�1�5]���-��\�S�"�F.�D'ϝ���,|�Q���k��a
�k�F�y=�a���*�nP��^�U�A��KJ�-j\��=�RݍUaU2�g�uF����|U2@���vj+>�#�	�ݶ,���Le kf��1��M؋$۰?ᑿ�d:�2U�n����P�}d_sg�Vy�q    p'%�����J���~ڝ���xj>|g��{�}�w�	:(,	����#xܵ�o�}��o��`4�����
Ac��없>iw2�=�ں��Q�|�w@�t�s|	ۼ�R��o�ᆲ�v����}<��d�ֵԅ+���q�%.o=4�O���� o}8U�ۄ��RKA?d�4�Dh~	'qڷp",�~/0����kc�v��J!���Z������ܴ��3�2���]��S��~���I���`֧<����l�^�Ia�T�jI�lQ�[*բ\!آh��ި�e���)�0W�0F��2^��w����;a����o�_��7�	���߀'�0^��z���m��mP����D��)�^t�P+���ݦ!����X���WG�$�W�<���#ђ6`�oձ�|∧��!OMIc6�>��}u�]�wmSژ� )�mi���tץ��D���wI�1�d�55%��Z��7c�1G����Ɯ_,C�y���l���MIcv����%ú�æ��1緿*vm<6���GÇ�����-����<ʇ��OL�|�?�����v�hr�ɏ7�о� Z�r C�6?�� �"L;<� C��I t�ά�Ȝo���m���Pj�Y��h�%SrV�St���m3kA���"������گ3F�$1�n��L�q���d�ӼKv^I0�(<fl~f&13-"Lf�7����
��������"�r�`Z��cZ�1��仵m���J�>J�f�]���NH��KڦZ��ݶ���(���wZ`�W�	�,�"Ҫ�I���?f~t��Z�GM��y�E�d~���ͦ��1�'��-8T��HE'bT�c%Y\qi�ౘ
 ],�hh��B�O�y��8�珑~��õ�K(��!5�����uy��5�(Z;����u��׵�Y�p�������N�~��O���Y���N�˘��C�&j?�u�MK\���0�[e����p���6}a�,�;����C �pvm��p!0Y^�������_���������N��L� ^��q.��k���4��p��ي �s�@68�`�)H%���&�,���N}G48��W�d���e��t��2�u����(�a���U��lt��<���	����xy� �Q..X'K�B���u(qƍ�N��A�!�5C�� �� �/�G�Mq=�J��L�2`����6��hm*�^ J�?��4/\;�� �}��NwŚcx��:(�"�����ˏV��s���������!���	WE��~��+lr�ѵ�C ��M8_1�l"VYĞoA��O�E�;�mx"����hZzZ�ʐ�@�t7[�-%7��V�t��)#bw��������|?��_��� �k����oؿ?�P�;*9{���[/����ԑ`�~�?�8+�"���ďݑ����ɏH�~��>vO��0ˏ��^yn6�BGC�QZ�Z"�-r��H��Y�N��=z
N�����	����Mn��U�*e�S}�`)�ڶb�n�('��܇m�L�=~M|(��8��87���jd�줅��F�!�5��)�"Ӫ��iNQwӱ���;���6�s.`;�N�ƃ�m��F�2�c�}�)-D�v��
����{���DGG��'k�	���*�{X�T\0�&�M!��gg'���Zk��� *��ɺ�BT��f�*(&0��cl8DX��]���⺷��Vf)X
ނ,�+Y3+D$�6��=2v($j��D�,t���VTK�N�b�3Ew��.(�p��@�}q�!�ӎ�jL?��nBV5� �TS�N5���0���npEc�O*%�D��9��W� �u&�㭽9�"GZx��6Mز�=��r7N��[v�7�����ֱ���e97+{�@ր
��l\�eR+:���B~�dޜ�2�DU 0�x{���j@^'|�d	ɮ��#���v�-�vp��*��(�-o�>�%�����rR� �	�B���ӦU6~��	�z�D�li�?�(�lg�Y��3��0Ɖ�H�Z	�xO�2C�LY���l�7lX?���'�پ(�[��O�1�z�w��A�Y�w�}�A��p�^�k�l����1n��t��PV"x_/�J�?��{{���	���j��]��/ֻ_���@|y�2�rh���½�������\���͇��^�����]�tC�vIw���^=��t(�4���J�m��X��:@�9��k�-���UkZd�/`�vq���C4)t�B��a!ã*�K�k��m��Q��*���؁VDT(���-s��D���B��"0ߘ��.ɋF�́���)��&'�]p�=���{�����z'���������������)��+�8=p7L~��C`�I_)��sp]�8wQ�p��t'�!���+���?�����Mg�����d�r�+��@�v�L|�C��ɯ�����b����Ӡkv���}���9��_;��3����:*Ⱥ�e%�2 �,
K������G�DF�*c��ф����/�0+���Bp-J����֟E6�����Z��9��B^�{B�W���:�{<�2�8��)R�s����%�L�g���ݱ�}���M�!O<���u��`H,���&'�ϒ�v��ep}^*��CQ\.�E�i��@�*��l��-Ќ$'��b�9��������V�}��S�̠���_|x5���߿zx��7o߾{rz�œ�=�OO�û�'��UK�>q_vq_>�k�wӊ�Ѯ=�E1ڟ�<���c�Ű�-�qikw�@���ZJ�����Im�~�m���=~ԓAE_�$��4"�P�&�%���?�/Ʉ�	E����$�̶�,�zg(��D+ C��iԟ���]�S0��|D/ZO_'��>~5�j�)�� ��&@tt��=���	�C���s�`P��j�W �W�W�W��a��� s�`�9c0�1�(�n�H�*�s^���%	p�9y/��j�m=����FCo[
P4v���N�R���5QW�ק�kv�4���є�)�̚�	���^ז��ie!�kZTH�r�Ճ֑�Uf�
�T57'�,_��4�-�IesGJý�/�l�SO���9�s��I�)�Eh�I���(�ΛH�uj���P��_^��j�F��Y����8y���N6�M"h��p��T���"��"d���f�0�^$ɹ<�Ȧv
86�I}p(.�I�m�<��ɟ!-�g	��� �1��a�+L܉ 7Ʈ��� E���!�M��n�bZV�[{�����
��B������7w: ���?��U=�$��|4Z���B����0���zA�����u��nC��yɴN���U+�F���.G;��]��P�.,-yaaʈf��5C�ƥ-��Ǐhoŉ{7{���7�	�,�Z���!U����<�Bj��8-���c�����%���Ji֔zd��OX�I����	�9���*������}��zX
��PVzc\T�1�G�$V�*)T三�M�>+��c�ǆ�c������
j]@�ę�)��^�Ҿ���6�
�?H�ӖmI�+R�%��%�*��mxP�gs�>p��vzA�c��£�U�WƌSi����^T�y�F`����k���*�tT�N��t!�;��'��C��Y��(�K�l�l/�^�����t�)�)8+K�G���U;G2M�|�Þ��L�����f8��V��_֢�(�T�ԿW�p�WJ��K5Bk}��G{0�x�:q�"�-]�e��cF�D��D�mH��g��"/%;�~�������R��Q��>=K!�,�G�`Nk����ޣ�-~�@����S��v�/�C��x���K�Y���g��xτ+ ��Q�g��;���Qb�U�C Fݫ���s����Һ	���tQ�rxvH��e�RUU��&I��ʈA�zU��ґ�b]w=��H$���@)�S���L�A����,��b@�Z����u�(��Uq�J�^WQM,N����O��z���r�%�>f�D� n  �YVJ$�XX���0�Ee�c���mS��"�դ�"S�G��x]�y�\e ��.0�(źB��)ϲE�9+�[aJ
O�2�,���5ٳ���I�Uw�V�b���6R��I�����	5�v�xɞ��e�?�Jdp�.(׼|��oo����1ԻGp���\2�U�����}:����P i�� ��P��].aQP@�;�F��x
V$�b���A����U8[o;Վ�^�������p\���ۮ��{�;,Y9�H���n����YC�A �L�V��2����\���$�%��P���Y��э�E����N߽x9ZԘc�oQ�Fq�8N��n.��M�_�����F ��b�p���+'�t���� 4����7����"V�^.�U��@n4��Sm��i'�2uJ��x�C�w�Zj���;n;�uo��U�*^�	Y���J7~�}j�]@곓'���zgLx���3�ε�?�:��Ѝo���y����>��ﯽ����,�օ�N�4��@��v�Z�9���/���k�ed�e8�VY�����H:�5�Tu�� p� ��n�M��irl�I`���X)ץ�:@��:�b�f��ͩ۟]�b�ς�E��"i `{����L��羹���ޜ���65K�KN���3����c���=�b�����'2���G�%F�DF��:<���v;���j.Pז��J�@��}\d��n� ������Td�L [U�!\ֺ{��K��6��4���t��ԥ�7�l}�C3�2��o�×���6�|����n�h��Z&!
hm�m�99a�4��&_�Ԫ.P>7�`4Ǹ�QS��n4� ��"f�'~N���`�6�V�;����ڧ$���%k���O�(0��dͽo�yRӎ���a߄���_���*M�<��V���i��|Z9�n-)���~���\εn�$?n�?Y�'K��$�Թ7$��hJ���I��f�ǻ;�k>e$�d$!�mc��P��U����T�z�l����<4_?|���|�8o(y��)�?;T�u^ſZ��� #>M��hlp0f:X��|T�`V��'���B/�o&��┈�D��ݧhв�1�IOf6:&3]g1�jy@}{�k]�2)�H��`-S\J&��ib#-�;�ڮ��d����֝�k�'�O�͏ֶ����O��7�l�����Zo]�c�r7��>�o|�s:�3=�5��䲪t<��dY�զ�Mɐ��ِ�߼�8��6>+4��yz�L���}�ͅ��b|���<I� ����0vPo���Ր�3�@7O����(B�*B=k�|�SG�ȸR�.P����y����|��z�*��\0l��������&��q)�2|�
P���cb&���AoĖ���I�#���Ԗ��H|��F�Y�qJl��+;|�l�<*O��t�� 6�E%�������������S_Bvp�#egN�K�0Y��k����	�>��^�7-^(�(����T�Çj��g& ;e�\A$�������� �6��_����s���|}������=�wr)~{��+�I嵈{�1o"���it��y�M�� �C���N>d8uB�:�	a��&M�u 7Lďeb�Y�L�B�"Q��A��TSa�Ћ�"K�YV��^dU��CP.쀐�e���,��^Y}`�
�s�˓�z�Q�`�������������^��u��av6V�9顴/?��I�<ْb?U�5�(��2a�� X�#��s���T�/� B('���n"��p���DN�ZI,|�y%�g[�U�P[6�
�m-
Ln�,0�\f�ݛ0\�	�Xn�^�^9���)�-�T6�|g;%r@<` �Q	�q=�j:8 W:83�黏 ��3������H��r��1�Qr��U3%�ˤ���2_���V�x�^E-LZp�3(8���6�(j�l]-�W]3[c�$�*-Y[yzAh�]}[oӂ������ɧr5�!�/�D��ϳ�l��*���J[V1�ڒ��Pۍ�?����{�]lc;~u
Cͮ/��>����U��O���Ί�wݹ�ˏ���1����}y��R�n_I���#��2C�W?Լ�'�_ϟ}���~�	      Y      x������ � �      g      x������ � �      W      x������ � �      i      x������ � �      U      x������ � �      T      x������ � �      ;      x�3�2�2�2����� �      z      x������ � �      *      x�3䬮����� ��      J      x������ � �      L      x������ � �      6   $   x�3��N,�KM-�24�I-.Q��KK����� u�y      t      x������ � �      s      x������ � �      E      x������ � �      C   $   x�3�4���+�LI�� .#�X~i	�`� �Q      N      x������ � �      _      x������ � �      k      x������ � �      j      x������ � �      R      x������ � �      P      x������ � �      ]      x������ � �      ,   1   x�3���ͭ�2���L�HL��2�t������2�tN,*������� ��O         �  x�͔Mo�0��ί0|ڀU)���bz��vȭ��H�D[b�R -��+;@�N<Y����(�/)H����E�~��O@$�Yc����Ɋ?������U�\6!ruB���vV.��������
�񟶲���~Y:W������!��2T�O��庬����;~��|q~g�PRZ��DY����l\Uo^�o�9X� }B�	�D������xr�}�'��ʽJ��%{̼���%�~8u޻�Ǭէv�6}Q�{��M�[7uw]ѭbU��O�2�� �] ��lئ��"��0�/SG�L�c�8<�4c}Ͱ��0@;�u�A���hܑǈ�	�������Ì$�J%�W� �j�Ȉ��'��\cǨ>�� ���V�C�Fm��7^��m��ٕf������:rz�&/r^0$L@�κ��!�m�G��>�@4S ��^<���a� �q&�^�Ǒk2�L��r      }      x������ � �      y      x������ � �      x      x������ � �      >      x�3�4�2�4����� >�      u      x�3�4�2�44�\1z\\\ !p      A   (   x�3�4�L�I���K�,�,.I����,I������� �	0      �      x�3�4�4�4�4�2���b���� '��      �      x�3�4�4B#�=... u�      �      x�3�4�4bC.#8+F��� '��      ?      x�3�4����� �#      8   /   x�3��LJ��S��K�/�2�(�K�HMQ�/H���K����� �+�      |   �   x�u�M
� F�z�g��K��j ���H���8�̈�0/��Ơ24�m>c�e[�%Է`Oж�#-���4]���k�}����F%�Y��,cP``K /�|R�T�Ę��� ӜƝ�<5���K�$���m���;
;�����Rq��1͟�6,Z����A�	��T1 �p�Y�3pkA��1D:��3�-~�S�/���PS˜�6X�#���i��R3Ά      :   ,   x�3�.�/JM+��+�2��K-W(�,.I�U(�,H����� �Y      =   &   x�3�4�̴�$SCN�?2���+F��� Ul�      a      x������ � �      c      x������ � �      [      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �  x�m�˒�J�5>�,j�%Y��5**""J#�lh(�rkЧ��8���eE��gFe SeI�d�V�-��%2��.�y�La6����4)�	��2?��Lx�д��mE�f�����
|N������WvL`��
޾�E�PgU/��w���'Q�rC?$��.�wu<��ĸ�3��4�[Y.>dT��_��X����g�l���d�� ���̹�`�.B��Z�r7c�>?de���Za6���{�D��k�}�x���S,^$���lm�a+�1����j�����(��~��yT��E������g"�dС��g5J��H??���k]n��5����"��&��j���ij�l��p�u�/� R��N��6
��@��V�UoQi���ؤ�C%���t��r�����m�+4;�D�ڇ���1��+�Sg��W���t�9��������}��;P�+�S1�q�٢<����}q���E363=���:EY�6��n�UȚ�^o5�]1N2>-��]H���FK}E���]�Z=��݆;�~��单�@�҄H^¬$����c�4*hӥm7�B�����A���/"p-�u��i�2�
7�A�I�gc!���HT��Mʮ��%��Vy�U��#J�0� ���j��^�,+*�q�p!~6{/�Yw��)/�&us?�
Q8�ģ���q5�     
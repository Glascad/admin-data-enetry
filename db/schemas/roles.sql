
-- ROLES

DROP ROLE unauthorized;
DROP ROLE GC_CLIENT;
DROP ROLE GC_DATA_ENTRY;
DROP ROLE GC_ADMIN;

CREATE ROLE unauthorized NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT;
CREATE ROLE GC_CLIENT NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT;
CREATE ROLE GC_DATA_ENTRY NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT;
CREATE ROLE GC_ADMIN NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT;

-- USER

DROP USER glascad;
CREATE USER glascad NOCREATEDB IN GROUP gc_admin ENCRYPTED PASSWORD '<<DO_GC_PASSWORD>>';


CREATE TYPE
gc_controlled.gc_role AS ENUM (
    'GC_ADMIN',
    'GC_DATA_ENTRY',
    'GC_CLIENT'
);

CREATE TYPE
gc_controlled.jwt AS (
    role VARCHAR(100),
    exp INTEGER,
    user_id INTEGER
);

CREATE TYPE
gc_controlled.current_user AS (
    id INTEGER,
    username TEXT,
    role TEXT,
    project_id INTEGER
);

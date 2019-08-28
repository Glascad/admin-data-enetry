
CREATE TYPE
gc_public.id_pair AS (
    real_id INTEGER,
    fake_id INTEGER
);

CREATE TYPE
gc_public.coordinate AS (
    x FLOAT,
    y FLOAT
);

CREATE TYPE
gc_public.jwt AS (
    role VARCHAR(100),
    expiration_date INTEGER,
    user_id INTEGER
);

CREATE TYPE
gc_public.entire_bug_report AS (
    id INTEGER,
    username TEXT,
    location TEXT,
    report TEXT,
    state JSONB,
    timestamp TIMESTAMP
);

CREATE TYPE
gc_public.current_user AS (
    id INTEGER,
    username TEXT,
    role TEXT,
    project_id INTEGER
);

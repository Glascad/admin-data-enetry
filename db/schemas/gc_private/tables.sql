
CREATE TABLE
gc_private.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(1500) NOT NULL,
    role VARCHAR(50) DEFAULT 'gc_client' NOT NULL
);

CREATE TABLE
gc_private.bug_reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    location VARCHAR(500),
    report VARCHAR(2500),
    state JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

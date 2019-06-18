CREATE EXTENSION pgcrypto;

CREATE SCHEMA users;

CREATE TYPE
users.jwt AS (
    role VARCHAR(100),
    expiration_date INTEGER,
    user_id INTEGER
);

CREATE TYPE
users.role AS ENUM (
    'admin',
    'client',
    'data-entry'
);

CREATE TYPE
users.current_user AS (
    id INTEGER,
    username TEXT,
    role users.ROLE,
    projectId INTEGER
);

CREATE TABLE users.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(1500) NOT NULL,
    role users.ROLE DEFAULT 'client' NOT NULL
);

CREATE TABLE bug_reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users.users,
    location VARCHAR(500),
    report VARCHAR(2500),
    state JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

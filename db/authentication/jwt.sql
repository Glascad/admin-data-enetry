CREATE EXTENSION pgcrypto;

CREATE SCHEMA users;

CREATE TYPE
users.jwt AS (
    role VARCHAR(100),
    expiration_date INTEGER,
    user_id INTEGER
);

CREATE TYPE
users.current_user AS (
    id INTEGER,
    username TEXT
);

CREATE TYPE
users.role AS ENUM (
    'admin',
    'client'
);

CREATE TABLE users.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash(1500) NOT NULL,
    role users.ROLE DEFAULT 'client' NOT NULL
);

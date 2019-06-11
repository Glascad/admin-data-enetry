CREATE EXTENSION pgcrypto;

CREATE SCHEMA users;

CREATE TABLE users.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password_hash(1500)
);

CREATE TYPE users.jwt AS (
    role VARCHAR(100),
    expiration_date INTEGER,
    user_id INTEGER
);

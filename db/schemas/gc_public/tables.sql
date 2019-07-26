
-- PROJECTS

CREATE TABLE
gc_public.projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    owner_id INTEGER REFERENCES users,
    default_elevation jsonb,
    -- last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    -- last_updated_by INTEGER REFERENCES users NOT NULL,
    UNIQUE (id, name)
);

-- CREATE TRIGGER last_updated ON TABLE projects
-- AFTER INSERT OR UPDATE 

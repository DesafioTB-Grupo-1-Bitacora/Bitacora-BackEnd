DROP TABLE IF EXISTS memories;
DROP TABLE IF EXISTS users;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS memories (
    title TEXT NOT NULL,
    description TEXT,
    notebook TEXT,
    location TEXT NOT NULL,
    date DATE NOT NULL,
    latitude DECIMAL NOT NULL,
    longitude DECIMAL NOT NULL,
    public BOOLEAN NOT NULL,
    multimedia_url TEXT,
    created_by uuid REFERENCES users
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
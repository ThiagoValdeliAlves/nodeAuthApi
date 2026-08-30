CREATE TYPE user_responsibility AS ENUM ('user', 'admin', 'moderator');
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(99) NOT NULL,
    responsibility user_responsibility NOT NULL DEFAULT 'user',

    creation_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
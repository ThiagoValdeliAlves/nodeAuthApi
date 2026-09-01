CREATE TYPE user_roles AS ENUM ('user', 'admin', 'moderator');
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    roles user_roles NOT NULL DEFAULT 'user',

    creation_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
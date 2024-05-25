CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    description VARCHAR(128) NOT NULL,
    country VARCHAR(64) NOT NULL,
    date_release DATE NOT NULL,
    photo VARCHAR(2048) NOT NULL,
    trailer VARCHAR(2048) NOT NULL
);

CREATE TABLE studios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    founder VARCHAR(128) NOT NULL,
    country VARCHAR(64) NOT NULL,
    date_foundation DATE NOT NULL,
    photo VARCHAR(2048) NOT NULL
);

CREATE TABLE participants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    surname VARCHAR(64) NOT NULL,
    date_birth DATE NOT NULL,
    date_death DATE,
    photo VARCHAR(2048) NOT NULL,
    CONSTRAINT unique_name_surname UNIQUE (name, surname)
);

CREATE TABLE rewards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    description VARCHAR(128) NOT NULL,
    photo VARCHAR(2048) NOT NULL
);

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    description VARCHAR(128) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    surname VARCHAR(64) NOT NULL,
    date_registration DATE NOT NULL,
    login VARCHAR(256) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content VARCHAR(64) NOT NULL,
    date DATE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id),
    movie_id INTEGER NOT NULL REFERENCES movies(id)
);

CREATE TABLE movie_genre (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL REFERENCES movies(id),
    genre_id INTEGER NOT NULL REFERENCES genres(id)
);

CREATE TABLE movie_reward (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL REFERENCES movies(id),
    reward_id INTEGER NOT NULL REFERENCES rewards(id)
);

CREATE TABLE movie_studio (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL REFERENCES movies(id),
    studio_id INTEGER NOT NULL REFERENCES studios(id)
);

CREATE TABLE movie_participant (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL REFERENCES movies(id),
    participant_id INTEGER NOT NULL REFERENCES participants(id),
    role VARCHAR(255) NOT NULL
);

CREATE TABLE movie_user (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL REFERENCES movies(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    mark BOOLEAN NOT NULL
);

CREATE TABLE participant_reward (
    id SERIAL PRIMARY KEY,
    participant_id INTEGER NOT NULL REFERENCES participants(id),
    reward_id INTEGER NOT NULL REFERENCES rewards(id)
);

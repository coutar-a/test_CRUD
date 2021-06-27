CREATE DATABASE playercrud;

\c playercrud

CREATE TABLE players (
	id varchar NOT NULL,
	"name" varchar NULL,
	"number" _int2 NULL,
	"team" varchar NULL,
	"deletedAt" _timestamptz NULL DEFAULT null
);

CREATE TABLE users (
	id varchar NOT NULL,
	"name" varchar NOT NULL,
    "passwordHash" varchar NOT NULL
);
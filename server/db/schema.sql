CREATE TABLE public.players (
	id varchar NOT NULL,
	"name" varchar NULL,
	"number" _int2 NULL,
	team varchar NULL,
	deletedAt _timestamptz NULL DEFAULT null
);

CREATE TABLE public.users (
	id varchar NOT NULL,
	"name" varchar NOT NULL
);
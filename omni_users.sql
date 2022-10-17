--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.5 (Debian 14.5-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: montduser
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO montduser;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: montduser
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    user_id integer,
    created_at timestamp with time zone DEFAULT '2022-09-20 22:27:43.204+00'::timestamp with time zone NOT NULL,
    updated_at timestamp with time zone DEFAULT '2022-09-20 22:27:43.204+00'::timestamp with time zone NOT NULL
);


ALTER TABLE public.companies OWNER TO montduser;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: montduser
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.companies_id_seq OWNER TO montduser;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: montduser
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- Name: user_types; Type: TABLE; Schema: public; Owner: montduser
--

CREATE TABLE public.user_types (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    level integer DEFAULT 1,
    created_at timestamp with time zone DEFAULT '2022-09-20 22:27:43.114+00'::timestamp with time zone NOT NULL,
    updated_at timestamp with time zone DEFAULT '2022-09-20 22:27:43.114+00'::timestamp with time zone NOT NULL
);


ALTER TABLE public.user_types OWNER TO montduser;

--
-- Name: user_types_id_seq; Type: SEQUENCE; Schema: public; Owner: montduser
--

CREATE SEQUENCE public.user_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_types_id_seq OWNER TO montduser;

--
-- Name: user_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: montduser
--

ALTER SEQUENCE public.user_types_id_seq OWNED BY public.user_types.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: montduser
--

CREATE TABLE public.users (
    id integer NOT NULL,
    full_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255),
    active boolean DEFAULT false NOT NULL,
    last_login timestamp with time zone,
    register_date timestamp with time zone,
    user_type_id integer DEFAULT 2 NOT NULL,
    level integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT '2022-09-20 22:27:43.148+00'::timestamp with time zone NOT NULL,
    updated_at timestamp with time zone DEFAULT '2022-09-20 22:27:43.148+00'::timestamp with time zone NOT NULL,
    company_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO montduser;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: montduser
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO montduser;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: montduser
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: montduser
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: user_types id; Type: DEFAULT; Schema: public; Owner: montduser
--

ALTER TABLE ONLY public.user_types ALTER COLUMN id SET DEFAULT nextval('public.user_types_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: montduser
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: montduser
--

COPY public."SequelizeMeta" (name) FROM stdin;
20220914030817-create-user_types.js
20220914031215-create-users.js
20220914033848-create-companies.js
20220914034216-create-company_id-column-in-users.js
\.


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: montduser
--

COPY public.companies (id, name, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_types; Type: TABLE DATA; Schema: public; Owner: montduser
--

COPY public.user_types (id, name, level, created_at, updated_at) FROM stdin;
1	admin	1	2022-09-20 22:27:43.114+00	2022-09-20 22:27:43.114+00
2	common	1	2022-09-20 22:27:43.114+00	2022-09-20 22:27:43.114+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: montduser
--

COPY public.users (id, full_name, email, password_hash, active, last_login, register_date, user_type_id, level, created_at, updated_at, company_id) FROM stdin;
\.


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: montduser
--

SELECT pg_catalog.setval('public.companies_id_seq', 1, false);


--
-- Name: user_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: montduser
--

SELECT pg_catalog.setval('public.user_types_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: montduser
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: montduser
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: montduser
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: user_types user_types_name_key; Type: CONSTRAINT; Schema: public; Owner: montduser
--

ALTER TABLE ONLY public.user_types
    ADD CONSTRAINT user_types_name_key UNIQUE (name);


--
-- Name: user_types user_types_pkey; Type: CONSTRAINT; Schema: public; Owner: montduser
--

ALTER TABLE ONLY public.user_types
    ADD CONSTRAINT user_types_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: montduser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: montduser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: companies companies_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: montduser
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: montduser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_user_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: montduser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_type_id_fkey FOREIGN KEY (user_type_id) REFERENCES public.user_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--



CREATE DATABASE epam_interviewer;
\connect epam_interviewer;
CREATE TABLE heartbeat (ok BOOLEAN);
CREATE TABLE USERS (user_id SERIAL, email TEXT NOT NULL, password TEXT NOT NULL, isAdmin BOOLEAN DEFAULT false, UNIQUE (email), PRIMARY KEY (user_id));


CREATE DATABASE epam_interviewer;
\connect epam_interviewer;
CREATE TABLE heartbeat (ok BOOLEAN);
CREATE TABLE USERS (user_id SERIAL, email TEXT NOT NULL, password TEXT NOT NULL, isAdmin BOOLEAN DEFAULT false, UNIQUE (email), PRIMARY KEY (user_id));
CREATE TABLE QUESTIONS (question_id SERIAL, type TEXT NOT NULL, content TEXT NOT NULL, UNIQUE (type, content), PRIMARY KEY (question_id));
CREATE TABLE TEMPLATES (templateId SERIAL, title TEXT NOT NULL, UNIQUE (title), PRIMARY KEY (templateId));
CREATE TABLE TEMPLATE_SETUP (templateId INTEGER NOT NULL, type TEXT NOT NULL, count INTEGER NOT NULL);

# --- !Ups

CREATE TABLE tag (
  id   SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  root BOOLEAN,
  UNIQUE (text)
);

CREATE TABLE article (
  id      SERIAL PRIMARY KEY,
  url     TEXT,
  origin  TEXT,
  publish TIMESTAMP,
  UNIQUE (url)
);

CREATE TABLE article_tag (
  article_id BIGINT REFERENCES article (id),
  tag_id     BIGINT REFERENCES tag (id),
  PRIMARY KEY (article_id, tag_id)
);

CREATE TABLE translation (
  id         SERIAL PRIMARY KEY,
  article_id BIGINT REFERENCES article (id),
  lang       TEXT NOT NULL,
  caption    TEXT,
  text       TEXT,
  UNIQUE (article_id, lang)
);

CREATE TABLE news_media (
  id             SERIAL PRIMARY KEY,
  translation_id BIGINT REFERENCES translation (id),
  url            TEXT NOT NULL,
  text           TEXT
);

INSERT INTO tag (text, root) VALUES ('main', TRUE);
INSERT INTO tag (text, root) VALUES ('stories', TRUE);
INSERT INTO tag (text, root) VALUES ('tracking', TRUE);
INSERT INTO tag (text, root) VALUES ('fish', TRUE);

# --- !Downs
DROP TABLE news_media;
DROP TABLE translation;
DROP TABLE article_tag;
DROP TABLE tag;
DROP TABLE article;

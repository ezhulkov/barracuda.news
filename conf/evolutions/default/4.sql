# --- !Ups

CREATE TABLE layout (
  id         SERIAL PRIMARY KEY,
  tag_id     BIGINT REFERENCES tag (id) ON DELETE CASCADE,
  name       TEXT,
  raw_config TEXT
);

# --- !Downs
DROP TABLE layout;

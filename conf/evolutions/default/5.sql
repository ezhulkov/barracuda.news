# --- !Ups

ALTER TABLE article ADD COLUMN cover_youtube TEXT;

# --- !Downs
ALTER TABLE article DROP COLUMN cover_youtube;
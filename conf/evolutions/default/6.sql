# --- !Ups

ALTER TABLE article ADD COLUMN cover_media_length INT;
ALTER TABLE article ADD COLUMN short_url TEXT;
ALTER TABLE translation ADD COLUMN description TEXT;
ALTER TABLE translation ADD COLUMN keywords TEXT;
ALTER TABLE translation ADD COLUMN title TEXT;

CREATE UNIQUE INDEX article_short_url_idx ON ARTICLE (short_url);

# --- !Downs
ALTER TABLE article DROP COLUMN cover_media_length;
ALTER TABLE article DROP COLUMN short_url;
ALTER TABLE translation DROP COLUMN description;
ALTER TABLE translation DROP COLUMN keywords;
ALTER TABLE translation DROP COLUMN title;
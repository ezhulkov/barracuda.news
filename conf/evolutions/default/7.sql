# --- !Ups

ALTER TABLE translation ADD COLUMN cover_youtube TEXT;
ALTER TABLE translation ADD COLUMN cover_media TEXT;
ALTER TABLE translation ADD COLUMN cover_media_length INT;

UPDATE translation SET cover_youtube=a.cover_youtube FROM article a where a.id=article_id;
UPDATE translation SET cover_media=a.cover_media FROM article a where a.id=article_id;
UPDATE translation SET cover_media_length=a.cover_media_length FROM article a where a.id=article_id;

# --- !Downs
ALTER TABLE translation DROP COLUMN cover_youtube;
ALTER TABLE translation DROP COLUMN cover_media;
ALTER TABLE translation DROP COLUMN cover_media_length;

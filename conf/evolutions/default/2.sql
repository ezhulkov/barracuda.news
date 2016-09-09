# --- !Ups

CREATE TABLE cross_link_article (
  article_id BIGINT REFERENCES article (id) ON DELETE CASCADE,
  link_id    BIGINT REFERENCES article (id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, link_id)
);

# --- !Downs
DROP TABLE cross_link_article;

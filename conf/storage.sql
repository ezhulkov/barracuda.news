CREATE ROLE barracuda LOGIN INHERIT CREATEDB CREATEROLE;
ALTER ROLE barracuda PASSWORD 'barracuda';
CREATE DATABASE barracuda_local OWNER barracuda TEMPLATE template0;

INSERT INTO article (url, origin, publish) VALUES ('https://barracuda.news', 'http://ya.ru', now());
INSERT INTO translation (article_id, lang, caption, text) VALUES (1, 'en', 'caption en', 'body en');
INSERT INTO translation (article_id, lang, caption, text) VALUES (1, 'ru', 'caption ru', 'body ru');
INSERT INTO article_tag VALUES (1, 1);
INSERT INTO article_tag VALUES (1, 2);
INSERT INTO news_media (translation_id, url) VALUES (1, 'url1');
INSERT INTO news_media (translation_id, url) VALUES (2, 'url2');

update translation set text=replace(text,'style="text-align: justify; line-height: normal;"','');
update translation set text=replace(text,'style="text-align:justify;line-height:normal;"','');
update translation set text=replace(text,'style="text-align:justify;"','');
update translation set text=replace(text,'style="line-height:normal;"','');
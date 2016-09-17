CREATE ROLE barracuda LOGIN INHERIT CREATEDB CREATEROLE;
ALTER ROLE barracuda PASSWORD 'barracuda';
CREATE DATABASE barracuda_prod OWNER barracuda TEMPLATE template0;

INSERT INTO article (url, origin, publish) VALUES ('https://barracuda.news', 'http://ya.ru', now());
INSERT INTO translation (article_id, lang, caption, text) VALUES (1, 'en', 'caption en', 'body en');
INSERT INTO translation (article_id, lang, caption, text) VALUES (1, 'ru', 'caption ru', 'body ru');
INSERT INTO article_tag VALUES (1, 1);
INSERT INTO article_tag VALUES (1, 2);
INSERT INTO news_media (translation_id, url) VALUES (1, 'url1');
INSERT INTO news_media (translation_id, url) VALUES (2, 'url2');

update translation set text=replace(text,'line-height:115%;','');
update translation set text=replace(text,'line-height:normal;','');
update translation set text=replace(text,'text-align:justify;','');
update translation set text=replace(text,'text-align: justify;','');
update translation set text=replace(text,'line-height:150%;','');
update translation set text=replace(text,'margin-bottom:6.0pt;','');
update translation set text=replace(text,'margin-bottom:0cm;margin-bottom:.0001pt;','');
update translation set text=replace(text,'margin-top:0cm;margin-right:0cm;margin-left:0cm;','');
update translation set text=replace(text,'margin-top:6.0pt;margin-right:0cm;margin-left:0cm;','');
update translation set text=replace(text,'style=""','');
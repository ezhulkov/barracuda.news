# --- !Ups

update translation set lang='en' where lang='ENGLISH';
update translation set lang='ru' where lang='RUSSIAN';

# --- !Downs

update translation set lang='ENGLISH' where lang='en';
update translation set lang='RUSSIAN' where lang='ru';
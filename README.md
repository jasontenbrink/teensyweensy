To run locally execute the command

npm run local

You will also need to create a .env file with two values:
SECRET=1234
DATABASE_URL

the SECRET can be whatever you want, the DATABASE_URL should be the url to whatever database you wish to use.  For your reference I've incuded the scripts to database I created.

CREATE TABLE urls
(
  url_id serial NOT NULL,
  tiny_url character varying(255),
  long_url character varying(255),
  count int
)
WITH (
  OIDS=FALSE
);

CREATE TABLE users
(
  pin serial NOT NULL,
  username character varying(255),
  password character varying(255)
)
WITH (
  OIDS=FALSE
);

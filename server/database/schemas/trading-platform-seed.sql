DROP TABLE IF EXISTS trades CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "uid" text UNIQUE NOT NULL,
  "email" text UNIQUE NOT NULL,
  "username" text NOT NULL,
  "profile_picture" text,
  "biography" text,
  "location" text,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "trades" (
  "id" serial PRIMARY KEY,
  "seller_id" integer NOT NULL,
  "have_album_id" integer NOT NULL,
  "want_album_id" integer NOT NULL,
  "buyer_id" integer,
  "status" text NOT NULL DEFAULT 'open',
  "description" text,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "ratings" (
  "id" serial PRIMARY KEY,
  "sender_id" integer NOT NULL,
  "recipient_id" integer NOT NULL,
  "trade_id" integer NOT NULL,
  "rating" integer,
  "created_at" timestamp DEFAULT 'now()'
);

INSERT INTO users(uid, email, username, profile_picture)
VALUES('abc123', 'fake1@email.com', 'fake_user1', 'https://i.pinimg.com/originals/bf/a7/8b/bfa78b30dbb524beb4104e471a1b6dd1.jpg');

INSERT INTO users(uid, email, username, profile_picture)
VALUES('abc124','fake2@email.com', 'fake_user2', 'https://pbs.twimg.com/media/EvyB3s9WgAAROdH.jpg');

INSERT INTO users(uid, email, username, profile_picture)
VALUES('abc125','fake3@email.com', 'fake_user3', 'https://pbs.twimg.com/media/E0kJE8wWYAcWmgo.jpg');

INSERT INTO users(uid, email, username, profile_picture)
VALUES('abc126','fake4@email.com', 'fake_user4', 'https://pbs.twimg.com/media/ExVHNF4VIAED9st.jpg');

INSERT INTO trades(seller_id, have_album_id, want_album_id, status, description)
VALUES(1, 785249, 556257, 'open', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non tellus eget quam sollicitudin semper. Quisque quam leo, ornare non dictum quis, laoreet et quam.');

INSERT INTO trades(seller_id, have_album_id, want_album_id, status, description)
VALUES(2, 785249, 556257, 'open', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non tellus eget quam sollicitudin semper. Quisque quam leo, ornare non dictum quis, laoreet et quam.');

INSERT INTO trades(seller_id, have_album_id, want_album_id, status, description)
VALUES(3, 785249, 556257, 'open', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non tellus eget quam sollicitudin semper. Quisque quam leo, ornare non dictum quis, laoreet et quam.');

INSERT INTO trades(seller_id, have_album_id, want_album_id, status, description)
VALUES(4, 785249, 556257, 'open', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non tellus eget quam sollicitudin semper. Quisque quam leo, ornare non dictum quis, laoreet et quam.');

INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES(1, 2, 5, 1);

INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES(1, 3, 5, 1);

INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES(1, 4, 5, 1);

INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES(2, 1, 5, 1);
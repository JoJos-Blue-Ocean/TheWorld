DROP TABLE IF EXISTS trades CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS wishlist CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;

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

CREATE TABLE "messages" (
  "id" serial PRIMARY KEY,
  "sender_id" integer NOT NULL,
  "recipient_id" integer NOT NULL,
  "trade_id" integer NOT NULL,
  "body" text NOT NULL,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "wishlist" (
  "id" serial PRIMARY KEY,
  "user_id" integer,
  "album_id" integer NOT NULL,
  "artist_name" text NOT NULL,
  "album_name" text NOT NULL,
  "label_name" text NOT NULL,
  "genre" text NOT NULL,
  "image" text NOT NULL,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "notifications" (
  "id" serial PRIMARY KEY,
  "sender_id" integer,
  "recipient_id" integer,
  "body" text NOT NULL,
  "type" text NOT NULL,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE INDEX ON "users" ("uid");

CREATE INDEX ON "trades" ("seller_id");

CREATE INDEX ON "trades" ("have_album_id");

CREATE INDEX ON "trades" ("want_album_id");

CREATE INDEX ON "trades" ("buyer_id");

CREATE INDEX ON "ratings" ("sender_id");

CREATE INDEX ON "ratings" ("recipient_id");

CREATE INDEX ON "ratings" ("trade_id");

CREATE INDEX ON "messages" ("sender_id");

CREATE INDEX ON "messages" ("recipient_id");

CREATE INDEX ON "messages" ("trade_id");

CREATE INDEX ON "wishlist" ("user_id");

CREATE INDEX ON "wishlist" ("album_id");

CREATE INDEX ON "notifications" ("sender_id");

CREATE INDEX ON "notifications" ("recipient_id");

ALTER TABLE "trades" ADD FOREIGN KEY ("seller_id") REFERENCES "users" ("id");

ALTER TABLE "trades" ADD FOREIGN KEY ("buyer_id") REFERENCES "users" ("id");

ALTER TABLE "ratings" ADD FOREIGN KEY ("sender_id") REFERENCES "users" ("id");

ALTER TABLE "ratings" ADD FOREIGN KEY ("recipient_id") REFERENCES "users" ("id");

ALTER TABLE "ratings" ADD FOREIGN KEY ("trade_id") REFERENCES "trades" ("id");

ALTER TABLE "messages" ADD FOREIGN KEY ("sender_id") REFERENCES "users" ("id");

ALTER TABLE "messages" ADD FOREIGN KEY ("recipient_id") REFERENCES "users" ("id");

ALTER TABLE "messages" ADD FOREIGN KEY ("trade_id") REFERENCES "trades" ("id");

ALTER TABLE "wishlist" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "notifications" ADD FOREIGN KEY ("recipient_id") REFERENCES "users" ("id");

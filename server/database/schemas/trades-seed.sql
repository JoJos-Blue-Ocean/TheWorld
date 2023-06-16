
-- Completed Trades
INSERT INTO trades(seller_id, have_album_id, want_album_id, buyer_id, status, description)
VALUES('a', 20319, 69626, 'Wz0NzFeqFeXxmnKwo3jR9TaWu2v2', 'completed', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.');

INSERT INTO trades(seller_id, have_album_id, want_album_id, buyer_id, status, description)
VALUES('c', 69626, 1083521, 'd', 'completed', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.');

INSERT INTO trades(seller_id, have_album_id, want_album_id, buyer_id, status, description)
VALUES('c', 69626, 30172, 'e', 'completed', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.');

-- Open Trades
INSERT INTO trades(seller_id, have_album_id, want_album_id, status, description)
VALUES('d', 20319, 69626, 'open', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.');

INSERT INTO trades(seller_id, have_album_id, want_album_id, status, description)
VALUES('e', 20319, 69626, 'open', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.');

INSERT INTO trades(seller_id, have_album_id, want_album_id, status, description)
VALUES('f', 20319, 69626, 'open', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.');

INSERT INTO trades(seller_id, have_album_id, want_album_id, status, description)
VALUES('g', 69626, 20319, 'open', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.');

INSERT INTO trades(seller_id, have_album_id, want_album_id, status, description)
VALUES('c', 69626, 20319, 'open', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.');

INSERT INTO trades(seller_id, have_album_id, want_album_id, status, description)
VALUES('a', 69626, 20319, 'open', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.');

INSERT INTO trades(seller_id, have_album_id, want_album_id, status, description)
VALUES('h', 1083521, 69626, 'open', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.');

INSERT INTO trades(seller_id, have_album_id, want_album_id, status, description)
VALUES('i', 1083521, 69626, 'open', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.');

INSERT INTO trades(seller_id, have_album_id, want_album_id, status, description)
VALUES('j', 1083521, 69626, 'open', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.');

-- INSERT INTO trades(seller_id, have_album_id, want_album_id, status, description)
-- VALUES('sU9VGP8OI2P2M0piPw473pWeQ0z1', 20319, 556257, 'open', 'Looking to trade this album for another album! I like Daft Punk, but I am open to other records as well.');
-- UPDATE users SET profile_picture='https://pajamawolfie.files.wordpress.com/2018/06/jjba-sd-iggy-ugly.png' WHERE uid='sU9VGP8OI2P2M0piPw473pWeQ0z1';
-- UPDATE users SET biography='I am a dog' WHERE uid='sU9VGP8OI2P2M0piPw473pWeQ0z1';
-- UPDATE users SET location='Cairo, Egypt' WHERE uid='sU9VGP8OI2P2M0piPw473pWeQ0z1';
INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('a', 'sU9VGP8OI2P2M0piPw473pWeQ0z1', 4, 1);
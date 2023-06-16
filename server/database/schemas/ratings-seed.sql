-- Ratings For Completed Trades
INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('a', 'Wz0NzFeqFeXxmnKwo3jR9TaWu2v2', 5, 1);
INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('Wz0NzFeqFeXxmnKwo3jR9TaWu2v2', 'a', 4, 1);

INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('c', 'd', 3, 2);
INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('d', 'c', 4, 2);

INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('c', 'e', 1, 3);
INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('e', 'c', 2, 3);

-- Ratings to pad things out
INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('a', 'd', 1, 1);
INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('a', 'e', 2, 1);
INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('a', 'f', 3, 1);
INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('a', 'g', 4, 1);
INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('a', 'c', 5, 1);
INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('a', 'a', 1, 1);
INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('a', 'h', 2, 1);
INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('a', 'i', 3, 1);
INSERT INTO ratings(sender_id, recipient_id, rating, trade_id)
VALUES('a', 'j', 4, 1);

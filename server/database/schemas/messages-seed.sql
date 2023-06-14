INSERT INTO messages(room_id, sender_user_id, body)
VALUES(1, 'a', 'Lorem');

INSERT INTO messages(room_id, sender_user_id, body)
VALUES(1, 'b', 'ipsum');

INSERT INTO messages(room_id, sender_user_id, body)
VALUES(1, 'a', 'dolor');

INSERT INTO messages(room_id, sender_user_id, body)
VALUES(1, 'b', 'sit');

INSERT INTO messages(room_id, sender_user_id, body)
VALUES(2, 'b', 'consectetur');

INSERT INTO messages(room_id, sender_user_id, body)
VALUES(2, 'c', 'adipiscing');

INSERT INTO messages(room_id, sender_user_id, body)
VALUES(2, 'b', 'elit');

INSERT INTO messages(room_id, sender_user_id, body)
VALUES(2, 'c', 'sed');

INSERT INTO messages(room_id, sender_user_id, body)
VALUES(3, 'a', 'do');

INSERT INTO messages(room_id, sender_user_id, body)
VALUES(3, 'c', 'eiusmod');

INSERT INTO messages(room_id, sender_user_id, body)
VALUES(3, 'a', 'tempor');

INSERT INTO messages(room_id, sender_user_id, body)
VALUES(3, 'c', 'incididunt');

-- Because of timestamps, if you just run this script, they'll all have the same timestamp
-- So you're going to have to enter each one manually
CREATE DATABASE remesh;

CREATE TABLE convos(
	convoId SERIAL PRIMARY KEY,
	title VARCHAR(500) NOT NULL,
	startDate DATE,
);

CREATE TABLE messages(
	messageId SERIAL PRIMARY KEY,
	msgText VARCHAR(2000),
	msgCreatedDate DATE,
	msgCreatedTime time,
	convo int NOT NULL,
    FOREIGN KEY (convo) REFERENCES convos(convoId) ON DELETE CASCADE
);

CREATE TABLE thoughts(
	thoughtId SERIAL PRIMARY KEY,
	thoughtText VARCHAR(2000),
	thoughtCreatedDate DATE,
	thoughtCreatedTime time,
	message int NOT NULL,
	FOREIGN KEY (message) REFERENCES messages(messageId) ON DELETE CASCADE
);


INSERT INTO convos(title,startDate)
VALUES ('WandaVision', '2021-04-16');


INSERT INTO messages(msgText,msgCreatedDate,msgCreatedTime,convo)
VALUES ('If you are in this conversation, I hope you have watched all of WandaVision. Lets talk about it.', '2021-03-22','10:27',3);

INSERT INTO thoughts(thoughtText,thoughtCreatedDate,thoughtCreatedTime,message)
VALUES ('Kathryn Hahn is so great in this show!', '2021-04-01','1:02',5);

DELETE FROM convos
WHERE startDate = null;
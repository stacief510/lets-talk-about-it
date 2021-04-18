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
VALUES ('Lets take a poll...Comment below if you are a cat person or a dog person.', '2021-04-15','9:07',2);
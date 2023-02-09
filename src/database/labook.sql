-- Active: 1675970660694@@127.0.0.1@3306


CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role  TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);



CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME())NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

CREATE TABLE likes_dislikes(
    user_id,
    post_id,
    like INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id)
);

INSERT INTO users(id,name,email,password,role)
VALUES
("u001","gabriel","gabriel@gmail.com","G1234@","normal"),
("u002","kethlin", "kethlin@gmail.com","k5678@","normal");

INSERT INTO posts (id,creator_id,content,likes,dislikes,updated_at)
VALUES
("p001", "u001", "Minha afilhada", 100, 0, "nao"),
("p002","u002","Verão",200,0,"nao"),
("p003","u003","treino",240,22,"nao");

INSERT INTO likes_dislikes (user_id, post_id,like)
VALUES
("u001","p002",1),
("u001","p001",1),
("u002","p003",1);
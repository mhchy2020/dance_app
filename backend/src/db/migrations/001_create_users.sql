create table users(
    id UUID PRIMARY KEY DEFAULT,
    email TEXT UNIQUE NOT NULL
    name TEXT,
    created_at TIMESTAMP DEFAULT now() 
);

Alter table users
add column password_hash varchar(60) NOT NULL;
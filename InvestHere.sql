DROP DATABASE IF EXISTS InvestHere;

CREATE DATABASE InvestHere;

USE InvestHere;

CREATE TABLE Client (
    id int not null auto_increment,
    name varchar(50) not null,
    email varchar(30) not null,
    password varchar(30) not null,
    primary key(id)
);

insert into InvestHere.Client (name, email, password) values ('Client1', 'client1@email.com', '1234');

CREATE TABLE Account (
     id int not null auto_increment,
     clientId int not null,
     agency varchar(10) not null,
     account varchar(10) not null,
     balance integer,
     primary key(id),
     FOREIGN KEY (clientId)
         REFERENCES Client (id)
         ON DELETE CASCADE
);

insert into InvestHere.Account (clientId, agency, account, balance)
values (1, '1234', '959512', 1000);

CREATE TABLE Product(
    id int not null auto_increment,
    name varchar(10) not null,
    quantity integer,
    amount integer,
    primary key(id)
);

insert into InvestHere.Product (name, quantity, amount) values ('PETR4', 800, 2300);
insert into InvestHere.Product (name, quantity, amount) values ('VALE3', 500, 4200);

CREATE TABLE Wallet(
    id int not null auto_increment,
    clientId int not null,
    productId int not null,
    quantity integer,
    amount integer,
    primary key(id),
    FOREIGN KEY (clientId)
       REFERENCES Client (id)
       ON DELETE CASCADE,
    FOREIGN KEY (productId)
       REFERENCES Product (id)
       ON DELETE CASCADE
);

insert into InvestHere.Wallet (clientId, productId, quantity, amount) values (1, 1, 100, 230000);

CREATE TABLE AccountOperation (
    id int not null auto_increment,
    clientId int not null,
    accountId int not null,
    amount integer,
    type varchar(10),
    date datetime DEFAULT CURRENT_TIMESTAMP,
    primary key(id),
    FOREIGN KEY (clientId)
      REFERENCES Client (id)
      ON DELETE CASCADE,
    FOREIGN KEY (accountId)
      REFERENCES Account (id)
      ON DELETE CASCADE

);

insert into InvestHere.AccountOperation (clientId, accountId, amount, type) values (1, 1, 500000, 'D');
insert into InvestHere.AccountOperation (clientId, accountId, amount, type) values (1, 1, 20000, 'S');

CREATE TABLE WalletOperation (
    id int not null auto_increment,
    clientId int not null,
    productId int not null,
    quantity integer,
    amount integer,
    type varchar(10),
    date datetime DEFAULT CURRENT_TIMESTAMP,
    primary key(id),
    FOREIGN KEY (clientId)
     REFERENCES Client (id)
     ON DELETE CASCADE,
    FOREIGN KEY (productId)
     REFERENCES Product (id)
     ON DELETE CASCADE
);

insert into InvestHere.WalletOperation (clientId, productId, quantity, amount, type) values (1, 1, 100, 230000, 'C');
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

CREATE TABLE Account (
                         id int not null auto_increment,
                         idClient int not null,
                         agency varchar(10) not null,
                         account varchar(10) not null,
                         balance integer,
                         primary key(id),
                         FOREIGN KEY (idClient)
                             REFERENCES Client (id)
                             ON DELETE CASCADE
);

CREATE TABLE Product(
                        id int not null auto_increment,
                        name varchar(10) not null,
                        quantity integer,
                        amount decimal,
                        primary key(id)
);

CREATE TABLE Wallet(
                       id int not null auto_increment,
                       idClient int not null,
                       idProduct int not null,
                       quantity integer,
                       amount decimal,
                       primary key(id),
                       FOREIGN KEY (idClient)
                           REFERENCES Client (id)
                           ON DELETE CASCADE,
                       FOREIGN KEY (idProduct)
                           REFERENCES Product (id)
                           ON DELETE CASCADE
);


CREATE TABLE AccountOperation (
                                  id int not null auto_increment,
                                  idClient int not null,
                                  idAccount int not null,
                                  amount decimal,
                                  type varchar(10),
                                  date datetime DEFAULT CURRENT_TIMESTAMP,
                                  primary key(id),
                                  FOREIGN KEY (idClient)
                                      REFERENCES Client (id)
                                      ON DELETE CASCADE,
                                  FOREIGN KEY (idAccount)
                                      REFERENCES Account (id)
                                      ON DELETE CASCADE

);

CREATE TABLE WalletOperation (
                                 id int not null auto_increment,
                                 idClient int not null,
                                 idProduct int not null,
                                 quantity integer,
                                 amount decimal,
                                 type varchar(10),
                                 date datetime DEFAULT CURRENT_TIMESTAMP,
                                 primary key(id),
                                 FOREIGN KEY (idClient)
                                     REFERENCES Client (id)
                                     ON DELETE CASCADE,
                                 FOREIGN KEY (idProduct)
                                     REFERENCES Product (id)
                                     ON DELETE CASCADE
)
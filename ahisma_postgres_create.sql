-- postgres://cjcfvoek:7uijjLGHc90B-ztkZPf4p3xdYgjHBlvO@suleiman.db.elephantsql.com:5432/cjcfvoek
-- psql -d postgres://cjcfvoek:7uijjLGHc90B-ztkZPf4p3xdYgjHBlvO@suleiman.db.elephantsql.com:5432/cjcfvoek -f ahisma_postgres_create.sql


drop table users CASCADE;
drop table items CASCADE;
drop table accounts CASCADE;
drop table transactions CASCADE;

CREATE TABLE users (
    "user_id" serial NOT NULL,
    "first_name" varchar NOT NULL,
    "last_name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "hash" varchar NOT NULL,
    PRIMARY KEY ("user_id")
) WITH (
    OIDS=FALSE
);

CREATE TABLE items (
    "row_id" serial NOT NULL,
    "item_id" varchar NOT NULL,
    "item_name" varchar NOT NULL,
    "user_id" int NOT NULL,
    "access_token" varchar NOT NULL,
    PRIMARY KEY ("item_id")
) WITH (
    OIDS=FALSE
);

CREATE TABLE accounts (
    "row_id" serial NOT NULL,
    "account_id" varchar NOT NULL,
    "account_name" varchar NOT NULL,
    "account_balance" int NOT NULL,
    "account_subtype" varchar NOT NULL,
    "item_id" varchar NOT NULL,
     PRIMARY KEY ("account_id")
) WITH (
    OIDS=FALSE
);

CREATE TABLE transactions (
    "row_id" serial NOT NULL,
    "transaction_id" varchar NOT NULL,
    "account_id" varchar NOT NULL,
    "transaction_amount" int NOT NULL,
    "transaction_date" varchar NOT NULL,
    "merchant_name" varchar ,
    "transaction_description" varchar NOT NULL,
    "category" varchar,
    PRIMARY KEY ("transaction_id")
) WITH (
    OIDS=FALSE
);

ALTER TABLE items ADD CONSTRAINT fk_user FOREIGN KEY ("user_id") REFERENCES  users("user_id");
ALTER TABLE accounts ADD CONSTRAINT fk_item FOREIGN KEY ("item_id") REFERENCES  items("item_id");
ALTER TABLE transactions ADD CONSTRAINT fk_account FOREIGN KEY ("account_id") REFERENCES  accounts("account_id");

INSERT INTO users ("first_name", "last_name", "email", "hash") VALUES ('bill', 'nye', 'billatgmail.com', 'hash');

    
    
   
    
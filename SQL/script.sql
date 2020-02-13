DROP TABLE "Address";

DROP TABLE "Person";

CREATE TABLE "Person" (
	"PersonId" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
	"Cpf" varchar(11) NOT NULL,
	"FirstName" varchar(50) NOT NULL,
	"LastName" varchar(50) NOT NULL,
	"Email" varchar(50) NOT NULL,
	"Phone" varchar(50) NOT NULL,
	CONSTRAINT "Pk_PersonId" PRIMARY KEY ("PersonId")
);

CREATE TABLE "Address" (
	"AddressId" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
	"Street" VARCHAR(30) NOT NULL,
	"Number" int NOT NULL,
	"City" VARCHAR(30) NOT NULL,
	"State" VARCHAR(30) NOT NULL,
	"Country" VARCHAR(30) NOT NULL,
	"Fk_PersonId" int NOT NULL,
	CONSTRAINT "Pk_AddressId" PRIMARY KEY ("AddressId"),
	FOREIGN KEY ("Fk_PersonId") REFERENCES "Person" ("PersonId")
);
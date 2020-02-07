CREATE TABLE "Contacts"(
	 "ContactId" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
	 "FirstName" varchar(50) NULL,
	 "LastName" varchar(50) NULL,
	 "Email" varchar(50) NULL,
	 "Phone" varchar(50) NULL,
 CONSTRAINT "PK_Contact" PRIMARY KEY ("ContactId"));
 
 select * from "Contacts"
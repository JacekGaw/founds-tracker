CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(200) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"active" boolean DEFAULT true NOT NULL,
	"name" varchar(20),
	"surname" varchar(30),
	"phone" varchar(20),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

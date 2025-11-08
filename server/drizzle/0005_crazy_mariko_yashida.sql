ALTER TABLE "transactions" DROP CONSTRAINT "transactions_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "category_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
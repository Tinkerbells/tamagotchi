ALTER TABLE "pet_accessories" RENAME COLUMN "pet_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "pet_accessories" DROP CONSTRAINT "pet_accessories_pet_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pet_accessories" ADD CONSTRAINT "pet_accessories_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

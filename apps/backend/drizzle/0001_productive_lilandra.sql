ALTER TABLE "pet_accessories" DROP CONSTRAINT "pet_accessories_pet_id_pet_id_fk";
--> statement-breakpoint
ALTER TABLE "pet_interior_items" DROP CONSTRAINT "pet_interior_items_user_id_pet_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pet_accessories" ADD CONSTRAINT "pet_accessories_pet_id_user_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pet_interior_items" ADD CONSTRAINT "pet_interior_items_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

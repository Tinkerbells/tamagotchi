-- Step 1: Add vk_id as nullable
ALTER TABLE "user" ADD COLUMN "vk_id" varchar(255);

-- Step 2: Populate vk_id with default values or derived data
-- Example: Update with some default value or based on another column.
UPDATE "user" SET "vk_id" = 'default_vk_id'; -- Replace with your logic

-- Step 3: Alter the column to NOT NULL
ALTER TABLE "user" ALTER COLUMN "vk_id" SET NOT NULL;

-- Step 4: Add the UNIQUE constraint
ALTER TABLE "user" ADD CONSTRAINT "user_vk_id_unique" UNIQUE("vk_id");

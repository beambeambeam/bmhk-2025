ALTER TABLE "teams" RENAME COLUMN "number_of_member" TO "member_count";--> statement-breakpoint
ALTER TABLE "advisor" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "advisor" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "advisor_team_id_unique" ON "advisor" USING btree ("team_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "member_team_index_unique" ON "member" USING btree ("team_id","index");--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN IF EXISTS "advisor";
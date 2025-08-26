CREATE TYPE "public"."register_status_enum" AS ENUM('NOT_DONE', 'DONE', 'NOT_HAVE');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "register_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"team_id" uuid NOT NULL,
	"team" "register_status_enum" DEFAULT 'NOT_DONE' NOT NULL,
	"adviser" "register_status_enum" DEFAULT 'NOT_DONE' NOT NULL,
	"member1" "register_status_enum" DEFAULT 'NOT_DONE' NOT NULL,
	"member2" "register_status_enum" DEFAULT 'NOT_DONE' NOT NULL,
	"member3" "register_status_enum" DEFAULT 'NOT_HAVE' NOT NULL,
	"submit_register" timestamp,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "register_status" ADD CONSTRAINT "register_status_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "register_status_team_id_unique" ON "register_status" USING btree ("team_id");
CREATE TYPE "public"."round1_verification_status_enum" AS ENUM('DONE', 'NOT_DONE');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "round1_verification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"team_id" uuid NOT NULL,
	"adviser_problems" text[] DEFAULT '{}',
	"member1_problems" text[] DEFAULT '{}',
	"member2_problems" text[] DEFAULT '{}',
	"member3_problems" text[] DEFAULT '{}',
	"notes" text,
	"status" "round1_verification_status_enum" DEFAULT 'NOT_DONE' NOT NULL,
	"verified_by" text,
	"verified_at" timestamp,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "round1_verification" ADD CONSTRAINT "round1_verification_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "round1_verification" ADD CONSTRAINT "round1_verification_verified_by_user_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "round1_verification_team_id_unique" ON "round1_verification" USING btree ("team_id");
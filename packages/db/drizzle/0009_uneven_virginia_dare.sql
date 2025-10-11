CREATE TABLE IF NOT EXISTS "award_audit" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"team_id" uuid NOT NULL,
	"old_award" text NOT NULL,
	"new_award" text NOT NULL,
	"changed_by" text NOT NULL,
	"changed_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"reason" text,
	"session_id" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "award_audit" ADD CONSTRAINT "award_audit_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "award_audit" ADD CONSTRAINT "award_audit_changed_by_user_id_fk" FOREIGN KEY ("changed_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "award_audit" ADD CONSTRAINT "award_audit_session_id_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."session"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TYPE "public"."status" AS ENUM('paid', 'unpaid');--> statement-breakpoint
CREATE TABLE "account" (
	"access_token" text,
	"access_token_expires_at" timestamp,
	"account_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_token" text,
	"password" varchar(255),
	"provider_id" text NOT NULL,
	"refresh_token" text,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"updated_at" timestamp NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expense_participant" (
	"expense_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"share_amount" numeric(10, 2) NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "unique_expense_user" UNIQUE("expense_id","user_id"),
	CONSTRAINT "check_share_amount_non_negative" CHECK ("expense_participant"."share_amount" >= 0)
);
--> statement-breakpoint
CREATE TABLE "expense" (
	"amount" numeric(10, 2) NOT NULL,
	"created_at" timestamp NOT NULL,
	"description" varchar(255) NOT NULL,
	"group_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"incurred_at" date NOT NULL,
	"paid_by_user_id" uuid NOT NULL,
	CONSTRAINT "check_amount_positive" CHECK ("expense"."amount" > 0)
);
--> statement-breakpoint
CREATE TABLE "group_member" (
	"group_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"joined_at" timestamp NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "unique_group_user" UNIQUE("group_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "group" (
	"created_at" timestamp NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"created_at" timestamp NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ip_address" text,
	"token" text NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_agent" text,
	"user_id" uuid NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "transaction" (
	"amount" numeric(10, 2) NOT NULL,
	"created_at" timestamp NOT NULL,
	"created_by" uuid NOT NULL,
	"description" varchar(255),
	"expense_id" uuid,
	"group_id" uuid,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payer_user_id" uuid NOT NULL,
	"receiver_user_id" uuid NOT NULL,
	"settled_date" timestamp,
	"status" "status",
	"transaction_date" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"updated_by" uuid NOT NULL,
	CONSTRAINT "check_amount_positive" CHECK ("transaction"."amount" > 0),
	CONSTRAINT "check_different_users" CHECK ("transaction"."payer_user_id" <> "transaction"."receiver_user_id"),
	CONSTRAINT "check_status_valid" CHECK ("transaction"."status" IN ('unpaid', 'paid')),
	CONSTRAINT "check_settled_date_when_paid" CHECK (
        ("transaction"."status" = 'paid' AND "transaction"."settled_date" IS NOT NULL) OR 
        ("transaction"."status" = 'unpaid' AND "transaction"."settled_date" IS NULL)
      )
);
--> statement-breakpoint
CREATE TABLE "user" (
	"created_at" timestamp NOT NULL,
	"display_username" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" boolean NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image" text,
	"name" varchar(255) NOT NULL,
	"updated_at" timestamp NOT NULL,
	"username" varchar(255),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"created_at" timestamp,
	"expires_at" timestamp NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identifier" text NOT NULL,
	"updated_at" timestamp,
	"value" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_participant" ADD CONSTRAINT "expense_participant_expense_id_expense_id_fk" FOREIGN KEY ("expense_id") REFERENCES "public"."expense"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_participant" ADD CONSTRAINT "expense_participant_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_group_id_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."group"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_paid_by_user_id_user_id_fk" FOREIGN KEY ("paid_by_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_group_id_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."group"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group" ADD CONSTRAINT "group_created_by_user_id_user_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_expense_id_expense_id_fk" FOREIGN KEY ("expense_id") REFERENCES "public"."expense"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_group_id_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."group"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_payer_user_id_user_id_fk" FOREIGN KEY ("payer_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_receiver_user_id_user_id_fk" FOREIGN KEY ("receiver_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_updated_by_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_expenses_group_id" ON "expense" USING btree ("group_id");--> statement-breakpoint
CREATE INDEX "idx_transactions_payer" ON "transaction" USING btree ("payer_user_id");--> statement-breakpoint
CREATE INDEX "idx_transactions_receiver" ON "transaction" USING btree ("receiver_user_id");--> statement-breakpoint
CREATE INDEX "idx_transactions_expense" ON "transaction" USING btree ("expense_id");--> statement-breakpoint
CREATE INDEX "idx_transactions_group" ON "transaction" USING btree ("group_id");--> statement-breakpoint
CREATE INDEX "idx_transactions_status" ON "transaction" USING btree ("status");
CREATE TABLE `configuracao` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `professores` ADD `password_hash` text;--> statement-breakpoint
ALTER TABLE `professores` ADD `must_change_password` integer DEFAULT 0 NOT NULL;
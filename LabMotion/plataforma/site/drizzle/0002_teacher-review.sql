CREATE TABLE `revisoes_docentes` (
	`id` text PRIMARY KEY NOT NULL,
	`text_id` text NOT NULL,
	`teacher_id` text NOT NULL,
	`rubric` text NOT NULL,
	`comment` text NOT NULL,
	`version` integer NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`text_id`) REFERENCES `textos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`teacher_id`) REFERENCES `professores`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `revisoes_versao` ON `revisoes_docentes` (`text_id`,`version`);--> statement-breakpoint
CREATE TABLE `textos` (
	`id` text PRIMARY KEY NOT NULL,
	`game_id` text NOT NULL,
	`kind` text NOT NULL,
	`mission` integer,
	`body` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`game_id`) REFERENCES `partidas`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `textos_partida` ON `textos` (`game_id`);
CREATE TABLE `eventos` (
	`id` text PRIMARY KEY NOT NULL,
	`game_id` text NOT NULL,
	`request_hash` text NOT NULL,
	`revision` integer NOT NULL,
	`kind` text NOT NULL,
	`item_id` text,
	`detail` text NOT NULL,
	`response` text NOT NULL,
	`at` text NOT NULL,
	FOREIGN KEY (`game_id`) REFERENCES `partidas`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `eventos_partida` ON `eventos` (`game_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `eventos_revisao` ON `eventos` (`game_id`,`revision`);--> statement-breakpoint
CREATE TABLE `sessoes_legadas` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`record` text NOT NULL,
	`origin` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `alunos`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `legadas_aluno` ON `sessoes_legadas` (`student_id`);--> statement-breakpoint
CREATE TABLE `partidas` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`class_id` text NOT NULL,
	`content_version` text NOT NULL,
	`mode` text NOT NULL,
	`participants` integer NOT NULL,
	`conditions` text NOT NULL,
	`state` text NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	`completed_at` text,
	FOREIGN KEY (`student_id`) REFERENCES `alunos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`class_id`) REFERENCES `turmas`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "partidas_individual" CHECK("partidas"."mode"='individual' AND "partidas"."participants"=1)
);
--> statement-breakpoint
CREATE INDEX `partidas_turma_data` ON `partidas` (`class_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `partidas_aluno` ON `partidas` (`student_id`);--> statement-breakpoint
CREATE TABLE `infra_probes` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `respostas` (
	`id` text PRIMARY KEY NOT NULL,
	`game_id` text NOT NULL,
	`item_id` text NOT NULL,
	`response` text NOT NULL,
	`correct` integer NOT NULL,
	`attempt` integer NOT NULL,
	`structural` integer DEFAULT 0 NOT NULL,
	`hints_used` integer NOT NULL,
	`elapsed_ms` integer,
	`at` text NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `eventos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`game_id`) REFERENCES `partidas`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `respostas_tentativa` ON `respostas` (`game_id`,`item_id`,`attempt`);--> statement-breakpoint
CREATE INDEX `respostas_item` ON `respostas` (`item_id`);
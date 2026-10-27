CREATE TABLE `alunos` (
	`id` text PRIMARY KEY NOT NULL,
	`class_id` text NOT NULL,
	`nickname` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`class_id`) REFERENCES `turmas`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `alunos_turma` ON `alunos` (`class_id`);--> statement-breakpoint
CREATE TABLE `auditoria` (
	`id` text PRIMARY KEY NOT NULL,
	`actor_id` text NOT NULL,
	`action` text NOT NULL,
	`target_id` text NOT NULL,
	`at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `auditoria_data` ON `auditoria` (`at`);--> statement-breakpoint
CREATE TABLE `convites_turma` (
	`id` text PRIMARY KEY NOT NULL,
	`class_id` text NOT NULL,
	`code_hash` text NOT NULL,
	`revoked_at` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`class_id`) REFERENCES `turmas`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `convites_hash` ON `convites_turma` (`code_hash`);--> statement-breakpoint
CREATE INDEX `convites_por_turma` ON `convites_turma` (`class_id`);--> statement-breakpoint
CREATE TABLE `credenciais_aluno` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`code_hash` text NOT NULL,
	`created_at` text NOT NULL,
	`revoked_at` text,
	FOREIGN KEY (`student_id`) REFERENCES `alunos`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `credenciais_hash` ON `credenciais_aluno` (`code_hash`);--> statement-breakpoint
CREATE INDEX `credenciais_por_aluno` ON `credenciais_aluno` (`student_id`);--> statement-breakpoint
CREATE TABLE `limites_entrada` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `professores` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`role` text DEFAULT 'teacher' NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`created_at` text NOT NULL,
	CONSTRAINT "professores_role" CHECK("professores"."role" IN ('teacher','admin'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `professores_email` ON `professores` (`email`);--> statement-breakpoint
CREATE TABLE `sessoes_auth` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`actor_id` text NOT NULL,
	`role` text NOT NULL,
	`expires_at` text NOT NULL,
	`created_at` text NOT NULL,
	CONSTRAINT "sessoes_role" CHECK("sessoes_auth"."role" IN ('student','teacher','admin'))
);
--> statement-breakpoint
CREATE INDEX `sessoes_actor` ON `sessoes_auth` (`actor_id`);--> statement-breakpoint
CREATE TABLE `turmas` (
	`id` text PRIMARY KEY NOT NULL,
	`teacher_id` text NOT NULL,
	`title` text NOT NULL,
	`created_at` text NOT NULL,
	`archived` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`teacher_id`) REFERENCES `professores`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `turmas_teacher` ON `turmas` (`teacher_id`);

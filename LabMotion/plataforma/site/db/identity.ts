import { sqliteTable, text, integer, index, uniqueIndex, check } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const professores = sqliteTable('professores', {
  id: text('id').primaryKey(), email: text('email').notNull(), role: text('role').notNull().default('teacher'),
  active: integer('active').notNull().default(1), createdAt: text('created_at').notNull(),
  passwordHash: text('password_hash'), mustChangePassword: integer('must_change_password').notNull().default(0),
}, t => [uniqueIndex('professores_email').on(t.email), check('professores_role', sql`${t.role} IN ('teacher','admin')`)]);
export const turmas = sqliteTable('turmas', {
  id: text('id').primaryKey(), teacherId: text('teacher_id').notNull().references(() => professores.id),
  title: text('title').notNull(), createdAt: text('created_at').notNull(), archived: integer('archived').notNull().default(0),
}, t => [index('turmas_teacher').on(t.teacherId)]);
export const convites = sqliteTable('convites_turma', {
  id: text('id').primaryKey(), classId: text('class_id').notNull().references(() => turmas.id),
  codeHash: text('code_hash').notNull(), revokedAt: text('revoked_at'), createdAt: text('created_at').notNull(),
}, t => [uniqueIndex('convites_hash').on(t.codeHash), index('convites_por_turma').on(t.classId)]);
export const alunos = sqliteTable('alunos', {
  id: text('id').primaryKey(), classId: text('class_id').notNull().references(() => turmas.id),
  nickname: text('nickname').notNull(), createdAt: text('created_at').notNull(),
}, t => [index('alunos_turma').on(t.classId)]);
export const credenciais = sqliteTable('credenciais_aluno', {
  id: text('id').primaryKey(), studentId: text('student_id').notNull().references(() => alunos.id),
  codeHash: text('code_hash').notNull(), createdAt: text('created_at').notNull(), revokedAt: text('revoked_at'),
}, t => [uniqueIndex('credenciais_hash').on(t.codeHash), index('credenciais_por_aluno').on(t.studentId)]);
export const sessoes = sqliteTable('sessoes_auth', {
  tokenHash: text('token_hash').primaryKey(), actorId: text('actor_id').notNull(), role: text('role').notNull(),
  expiresAt: text('expires_at').notNull(), createdAt: text('created_at').notNull(),
}, t => [index('sessoes_actor').on(t.actorId), check('sessoes_role', sql`${t.role} IN ('student','teacher','admin')`)]);
export const limites = sqliteTable('limites_entrada', {
  key: text('key').primaryKey(), count: integer('count').notNull().default(0), expires: integer('expires').notNull(),
});
export const auditoria = sqliteTable('auditoria', {
  id: text('id').primaryKey(), actorId: text('actor_id').notNull(), action: text('action').notNull(),
  targetId: text('target_id').notNull(), at: text('at').notNull(),
}, t => [index('auditoria_data').on(t.at)]);
export const configuracao=sqliteTable('configuracao',{key:text('key').primaryKey(),value:text('value').notNull()});

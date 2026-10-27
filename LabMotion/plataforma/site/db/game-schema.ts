import { sqliteTable, text, integer, index, uniqueIndex, check } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { alunos, turmas } from './identity';
export const partidas=sqliteTable('partidas',{
  id:text('id').primaryKey(),studentId:text('student_id').notNull().references(()=>alunos.id),classId:text('class_id').notNull().references(()=>turmas.id),
  contentVersion:text('content_version').notNull(),mode:text('mode').notNull(),participants:integer('participants').notNull(),conditions:text('conditions').notNull(),
  state:text('state').notNull(),revision:integer('revision').notNull().default(0),createdAt:text('created_at').notNull(),completedAt:text('completed_at'),
},t=>[index('partidas_turma_data').on(t.classId,t.createdAt),index('partidas_aluno').on(t.studentId),check('partidas_individual',sql`${t.mode}='individual' AND ${t.participants}=1`)]);
export const eventos=sqliteTable('eventos',{
  id:text('id').primaryKey(),gameId:text('game_id').notNull().references(()=>partidas.id),requestHash:text('request_hash').notNull(),revision:integer('revision').notNull(),
  kind:text('kind').notNull(),itemId:text('item_id'),detail:text('detail').notNull(),response:text('response').notNull(),at:text('at').notNull(),
},t=>[index('eventos_partida').on(t.gameId),uniqueIndex('eventos_revisao').on(t.gameId,t.revision)]);
export const respostas=sqliteTable('respostas',{
  id:text('id').primaryKey().references(()=>eventos.id),gameId:text('game_id').notNull().references(()=>partidas.id),itemId:text('item_id').notNull(),response:text('response').notNull(),
  correct:integer('correct').notNull(),attempt:integer('attempt').notNull(),structural:integer('structural').notNull().default(0),hintsUsed:integer('hints_used').notNull(),elapsedMs:integer('elapsed_ms'),at:text('at').notNull(),
},t=>[uniqueIndex('respostas_tentativa').on(t.gameId,t.itemId,t.attempt),index('respostas_item').on(t.itemId)]);
export const legadas=sqliteTable('sessoes_legadas',{
  id:text('id').primaryKey(),studentId:text('student_id').notNull().references(()=>alunos.id),record:text('record').notNull(),origin:text('origin').notNull(),createdAt:text('created_at').notNull(),
},t=>[index('legadas_aluno').on(t.studentId)]);
export const probes=sqliteTable('infra_probes',{id:text('id').primaryKey(),createdAt:text('created_at').notNull()});

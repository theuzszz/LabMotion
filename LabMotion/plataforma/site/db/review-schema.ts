import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { partidas } from './game-schema';
import { professores } from './identity';
export const textos=sqliteTable('textos',{
  id:text('id').primaryKey(),gameId:text('game_id').notNull().references(()=>partidas.id),kind:text('kind').notNull(),mission:integer('mission'),body:text('body').notNull(),createdAt:text('created_at').notNull(),
},t=>[index('textos_partida').on(t.gameId)]);
export const revisoes=sqliteTable('revisoes_docentes',{
  id:text('id').primaryKey(),textId:text('text_id').notNull().references(()=>textos.id),teacherId:text('teacher_id').notNull().references(()=>professores.id),
  rubric:text('rubric').notNull(),comment:text('comment').notNull(),version:integer('version').notNull(),createdAt:text('created_at').notNull(),
},t=>[uniqueIndex('revisoes_versao').on(t.textId,t.version)]);

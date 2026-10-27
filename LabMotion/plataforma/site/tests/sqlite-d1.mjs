import {DatabaseSync} from 'node:sqlite';
import {readFileSync,readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
// Real SQLite with D1's prepared/batch contract. No product database is mocked.
export function database(filename=':memory:') {
  const sqlite=new DatabaseSync(filename);sqlite.exec('PRAGMA foreign_keys=ON');
  const directory=new URL('../drizzle/',import.meta.url);
  for(const name of readdirSync(directory).filter(n=>n.endsWith('.sql')).sort())sqlite.exec(readFileSync(new URL(name,directory),'utf8'));
  const db={
    prepare(sql){
      const statement={sql,args:[],bind(...args){return {...statement,args};},
        async first(column){const row=sqlite.prepare(this.sql).get(...this.args);return row?(column?row[column]:{...row}):null;},
        async all(){return {success:true,results:sqlite.prepare(this.sql).all(...this.args).map(r=>({...r}))};},
        async run(){const result=sqlite.prepare(this.sql).run(...this.args);return {success:true,meta:{changes:Number(result.changes)}};},
      };return statement;
    },
    async batch(statements){sqlite.exec('BEGIN IMMEDIATE');try{const results=[];for(const s of statements){const result=sqlite.prepare(s.sql).run(...s.args);results.push({success:true,meta:{changes:Number(result.changes)}});}sqlite.exec('COMMIT');return results;}catch(e){sqlite.exec('ROLLBACK');throw e;}},
    sqlite,close(){sqlite.close();},
  };return db;
}
export async function seed(db) {
  const at=new Date().toISOString();
  for(const [id,email,role] of [['teacher-a','prof-a@example.test','teacher'],['teacher-b','prof-b@example.test','teacher'],['admin','admin@example.test','admin']])await db.prepare('INSERT INTO professores(id,email,role,created_at) VALUES(?,?,?,?)').bind(id,email,role,at).run();
  await db.prepare('INSERT INTO turmas(id,teacher_id,title,created_at) VALUES(?,?,?,?)').bind('class-a','teacher-a','Turma fictícia A',at).run();
  await db.prepare('INSERT INTO turmas(id,teacher_id,title,created_at) VALUES(?,?,?,?)').bind('class-b','teacher-b','Turma fictícia B',at).run();
  return {teacherA:{id:'teacher-a',role:'teacher',email:'prof-a@example.test'},teacherB:{id:'teacher-b',role:'teacher',email:'prof-b@example.test'},admin:{id:'admin',role:'admin',email:'admin@example.test'}};
}

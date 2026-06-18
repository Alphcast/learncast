import initSqlJs, { type Database as SqlJsDatabase } from 'sql.js'
import fs from 'fs'
import path from 'path'

const DB_DIR = path.resolve(process.cwd(), 'data')
const DB_PATH = path.join(DB_DIR, 'learncast.db')

let db: SqlJsDatabase

function save() {
  const data = db.export()
  const buffer = Buffer.from(data)
  fs.writeFileSync(DB_PATH, buffer)
}

export function getDb(): SqlJsDatabase {
  return db
}

export async function initDb(): Promise<void> {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true })
  }

  const SQL = await initSqlJs()

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH)
    db = new SQL.Database(fileBuffer)
  } else {
    db = new SQL.Database()
  }

  db.run('PRAGMA foreign_keys = ON')

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      plan TEXT NOT NULL,
      status TEXT DEFAULT 'active',
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      reference TEXT UNIQUE NOT NULL,
      access_code TEXT,
      amount INTEGER NOT NULL,
      currency TEXT DEFAULT 'NGN',
      status TEXT DEFAULT 'pending',
      plan TEXT NOT NULL,
      payment_method TEXT DEFAULT 'card',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS exam_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      month_key TEXT NOT NULL,
      count INTEGER DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, month_key)
    )
  `)

  save()
  console.log(`Database ready at ${DB_PATH}`)
}

export function dbRun(sql: string, params: any[] = []): { changes: number; lastInsertRowid: number } {
  db.run(sql, params)
  const lastInsertRowid = (db.exec("SELECT last_insert_rowid() as id")[0]?.values[0]?.[0] as number) || 0
  const changes = db.getRowsModified()
  save()
  return { changes, lastInsertRowid }
}

export function dbGet<T>(sql: string, params: any[] = []): T | undefined {
  const stmt = db.prepare(sql)
  stmt.bind(params)
  if (stmt.step()) {
    const cols = stmt.getColumnNames()
    const vals = stmt.get()
    stmt.free()
    const row: Record<string, unknown> = {}
    for (let i = 0; i < cols.length; i++) {
      row[cols[i]] = vals[i]
    }
    return row as T
  }
  stmt.free()
  return undefined
}

export function dbAll<T>(sql: string, params: any[] = []): T[] {
  const stmt = db.prepare(sql)
  stmt.bind(params)
  const results: T[] = []
  const cols = stmt.getColumnNames()
  while (stmt.step()) {
    const vals = stmt.get()
    const row: Record<string, unknown> = {}
    for (let i = 0; i < cols.length; i++) {
      row[cols[i]] = vals[i]
    }
    results.push(row as T)
  }
  stmt.free()
  return results
}

import DBInterface from './interface'
import Sqlite3DB from './Sqlite3DB'

let db: DBInterface
db = new Sqlite3DB()

export default db;

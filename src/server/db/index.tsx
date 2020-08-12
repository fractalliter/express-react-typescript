import DBInterface from './interface';
import Sqlite3DB from './Sqlite3DB';

const db: DBInterface = new Sqlite3DB();
export default db;

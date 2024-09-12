import * as SQLite from 'expo-sqlite';

type UserType = {
    id: number;
    username: string;
    password: string;
};

const openDatabase = async (): Promise<SQLite.SQLiteDatabase | null> => {
    try {
        const database = await SQLite.openDatabaseAsync('CreatureDatabase');
        console.log('Database opened successfully');
        return database;
    } catch (error) {
        console.error('Error opening the database', error);
        return null;
    }
};

const openUserTable = async (database: SQLite.SQLiteDatabase) => {
    try {
        database.runAsync(`PRAGMA journal_mode = WAL`);
        database.runAsync(`CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY NOT NULL, 
          username TEXT NOT NULL, 
          password TEXT NOT NULL
      );`);
        console.log('Table opened successfully');
    } catch (error) {
        console.error('Error in openTable function', error);
    }
};

const insertUserData = async (database: SQLite.SQLiteDatabase, name: string, pass: string) => {
    const statement = await database.prepareAsync(
      'INSERT INTO user (username, password) VALUES ($name, $pass)'
    );
    try {
      let result = await statement.executeAsync({ $name: name, $pass: pass });
      console.log("name: " + name + " | password: " + pass, result.lastInsertRowId, result.changes);
    
    } catch (error) {
      console.error('Error inserting data', error);
    } finally {
      await statement.finalizeAsync();
      console.log('data inserted good');
    } 
  };

  const deleteUserData = async (database: SQLite.SQLiteDatabase, userid: number) => {
    await database.runAsync('DELETE FROM user WHERE id = $value', { $value: userid });
    console.log("delete good");
  };

  const logData = async (database: SQLite.SQLiteDatabase) => {
    const firstRow = await database.getFirstAsync('SELECT * FROM user') as UserType; 
    console.log(firstRow.id, firstRow.username, firstRow.password);
    console.log("good data")
  };
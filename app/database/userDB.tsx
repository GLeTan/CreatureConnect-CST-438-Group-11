import * as SQLite from 'expo-sqlite';

type UserType = {
    id: number;
    username: string;
    password: string;
};

export const openDatabase = async (): Promise<SQLite.SQLiteDatabase | null> => {
    try {
        const database = await SQLite.openDatabaseAsync('CreatureDatabase');
        console.log('Database opened successfully');
        return database;
    } catch (error) {
        console.error('Error opening the database', error);
        return null;
    }
};

export const openUserTable = async (databasePromise: Promise<SQLite.SQLiteDatabase | null>) => {
    try {
        const database = await databasePromise;

        if (database) {
            database.runAsync(`PRAGMA journal_mode = WAL`);
            database.runAsync(`CREATE TABLE IF NOT EXISTS user (

          id INTEGER PRIMARY KEY NOT NULL, 
          username TEXT NOT NULL, 
          password TEXT NOT NULL
      );`);
            console.log('Table opened successfully');
        } else {
            console.error('Database is null, table not opened');
        }


    } catch (error) {
        console.error('Error in openTable function', error);
    }
};

export const insertUserData = async (databasePromise: Promise<SQLite.SQLiteDatabase | null>, name: string, pass: string) => {
    const database = await databasePromise;

    if (database) {
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
    } else {
        console.error('Database is null, table not opened');
    }
};

export const deleteUserData = async (databasePromise: Promise<SQLite.SQLiteDatabase | null>, userid: number) => {
    const database = await databasePromise;

    if (database) {
        await database.runAsync('DELETE FROM user WHERE id = $value', { $value: userid });
        console.log("delete good");
    } else {
        console.error('Database is null, table not opened');
    }
};

export const logUserData = async (databasePromise: Promise<SQLite.SQLiteDatabase | null>) => {
    const database = await databasePromise;

    if (database) {
        const firstRow = await database.getFirstAsync('SELECT * FROM user') as UserType;
        console.log(firstRow.id, firstRow.username, firstRow.password);
        console.log("good data");
    } else {
        console.error('Database is null, table not opened');
    }
};

export const logUserByUsername = async (databasePromise: Promise<SQLite.SQLiteDatabase | null>, username: string) => {
    const database = await databasePromise;

    if (database) {
        const firstRow = await database.getFirstAsync('SELECT * FROM user WHERE username = $value', {$value: username}) as UserType;
        console.log(firstRow.id, firstRow.username, firstRow.password);
        console.log("good data");
    } else {
        console.error('Database is null, table not opened');
    }
};

export const checkUserByUsername = async (databasePromise: Promise<SQLite.SQLiteDatabase | null>, username: string): Promise<string | null> => {
    const database = await databasePromise;

    if (database) {
        const firstRow = await database.getFirstAsync('SELECT * FROM user WHERE username = $value', {$value: username}) as UserType;
        if (firstRow) {
            console.log(firstRow.id, firstRow.username, firstRow.password);
            console.log("good data");
            return firstRow.username;
        } else {
            return null;
        }
    } else {
        console.error('Database is null, table not opened');
        return null;
    }
};

export const getPasswordByUsername = async (databasePromise: Promise<SQLite.SQLiteDatabase | null>, username: string): Promise<string | null> => {
    const database = await databasePromise;

    if (database) {
        const firstRow = await database.getFirstAsync('SELECT * FROM user WHERE username = $value', {$value: username}) as UserType;
        if (firstRow) {
            return firstRow.password;
        } else {
            return null;
        }
    } else {
        console.error('Database is null, table not opened');
        return null;
    }
};

export const getUserIdByUsername = async (databasePromise: Promise<SQLite.SQLiteDatabase | null>, username: string): Promise<number> => {
    const database = await databasePromise;

    if (database) {
        const firstRow = await database.getFirstAsync('SELECT * FROM user WHERE username = $value', {$value: username}) as UserType;
        if (firstRow) {
            return firstRow.id;
        } else {
            return -1;
        }
    } else {
        console.error('Database is null, table not opened');
        return -1;
    }
};
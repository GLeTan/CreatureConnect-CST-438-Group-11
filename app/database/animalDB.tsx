import * as SQLite from 'expo-sqlite';

type FavoriteType = {
    id: number;
    animalName: string;
    comment: string;
    rating: number;

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

export const openFavoriteTable = async (databasePromise: Promise<SQLite.SQLiteDatabase | null>) => {
    try {
        const database = await databasePromise;

        if (database) {
            database.runAsync(`PRAGMA journal_mode = WAL`);
            database.runAsync(`CREATE TABLE IF NOT EXISTS favorite (
          id INTEGER PRIMARY KEY NOT NULL,
          animalName TEXT NOT NULL,
          comment TEXT NOT NULL,
          rating INTEGER,
          userId INTEGER
      );`);
            console.log('Table opened successfully');
        } else {
            console.error('Database is null, table not opened');
        }


    } catch (error) {
        console.error('Error in openTable function', error);
    }
};

export const insertFavoriteData = async (databasePromise: Promise<SQLite.SQLiteDatabase | null>, animalName: string,
     comment: string, rating: number, userId: number) => {
    const database = await databasePromise;

    if (database) {
        const statement = await database.prepareAsync(
            'INSERT INTO favorite (animalName, comment, rating, userId) VALUES ($name, $comm, $rate, $ID)'
        );

        try {
            let result = await statement.executeAsync({ $name: animalName, $comm: comment, $rate: rating, $ID: userId });
            console.log("name: " + animalName + " | comm: " + comment + " rate: " + rating + " id: " + userId + " ",
                result.lastInsertRowId, result.changes);

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

export const deleteFavoriteData = async (databasePromise: Promise<SQLite.SQLiteDatabase | null>, favoriteid: number) => {
    const database = await databasePromise;

    if (database) {
        await database.runAsync('DELETE FROM favorite WHERE id = $value', { $value: favoriteid });
        console.log("delete good");
    } else {
        console.error('Database is null, table not opened');
    }

};

export const getFavortiesByUserId = async (databasePromise: Promise<SQLite.SQLiteDatabase | null>, userId: number): Promise<FavoriteType[] | null> => {
    const database = await databasePromise;

    if (database) {
        const allRows = await database.getAllAsync('SELECT * FROM favorite WHERE animal = $value', {$value: userId}) as FavoriteType[];
        if (allRows) {
            return allRows;
        } else {
            return null;
        }
    } else {
        console.error('Database is null, table not opened');
        return null;
    }
};


import { openDatabase, openFavoriteTable, insertFavoriteData, deleteFavoriteData, getFavortiesByUserId } from '@/app/database/animalDB';
import * as SQLite from 'expo-sqlite';

jest.mock('expo-sqlite');

describe('Database Tests', () => {
    let mockDatabase: SQLite.SQLiteDatabase;

    beforeEach(() => {
        mockDatabase = {
            exec: jest.fn(),
            runAsync: jest.fn(),
            prepareAsync: jest.fn(),
            getAllAsync: jest.fn(),
        } as unknown as SQLite.SQLiteDatabase;
        
        (SQLite.openDatabaseAsync as jest.Mock).mockResolvedValue(mockDatabase);
    });

    test('should open the database successfully', async () => {
        const db = await openDatabase();
        expect(db).toBe(mockDatabase);
        expect(SQLite.openDatabaseAsync).toHaveBeenCalledWith('CreatureDatabase');
    });

    test('should create favorite table', async () => {
        await openFavoriteTable(Promise.resolve(mockDatabase));
        expect(mockDatabase.runAsync).toHaveBeenCalledWith('PRAGMA journal_mode = WAL');
        expect(mockDatabase.runAsync).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS favorite'));
    });

    test('should insert favorite data', async () => {
        const mockStatement = {
            executeAsync: jest.fn().mockResolvedValue({ lastInsertRowId: 1, changes: 1 }),
            finalizeAsync: jest.fn(),
        };
        
        (mockDatabase.prepareAsync as jest.Mock).mockResolvedValue(mockStatement);
        
        await insertFavoriteData(Promise.resolve(mockDatabase), 'Lion', 'King of Jungle', "image_url", 1);
        
        expect(mockDatabase.prepareAsync).toHaveBeenCalledWith(
            'INSERT INTO favorite (animalName, summary, imageUrl, userId) VALUES ($name, $summary, $imageUrl, $ID)'
        );
        expect(mockStatement.executeAsync).toHaveBeenCalledWith({ $name: 'Lion', $summary: 'King of Jungle', $imageUrl: "image_url", $ID: 1 });
        expect(mockStatement.finalizeAsync).toHaveBeenCalled();
    });

    test('should delete favorite data by id', async () => {
        await deleteFavoriteData(Promise.resolve(mockDatabase), 1);
        expect(mockDatabase.runAsync).toHaveBeenCalledWith('DELETE FROM favorite WHERE id = $value', { $value: 1 });
    });

    test('should fetch favorites by userId', async () => {
        const mockFavorites = [
            { id: 1, animalName: 'Lion', summary: 'King of Jungle', comment: "image_url", userId: 1 },
        ];
        
        (mockDatabase.getAllAsync as jest.Mock).mockResolvedValue(mockFavorites);

        const result = await getFavortiesByUserId(Promise.resolve(mockDatabase), 1);
        expect(mockDatabase.getAllAsync).toHaveBeenCalledWith('SELECT * FROM favorite WHERE userId = $value', { $value: 1 });
        expect(result).toEqual(mockFavorites);
    });
});

// __tests__/userDB.test.tsx
import { openDatabase, insertUserData, logUserData, openUserTable, deleteUserData } from '@/app/database/userDB'; 
import * as SQLite from 'expo-sqlite';

// Mock SQLite functions
jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn(),
  SQLiteDatabase: jest.fn(),
}));

describe('User Database Tests', () => {
  let mockDatabase: SQLite.SQLiteDatabase;

  beforeEach(() => {
    // Mock the SQLite database object
    mockDatabase = {
      runAsync: jest.fn(),
      prepareAsync: jest.fn(),
      getFirstAsync: jest.fn(),
    } as unknown as SQLite.SQLiteDatabase; // Type assertion to treat it as SQLiteDatabase;
    // SQLite.openDatabaseAsync.mockResolvedValue(mockDatabase);
    (SQLite.openDatabaseAsync as jest.Mock).mockResolvedValue(mockDatabase);
  });

  test('opens the database successfully', async () => {
    const database = await openDatabase();
    expect(SQLite.openDatabaseAsync).toHaveBeenCalledWith('CreatureDatabase');
    expect(database).toBe(mockDatabase);
  });

  test('inserts user data successfully', async () => {
    const statementMock = {
      executeAsync: jest.fn().mockResolvedValue({ lastInsertRowId: 1, changes: 1 }),
      finalizeAsync: jest.fn(),
    };
    // mockDatabase.prepareAsync.mockResolvedValue(statementMock);
    mockDatabase.prepareAsync = jest.fn().mockResolvedValue(statementMock);

    await insertUserData(Promise.resolve(mockDatabase), 'john_doe', 'password123');

    expect(mockDatabase.prepareAsync).toHaveBeenCalledWith(
      'INSERT INTO user (username, password) VALUES ($name, $pass)'
    );
    expect(statementMock.executeAsync).toHaveBeenCalledWith({
      $name: 'john_doe',
      $pass: 'password123',
    });
    expect(statementMock.finalizeAsync).toHaveBeenCalled();
  });

  test('logs user data', async () => {
    // mockDatabase.getFirstAsync.mockResolvedValue({ id: 1, username: 'john_doe', password: 'password123' });
    mockDatabase.getFirstAsync = jest.fn().mockResolvedValue({
        id: 1,
        username: 'john_doe',
        password: 'password123',
      });

    const consoleSpy = jest.spyOn(console, 'log');
    await logUserData(Promise.resolve(mockDatabase));

    expect(mockDatabase.getFirstAsync).toHaveBeenCalledWith('SELECT * FROM user');
    expect(consoleSpy).toHaveBeenCalledWith(1, 'john_doe', 'password123');
  });

  test('deletes user data successfully', async () => {
    await deleteUserData(Promise.resolve(mockDatabase), 1);
    expect(mockDatabase.runAsync).toHaveBeenCalledWith('DELETE FROM user WHERE id = $value', { $value: 1 });
  });
});

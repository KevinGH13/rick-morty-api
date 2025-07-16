import { Sequelize } from "sequelize";

export interface DatabaseConfig {
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mssql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging?: boolean;
  timezone?: string;
  pool?: {
    max?: number;
    min?: number;
    acquire?: number;
    idle?: number;
  };
}

export const databaseConfig: DatabaseConfig = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'my_database',
  logging: process.env.DB_LOGGING === 'true',
  timezone: process.env.DB_TIMEZONE || '+00:00',
  pool: {
    max: parseInt(process.env.DB_POOL_MAX || '5', 10),
    min: parseInt(process.env.DB_POOL_MIN || '0', 10),
    acquire: parseInt(process.env.DB_POOL_ACQUIRE || '30000', 10),
    idle: parseInt(process.env.DB_POOL_IDLE || '10000', 10),
  },
};

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private _sequelize: Sequelize;

  private constructor() {
    this._sequelize = new Sequelize(
      databaseConfig.database,
      databaseConfig.username,
      databaseConfig.password,
      {
        host: databaseConfig.host,
        port: databaseConfig.port,
        dialect: databaseConfig.dialect,
        logging: databaseConfig.logging,
        timezone: databaseConfig.timezone,
        pool: databaseConfig.pool,
      }
    )
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect() {
    return await this._sequelize.authenticate()
      .then(() => {
        console.log('Database connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  }

  public async disconnect() {
    return await this._sequelize.close()
      .then(() => {
        console.log('Database connection has been closed successfully.');
      })
      .catch(err => {
        console.error('Error closing the database connection:', err);
      });
  }

  public get sequelize(): Sequelize {
    return this._sequelize;
  }

  public async sync(options?: { force?: boolean; alter?: boolean }): Promise<void> {
    try {
      await this._sequelize.sync(options);
      console.log('Database synchronized successfully');
    } catch (error) {
      console.error('Error synchronizing database:', error);
      throw error;
    }
  }
}
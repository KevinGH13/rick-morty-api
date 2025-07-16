import { DatabaseConnection } from "./database";

async function bootstrapDatabase() {
  try {
    const dbConnection = DatabaseConnection.getInstance();
    await dbConnection.connect();

    if (process.env.NODE_ENV === 'DEV') {
      await dbConnection.sync({ alter: true });
    }

    console.log('Database connection established and synchronized successfully.');
  } catch (error) {
    console.error('Error during database connection or synchronization:', error);
    process.exit(1);
  }
}

bootstrapDatabase();
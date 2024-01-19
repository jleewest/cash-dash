import { Sequelize } from "sequelize";

// Determine if the environment is production
const isProduction = process.env.NODE_ENV === 'production';

// Set database credentials
const dbUsername = isProduction ? process.env.DB_USERNAME : (process.env.DB_USERNAME || 'postgres');
const dbPassword = isProduction ? process.env.DB_PASSWORD : (process.env.DB_PASSWORD || 'postgres');
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432; // Default to 5432 if not set

// Ensure that credentials are set in production
if (isProduction && (!dbUsername || !dbPassword)) {
  throw new Error("Database username and password must be set in production.");
}

const sequelize = new Sequelize(
  'cash_dash', //Database name
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: 'localhost',
    dialect: 'postgres',
    port: dbPort,
    logging: false,
  }
);

//Database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;

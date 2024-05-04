export const AppConfig = () => ({
  port: parseInt(process.env.PORT) || 3001,
  database: {
    connectionString: process.env.DB_CONNECTION_STRING,
    login: process.env.MONGO_LOGIN,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    name: process.env.MONGO_DB_NAME,
  },
  mode: process.env.NODE_ENV || 'development',
});

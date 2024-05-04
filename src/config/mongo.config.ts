import { ConfigService } from '@nestjs/config';

export const MongoConfig = async (configService: ConfigService) => ({
  uri: getMongoString(configService),
  ...getMongoOptions(),
});

const getMongoString = (configService: ConfigService) => {
  const connectionString = configService.get<string | undefined>(
    'database.connectionString',
  );

  if (!connectionString) {
    const dbLogin = configService.get('database.login');
    const dbPass = configService.get('database.password');

    const formedConnectionString =
      'mongodb://' +
      (dbLogin && dbPass ? `${dbLogin}:${dbPass}@` : '') +
      configService.get('database.host') +
      ':' +
      configService.get('database.port') +
      '/' +
      configService.get('database.name');

    return formedConnectionString;
  }

  return connectionString;
};

const getMongoOptions = () => ({});

import path from 'path';s

const config = {
  mongodb: {
    databaseName: process.env.MONGO_DB,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationFileExtension: '.js',
  changelogCollectionName: 'changelog',
  migrationsDir: path.resolve(path.dirname("RentCar2022"), 'db', 'migrations')
};

export default config;

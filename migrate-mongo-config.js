const path = require('path');

const config = {
  mongodb: {
    databaseName: 'rom-car',
    url: 'mongodb://127.0.0.1:27017/',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationFileExtension: '.js',
  changelogCollectionName: 'changelog',
  migrationsDir: path.resolve(__dirname, 'db', 'migrations')
};

module.exports = config;

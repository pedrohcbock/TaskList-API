module.exports = {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tasksdb',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  };
  
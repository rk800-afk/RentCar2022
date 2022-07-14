import './connection.mjs';
import { up, database } from 'migrate-mongo';

const emptyFn = () => null;

async function bootstrap(callback = emptyFn) {
  const { db, client } = await database.connect();

  await up(db, client);

  callback();
}

export default bootstrap;
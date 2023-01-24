import { MARIADB_CONNECTION } from "../index.js";

const connectionMariaDB = {
  client: 'mysql',
  connection: MARIADB_CONNECTION,
  pool: { min: 0, max: 7 },
};

export default connectionMariaDB;

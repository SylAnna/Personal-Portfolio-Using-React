const { Client, Pool } = require("pg");

// This file handles all of the PostgreSQL setup and connection code.
// Keeping it separate makes the route files easier to read.
let pool;

// I wrap the database name in quotes before using it in CREATE DATABASE.
// This helps prevent problems if the name has unusual characters.
function safeName(name) {
  return `"${String(name).replace(/"/g, '""')}"`;
}

function getDbInfo() {
  // This function figures out how to connect to PostgreSQL.
  // It supports a full DATABASE_URL or separate PGHOST/PGUSER/etc. variables.

  // If DATABASE_URL exists, use that full connection string.
  // Render gives this to the deployed backend, and my local .env can also have one.
  if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    // The database name is the last part of the URL.
    const databaseName = decodeURIComponent(url.pathname.replace("/", "")) || "portfolio";
    const postgresUrl = new URL(process.env.DATABASE_URL);

    // To create/check the app database, connect to the default postgres database first.
    postgresUrl.pathname = "/postgres";

    return {
      databaseName,
      // appConfig connects to the actual portfolio database.
      appConfig: {
        connectionString: process.env.DATABASE_URL,
      },
      // postgresConfig connects to the default postgres database so the app DB can be created/checked.
      postgresConfig: {
        connectionString: postgresUrl.toString(),
      },
    };
  }

  const hasPgInfo =
    process.env.PGHOST ||
    process.env.PGPORT ||
    process.env.PGUSER ||
    process.env.PGPASSWORD ||
    process.env.PGDATABASE;

  if (!hasPgInfo) {
    // If none of the database settings exist, the backend cannot know where PostgreSQL is.
    throw new Error("Missing PostgreSQL configuration.");
  }

  // If there is no DATABASE_URL, I build the connection from separate PG variables instead.
  const databaseName = process.env.PGDATABASE || "portfolio";
  const baseConfig = {
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT || 5432),
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "",
  };

  return {
    databaseName,
    // This is the connection the app uses for normal queries after the database exists.
    appConfig: {
      ...baseConfig,
      database: databaseName,
    },
    // This connection is only for checking/creating the database itself.
    postgresConfig: {
      ...baseConfig,
      database: "postgres",
    },
  };
}

function getPool() {
  if (!pool) {
    // The first time the app needs the database, make one pool and reuse it.
    // That is better than opening a brand new database connection for every request.
    const db = getDbInfo();
    pool = new Pool(db.appConfig);
  }

  // Return the same pool every time so routes can run SQL queries.
  return pool;
}

async function createDatabase() {
  // This part checks whether the portfolio database exists, and creates it if it does not.
  const db = getDbInfo();
  const client = new Client(db.postgresConfig);

  await client.connect();

  try {
    // This query checks PostgreSQL's database list to see if my database already exists.
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [db.databaseName]
    );

    if (result.rowCount === 0) {
      // Only create the database when the check above did not find it.
      await client.query(`CREATE DATABASE ${safeName(db.databaseName)}`);
    }
  } finally {
    await client.end();
  }
}

async function initDb() {
  // initDb runs when the server starts. First it makes sure the database exists, then it makes sure the table exists.
  await createDatabase();

  // After the database exists, I make sure the table for contact messages exists too.
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(320) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

module.exports = {
  getPool,
  initDb,
};

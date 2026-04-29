const { Client, Pool } = require("pg");

let pool;

function safeName(name) {
  return `"${String(name).replace(/"/g, '""')}"`;
}

function getDbInfo() {
  if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    const databaseName = decodeURIComponent(url.pathname.replace("/", "")) || "portfolio";
    const postgresUrl = new URL(process.env.DATABASE_URL);

    postgresUrl.pathname = "/postgres";

    return {
      databaseName,
      appConfig: {
        connectionString: process.env.DATABASE_URL,
      },
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
    throw new Error("Missing PostgreSQL configuration.");
  }

  const databaseName = process.env.PGDATABASE || "portfolio";
  const baseConfig = {
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT || 5432),
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "",
  };

  return {
    databaseName,
    appConfig: {
      ...baseConfig,
      database: databaseName,
    },
    postgresConfig: {
      ...baseConfig,
      database: "postgres",
    },
  };
}

function getPool() {
  if (!pool) {
    const db = getDbInfo();
    pool = new Pool(db.appConfig);
  }

  return pool;
}

async function createDatabase() {
  const db = getDbInfo();
  const client = new Client(db.postgresConfig);

  await client.connect();

  try {
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [db.databaseName]
    );

    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE ${safeName(db.databaseName)}`);
    }
  } finally {
    await client.end();
  }
}

async function initDb() {
  await createDatabase();

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

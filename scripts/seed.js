const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

const {
  users,
  clients,
  cases,
  contributors,
} = require('../app/lib/placeholder-data.js');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedClients(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "clients" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS clients (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE
      );
    `;

    console.log(`Created "clients" table`);

    // Insert data into the "clients" table
    const insertedClients = await Promise.all(
      clients.map((client) =>
        client.sql`
          INSERT INTO clients (id, name, email)
          VALUES (${client.id}, ${client.name}, ${client.email})
          ON CONFLICT (id) DO NOTHING;
        `
      ),
    );

    console.log(`Seeded ${insertedClients.length} clients`);

    return {
      createTable,
      clients: insertedClients,
    };
  } catch (error) {
    console.error('Error seeding clients:', error);
    throw error;
  }
}

async function seedCases(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "cases" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS cases (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        file VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL,
        client_id UUID REFERENCES clients(id)
      );
    `;

    console.log(`Created "cases" table`);

    // Insert data into the "cases" table
    const insertedCases = await Promise.all(
      cases.map((cas) =>
        client.sql`
          INSERT INTO cases (id, title, file, status, client_id)
          VALUES (${cas.id}, ${cas.title}, ${cas.file}, ${cas.status}, ${cas.client_id})
          ON CONFLICT (id) DO NOTHING;
        `
      ),
    );

    console.log(`Seeded ${insertedCases.length} cases`);

    return {
      createTable,
      cases: insertedCases,
    };
  } catch (error) {
    console.error('Error seeding cases:', error);
    throw error;
  }
}

async function seedContributors(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "contributors" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS contributors (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "contributors" table`);

    // Insert data into the "contributors" table
    const insertedContributors = await Promise.all(
      contributors.map((contributor) =>
        client.sql`
          INSERT INTO contributors (id, name)
          VALUES (${contributor.id}, ${contributor.name})
          ON CONFLICT (id) DO NOTHING;
        `
      ),
    );

    console.log(`Seeded ${insertedContributors.length} contributors`);

    return {
      createTable,
      contributors: insertedContributors,
    };
  } catch (error) {
    console.error('Error seeding contributors:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedClients(client);
  await seedCases(client);
  await seedContributors(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
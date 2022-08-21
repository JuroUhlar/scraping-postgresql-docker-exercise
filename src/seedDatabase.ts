import pg from 'pg';
import fs from 'fs';
import { Flat } from './types';

export const seedDatabase = async (client: pg.Client) => {
  // Create table if necessary
  const result = await client.query(
    `CREATE TABLE IF NOT EXISTS "flats" ("id" SERIAL, "name" VARCHAR(300) NOT NULL, "price" VARCHAR(300) NOT NULL, "location" VARCHAR(300) NOT NULL, "images" VARCHAR(2000) NOT NULL, PRIMARY KEY ("id"));`,
  );
  if (result) {
    console.log('Table created or already exists.');
  }

  const flats = await client.query('SELECT * from flats;');
  if (flats.rows.length === 0) {
    let flatData = JSON.parse(fs.readFileSync('data/flats.json', { encoding: 'utf8' })) as Flat[];

    flatData.forEach(async ({ name, location, price, imgUrls }, index) => {
      await client.query(
        'INSERT INTO flats (name, price, location, images) VALUES ($1, $2, $3, $4)',
        [name, price, location, JSON.stringify(imgUrls)],
        (error) => {
          if (error) {
            console.log(error);
          }
          console.log(`Flat n. ${index + 1} added to database`);
        },
      );
    });
  }
};

import { seedDatabase } from './seedDatabase.js';
import express from 'express';
import bodyParser from 'body-parser';
import { Flat, FlatDb } from './types';
import pg from 'pg';
const { Client } = pg;

// psql -h localhost -p 5432 -U postgres

const PAGE_SIZE = 20;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

const client = new Client({
  password: 'postgres',
  user: 'postgres',
  host: 'postgres',
});

app.get('/:page?', async (req, res) => {
  let pageOffset = req.params.page ? (Number(req.params.page) - 1) * PAGE_SIZE : 0;
  const response = await client.query(`SELECT * from flats LIMIT ${PAGE_SIZE} OFFSET ${pageOffset};`);
  const flats = response.rows as FlatDb[];

  res.send({
    flats: flats.map((flat) => ({
      id: flat.id,
      name: flat.name,
      price: flat.price,
      location: flat.location,
    })),
  });
});

app.post('/flat', async (req, res) => {
  const { name, location, price, imgUrls }: Flat = req.body;
  // `INSERT INTO flats (name, price, location, images) VALUES('Dom', '3 000 000 Kč', 'Praha', '["imageUrl.test.com"]');`;
  await client.query(
    'INSERT INTO flats (name, price, location, images) VALUES ($1, $2, $3, $4)',
    [name, price, location, imgUrls.toString()],
    (error) => {
      if (error) {
        res.status(400).send('Malformed request');
        throw error;
      }
      res.status(201).send('Flat added');
    },
  );
});

(async () => {
  await client.connect();
  await seedDatabase(client);

  app.listen(PORT, () => {
    console.log('Started at http://localhost:%d', PORT);
  });
})();

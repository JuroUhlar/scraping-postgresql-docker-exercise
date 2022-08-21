import { seedDatabase } from './seedDatabase.js';
import express from 'express';
import bodyParser from 'body-parser';
import { Flat } from './types';
import pg from 'pg';
const { Client } = pg;

// psql -h localhost -p 5432 -U postgres

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

const client = new Client({
  password: 'postgres',
  user: 'postgres',
  host: 'postgres',
});

app.get('/', async (req, res) => {
  const users = await client.query('SELECT * from flats;');

  console.log('Get');

  res.send({
    flats: users.rows,
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

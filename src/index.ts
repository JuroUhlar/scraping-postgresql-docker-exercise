import { seedDatabase } from './seedDatabase.js';
import express from 'express';
import bodyParser from 'body-parser';
import { Flat, FlatDb } from './types';
import pg from 'pg';
import { renderPage } from './pageTemplate.js';
const { Client } = pg;

// psql -h localhost -p 5432 -U postgres

const PAGE_SIZE = 20;
const N_APARTMENTS = 500;
const N_PAGES = N_APARTMENTS / PAGE_SIZE;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(bodyParser.json());

const PORT = 3000;

const client = new Client({
  password: 'postgres',
  user: 'postgres',
  host: 'postgres',
});

app.get('/:page?', async (req, res) => {
  const page: number = req.params.page ? Number(req.params.page) : 1;
  let pageOffset = (page - 1) * PAGE_SIZE;
  const response = await client.query(`SELECT * from flats LIMIT ${PAGE_SIZE} OFFSET ${pageOffset};`);
  const flatsDb = response.rows as FlatDb[];
  const flats: Flat[] = flatsDb.map((flat) => ({ ...flat, imgUrls: JSON.parse(flat.images) }));

  res.send(renderPage(flats, page));
});

app.post('/flat', async (req, res) => {
  const { name, location, price, imgUrls }: Flat = req.body;
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

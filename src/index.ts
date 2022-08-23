import {seedDatabase} from './seedDatabase.js';
import express from 'express';
import bodyParser from 'body-parser';
import {Flat, FlatDb} from './types';
import pg from 'pg';
import {renderPage} from './pageTemplate.js';
const {Client} = pg;

const PAGE_SIZE = 20;
const N_APARTMENTS = 500;
const N_PAGES = N_APARTMENTS / PAGE_SIZE;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(bodyParser.json());

const PORT = 8080;

const client = new Client({
  password: 'postgres',
  user: 'postgres',
  host: 'postgres',
});

app.get('/:page?', async (req, res) => {
  console.log("get, page", req.params.page);
  const page: number = req.params.page ? Number(req.params.page) : 1;

  if (Number.isNaN(page)) {
    res.status(404).send("Page not found");
    return;
  }

  let pageOffset = (page - 1) * PAGE_SIZE;

  try {
    const response = await client.query(`SELECT * from flats LIMIT ${PAGE_SIZE} OFFSET ${pageOffset};`);
    const flatsDb = response.rows as FlatDb[];
    const flats: Flat[] = flatsDb.map((flat) => ({...flat, imgUrls: JSON.parse(flat.images)}));
    res.send(renderPage(flats, page));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }

});

app.post('/flat', async (req, res) => {
  const {name, location, price, imgUrls}: Flat = req.body;
  try {
    await client.query(
      'INSERT INTO flats (name, price, location, images) VALUES ($1, $2, $3, $4)',
      [name, price, location, imgUrls.toString()]
    );
    res.status(201).send('Flat added');
  } catch (error) {
    console.log(error);
    res.status(400).send(`Malformed request, ${error}`,);
  }
});

(async () => {
  await client.connect();
  await seedDatabase(client);

  app.listen(PORT, () => {
    console.log('Started at http://localhost:%d', PORT);
  });
})();

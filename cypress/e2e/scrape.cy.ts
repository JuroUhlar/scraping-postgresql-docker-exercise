import { Flat } from '../../src/types';

const nOfFlats = 500;
const flatsPerPage = 20;
const nPages = nOfFlats / flatsPerPage;

describe('Scraping Sreality for flat listings', () => {
  const results: Flat[] = [];

  for (let i = 1; i <= nPages; i++) {
    it(`page ${i}`, () => {
      cy.visit(`https://www.sreality.cz/en/search/for-sale/apartments?page=${i}`);

      cy.get('.dir-property-list > .property').each((flat) => {
        const name = flat.find('span.name').text();
        const price = flat.find('span.norm-price').text();
        const location = flat.find('span.locality').text();
        const imgUrls: string[] = [];
        flat.find('a > img').each((i, img) => {
          imgUrls.push(img.getAttribute('src') || '');
        });
        results.push({ imgUrls, name, price, location });
      });
    });
  }

  it('print results', () => {
    cy.log('Scraped flats: ', results.length);
    console.log(results);
    cy.writeFile('./data/flats.json', results, 'utf-8');
  });
});

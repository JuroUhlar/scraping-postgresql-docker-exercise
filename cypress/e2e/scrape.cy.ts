import { Flat } from '../../src/types';

describe('Scraping Sreality', () => {
  it('for flat listings', () => {
    const results: Flat[] = [];

    cy.visit('https://www.sreality.cz/en/search/for-sale/apartments');

    cy.get('.dir-property-list > .property')
      .each((flat) => {
        const name = flat.find('span.name').text();
        const price = flat.find('span.norm-price').text();
        const location = flat.find('span.locality').text();
        const imgUrls: string[] = [];
        flat.find('a > img').each((i, img) => {
          imgUrls.push(img.getAttribute('src') || '');
        });
        results.push({ imgUrls, name, price, location });
      })
      .then(() => {
        console.log(results);
      });
  });
});

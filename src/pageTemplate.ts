import { Flat } from './types';

const N_PAGES = 25;

const paging = (page: number) => {
  return `
    ${page - 1 > 0 ? `<a href="/${page - 1}">Previous page</a>` : ''}
    ${page + 1 <= N_PAGES ? `<a href="/${page + 1}">Next page</a>` : ''}
  `;
};

export const renderPage = (flats: Flat[], page: number): string => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="index.css">
        <title>Flats for sale</title>
    </head>
    <body>
        <h1>Flats for sale</h1>
        <p>Test</p>

        ${paging(page)}
        <div class="container">
          ${flats
            .map((flat) => {
              return `
                  <div class="flat">
                      <span class="name">${flat.name}</span>
                      <span class="price">${flat.price}</span>
                      <p class="location">${flat.location}</p>
                      <p class="location">${flat.imgUrls[0]}</p>
                  </div>
              `;
            })
            .join('')}
        </div>
        ${paging(page)}
    </body>
    </html>
  `;
};

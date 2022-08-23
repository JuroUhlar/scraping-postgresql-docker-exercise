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
      <div class="pageContainer">
        <h1>🏠 Flats for sale</h1>
        ${paging(page)}
        <div class="container">
          ${flats
            .map((flat) => {
              return `
                  <div class="flat">
                      <img class="flatImage" src="${flat.imgUrls[0]}" />
                      <div class="text"> 
                        <div class="name">${flat.name}</div>
                        <div class="location">🗺️ ${flat.location}</div>
                        <div class="price">💰 ${flat.price}</div>
                      </div>
                  </div>
              `;
            })
            .join('')}
        </div>
        ${paging(page)}
      </div>
    </body>
    </html>
  `;
};

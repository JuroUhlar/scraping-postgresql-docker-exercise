# scraping-postgresql-docker Exercise

- [x] Scrape the first 500 items (title, image url) from sreality.cz (flats, sell - you can switch the web to English)
- [x] and save it in the Postgresql database.  
- [x] Implement a simple HTTP server (or use Nginx) and show these 500 items
- [x] on a nice page (with pagination) which will use your own design
- [x] and put everything to single docker-compose command so that I can just run "docker-compose up" in the Github repository and see the scraped ads on http://127.0.0.1:8080 page. 

Use Typescript for implementation.

## How to run

```
git clone https://github.com/JuroUhlar/scraping-postgresql-docker-exercise.git
cd scraping-postgresql-docker-exercise.git
sudo docker-compose up
```

### Other commands

* scrape flats again: `yarn scrape-flats`
* Connect to db with psql: `psql -h localhost -p 5432 -U postgres` (pass: postgres)
* Reset db: `sudo rm -rf pgdata`

##  Notes & Lessons

* Used Cypress for scraping. Something more lightweight would likely suffice here, but just in case we needed to interact with the page (not just parse markup) I went with Cypress. It's also the tool I am familiar with.
* I saved the data into a single `flats` table, serializing the array of image URLs into a single string for simplicity. In the real world, you would probably want a separate table for that.
* For the web server, I wrote a simple Express.js app. I couldn't get `ejs` to play nice with TypeScript, so I wrote the html by hand. Obviously, for anything larger you would want to use a proper templating engine. Or use a full-stack framework like Next.js, which I considered but the assignment calls for keeping things simple.
* Most of the difficulties came from setting up Postgres with `docker-compose`, which I didn't have any authoring experience with. I considered side-steping the problem by using a hosted Postrgres instance (use the path of least resistance) but I though it might be against the spirit of the exercise (struggle with solving novel problems). I made it work in the end, though it probably could be more elegant. I didn't have a second machine to test it on, so I hope it works 🤞. If not, let me know, I will try to fix it or host the application somewhere.

## Potential further improvements

* Corousel to see all images available.
* Location links to Google Maps.
* Basic sorting/filtering/search.
* Each flat has indidual view with more information.
* Make navigating between pages more smooth (switch to client-side navigation after initial load).
* Make layout less jumpy as images come in.
* Improve accesibility.
* Pagination should show current page.
* Add a form to add apartments into the database.



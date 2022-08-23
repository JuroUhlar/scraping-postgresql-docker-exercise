# scraping-postgresql-docker Exercise

- [x] Scrape the first 500 items (title, image url) from sreality.cz (flats, sell - you can switch the web to English)
- [x] and save it in the Postgresql database.  
- [x] Implement a simple HTTP server (or use Nginx) and show these 500 items
- [ ] on a nice page (with pagination) which will use your own design
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



Quizereedoo 

Quizereedoo is a full stack web based quiz application using Node, Express, Postgres, jQuery amd Ajax. 

=========
## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Cookie session 2.0 or above
- Bcrypt 2.4.3 or above
- Chalk 2.0.0 or above
- Ajax 0.0.4 
- Express 4.17.1 
- Ejs 2.6.2 or above
- Dotenv 2.0.0
- Morgan 1.9.1 or above
- Sass 1.35.1 or above

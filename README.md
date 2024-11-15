# Erino Contact CRM

The Contact Management feature allows users to efficiently track and manage customer/client contact information. Users can add, view, update, and delete contacts, keeping all details organized in one place. This is especially useful in business settings to maintain and update relationships, saving time and ensuring easy access to contact information.

## Tech Stack
#### Backend:
Node.js, Express, Postgres, NeonDB, Prisma, Zod
#### Frontend:
React, MUI
#### Language:
TypeScript

## Working
#### Dashboard
An axios request is sent to the get api to retrieve all the contacts and is displayed in a tabular form in the frontend.

#### Vertical Kebab Bar
Implemented it for every record so that each and every record can be updated and deleted.

#### Update & Delete
A popup is implemented which shows current data which can be edited and updated. Also on clicking delete menu icon deletes the data.

#### Context API
Created a user context to manage states such as current error, reload status etc. It helps to reload the current contacts whenever there is a change in database and show current errors from any component.

## Challenges And Outcomes
//- First challenge of building this project was to choose a tech stack, I wanted to make this project as efficient as possible so I chose Typescript as my go to language, since it provides type safety. Thus I configured the ts.config.json.

//- I started building backend by using the concept of separation of concerns and implemented a file structure containing controllers, routes, validation (for types) and utils.

//- I had to build four routes which was pretty easy, thus I implemented some middlewares and started my server using express.

//- Next I connected my database by getting a database url from neondb, you will get to know why I chose postgres, in upcoming section. I setup my prisma file and created a Contact Model, then migrated my database.

//- Implemented functions, and handled errors, the major challenge here was to define types for various kind of data, thus I used zod and inferred types from it.

//- After building all the api's and testing them using Postman, I started implementing frontend for the website.

//- I revised my concepts on MUI and started implementing a design for the website which was quiet challenging, I took some inspirations from here and there and then finalised the design.

//- Worked on the design and implemented various features in which MUI helped a lot, connected to API end points using axios, and implemented error handling using MUI snackbar.

##### Major challenge was to configure types and thinking about the design.


## Run Project

Use the package manager [npm](https://github.com/npm/cli) to install.

Backend:-

```bash
cd backend
npm install
#if typescript is not installed
npm install -g typescript
npx tsc
#compile ts to js
npm run dev
#If you want to use your own database then migrate
npx prisma migrate dev --name init
npm start
```
Environment Variables :- Database and PORT, shared via mail

Frontend:-

```bash
cd frontend
npm install
npm run dev
```

## Why PostGres Over MongoDB
--> Structured Data: PostgreSQL’s relational model allows for well-defined schemas and complex relationships. Thus using a PostGres Database helps in scalability.

--> Complex Queries: PostgreSQL supports advanced SQL queries, including joins and aggregations. It helps in optimizing queries and writing a complex software.

--> Mature Ecosystem: Offers a stable, well-documented database with a rich set of tools. Thus used in many large scale systems.


## License

[MIT](https://choosealicense.com/licenses/mit/)

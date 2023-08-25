# Backend for diploma project : Movies Explorer API from  [Yandex Practicum](https://praktikum.yandex.ru/) Web-developer course.

## Link:
IP: 84.201.128.230 <br>
Backend: [https://api.movies.irina.nomoredomainsicu.ru/](https://api.movies.irina.nomoredomainsicu.ru/) <br>

## Description
Backend for Movies Explorer project with the following features: user registration and authentication, add movies to favorites, list and delete from favorites.
## Functionality:
- Users routes:
    - `GET /users/me` — return user info
    - `PATCH /users/me` — update user info

- Movies routes:
    - `GET /movies` — return all movies added to favorites
    - `DELETE /movies/:_id` — delete movie added to favorites by _id
    - `POST /movies` — create movie with the data provided in the request body:
      - country,
      - director,
      - duration,
      - year,
      - description,
      - image,
      - trailer,
      - thumbnail,
      - movieId,
      - nameRU and nameEN.

- Other routes
    - `POST /signup` - create user with the data provided in the request body
    - `POST /signin` - return JWT if the provided email and password in the request body are correct
    - `GET /signout` - delete JWT from cookies.


## Directories
  `/routes` - folder with routes files <br>
  `/controllers` - folder with controllers files(users&movies) <br>
  `/models` - folder with schemas(user&movie) <br>
  `/utils` - folder with auxiliary files <br>
  `/middlewares` - folder with middlewares <br>
  `/errors` - folder with Error classes that extend the error constructor<br>


## Technologies

- Node.js;
- Express
- MongoDB
- mongoose
- JavaScript:
  - CamelCase style;
  - Common JS modules;
  - Promise, asynchronous functions;

## Usage

Clone repository:

  `git clone git@github.com:IrinaGarmaeva/movies-explorer-api.git`

Install dependencies:

  `npm install`

Run app:

`npm run start` — start server <br>
`npm run dev` — start hot-reload server <br>

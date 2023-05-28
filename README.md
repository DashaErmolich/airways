# Airways

## This is the final project task of the Rolling Scopes School [Angular 2023Q1 Course](https://rs.school/angular/)

## Our team

- [Dasha](https://github.com/DashaErmolich)

- [Evgenii](https://github.com/Sylphur)

- [Oxana](https://github.com/oxxol)
  

## Getting started

### Frontend

- Clone frontend repo

```
git clone https://github.com/DashaErmolich/airways.git
```

- Go to the project folder

```
cd airways/airways
```

- Install ```node modules```

```
npm install
```

- Run json-server and json-server-auth

```
npm run db
```

### Backend

- Clone backend repo

```
git clone https://github.com/DashaErmolich/airways-backend.git
```

- Go to the project folder

```
cd airways-backend
```

- Install ```node modules```

```
npm install
```

- Run server

```
npm start
```

## App usage

- Go to the [Airways App](https://dashaermolich-airways.netlify.app)

- Create your account or use app as anonymous user (not all features are available in this way)

### Notes

- Backed returns random flight data, thats why after flight selection page refresh your receive new data every time
- Adults, child and infant passengers takes seats
- On flight selection page dates carousel disable all dates out of selected dates range (if trip is round). Change dates range start and end values by clicking on carousel or set new values in edit section
- You can go to the next booking process step page only after submit data on previous one

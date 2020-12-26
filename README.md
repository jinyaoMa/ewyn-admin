# ewyn-admin

## Pre-requisite

1. Install [Node.js](https://nodejs.org/en/download/)
2. Extract source code, and you will see following file structure

```
ewyn-admin (project folder)
- bin
- datas
- public
- routes
- src
- ewyn0.20201225.sql (database backup file)
- (...other files)
```

3. Install database with the backup file `ewyn0.20201225.sql`

## Project setup

Once get the source code under project folder, run the following script on shell

```
npm install
```

### For development

Run the following script on shell under project folder

```
npm run front:serve
npm run back:dev
```

### For production

Run the following script on shell under project folder, and wait for message `mysql connncted success!`

```
npm run front:build
npm run back:prod
```

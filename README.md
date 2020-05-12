## Run locally

### Install dependencies

```bash
yarn install
```

### Run migrations
_Setup environment variables in .env_

```bash
yarn typeorm migration:run
```

### Run test

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

### Run the app

```bash
# development
yarn start:dev

# production mode
yarn start:prod
```

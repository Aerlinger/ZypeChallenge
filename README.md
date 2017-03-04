# Zype API Challenge

*Anthony Erlinger*

*3/3/2017*

## Installation

1. Install dependencies
```
bundle && yard
```

2. Configure ENV variables:

Create a .env file in the root folder with the following variables:

```
SECRET_KEY_BASE=<your app secret key>
APP_KEY=<default app key>
ACCESS_TOKEN=<default access token>
CLIENT_ID=<default client id>
CLIENT_SECRET=<default client secret key>
```

## Running the application

```
foreman start -f Procfile.hot
```

To bundle assets for production: `RAILS_ENV=production bundle exec rake assets:precompile`


# Zype API Challenge

*Anthony Erlinger*

*3/3/2017*

*Demo link: https://zype-api-challenge.herokuapp.com/*

## Description

This is a simple client application to demonstrate the Zype API using Rails and ReactJS. Rails serves HTTP, assets, and
performs basic routing. However, for reasons of performance and simplicity, most of the app's behavior and presentation is implemented
client-side using React. API calls are performed asynchronously from the browser using javascript promises, which subsequently inject
the relevant API response data into the component state. This approach serves to decouple behavior (i.e. making the API calls) from the presentation of data while also improving app performance (asynchronous API calls allow the page to load and be
 prerendered while the data from the Zype remote API is received). An additional benefit of this approach is its flexibility when adding additional capabilities such as search, filtering/sorting by some condition, and so on...

User authentication is handled by storing the `access_token` in the brower's local storage after a successful call to the `/oauth/token` endpoint.
There's no database persistence for this app since I did not find it necessary for the scope of this challenge.

Finally, Webpack is used to package and bundle most of our client-side assets. While this does increase the complexity of our app
and add some burden of configuration, it confers several advantages including a much faster build speed when deploying to production, the ability to use hot module reload (HMR)
to reload assets on the fly for a improved development process in the browser, a smaller asset bundle than we would otherwise
get from the Rails asset pipeline, as well as the ability to transpile future implementations of javascript, sass and other modules into a common bundle. 

## App Organization

**Main Service objects to make API calls:**

- [ZypeVideosApi](./client/app/bundles/videos/services/ZypeVideosApi.js): Encapsulates behavior to handle API calls to receive a single video or a list of videos.
- [ZypeAuthApi](./client/app/bundles/sessions/services/ZypeAuthApi.js): Encapsulates behavior to handle calls to the Authentication API
- [UserAuthStore](./client/app/libs/UserAuthStore.js): Manages login state by storing and invalidating the `access_token` in local storage.

**Main containers:**
- [Videos](./client/app/bundles/videos/containers/Videos.js): Shows a list of videos. Utilizes the `ZypeVideosApi` service.
- [VideoPlayer](./client/app/bundles/videos/containers/VideoPlayer.js): Shows a video. Redirects to the login page if the video is a subscription video and the user isn't logged in. Utilizes the `ZypeVideosApi` and `UserAuthStore` service.
- [Login](./client/app/bundles/sessions/containers/Login.js): Shows the login page and redirects to the requested subscription video, if applicable. Utilizes the `ZypeAuthenticationApi` and `UserAuthStore` service).


## Routes

- `/videos` Get a list of videos from the API
- `/video/:id` Get a video with the given id. User will be redirected to the login page if the video requires a subscription and the user is not currently logged in.
- `/sessions/new` Login page where user can provide username and password to authenticate with the API

## Future improvements

- **Tests!** There aren't presently any tests in the application. This should be done before any additional work.
- Use `react-router` to handle client-side routing. This would be a bit faster than the current approach and would obviate the need for Turbolinks.
- Implement client-side caching to improve page load speed and alleviate load on Zype's API. However, the `Cache-Control` header on all API responses appears to be
`max-age=0, private, must-revalidate`, so it's unlikely we'd see much benefit from caching.
- Add pagination and better sorting ability for videos page.

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


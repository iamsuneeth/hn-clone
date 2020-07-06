# News Hacker - A Hacker News clone

The app uses [HN api](https://hn.algolia.com/api) to fetch and display most relevant and upvoted news.

## Features

- User upvote and hide news ( indexedDB )
- Server Side Rendering
- Responsive and accessbility friendly
- Redux free 😎
- Typescript
- CSS in JS

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn dev`

Run `yarn build` and start webpack in watch mode. Also start nodemon for server development

### `yarn prod`

Creates final production build

## Planned Updates

- Add More unit tests to make future updates easier
- Replace Express with NestJs
- implement renderToNodeStream instead of renderToString
- ~~make chart responsive with window resize~~ - done
- Add hidden list section to unhide hidden news
- implement stale-while-revalidate for sw caching.

## Thanks

- [@artsy/fresnel](https://github.com/artsy/fresnel) - awesome resposniveness in SSR
- [@emotion/core](https://emotion.sh/docs/introduction) - CSS in JS solution
- [swr](https://swr.vercel.app/) - Mind blowing data fetching library
- [D3](https://d3js.org/) - No need for explanation !!

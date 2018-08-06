# Egypt Places Guide | Visit All Attractions
A SPA - Single Page Application - built using ReactJS. It helps travelers to find the attractions in Egypt, and do what they actually came for - To know 🇪🇬!

## How it works?
The application contains 3 components, The `Header`, `Menu` and `Map`. Simply what happens is:
- All places are retrieved from a custom JSON file contains the places in `src/data/places.json`
- Both of the `Menu` and `Map` components are using that `places.json` file to display the data
- The `App.js` is the Parent Component for all Sub-Components in this Application, it has the common `state` to manage changes

## Setup Instructions
- `git clone https://github.com/elharony/Egypt-Places-Guide.git`
- `cd Egypt-Places-Guide`
- `npm install`
- `npm start`
A Live Preview will opens via `http://localhost:3000/` by your default browser!

## Production Instructions
- `npm build` or `yarn build`

This will build the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
By default, it also includes [a service worker](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app) so that your app loads from local cache on future visits.

Your app is ready to be deployed.


## Contributing
This App is a part of my FEND - Front End Web Developer Nano Degree with Udacity. So, any `Pull Requests` won't be merged. However, feel free to `fork` the repo and create your own idea!
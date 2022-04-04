# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Route list
- **/users** => `pages/users/index.tsx` (list of user)
- **/posts/:userId/create** => `pages/post/PostConfig.tsx` (create page)
- **/posts/:userId** => `pages/post/PostConfig.tsx` (list of post each user)
- **/albums/:userId** => `pages/album/index.tsx` (list of album each user)
- **/albums/:albumId/photo** => `pages/photo/index.tsx` (list of photo each album)
- **/posts/:postId/edit** => `pages/post/PostConfig.tsx` (edit page)
- **/comments/:commentId/edit** => `pages/comment/CommentConfig.tsx` (edit page)
- **/comments/:postId/create** => `pages/comment/CommentConfig.tsx` (create page)

## Project folder structure
### `actions`
contains API function call each page
### `components`
contains list of reusable components like modal, pagination, input, errorPage and so on
### `constants`
contain many variables that being used as a constant data
### `environment`
contain environment variables being exported out for firebase hosting
### `helpers`
contain helper class or an object or event a function ex: Validator.ts
### `interfaces`
contains interface structure of each page either params or responseBody API
### `pages`
contains list of pages component
### `redux`
contains action, reducer, type and rootState each page component
### `utils`
contains a small util function to do a low level abstractions of function and httpRequest generic function (reusable)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

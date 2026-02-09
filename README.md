# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



## Other Required Installation 

### react-router-dom

```npm install react-router-dom```

### tailwindcss 
https://v3.tailwindcss.com/docs/installation

### json-server
https://www.npmjs.com/package/json-server

```bash
npx json-server ./data/db.json -p 8000
JSON Server started on PORT :8000
Press CTRL-C to stop
Watching ./data/db.json...

♡⸜(˶˃ ᵕ ˂˶)⸝♡

Index:
http://localhost:8000/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:8000/products
http://localhost:8000/featured_products
http://localhost:8000/orders
http://localhost:8000/users
```


### json-server-auth
https://www.npmjs.com/package/json-server-auth

#### Start Server with db.json which manage user's info
```bash
 npx json-server ./data/db.json -p 8000 -m ./node_modules/json-se
rver-auth

  \{^_^}/ hi!

  Loading ./data/db.json
  Loading ./node_modules/json-server-auth
  Done

  Resources
  http://localhost:8000/products
  http://localhost:8000/featured_products
  http://localhost:8000/orders
  http://localhost:8000/users

  Home
  http://localhost:8000

```
#### Start Server with db.json which manage user's info along with routes.

https://www.npmjs.com/package/json-server-auth#guarded-routes-

```bash
npx json-server ./data/db.json -m ./node_modules/json-server-auth -r ./data/routes.json -p 8000

  \{^_^}/ hi!

  Loading ./data/db.json
  Loading ./data/routes.json
  Loading ./node_modules/json-server-auth
  Done

  Resources
  http://localhost:3000/products
  http://localhost:3000/featured_products
  http://localhost:3000/orders
  http://localhost:3000/users

  Other routes
  /products* -> /444/
  /featured_products* -> /444/
  /orders* -> /660/
  /users* -> /600/

  Home
  http://localhost:3000

```


### Google Fonts
https://fonts.google.com/selection/embed

### Boot strap icons
https://icons.getbootstrap.com/#install

### Flowbite 
https://flowbite.com/#components

### react-toastify
https://fkhadra.github.io/react-toastify/introduction/

## Front End Deployment on 
netlify

## Back End Deployment on 
render
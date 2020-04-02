# Quick Start

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and a template that sets defaults that Geist Interactive uses.

- You will need to run `npm run firstRun` to complete the setup for iE 11.
- after running `npm start` , launch the inlcuded FM file and run the Load The WebViewer Button.
- Develop your Widget as regular react widget.
- running `npm build:inline` will produce a compiled production windget as a single file. copy and paste the contents of that file into your solution to use as your production Source

## FileMaker File AddonName.fmp12

This file contains all the FileMaker code you are likely to need to get started. You'll want to change it's name to
The name of your Addon. You'll also want to names space all the, Layouts, Scripts, Custom Fuctions, ValueLists and Tables.

Put it up on your FileMaker Server, put the connection info in the fmw.json file

## fmw.json

This file is used for automating communication with the served FileMaker File.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run start:https`

Runs the app in the development mode with HTTPS<br />
Open [https://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run build:inline`

Builds the app for production to the `build` folder, and then inlines it<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run openfile`

if fmw.json is setup ths will open the file on the FileMaker server

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

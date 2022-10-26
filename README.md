# React Native Typescript with Jest testing

A basic mobile app implementation with TypeScript and Jest testing.

## Features

- Has re-useable custom components and HOC components
- Validate forms before submitting (login / signup)
- fetch posts from open API (using custom hooks)
- list posts
- fetch post details

## Tech

This app uses a number of open source projects to work properly:

- [React] - A JavaScript library for building user interfaces
- [React Native] - lets you create truly native apps and doesn't compromise your users' experiences.
- [VS Code] - awesome text editor

And of course Dillinger itself is open source with a [public repository][dill]
on GitHub.

## Installation Using NPM package manager

This app requires [React Native Setup](https://reactnative.dev/docs/environment-setup) to run.

Install the dependencies and devDependencies and start the server.

```sh
cd <project_name>
npm i
npx react-native run-android -> To Run app on android device or emulator
npx react-native run-ios -> To Run app on ios device or emulator
```

## Installation Using Yarn package manager

This app requires [React Native Setup](https://reactnative.dev/docs/environment-setup) to run.

Install the dependencies and devDependencies and start the server.

```sh
cd <project_name>
yarn install
yarn android -> To Run app on android device or emulator
yarn ios -> To Run app on ios device or emulator
```

## Testing Using Jest and react-test-renderer

This app contains some unit test cases for validation and basic UI tests

To run test cases

```sh
cd <project_name>
yarn test
```

## Plugins

This app is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin                   | Website / Repo Link                                                    |
| ------------------------ | ---------------------------------------------------------------------- |
| React Navigation         | [https://reactnavigation.org/][pldb]                                   |
| Formik                   | [https://formik.org/docs/guides/react-native][plgh]                    |
| Safe Area Context        | [https://github.com/th3rdwave/react-native-safe-area-context][plga]    |

## License

MIT

**Free Software, Hell Yeah!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[node.js]: http://nodejs.org
[vs code]: https://code.visualstudio.com/
[react]: https://reactjs.org/
[react native]: https://reactnative.dev/
[pldb]: https://reactnavigation.org/
[plgh]: https://formik.org/docs/guides/react-native

[PlGa]: <https://github.com/th3rdwave/react-native-safe-area-context][PlGa]>

## Project running

```
  npm i - installing dependencies
  npm run start:dev or npm run start:dev:vite - running on webpack5 builder, or vite builder.
```
----

## Scripts

- `npm run start - ` start webpack5 development server
- `npm run start:vite - ` start vite development server using `.env.development` file
- `npm run start:dev - ` start webpack5 development server and JSON Server backend
- `npm run start:dev:vite - ` start vite development server and JSON Server backend
- `npm run build:prod - ` create production build of application, with `--env` variables `mode=production` and `apiUrl=<production backend url>`
- `npm run build:prod:vite - ` create production build of application using vite and `.env.production` file
- `npm run build:dev - ` create development build using `webpack5`
- `npm run lint:ts - ` run `eslint`
- `npm run lint:ts:fix - ` Fix all auto-fixable problems with `eslint`
- `npm run lint:scss - ` run `stylelint`
- `npm run lint:scss:fix - ` Fix all auto-fixable problems with `stylelint`
- `npm run test:unit - ` run unit and integration testing using `jest` for all **.test.** or **.spec.** files. You can run specific test file, by adding test filename, for ex. **npm run test:unit Counter.spec.tsx**
- `npm run storybook - ` run storybook
- `npm run storybook:build - ` create storybook build
----

## Project architecture
Project was written depends on Feature Sliced Design methodology.

Docs link - [Features Sliced Design](https://feature-sliced.design/ru/docs/get-started/overview)

----

## Work with translation
Project using `i18next` library for translations. The translation files are stored in [public/locales](./public/locales/). A convenient file system of translations is provided, which makes it easy to introduce a new language: create a directory with the desired language, edit the [i18next configuration](./src/shared/config/i18n/i18n.ts) a bit and create translations manually using the appropriate keys

For comfortable working with translations strongly recommend to install vscode/webstorm extension. For vscode link provided: [click me](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)

i18next docs - [https://react.i18next.com/latest/using-with-hooks](https://react.i18next.com/latest/using-with-hooks)

----

## Testing

Project has 4 types of tests:
1) Default unit tests - `npm run test:unit`
2) Integration testing with React Testing Library - `npm run test:unit`
3) e2e tests with Cypress - `npm run test:e2e`
4) regression screenshot storybook testing - `npm run test:ui`


----

## Linting

Project uses ESLint for uniform code standardization and StyleLint for styles checking

So also created its own custom plugin, which contains 3 rules for controlling FSD architecture standards.
Own plugin - [npm](https://www.npmjs.com/package/eslint-plugin-nothingg9537-plugin), [github](https://github.com/nothing9537/eslint-plugin-nothingg9537-plugin)

Plugin rules description:
1) **path-checker** - restricts using absolute imports within one module
2) **layer-imports** - verifies that imports are correct from an FSD architecture (For example, you can't use a `Features` layer in another `Features` layer), or use an overlying layer in an underlying layer. (For example, use a `Features` layer in an `Entities` layer, or `Pages` in `Widgets`, and so on). 
3) **public-api-imports** - allows imports only from public API (index.ts) file of module. Has autofix 

----

## Storybook
Project using storybook to describe components views. 
The storybook-addon-mock is used for mock requests from backend.

The storybook file is in the same directory as the component it describes and has pattern like **.stories.tsx**

The storybook is started with the following script - `npm run storybook`

More about storybook - [Storybook](https://storybook.js.org/docs/react/get-started/install/)

[Code example](/docs/storybook.md)

Additional decorators to make the storybook work with the libraries used in the project are written [here.](/src/shared/config/storybook/)

----

## Project configuration

For development project has 2 configs:

1. Webpack config - [./config/build](/config/build/), [webpack.config.ts](/webpack.config.ts)
2. Vite config - [vite.config.ts](/vite.config.ts)

The project configuration is stored in [/config](/config/)

- */config/babel* - babel configuration
- */config/build* - Webpack configuration. Resolvers, plugins, DevServer, Loaders are stored here
- */config/jest* - jest environment config 
- */config/storybook* - storybook configuration

----

## CI Pipeline
The project has CI Pipeline and Github Actions configured at a basic level. The github configuration can be found [here.](/.github/workflows/main.yml)

----

## Working with data

Data interaction is handled by @reduxjs/toolkit. Reusable entities can be normalized using EntityAdapter, which allows to obtain O(n) data access complexity.

Requests to the backend are sent using both [axios](https://axios-http.com/en/docs/intro) and [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)

For async reducers loading, used [DynamicModuleWrapper](/src/shared/lib/components/DynamicModuleWrapper.tsx)

It allows asynchronous loading of reducers, thus getting rid of them in the main bundle

[Code example](/docs/dynamic-module-wrapper.md)

----
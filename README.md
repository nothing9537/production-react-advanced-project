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
- `npm run export-svg-icons - ` Exports all SVG icons contained in the assets directory, which have been converted to JSX format for easier use, to an index.ts file.
- `npm run generate:layer - ` Automatically creates a slice and segment for the given layer that was requested when the script was called according to the described template of project folders and files. 
- `npm run update-shared-imports - ` During development it was deliberately made a mistake not to create a public API for shared/ui layer. After writing this script, it automatically creates an **index.ts**, if not exists, file in each UI element of the component, and exports all exported content. Moreover, the script edits all ui component imports in the project.
- `npm run update-eslint-plugin - ` Updates the custom eslint plugin to the current version
----

## Project architecture

Project was written depends on Feature Sliced Design methodology.

Docs link - [Features Sliced Design](https://feature-sliced.design/ru/docs/get-started/overview)

----

## Work with translation

Project using `i18next` library for translations. The translation files are stored in [public/locales](./public/locales/). A convenient file system of translations is provided, which makes it easy to introduce a new language: create a directory with the desired language, edit the [i18next configuration](./src/shared/config/i18n/i18n.ts) a bit and create translations manually using the appropriate keys

For comfortable working with translations strongly recommend to install vscode/web-storm extension. For vscode link provided: [click me](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)

i18next docs - [https://react.i18next.com/latest/using-with-hooks](https://react.i18next.com/latest/using-with-hooks)

----

## Testing

Project has 4 types of tests:
1) Default unit tests - `npm run test:unit`
2) Integration testing with React Testing Library - `npm run test:unit`
3) e2e tests with Cypress - `npm run test:e2e`
4) regression screenshot storybook testing - `npm run test:ui`

[More about test](/docs/testing.md)

----

## Linting

Project uses ESLint for uniform code standardization and StyleLint for styles checking

So also created its own custom plugin, which contains 3 rules for controlling FSD architecture standards.
Own plugin - [npm](https://www.npmjs.com/package/eslint-plugin-nothingg9537-plugin), [github](https://github.com/nothing9537/eslint-plugin-nothingg9537-plugin)

Plugin rules description:
1) **path-checker** - restricts using absolute imports within one module
2) **layer-imports** - verifies that imports are correct from an FSD architecture (For example, you can't use a `Features` layer in another `Features` layer), or use an overlying layer in an underlying layer. (For example, use a `Features` layer in an `Entities` layer, or `Pages` in `Widgets`, and so on). 
3) **public-api-imports** - allows imports only from public API (index.ts) file of module. Has auto-fix 

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

## Environment

There are a lot of custom solutions in the project. Handy scripts, hooks, scss structure allows to easily introduce new themes/styles. For even more comfortable development could be used some CSS-IN-JS library like [styled-components](https://styled-components.com/docs). 

A lot of helpers to handle redux/hooks (useDispatch -> [buildSlice](/src/shared/lib/store/buildSlide.ts), useSelector -> [buildSelector](/src/shared/lib/store/buildSelector.ts)), class names, query parameters feature-flags handlers.

Several scripts for automated refactoring with [ts-morph](https://ts-morph.com/) have been written, which allow to work with AST code tree, parse and modify it. 

----

## Feature flags

The project implemented the concept of Feature Flags, which will be used for the redesign of the project and the simultaneous existence of the old, and new design of the application.

[Handler functions](/src/shared/lib/features/) have been created, that allow convenient interaction with the concept, as well as automatic refactoring using [ts-morph](https://ts-morph.com/), which "kicks out" a feature, either with an on flag or an off flag, based on the name of the feature.

----

## Working with forms

One of the best solutions at the time of writing the project for working with forms - [react-hook-form](https://react-hook-form.com/get-started) - is pre-integrated into the project. [More about](/docs/form.md)
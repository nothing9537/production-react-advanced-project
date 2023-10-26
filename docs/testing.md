## Testing

Unit testing uses jest with the usual mocks of data and libraries. 

For component testing in jest-dom, [testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) is used, and for isolated components and e2e testing in a browser environment, [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress) is used.

In e2e tests, fixtures are sometimes used, which is a good practice that does not burden the main backend with requests.

For screenshot testing I use free [Loki](https://loki.js.org/configuration.html) solution together with Docker to make CI testing more stable. 

Also for screenshot and unit tests I generate convenient html reports using third-party CLI. Reports for unit tests can be found [here](../reports/unit/), and for screenshot tests [here](../\.loki\/).
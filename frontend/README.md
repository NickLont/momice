# React / Webpack 4 seed

Boilerplate / seed project for building React apps with ES6/7 and Webpack 4
It is heavily opinionated based on the Standard style for ESLint & Prettier.

## What you get
- React 16
- Webpack 4 with hmr and [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- Local [Css](https://github.com/webpack-contrib/css-loader#local-scope) / [Sass](https://github.com/webpack-contrib/sass-loader) loaders
- Basic flux / Redux structure (WIP)
- Pre-commit hooks with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- Relative and absolute imports (`import Homepage from "containers/pages/homepage"
` or `import Homepage from "./containers/pages/homepage"
`)
- Build statistics with [webpack-monitor](https://github.com/webpackmonitor/webpackmonitor) and [webpack-bundle-size-analyzer](https://github.com/robertknight/webpack-bundle-size-analyzer)

## Getting started

### Installing with git
```
npm i
```
### Installing with yarn
```
yarn
```
## npm scripts
- `npm run start` - Build and start the app in dev mode at [http://localhost:8003](http://localhost:8003)
- `npm run test` - Run test (not yet available)
- `npm run build` - Run a production build
- `npm run build:stats` - Run a production build and see its stats at [http://localhost:8090/](http://localhost:8090/) and stats output at `dist/build_stats`

Use `--no_verify` flag to skip pre-commit hooks.


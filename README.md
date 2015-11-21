## Community Fruit Rescue

### Environment

```
$ npm install
$ npm run build
```

### Development

Watching `src/index.js` for changes:

```
$ watchify -t babelify src/index.js -o lib/index.js -v
911248 bytes written to lib/index.js (2.47 seconds)
```

Watching `src/css` for changes:

```
$ watch 'cleancss src/css/fruit-rescue.css -o dist/fruit-rescue.min.css' src/css/
> Watching src/css/
```

HTTP server for development:

```
$ http-server -p 8081
```

### Deploy to Github Pages

```
$ git checkout gh-pages
$ git rebase master
$ git push
```

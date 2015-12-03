## Community Fruit Rescue

### Environment

Install global node modules to use from the command line:

```
npm install http-server -g
npm install watch -g
```

Install local nodal modules listed in `package.json`:

```
npm install
```

### Development


Build once from `src/index.js` and `src/fruit-rescue.css`:

```
npm run build
```

Or watch them for changes:

```
npm run watch
```

Start the web server on http://localhost:8081:

```
npm run start
```

### Deploy to Github Pages

```
$ git checkout gh-pages
$ git rebase master
$ git push
```


### How to interact with Database from Command Line

```node
node

var parse = require('parse/node')
parse.initialize("jfEekOu1UDd6u7ugQdNYvApXPiWO704gZtirmhH2", "Rs6cdM9lQr7t0vVQpXjRN4lo4oVRlCCLL00M0KG9");
const Harvest = parse.Object.extend('Harvest')

// to get existing harvests
var harvests
query = new parse.Query(Harvest)
query.include('property')
query.find({success: function(objs) { harvests = objs; }, error: function(err) { console.log('error ' + err); }});
h1 = harvests[0]
h1.get('name')
h1.get('property').get('address')

// to make a new harvest
var h2 = new Harvest()
h2.set('name', 'Pear Harvest')
h2.set('date', new Date())
h2.set('property', h1.get('property'))
h2.save(null, {success: function(obj) { console.log('success'); }, error: function(obj, err) { console.log('error ' + err); }});
```

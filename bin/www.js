// TODO #!/usr/bin/env node
var app = require('../app');

var server = app.listen(app.get('port'), function() {
  console.log('Up and running, listening on port: 3000');
});

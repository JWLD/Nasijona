const app = require('./server.js');
require('./db_queries.js'); // opens connection to DB

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

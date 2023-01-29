const express = require('express');
const app = express();
const  { checkApiKey } = require('./authentication');


const amazon = require('./routes/Amazon');
const seo = require('./routes/Seo');

app.use('/amazon', amazon);
app.use('/seo', seo);

app.use(checkApiKey);
app.use('/amazon', amazon);
app.use('/seo', seo);




app.listen(400, () => {
  console.log('API listening on port 3000');
});












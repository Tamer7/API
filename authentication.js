const apiKeyAuth = process.env.API_ACCESS_KEY;
require('dotenv').config()


function checkApiKey(req, res, next) {
    const key = req.get('api-key');
    if (key !== apiKeyAuth) {
      return res.status(401).send({ message: 'Invalid API key' });
    }
    next();
  }

  module.exports =  { checkApiKey };;
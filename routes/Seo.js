require('dotenv').config()
const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
  });
const openai = new OpenAIApi(configuration);
const  { checkApiKey } = require('../authentication');

router.use(checkApiKey);
router.get('/seo-title', async (req, res) => {
    const product = req.query.product;
    const prompt = `Generate SEO title for ${product}`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 64,
      temperature: 0,
    });
    console.log(response.data.choices[0].text);
    res.json({ title: response.data.choices[0].text });

});


router.get('/seo-description', async (req, res) => {
  const product = req.query.product;
  const prompt = `Generate SEO description for ${product}`;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 64,
    temperature: 0,
  });
  console.log(response.data.choices[0].text);
  res.json({ description: response.data.choices[0].text });

});


router.get('/ad-creative', async (req, res) => {
  const product = req.query.product;
  const platform = req.query.platform;
  const prompt = `Write a creative ad for the following product to run on ${platform}: ${product}`;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  console.log(response.data.choices[0].text);
  res.json({ adCreative: response.data.choices[0].text });

});

module.exports = router;



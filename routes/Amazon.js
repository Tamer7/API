const express = require('express');
const axios = require('axios');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio')
const router = express.Router();
const  { checkApiKey } = require('../authentication');


// This code scrapes the estimated sales from ProfitGuru for an ASIN.
// The ASIN is passed as a parameter to the route.
// The code uses Puppeteer to open a browser, go to the ProfitGuru sales calculator, and enter the ASIN.
// It then waits for the estimated sales to be loaded and returns them to the client.

router.get('/sales/estimate/:asin', checkApiKey, async (req, res) => {
    try {
      const asin = req.params.asin;
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(`https://www.profitguru.com/calculator/sales`);
      await page.waitForSelector("#load_asin_asin");
      await page.type("#load_asin_asin", asin);
      await page.click("#search-button");
      await page.waitForSelector(".highcharts-background");
      const data = await page.evaluate(() => {
        return document.querySelector("[data-api-field='estimatedSalesPerSeller']").innerText;
      });
      await browser.close();
  
      const number = parseInt(data.replace(/,/g, ''));
      const dailySales = number / 30;
  
      res.json({
        monthlySales: data,
        dailySales: dailySales,
      })
  
    } catch (err) {
      res.send(err);
    }
  });

  
  router.get('/check-buybox/:asin', checkApiKey, async (req, res) => {
    try {
      const asin = req.params.asin;
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(`https://www.amazon.com/dp/${asin}`);
      await page.waitForSelector("#buybox");
      const buybox = await page.evaluate(() => {
        return document.querySelector("#buybox .a-section .a-section").innerText;
      });
      await browser.close();
      res.json({ buybox });
    } catch (err) {
      res.send(err);
    }
  });

  module.exports = router;
const news = require('express').Router();
const bodyParser = require('body-parser');
const {newsApi} = require('../helpers/newsApiHelper');
const URLSearchParams = require('url-search-params');
const verifyToken = require('../middleware/verifyToken');
require("dotenv").config();

news.use(bodyParser.urlencoded({ extended: false }));
news.use(bodyParser.json());

let url = 'https://newsapi.org/v2/top-headlines';

news.get('/', verifyToken, async (req, res) => {
  if (!req.user && req.message) {
    return res.status(403).send({
      message: req.message
    });
  }
  if (!req.user && !req.message) {
    return res.status(401).send({
      message: 'Invalid Token'
    });
  }

  const searchParams = new URLSearchParams();

  if (req.user.preferences.category) {
    for (category of req.user.preferences.category) {
      searchParams.append('category', category)
    }
  }
  else {
    searchParams.append('category', 'general');
  }

  searchParams.append('apiKey', process.env.NEWS_API_KEY);

  try {
    let resp = await newsApi(`${url}?${searchParams}`);
      res.status(200).json(resp.articles);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

module.exports = news;
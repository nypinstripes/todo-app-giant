const express = require('express');
const helpers = require('../utils/helperUtils');
const isBrowserSupported = helpers.isBrowserSupported;
const router = express.Router();
const UAParser = require('ua-parser-js');

router.get('/', (req, res, next) => {
  const { headers: { 'user-agent': agent }} = req;
  let parser = UAParser(agent);

  if (!isBrowserSupported(parser)) {
    return res.render('unsupported', { unsupported: true });
  }

  res.render('index');
});

module.exports = router;

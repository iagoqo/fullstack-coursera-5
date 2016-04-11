var express = require('express');
var bodyParser = require('body-parser');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
  .all((req, res, next) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    next();
  })
  .get((req, res, next) => {
    res.end('Will send all the promotions to you!');
  })
  .post((req, res, next) => {
    res.end(`Will add the promotion: ${req.body.name} wih details: ${req.body.description}`);
  })
  .delete((req, res, next) => {
    res.end('Deleting all promotions');
  });

promoRouter.route('/:promotionId')
  .all((req, res, next) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    next();
  })
  .get((req, res, next) => {
    res.end(`Will send details of the promotion: ${req.params.promotionId} to you!`);
  })
  .put((req, res, next) => {
    res.write(`Updating the promotion: ${req.params.promotionId}\n`);
    res.end(`Will update the promotion: ${req.body.name} with details: ${req.body.description}.`);
  })
  .delete((req, res, next) => {
    res.end(`Deleting promotion: ${req.params.promotionId}.`);
  });

module.exports = promoRouter;

const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const auth = require("../middleware/auth");

router.get('/', quoteController.getAllQuotes);
router.get('/:id', quoteController.getQuoteById);

//all the comming routes not any normal user can access it the only me i can 
router.use(auth);

router.post('/', quoteController.createQuote);
router.put('/:id', quoteController.updateQuote);
router.delete('/:id', quoteController.deleteQuote);

module.exports = router;
const express = require('express');
const router = express.Router();
const contributionController = require('../controllers/contributionController');
const auth = require("../middleware/auth");

router.get('/', contributionController.getAllContributions);
router.get('/:id', contributionController.getContributionById);

//all the comming routes not any normal user can access it the only me i can 
router.use(auth);
router.post('/', contributionController.createContribution);
router.put('/:id', contributionController.updateContribution);
router.delete('/:id', contributionController.deleteContribution);

module.exports = router;
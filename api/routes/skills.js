const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const auth = require("../middleware/auth");

// GET all skills
router.get('/', skillController.getAllSkills);

// GET single skill
router.get('/:id', skillController.getSkillById);


//all the comming routes not any normal user can access it the only me i can 
router.use(auth);



// POST new skill 
router.post('/', skillController.createSkill);

// PUT update skill
router.put('/:id', skillController.updateSkill);

// DELETE skill
router.delete('/:id', skillController.deleteSkill);

module.exports = router;
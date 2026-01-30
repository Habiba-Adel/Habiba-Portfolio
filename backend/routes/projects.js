const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require("../middleware/auth");

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);


//all the comming routes not any normal user can access it the only me i can 
router.use(auth);

router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
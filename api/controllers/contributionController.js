const Contribution = require('../models/Contribution');

exports.getAllContributions = async (req, res) => {
  try {
    const contributions = await Contribution.find().sort({ createdAt: -1 });
    res.status(200).json(contributions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contributions', error: error.message });
  }
};

exports.getContributionById = async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params.id);
    if (!contribution) return res.status(404).json({ message: 'Contribution not found' });
    res.status(200).json(contribution);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contribution', error: error.message });
  }
};

exports.createContribution = async (req, res) => {
  try {
    const newContribution = new Contribution(req.body);
    const savedContribution = await newContribution.save();
    res.status(201).json(savedContribution);
  } catch (error) {
    res.status(400).json({ message: 'Error creating contribution', error: error.message });
  }
};

exports.updateContribution = async (req, res) => {
  try {
    const updatedContribution = await Contribution.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedContribution) return res.status(404).json({ message: 'Contribution not found' });
    res.status(200).json(updatedContribution);
  } catch (error) {
    res.status(400).json({ message: 'Error updating contribution', error: error.message });
  }
};

exports.deleteContribution = async (req, res) => {
  try {
    const contribution = await Contribution.findByIdAndDelete(req.params.id);
    if (!contribution) return res.status(404).json({ message: 'Contribution not found' });
    res.status(200).json({ message: 'Contribution deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contribution', error: error.message });
  }
};
const Issue = require('../models/Issue');

exports.submitIssue = async (req, res) => {
  try {
    const { target, targetId, message } = req.body;
    const issue = new Issue({ userId: req.user._id, target, targetId, message });
    await issue.save();
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: 'Issue submission failed', error: error.message });
  }
};

exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate('userId', 'name email');
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Fetch failed', error: error.message });
  }
};

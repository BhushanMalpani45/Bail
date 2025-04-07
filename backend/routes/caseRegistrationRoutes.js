import express from 'express';
// import CaseRegistration from '../models/admin-model'; 
// import CaseRegistration from '../models/admin-model'; // adjust path as needed
import CaseRegistration from '../models/caseRegistration-model.js';


const router = express.Router();

// @route   POST /api/cases
// @desc    Register a new case
// @access  Public or Protected based on your setup
router.post('/', async (req, res) => {
  try {
    const newCase = new CaseRegistration(req.body);
    const savedCase = await newCase.save();
    res.status(201).json({ message: 'Case registered successfully', data: savedCase });
  } catch (error) {
    console.error('Error registering case:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

export default router;

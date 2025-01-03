const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

// Create a new account
router.post('/', async (req, res) => {
    try {
        const account = new Account(req.body);
        await account.save();
        res.status(201).json({
            success: true,
            data: account
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Get all accounts
router.get('/', async (req, res) => {
    try {
        const accounts = await Account.find().populate('userId', 'name email');
        res.json({
            success: true,
            data: accounts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get accounts by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const accounts = await Account.find({ userId: req.params.userId })
            .populate('userId', 'name email');
        res.json({
            success: true,
            data: accounts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get account by ID
router.get('/:id', async (req, res) => {
    try {
        const account = await Account.findById(req.params.id)
            .populate('userId', 'name email');
        if (!account) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }
        res.json({
            success: true,
            data: account
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update account
router.put('/:id', async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('userId', 'name email');
        
        if (!account) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }
        res.json({
            success: true,
            data: account
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Delete account
router.delete('/:id', async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        if (!account) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }
        res.json({
            success: true,
            message: 'Account deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;

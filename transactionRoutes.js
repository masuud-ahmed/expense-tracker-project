const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// Create a new transaction
router.post('/', async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        const account = await Account.findById(req.body.accountId);
        
        if (!account) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }

        // Update account balance
        if (transaction.transType === 'income') {
            account.credit += transaction.amount;
        } else {
            account.debit += transaction.amount;
        }

        await account.save();
        await transaction.save();
        
        res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('userId', 'name email')
            .populate('accountId', 'accountTitle');
        res.json({
            success: true,
            data: transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get transactions by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.params.userId })
            .populate('userId', 'name email')
            .populate('accountId', 'accountTitle');
        res.json({
            success: true,
            data: transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get transactions by account ID
router.get('/account/:accountId', async (req, res) => {
    try {
        const transactions = await Transaction.find({ accountId: req.params.accountId })
            .populate('userId', 'name email')
            .populate('accountId', 'accountTitle');
        res.json({
            success: true,
            data: transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get transaction by ID
router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('accountId', 'accountTitle');
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }
        res.json({
            success: true,
            data: transaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        const account = await Account.findById(transaction.accountId);
        if (account) {
            // Reverse the transaction effect on account balance
            if (transaction.transType === 'income') {
                account.credit -= transaction.amount;
            } else {
                account.debit -= transaction.amount;
            }
            await account.save();
        }

        await Transaction.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: 'Transaction deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;

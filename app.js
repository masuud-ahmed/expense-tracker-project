require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
// user defined routes
const userRoute = require("./routes/userRoutes");
const accountRoute = require("./routes/accountRoutes");
const transactionRoute = require("./routes/transactionRoutes");

const app = express();

// Middleware to log all requests
app.use((req, res, next) => {
    console.log(`📍 ${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use(express.json());

// Route middleware with icons
app.use("/users", (req, res, next) => {
    console.log('👤 User Route Called:', req.method, req.url);
    next();
}, userRoute);

app.use("/accounts", (req, res, next) => {
    console.log('💰 Account Route Called:', req.method, req.url);
    next();
}, accountRoute);

app.use("/transactions", (req, res, next) => {
    console.log('💳 Transaction Route Called:', req.method, req.url);
    next();
}, transactionRoute);

// Database connection with detailed logging
console.log('🔄 Attempting to connect to MongoDB...');
const url = process.env.MONGODB_URI;
mongoose
    .connect(url)
    .then(() => {
        console.log('✅ Connected successfully to MongoDB');
        console.log(`📊 Database URL: ${url}`);
        console.log('📑 Available Collections:');
        console.log('   - 👤 Users');
        console.log('   - 💰 Accounts');
        console.log('   - 💳 Transactions');
    })
    .catch((err) => {
        console.log('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });

// Response logging middleware
app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function(data) {
        console.log(`📤 Response for ${req.method} ${req.url}:`, {
            statusCode: res.statusCode,
            success: data.success,
            message: data.message || 'No message provided'
        });
        return originalJson.call(this, data);
    };
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`
🚀 Server is running!
📡 Port: ${port}
🌐 URL: http://localhost:${port}
📚 API Endpoints:
   - 👤 Users:     http://localhost:${port}/users
   - 💰 Accounts:  http://localhost:${port}/accounts
   - 💳 Trans:     http://localhost:${port}/transactions
    `);
});

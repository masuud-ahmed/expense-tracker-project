# Expense Tracker API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
This version of the API does not require authentication.

## User Endpoints

### 1. Create User
Create a new user in the system.

```http
POST /users
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
}
```

#### Success Response
```json
{
    "success": true,
    "data": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "createdAt": "2025-01-02T20:54:12.000Z",
        "updatedAt": "2025-01-02T20:54:12.000Z"
    }
}
```

### 2. Get All Users
Retrieve a list of all users.

```http
GET /users
```

#### Success Response
```json
{
    "success": true,
    "data": [
        {
            "_id": "user_id",
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "1234567890"
        }
    ]
}
```

### 3. Get User Profile
Get complete user profile including accounts and transactions.

```http
GET /users/:id/profile
```

#### Success Response
```json
{
    "success": true,
    "data": {
        "user": {
            "_id": "user_id",
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "1234567890"
        },
        "accounts": [
            {
                "_id": "account_id",
                "accountTitle": "Savings Account",
                "userId": "user_id",
                "credit": 1000,
                "debit": 0
            }
        ],
        "transactions": [
            {
                "_id": "transaction_id",
                "amount": 1000,
                "userId": "user_id",
                "accountId": {
                    "_id": "account_id",
                    "accountTitle": "Savings Account"
                },
                "transType": "income"
            }
        ],
        "totals": {
            "totalCredit": 1000,
            "totalDebit": 0,
            "balance": 1000
        }
    }
}
```

## Account Endpoints

### 1. Create Account
Create a new account for a user.

```http
POST /accounts
Content-Type: application/json

{
    "accountTitle": "Savings Account",
    "userId": "user_id"
}
```

#### Success Response
```json
{
    "success": true,
    "data": {
        "_id": "account_id",
        "accountTitle": "Savings Account",
        "userId": "user_id",
        "credit": 0,
        "debit": 0,
        "createdAt": "2025-01-02T20:54:12.000Z",
        "updatedAt": "2025-01-02T20:54:12.000Z"
    }
}
```

### 2. Get All Accounts
Get all accounts for a specific user.

```http
GET /accounts?userId=user_id
```

#### Success Response
```json
{
    "success": true,
    "data": [
        {
            "_id": "account_id",
            "accountTitle": "Savings Account",
            "userId": "user_id",
            "credit": 0,
            "debit": 0
        }
    ]
}
```

## Transaction Endpoints

### 1. Create Transaction
Create a new transaction for an account.

```http
POST /transactions
Content-Type: application/json

{
    "amount": 1000,
    "userId": "user_id",
    "accountId": "account_id",
    "transType": "income"
}
```

#### Success Response
```json
{
    "success": true,
    "data": {
        "_id": "transaction_id",
        "amount": 1000,
        "userId": "user_id",
        "accountId": "account_id",
        "transType": "income",
        "createdAt": "2025-01-02T20:54:12.000Z",
        "updatedAt": "2025-01-02T20:54:12.000Z"
    }
}
```

### 2. Get All Transactions
Get all transactions for a specific user or account.

```http
GET /transactions?userId=user_id
// or
GET /transactions?accountId=account_id
```

#### Success Response
```json
{
    "success": true,
    "data": [
        {
            "_id": "transaction_id",
            "amount": 1000,
            "userId": "user_id",
            "accountId": "account_id",
            "transType": "income"
        }
    ]
}
```

## Error Responses
All endpoints return error responses in this format:

```json
{
    "success": false,
    "message": "Error message description"
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Testing Flow

1. Create a User:
```bash
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
}'
```

2. Create an Account (replace USER_ID):
```bash
curl -X POST http://localhost:3000/accounts \
-H "Content-Type: application/json" \
-d '{
    "accountTitle": "Savings Account",
    "userId": "USER_ID_HERE"
}'
```

3. Create a Transaction (replace USER_ID and ACCOUNT_ID):
```bash
curl -X POST http://localhost:3000/transactions \
-H "Content-Type: application/json" \
-d '{
    "amount": 1000,
    "userId": "USER_ID_HERE",
    "accountId": "ACCOUNT_ID_HERE",
    "transType": "income"
}'
```

4. Get Complete Profile (replace USER_ID):
```bash
curl http://localhost:3000/users/USER_ID_HERE/profile
```

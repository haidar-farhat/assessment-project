# Backend API Test Instructions

## Automated Backend Tests

### How to Run Automated Tests

1. Make sure MongoDB is running and your `.env` file is configured with a valid `MONGODB_URI`.
2. Install all dependencies (including dev dependencies):
   ```
   npm install
   ```
3. Run the tests:
   ```
   npm test
   ```

- The tests will automatically create and clean up test data.
- All endpoints are tested for both success and validation error cases.
- If you see errors about missing dependencies, run `npm install` again.
- If you see MongoDB connection errors, check your `.env` and MongoDB status.

---

## 1. Test: Fetch Game Result History

### Endpoint
`GET /api/memory/history`

### Description
Fetches all saved game results from the database, sorted by game date (most recent first).

### How to Test with Postman
1. Open Postman.
2. Set the request type to `GET`.
3. Enter the URL:
   
   ```
   http://localhost:5000/api/memory/history
   ```
4. Click `Send`.
5. You should receive a JSON response with the game history data.

### How to Test with cURL
Run the following command in your terminal:

```
curl -X GET http://localhost:5000/api/memory/history
```

---

**Note:**
- Ensure your backend server is running (`npm start` in the backend directory).
- Make sure MongoDB is running and accessible.

## 2. Test: Save Game Result (with Validation)

### Endpoint
`POST /api/memory/save`

### Description
Saves a new game result. Validates all required fields. Returns errors for invalid input.

### How to Test with Postman
1. Open Postman.
2. Set the request type to `POST`.
3. Enter the URL:
   ```
   http://localhost:5000/api/memory/save
   ```
4. Go to the `Body` tab, select `raw` and `JSON`, and enter:
   ```json
   {
     "userID": "<valid_user_id>",
     "gameDate": "2024-06-01T12:00:00Z",
     "failed": 2,
     "difficulty": "Normal",
     "completed": 10,
     "timeTaken": 120
   }
   ```
   Replace `<valid_user_id>` with a real user ID from your database.
5. Click `Send`.
6. You should receive a success message or validation errors.

### How to Test with cURL
Run the following command (replace `<valid_user_id>`):

```
curl -X POST http://localhost:5000/api/memory/save \
  -H "Content-Type: application/json" \
  -d '{
    "userID": "<valid_user_id>",
    "gameDate": "2024-06-01T12:00:00Z",
    "failed": 2,
    "difficulty": "Normal",
    "completed": 10,
    "timeTaken": 120
  }'
```

#### Example: Validation Error (missing field)

```
curl -X POST http://localhost:5000/api/memory/save \
  -H "Content-Type: application/json" \
  -d '{
    "userID": "<valid_user_id>",
    "gameDate": "2024-06-01T12:00:00Z",
    "failed": 2,
    "difficulty": "Normal",
    "completed": 10
  }'
```

---

**Note:**
- Ensure your backend server is running (`npm start` in the backend directory).
- Make sure MongoDB is running and accessible. 
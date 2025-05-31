# Backend API Test Instructions

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
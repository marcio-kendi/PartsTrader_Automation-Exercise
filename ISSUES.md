[Known Issues]

/// testuser@example.com Login fails

Attempts to log in via the API using testuser@example.com with the correct password (e.g., D3v3nv1r0m3nt) return a 404 User
not found error as well as attempting to log in via the UI using the same credentials returns a 401 Unauthorized error.

/// This issue affects tests related to:

API 7: POST /verifyLogin

SCREENSHOT INSTRUCTIONS FOR AI CHAT APP ASSIGNMENT
====================================================

Please capture the following screenshots to demonstrate your working application:

1. CHAT UI WITH USER + AI MESSAGES
   - Open the deployed frontend URL
   - Send 3-4 messages to the AI
   - Capture a screenshot showing:
     * User messages (blue bubbles on the right)
     * AI responses (gray bubbles on the left)
     * Timestamps visible under each message
     * Clean, modern UI design

2. PAGE REFRESH SHOWING SAME HISTORY
   - After sending messages, refresh the browser page (F5 or Ctrl+R)
   - Wait for history to load
   - Capture a screenshot showing:
     * All previous messages still visible
     * Same conversation history intact
     * No messages lost after refresh

3. BACKEND LOGS OR CONSOLE RUNNING
   - Open your Render dashboard
   - Go to "Logs" tab
   - Capture a screenshot showing:
     * Server running successfully
     * API requests being logged (GET /history, POST /message)
     * No errors in the logs
   
   OR
   
   - If running locally, capture terminal showing:
     * "Server running on port 3000"
     * Request logs for API calls

4. chatHistory.json SCREENSHOT
   - If running locally:
     * Open backend/storage/chatHistory.json
     * Show the file with saved messages
     * Capture screenshot
   
   - If deployed on Render:
     * Use Render's file browser or SSH
     * Navigate to storage/chatHistory.json
     * Capture screenshot showing the JSON structure with messages

5. (OPTIONAL) MOBILE RESPONSIVE VIEW
   - Open the app on a mobile device or use browser dev tools
   - Capture screenshot showing:
     * Responsive layout
     * Messages properly formatted
     * Input box accessible

6. (OPTIONAL) ERROR HANDLING
   - Temporarily disconnect internet or stop backend
   - Send a message
   - Capture screenshot showing:
     * Error toast notification
     * User-friendly error message

FILE NAMING CONVENTION:
- screenshot-1-chat-ui.png
- screenshot-2-page-refresh.png
- screenshot-3-backend-logs.png
- screenshot-4-chat-history-json.png
- screenshot-5-mobile-view.png (optional)
- screenshot-6-error-handling.png (optional)

Save all screenshots in this /screenshots directory.


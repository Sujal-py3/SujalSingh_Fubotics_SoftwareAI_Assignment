// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Fetches the full chat history from the backend
 * @returns {Promise<Array>} - Array of chat messages
 */
export async function fetchHistory() {
  try {
    const response = await fetch(`${API_BASE_URL}/history`);
    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }
    const data = await response.json();
    return data.history || [];
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
}

/**
 * Sends a message to the backend and gets AI response
 * @param {string} message - User's message
 * @returns {Promise<Object>} - Response object with AI message
 */
export async function sendMessage(message) {
  try {
    const response = await fetch(`${API_BASE_URL}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to send message');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}


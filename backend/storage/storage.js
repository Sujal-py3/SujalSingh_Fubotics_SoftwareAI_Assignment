import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// storage.js is already in the storage directory, so use __dirname directly
const STORAGE_DIR = __dirname;
const HISTORY_FILE = path.join(STORAGE_DIR, 'chatHistory.json');

/**
 * Ensures storage directory exists
 */
async function ensureStorageDir() {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating storage directory:', error);
  }
}

/**
 * Reads chat history from JSON file
 * @returns {Promise<Array>} - Array of chat messages
 */
export async function getChatHistory() {
  try {
    await ensureStorageDir();
    const data = await fs.readFile(HISTORY_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return empty array
      return [];
    }
    console.error('Error reading chat history:', error);
    return [];
  }
}

/**
 * Saves a message to chat history
 * @param {Object} message - Message object with role, content, timestamp
 * @returns {Promise<void>}
 */
export async function saveMessage(message) {
  try {
    await ensureStorageDir();
    const history = await getChatHistory();
    history.push({
      ...message,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    });
    await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
}

/**
 * Clears all chat history (optional utility)
 * @returns {Promise<void>}
 */
export async function clearHistory() {
  try {
    await ensureStorageDir();
    await fs.writeFile(HISTORY_FILE, JSON.stringify([], null, 2), 'utf-8');
  } catch (error) {
    console.error('Error clearing history:', error);
    throw error;
  }
}


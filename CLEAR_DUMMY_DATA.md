# Clearing Dummy CV Data

If you see dummy CVs in your CV Maker, follow these steps to clear them:

## Option 1: Clear via Browser Console

1. Open your browser's Developer Tools (F12 or Right-click → Inspect)
2. Go to the Console tab
3. Paste this command:
```javascript
localStorage.removeItem('userCVs');
location.reload();
```
4. Press Enter
5. The page will reload and all dummy CVs will be cleared

## Option 2: Clear All Browser Data

1. Open your browser settings
2. Go to Privacy/History
3. Clear browsing data
4. Select "Cookies and other site data"
5. Click Clear

## Option 3: Manual Clear via Application Tab

1. Open Developer Tools (F12)
2. Go to Application tab
3. Click on Local Storage
4. Find your domain
5. Look for the key `userCVs`
6. Right-click and delete it
7. Refresh the page

## After Clearing

- The CV Maker will show "No CVs Yet"
- You can now create your own CVs
- All new CVs will be stored in localStorage
- When you apply for jobs, only your created CVs will appear

## Note

Clearing localStorage will also remove:
- Saved jobs
- Application history
- User profile data
- Any other data stored locally

Make sure you want to clear everything before proceeding.

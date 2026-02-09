# PPT Download Page Setup - Password Protected

## Overview
A **password-protected** hidden `/ppt` route for managing PowerPoint presentation downloads.

## 🔐 Password Protection
**Password**: `praveentechhead`

The page requires authentication before allowing access to presentations. Authentication is stored in the browser's sessionStorage, so users only need to enter the password once per session.

## Features
✅ Password-protected access
✅ Beautiful authentication screen with lock icon
✅ Show/hide password toggle
✅ Session-based authentication (persists until browser/tab closes)
✅ Error messages for incorrect passwords
✅ Separate route at `/ppt` (not visible in navigation)
✅ Beautiful card-based UI with download statistics
✅ Success notifications on download
✅ Responsive design matching your portfolio aesthetic
✅ Download tracking (session-based)

## How to Access
1. Navigate to: `http://localhost:3000/ppt` (or your domain + `/ppt`)
2. Enter password: **praveentechhead**
3. Click "Unlock Access"
4. Download presentations

## Security Note
- The password is stored in the frontend code (client-side)
- This provides basic protection but is **NOT** cryptographically secure
- Anyone with developer tools can view the source code and find the password
- For true security, implement backend authentication
- Session expires when the browser/tab is closed

## Current PPT File
- **File**: `Support Vector machines Classifier.pptx`
- **Location**: `public/Support Vector machines Classifier.pptx`
- **Size**: 188 KB
- **Slides**: 12

## How to Change the Password

Edit `src/components/PPTPage.jsx` and change this line:

```javascript
const CORRECT_PASSWORD = 'praveentechhead';
```

Replace `'praveentechhead'` with your new password.

## How to Add More PPT Files

1. **Add your PPT file** to the `public` folder
2. **Update** `src/components/PPTPage.jsx` in the `pptFiles` array:

```javascript
const pptFiles = [
  {
    id: 1,
    title: "Support Vector Machines Classifier",
    description: "Comprehensive presentation on SVM algorithms and classification techniques",
    filename: "Support Vector machines Classifier.pptx",
    url: personalInfo.pptUrl,
    size: "188 KB",
    slides: 12,
    gradient: "from-purple-500 to-pink-600"
  },
  // Add more files here
  {
    id: 2,
    title: "Another Presentation",
    description: "Description here",
    filename: "Another_Presentation.pptx",
    url: "/Another_Presentation.pptx",
    size: "1.5 MB",
    slides: 20,
    gradient: "from-cyan-500 to-blue-600"
  }
];
```

## File Locations

- **PPT Page Component**: `src/components/PPTPage.jsx`
- **Routing Setup**: `src/App.js`
- **Data Configuration**: `src/data/mock.js`
- **PPT Files**: `public/` folder

## Testing
1. Start your dev server: `npm start`
2. Navigate to `http://localhost:3000/ppt`
3. You should see the password screen
4. Enter password: `praveentechhead`
5. Verify you can access the download page
6. Test the download button
7. Close and reopen the page - you should still be authenticated
8. Close the browser/tab and reopen - you should need to re-authenticate

## Design Features

### Authentication Screen
- Purple/pink gradient lock icon
- Clean password input with show/hide toggle
- Error messages for incorrect passwords
- "Back to Home" link

### Download Page (After Authentication)
- Purple/pink gradient theme (different from main site)
- Animated download button
- Session-based download counter  
- File metadata display (size, slide count)
- Success toast notifications
- Smooth hover effects and transitions

---
Created: 2026-02-10
Updated: 2026-02-10 (Added password protection)

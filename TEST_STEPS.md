# 🧪 Testing Netlify Functions Locally

## ⚠️ IMPORTANT: You MUST use `netlify dev` to test functions!

### Step-by-Step Testing Guide:

#### 1. Fix your `.env` file
Your Gmail App Password should have **NO SPACES**. 
- Google shows it like: `abcd efgh ijkl mnop`
- You should save it as: `abcdefghijklmnop`

Current in your `.env`:
```
EMAIL_PASS=pfghpqmssigj rnpo  ← Still has a space! Remove it!
```

Should be:
```
EMAIL_PASS=pfghpqmssigj rnpo
```

#### 2. Stop your current dev server
If you have `yarn start` running, **stop it** (Ctrl+C)

#### 3. Start Netlify Dev Server
Run this command instead:
```bash
netlify dev
```

This will:
- ✅ Start your React app (usually on port 8888)
- ✅ Start the functions server
- ✅ Load environment variables from `.env`
- ✅ Make functions available at `/.netlify/functions/send-email`

#### 4. Test the Contact Form
1. Open the app (probably http://localhost:8888)
2. Navigate to the Contact section
3. Fill out the form with test data
4. Submit the form
5. Check the terminal for function logs

### 🔍 What to Look For:

**In the terminal, you should see:**
```
◈ Functions server is listening on port 9999
◈ Loaded function send-email
```

**When you submit the form:**
```
Request from ::1: POST /.netlify/functions/send-email
Response with status 200 in XX ms
```

### ❌ Common Issues:

**Issue: "Failed to fetch"**
- Make sure you're using `netlify dev`, not `yarn start`
- The function endpoint only works with Netlify Dev

**Issue: App password error**
- Remove ALL spaces from EMAIL_PASS in `.env`
- Make sure you're using an App Password, not your Gmail password
- Verify 2-Step Verification is enabled on your Google account

**Issue: Environment variables not loading**
- Restart `netlify dev` after changing `.env`
- Make sure `.env` is in the root of the `frontend` folder

### 🎯 Quick Test Checklist:

- [ ] Fixed `.env` - removed all spaces from EMAIL_PASS
- [ ] Stopped `yarn start` if it's running
- [ ] Started `netlify dev`
- [ ] Opened http://localhost:8888 (or whatever port Netlify shows)
- [ ] Tested the contact form
- [ ] Checked terminal for function logs

### 📧 Still Not Working?

Share the exact error message from:
1. The browser console (F12 → Console tab)
2. The terminal where `netlify dev` is running

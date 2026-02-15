# Netlify Serverless Functions Setup

## 📧 Email Function Configuration

Your contact form now uses Netlify serverless functions instead of a separate backend! This is more secure, scalable, and easier to maintain.

### ✅ What's Been Done

1. ✨ Created `send-email.js` serverless function
2. 🔄 Updated `Contact.jsx` to use the Netlify function
3. ⚙️ Configured `netlify.toml` for functions
4. 📦 Installed `nodemailer` dependency

### 🔐 Environment Variables Setup

You need to add these environment variables to your Netlify site:

#### In Netlify Dashboard:

1. Go to your site in Netlify
2. Click **Site settings** → **Environment variables**
3. Add the following variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `EMAIL_USER` | your-email@gmail.com | Your Gmail address |
| `EMAIL_PASS` | your-app-password | Gmail App Password (see below) |

#### Getting a Gmail App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Select **Security**
3. Under "How you sign in to Google," select **2-Step Verification** (enable if not already)
4. At the bottom of the page, select **App passwords**
5. Generate a new app password for "Mail" → "Other (Custom name)"
6. Name it "Portfolio Netlify Function"
7. Copy the 16-character password
8. Use this as your `EMAIL_PASS` value in Netlify

### 🧪 Testing Locally

To test the function locally, you can use Netlify CLI:

```bash
# Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli

# Create a .env file with your credentials
# Add:
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-app-password

# Run the development server
netlify dev
```

This will start your React app and the functions at the same time!

### 🚀 Deployment

When you push to your repository, Netlify will:
1. Build your React app
2. Deploy the serverless functions automatically
3. Your contact form will work immediately!

### 🔄 Alternative Email Services

If you don't want to use Gmail, you can change the transporter configuration in `send-email.js`:

#### Using Outlook/Hotmail:
```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

#### Using Custom SMTP:
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.yourdomain.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

### 📊 Benefits of This Approach

✅ **No backend server needed** - Saves hosting costs
✅ **Automatic scaling** - Netlify handles all traffic
✅ **Secure** - Environment variables kept safe
✅ **Fast** - Functions run close to users
✅ **Easy maintenance** - No server updates required

### ❓ Troubleshooting

**Function not working?**
- Check Netlify function logs in: Site → Functions tab
- Verify environment variables are set correctly
- Make sure Gmail App Password (not regular password) is used

**Emails not sending?**
- Check your Gmail account for security alerts
- Verify 2-Step Verification is enabled
- Try generating a new App Password

**Build failing?**
- Make sure `nodemailer` is in your `package.json` dependencies
- Check that `netlify.toml` has the `functions` directory set

### 📧 Need Help?

Check the Netlify Functions documentation: https://docs.netlify.com/functions/overview/

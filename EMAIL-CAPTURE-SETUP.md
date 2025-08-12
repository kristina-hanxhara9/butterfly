# 📊 Email Capture Database Setup Guide

## 🎯 Overview
You now have a professional email capture form that collects:
- ✅ Email Address (required)
- ✅ Full Name (required) 
- ✅ Phone Number (optional)
- ✅ Company/Industry (optional)

## 🗄️ Database Options

### Option 1: Google Sheets + Google Apps Script (Recommended - FREE)

**Why this is perfect for you:**
- ✅ Completely free
- ✅ No backend setup required
- ✅ Easy to view and manage data
- ✅ Automatic email notifications
- ✅ Export to CSV/Excel anytime
- ✅ Perfect for 1-10,000 submissions

**Setup Instructions:**

#### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Butterfly AI - Email Captures"
4. Copy the Sheet ID from the URL (it's the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/1ABC123XYZ789.../edit`
   - Sheet ID: `1ABC123XYZ789...`

#### Step 2: Setup Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code
4. Copy and paste the code from `google-apps-script.js`
5. Update these values in the script:
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SHEET_ID_HERE'; // Paste your sheet ID
   const NOTIFICATION_EMAIL = 'your-email@domain.com'; // Your email for notifications
   ```
6. Save the project (name it "Butterfly AI Email Capture")

#### Step 3: Deploy the Script
1. Click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Click "Deploy"
6. Copy the deployment URL

#### Step 4: Update Your Website
1. Open `/guide/index.html`
2. Find this line:
   ```javascript
   const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
   ```
3. Replace `YOUR_SCRIPT_ID` with your deployment URL

#### Step 5: Test Everything
1. Go to Google Apps Script
2. Run the `testSetup()` function
3. Check your Google Sheet - you should see a test entry
4. Test your website form

### Option 2: Airtable (Alternative)

**Why choose Airtable:**
- ✅ Beautiful interface
- ✅ Easy to organize and filter data
- ✅ Built-in CRM features
- ✅ Great for team collaboration

**Setup:**
1. Create free Airtable account
2. Create a base called "Butterfly AI Leads"
3. Create fields: Email, Name, Phone, Company, Date
4. Get your API key and base ID
5. Update the JavaScript to use Airtable API

### Option 3: Firebase Firestore (For Scale)

**When to use:**
- Expecting 10,000+ submissions
- Want real-time updates
- Building additional features

## 📧 What Happens When Someone Submits

1. **Form Validation**: Ensures required fields are filled
2. **Data Collection**: Captures all form data + timestamp
3. **Database Save**: Automatically saves to your chosen database
4. **Email Notification**: Sends you an instant notification (Google Sheets option)
5. **User Experience**: Form disappears, guide appears instantly
6. **Remember User**: Won't show form again to same user (localStorage)

## 📊 Your Data Structure

Each submission includes:
```
{
  "timestamp": "2024-01-15T10:30:00Z",
  "email": "john@company.com",
  "name": "John Smith", 
  "phone": "+44 123 456 7890",
  "company": "Tech Startup",
  "source": "AI Tools Guide"
}
```

## 🎨 Form Features

- **Professional Design**: Matches your brand colors
- **Mobile Responsive**: Works perfectly on all devices  
- **Loading States**: Shows progress during submission
- **Error Handling**: Graceful fallbacks if submission fails
- **Privacy Note**: Builds trust with users
- **One-Time Show**: Remembers users who already submitted

## 📈 Expected Results

Based on industry standards for AI/tech guides:
- **Conversion Rate**: 15-25% of visitors will submit
- **Quality**: Higher intent leads (they want AI help)
- **Use Case**: Perfect for your consultancy business

## 🔧 Customization Options

**Change the offer:**
```html
<h2>🎯 Get FREE Access to Our AI Tools Guide</h2>
```

**Modify fields:**
```html
<!-- Add new field -->
<div class="form-group">
    <label for="jobTitle">Job Title</label>
    <input type="text" id="jobTitle" name="jobTitle" placeholder="e.g. Marketing Manager">
</div>
```

**Update colors:**
```css
.submit-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🚀 Next Steps

1. **Set up your database** (Google Sheets recommended)
2. **Test the form** thoroughly
3. **Monitor submissions** in your dashboard
4. **Follow up with leads** via email
5. **A/B test** different form copy for better conversion

## 💡 Pro Tips

- **Quick Response**: Reply to leads within 1 hour for best conversion
- **Personalize**: Reference their company/industry in your outreach
- **Value First**: Offer free AI audit or consultation
- **Track Sources**: The form automatically tracks "AI Tools Guide" as source
- **Export Regularly**: Download your data weekly as backup

Need help setting this up? Contact hello@butterfly-ai.co.uk!

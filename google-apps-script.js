/**
 * Google Apps Script for Butterfly AI Email Capture
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this code
 * 4. Create a Google Sheet to store the data
 * 5. Update the SPREADSHEET_ID below with your sheet ID
 * 6. Deploy as a web app (Execute as: Me, Access: Anyone)
 * 7. Copy the deployment URL and replace YOUR_SCRIPT_ID in the HTML file
 */

// ⚠️ IMPORTANT: Replace this with your Google Sheet ID
const SPREADSHEET_ID = '1SpSH3p-ioxVUA9tnfNvpMQGi9CBKVEfKusceuht2Gg7_SI0nwmw593j-';
const SHEET_NAME = 'Email Captures'; // Name of the sheet tab

/**
 * Handle form submissions from the AI Tools Guide
 */
function doPost(e) {
  try {
    // Parse the form data
    const data = JSON.parse(e.postData.contents);
    
    // Log the submission (optional - for debugging)
    console.log('New submission:', data);
    
    // Save to Google Sheets
    saveToSheet(data);
    
    // Send email notification (optional)
    sendEmailNotification(data);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing submission:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Save form data to Google Sheets
 */
function saveToSheet(data) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    
    // If sheet doesn't exist, create it with headers
    if (!sheet) {
      const newSheet = SpreadsheetApp.openById(SPREADSHEET_ID).insertSheet(SHEET_NAME);
      const headers = ['Timestamp', 'Email', 'Name', 'Phone', 'Company', 'Source'];
      newSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format the header row
      const headerRange = newSheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#667eea');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
    }
    
    // Get the sheet (newly created or existing)
    const targetSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    
    // Prepare the row data
    const rowData = [
      new Date(data.timestamp),
      data.email,
      data.name,
      data.phone || '',
      data.company || '',
      data.source || 'AI Tools Guide'
    ];
    
    // Add the new row
    targetSheet.appendRow(rowData);
    
    console.log('Data saved to sheet successfully');
    
  } catch (error) {
    console.error('Error saving to sheet:', error);
    throw error;
  }
}

/**
 * Send email notification for new submissions (optional)
 */
function sendEmailNotification(data) {
  try {
    // ⚠️ Update this with your email address
    const NOTIFICATION_EMAIL = 'hello@butterfly-ai.co.uk';
    
    const subject = '🦋 New AI Guide Lead - ' + data.name;
    
    const body = `
New lead captured from AI Tools Guide!

📧 Email: ${data.email}
👤 Name: ${data.name}
📱 Phone: ${data.phone || 'Not provided'}
🏢 Company: ${data.company || 'Not provided'}
📅 Date: ${new Date(data.timestamp).toLocaleString('en-GB')}
📍 Source: ${data.source}

View all leads: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}

---
Butterfly AI Lead Capture System
    `;
    
    // Send the email
    MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
    
    console.log('Notification email sent successfully');
    
  } catch (error) {
    console.error('Error sending notification email:', error);
    // Don't throw error here - we don't want email issues to break form submission
  }
}

/**
 * Test function to verify setup (run this manually to test)
 */
function testSetup() {
  const testData = {
    email: 'test@example.com',
    name: 'Test User',
    phone: '+44 123 456 7890',
    company: 'Test Company',
    timestamp: new Date().toISOString(),
    source: 'Test Run'
  };
  
  try {
    saveToSheet(testData);
    console.log('✅ Test successful! Your setup is working correctly.');
    return '✅ Setup test passed!';
  } catch (error) {
    console.error('❌ Test failed:', error);
    return '❌ Setup test failed: ' + error.toString();
  }
}

/**
 * Get basic statistics (optional - for dashboard)
 */
function getStats() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) return { error: 'Sheet not found' };
    
    const data = sheet.getDataRange().getValues();
    const totalSubmissions = data.length - 1; // Subtract header row
    
    const today = new Date();
    const todaySubmissions = data.filter(row => {
      if (row[0] instanceof Date) {
        return row[0].toDateString() === today.toDateString();
      }
      return false;
    }).length;
    
    return {
      total: totalSubmissions,
      today: todaySubmissions,
      lastUpdate: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Error getting stats:', error);
    return { error: error.toString() };
  }
}

/**
 * Google Apps Script — Shroomé Waitlist Webhook
 *
 * SETUP:
 * 1. Open "Shroomé — Marketing Hub" spreadsheet in Google Sheets
 * 2. Go to Extensions → Apps Script
 * 3. Paste this entire file
 * 4. Click Deploy → New deployment → Web app
 *    - Execute as: Me (zk@drinkshroome.com)
 *    - Who has access: Anyone
 * 5. Copy the deployment URL
 * 6. Add to Vercel env vars: GOOGLE_SHEETS_WEBHOOK_URL=<deployment URL>
 *
 * The waitlist route at /api/waitlist already POSTs to this webhook.
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Signups");

    // Create "Signups" sheet with headers if it doesn't exist
    if (!sheet) {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const newSheet = ss.insertSheet("Signups");
      newSheet.appendRow(["Email", "Phone", "Signup Date", "Source", "Status"]);
      newSheet.getRange("1:1").setFontWeight("bold");
      newSheet.setColumnWidth(1, 280);
      newSheet.setColumnWidth(2, 160);
      newSheet.setColumnWidth(3, 200);
      newSheet.setColumnWidth(4, 160);
      newSheet.setColumnWidth(5, 120);
      newSheet.appendRow([
        data.email,
        data.phone || "",
        data.timestamp || new Date().toISOString(),
        data.source || "drinkshroome.com",
        "Active"
      ]);
    } else {
      sheet.appendRow([
        data.email,
        data.phone || "",
        data.timestamp || new Date().toISOString(),
        data.source || "drinkshroome.com",
        "Active"
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput("Shroomé Waitlist Webhook is active.")
    .setMimeType(ContentService.MimeType.TEXT);
}

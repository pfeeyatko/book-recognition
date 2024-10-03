function doPost(e) {
  try {
    const spreadsheetId = '1ERoi04BV33VGA5M60ejgySjhorrgxoL0Q-Yzkjupmlo'; // Change as needed
    const ss = SpreadsheetApp.openById(spreadsheetId);

    const sheetName = 'List'; // Replace with your sheet name
    const sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      throw new Error(`Sheet with name "${sheetName}" not found.`);
    }

    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const { title, author:incomingAuthor, published, isbn, subject:incomingSubject, status: incomingStatus } = data;
    let status = '';
    let created = '';
    let updated = '';

    if (!incomingStatus) {
      // **Create New Entry**
      status = 'available';
      created = new Date();
      updated = new Date();

      // Author could be a string, or an array of strings
      const author = Array.isArray(incomingAuthor)
        ? incomingAuthor.join(', ')
        : incomingAuthor;
      // Subject could be a string, or an array of strings
      const subject = Array.isArray(incomingSubject)
        ? incomingSubject.join(', ')
        : incomingSubject;

      sheet.appendRow([title, author, published, isbn, subject, status, created, updated]);

      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success', message: 'Data added.' }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      // **Update Existing Entry**

      // Retrieve all data from the sheet
      const dataRange = sheet.getDataRange();
      const values = dataRange.getValues();

      let rowToUpdate = -1; // Initialize with -1 to indicate "not found"

      // Iterate through the rows to find a match
      for (let i = 1; i < values.length; i++) { // Start at 1 to skip headers
        const row = values[i];
        const rowIsbn = row[3];    // Column D: ISBN
        const rowStatus = row[5];  // Column F: Status

        if (parseInt(rowIsbn) === parseInt(isbn) && rowStatus === 'available') {
          rowToUpdate = i + 1; // Sheets are 1-indexed
          break; // Stop after finding the first match
        }
      }

      if (rowToUpdate !== -1) {
        // **Match Found: Update the Status and Updated Columns**

        // Update the Status column (Column F)
        sheet.getRange(rowToUpdate, 6).setValue(incomingStatus);

        // Update the Updated column (Column G) with the current date and time
        sheet.getRange(rowToUpdate, 8).setValue(new Date());

        return ContentService
          .createTextOutput(JSON.stringify({ status: 'success', message: 'Data updated.' }))
          .setMimeType(ContentService.MimeType.JSON);
      } else {
        // **No Match Found: Add a New Entry**

        status = incomingStatus; // Use the status provided in the request
        created = new Date();
        updated = new Date();

        // Author could be a string, or an array of strings
        const author = Array.isArray(incomingAuthor)
          ? incomingAuthor.join(', ')
          : incomingAuthor;
        // Subject could be a string, or an array of strings
        const subject = Array.isArray(incomingSubject)
          ? incomingSubject.join(', ')
          : incomingSubject;

        sheet.appendRow([title, author, published, isbn, subject, status, created, updated]);

        return ContentService
          .createTextOutput(JSON.stringify({ status: 'success', message: 'No matching entry found. Data added as a new row.', result }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
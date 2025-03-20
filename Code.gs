// Google Apps Script for Online Claim Management System
// Deploy as web app with:
// - Execute the app as: Me (your@email.com)
// - Who has access: Anyone within your organization

function doGet(e) {
  // If no specific request is made, serve the HTML UI
  if (!e.parameter.action) {
    return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('ระบบการจัดการใบตั้งเบิกออนไลน์')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  
  // Handle API requests
  const sheet = e.parameter.sheet;
  const action = e.parameter.action;
  
  let result;
  
  if (action === 'read') {
    result = handleReadRequest(sheet);
  } else if (action === 'create') {
    const data = JSON.parse(e.parameter.data);
    result = handleCreateRequest(sheet, data);
  } else if (action === 'update') {
    const id = e.parameter.id;
    const data = JSON.parse(e.parameter.data);
    result = handleUpdateRequest(sheet, id, data);
  } else if (action === 'delete') {
    const id = e.parameter.id;
    result = handleDeleteRequest(sheet, id);
  } else if (action === 'search') {
    const query = JSON.parse(e.parameter.query);
    result = handleSearchRequest(sheet, query);
  } else {
    result = { success: false, error: 'Invalid action' };
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: result.success,
    data: result.data,
    error: result.error
  })).setMimeType(ContentService.MimeType.JSON);
}

// Include HTML and JavaScript files
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Get data from the server to use in HTML templates
function getInitialData() {
  const result = {
    currentUser: Session.getActiveUser().getEmail() || 'Unknown User',
    nextDocumentNumber: generateNextDocumentNumber()
  };
  
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get companies
    const companiesSheet = ss.getSheetByName('Companies');
    if (companiesSheet) {
      result.companies = getSheetData(companiesSheet);
    }
    
    // Get recipients (payees)
    const recipientsSheet = ss.getSheetByName('Recipients');
    if (recipientsSheet) {
      result.recipients = getSheetData(recipientsSheet);
    }
    
    // Get projects
    const projectsSheet = ss.getSheetByName('Projects');
    if (projectsSheet) {
      result.projects = getSheetData(projectsSheet);
    }
    
    // Get expense types
    const expenseTypesSheet = ss.getSheetByName('ExpenseTypes');
    if (expenseTypesSheet) {
      result.expenseTypes = getSheetData(expenseTypesSheet);
    }
    
    // Get payment methods
    const paymentMethodsSheet = ss.getSheetByName('PaymentMethods');
    if (paymentMethodsSheet) {
      result.paymentMethods = getSheetData(paymentMethodsSheet);
    }
    
    return result;
  } catch (error) {
    Logger.log('Error in getInitialData: ' + error);
    return { error: error.toString() };
  }
}

// Generate next document number
function generateNextDocumentNumber() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const claimsSheet = ss.getSheetByName('Claims');
    
    if (!claimsSheet) {
      return generateDefaultDocumentNumber();
    }
    
    const lastRow = claimsSheet.getLastRow();
    if (lastRow <= 1) {
      return generateDefaultDocumentNumber();
    }
    
    // Assuming document number is in column 1 (A)
    const lastDocNumber = claimsSheet.getRange(lastRow, 1).getValue();
    
    if (!lastDocNumber || typeof lastDocNumber !== 'string') {
      return generateDefaultDocumentNumber();
    }
    
    // Format: DBM2503XXXX (where 25 is year, 03 is month, XXXX is sequential number)
    const prefix = 'DBM';
    const currentYear = new Date().getFullYear().toString().substring(2);
    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
    
    // Check if last document number matches current year/month pattern
    if (lastDocNumber.startsWith(prefix + currentYear + currentMonth)) {
      // Extract sequence number
      const sequenceStr = lastDocNumber.substring(7);
      const sequence = parseInt(sequenceStr, 10);
      if (!isNaN(sequence)) {
        // Increment and format to 4 digits
        return prefix + currentYear + currentMonth + (sequence + 1).toString().padStart(4, '0');
      }
    }
    
    // If pattern doesn't match or format is different, start fresh
    return generateDefaultDocumentNumber();
  } catch (error) {
    Logger.log('Error generating document number: ' + error);
    return generateDefaultDocumentNumber();
  }
}

// Generate a default document number
function generateDefaultDocumentNumber() {
  const prefix = 'DBM';
  const currentYear = new Date().getFullYear().toString().substring(2);
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
  return prefix + currentYear + currentMonth + '0001';
}

// Handle API requests
function handleReadRequest(sheetName) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return { success: false, error: `Sheet "${sheetName}" not found` };
    }
    
    const data = getSheetData(sheet);
    return { success: true, data: data };
  } catch (error) {
    Logger.log('Error in handleReadRequest: ' + error);
    return { success: false, error: error.toString() };
  }
}

function getSheetData(sheet) {
  const data = [];
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  
  if (lastRow <= 1 || lastColumn < 1) {
    return data;
  }
  
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const values = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues();
  
  values.forEach(row => {
    const obj = {};
    headers.forEach((header, index) => {
      if (header) { // Skip empty headers
        obj[header] = row[index];
      }
    });
    data.push(obj);
  });
  
  return data;
}

function handleCreateRequest(sheetName, data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      
      // Set default headers based on the data
      const headers = Object.keys(data);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // Get headers
    const lastColumn = sheet.getLastColumn();
    const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
    
    // Prepare row data
    const rowData = headers.map(header => {
      if (header in data) {
        return data[header];
      }
      return '';
    });
    
    // Add row
    sheet.appendRow(rowData);
    
    // Send notification
    if (sheetName === 'Claims') {
      sendClaimNotification(data);
    }
    
    return { success: true, data: data };
  } catch (error) {
    Logger.log('Error in handleCreateRequest: ' + error);
    return { success: false, error: error.toString() };
  }
}

function handleUpdateRequest(sheetName, id, data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return { success: false, error: `Sheet "${sheetName}" not found` };
    }
    
    // Find row by ID (assuming first column is the ID)
    const lastRow = sheet.getLastRow();
    const values = sheet.getRange(1, 1, lastRow, 1).getValues();
    let rowIndex = -1;
    
    for (let i = 0; i < values.length; i++) {
      if (values[i][0] == id) {
        rowIndex = i + 1; // +1 because arrays are 0-indexed, but sheets are 1-indexed
        break;
      }
    }
    
    if (rowIndex === -1) {
      return { success: false, error: `Record with ID "${id}" not found` };
    }
    
    // Get headers
    const lastColumn = sheet.getLastColumn();
    const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
    
    // Update row data
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      if (header in data) {
        sheet.getRange(rowIndex, i + 1).setValue(data[header]);
      }
    }
    
    // If this is a claim and status changed to approved, send notification
    if (sheetName === 'Claims' && data.status === 'อนุมัติแล้ว') {
      sendApprovalNotification(data);
    }
    
    return { success: true, data: data };
  } catch (error) {
    Logger.log('Error in handleUpdateRequest: ' + error);
    return { success: false, error: error.toString() };
  }
}

function handleDeleteRequest(sheetName, id) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return { success: false, error: `Sheet "${sheetName}" not found` };
    }
    
    // Find row by ID (assuming first column is the ID)
    const lastRow = sheet.getLastRow();
    const values = sheet.getRange(1, 1, lastRow, 1).getValues();
    let rowIndex = -1;
    
    for (let i = 0; i < values.length; i++) {
      if (values[i][0] == id) {
        rowIndex = i + 1; // +1 because arrays are 0-indexed, but sheets are 1-indexed
        break;
      }
    }
    
    if (rowIndex === -1) {
      return { success: false, error: `Record with ID "${id}" not found` };
    }
    
    // Delete row
    sheet.deleteRow(rowIndex);
    
    return { success: true };
  } catch (error) {
    Logger.log('Error in handleDeleteRequest: ' + error);
    return { success: false, error: error.toString() };
  }
}

function handleSearchRequest(sheetName, query) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return { success: false, error: `Sheet "${sheetName}" not found` };
    }
    
    // Get all data
    const data = getSheetData(sheet);
    
    // Filter data based on query
    const filteredData = data.filter(item => {
      // Check each field in the query
      for (const key in query) {
        if (query[key]) {
          // Special handling for date ranges
          if (key === 'startDate' && item.recordDate) {
            if (new Date(item.recordDate) < new Date(query.startDate)) {
              return false;
            }
          } else if (key === 'endDate' && item.recordDate) {
            if (new Date(item.recordDate) > new Date(query.endDate)) {
              return false;
            }
          } else if (item[key] !== undefined) {
            // For text fields, check if contains the query value
            if (typeof item[key] === 'string' && typeof query[key] === 'string') {
              if (!item[key].toLowerCase().includes(query[key].toLowerCase())) {
                return false;
              }
            } else if (item[key] !== query[key]) {
              return false;
            }
          }
        }
      }
      return true;
    });
    
    return { success: true, data: filteredData };
  } catch (error) {
    Logger.log('Error in handleSearchRequest: ' + error);
    return { success: false, error: error.toString() };
  }
}

// Get a specific claim by document number
function getClaim(documentNumber) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const claimsSheet = ss.getSheetByName('Claims');
    
    if (!claimsSheet) {
      return { success: false, error: 'Claims sheet not found' };
    }
    
    // Get all claims
    const claims = getSheetData(claimsSheet);
    
    // Find the claim with matching document number
    const claim = claims.find(c => c.documentNumber === documentNumber);
    
    if (!claim) {
      return { success: false, error: 'Claim not found' };
    }
    
    // Check if there's financial data for this claim
    try {
      const financialSheet = ss.getSheetByName('FinancialData');
      if (financialSheet) {
        const financialData = getSheetData(financialSheet);
        const claimFinancialData = financialData.find(f => f.documentNumber === documentNumber);
        if (claimFinancialData) {
          claim.financialData = claimFinancialData;
        }
      }
    } catch (error) {
      Logger.log('Error getting financial data: ' + error);
    }
    
    return { success: true, data: [claim] };
  } catch (error) {
    Logger.log('Error in getClaim: ' + error);
    return { success: false, error: error.toString() };
  }
}

// Update financial data for a claim
function updateFinancialData(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let financialSheet = ss.getSheetByName('FinancialData');
    
    // Create sheet if it doesn't exist
    if (!financialSheet) {
      financialSheet = ss.insertSheet('FinancialData');
      
      // Set headers
      const headers = [
        'documentNumber', 'accountNumber', 'checkNumber', 'paymentDate', 
        'paymentAmount', 'fee', 'transferLink', 'financialRecorder', 'financialRecordDate'
      ];
      financialSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // Check if record already exists
    const existingData = getSheetData(financialSheet);
    const existingIndex = existingData.findIndex(item => item.documentNumber === data.documentNumber);
    
    if (existingIndex >= 0) {
      // Update existing record
      return handleUpdateRequest('FinancialData', data.documentNumber, data);
    } else {
      // Create new record
      return handleCreateRequest('FinancialData', data);
    }
  } catch (error) {
    Logger.log('Error in updateFinancialData: ' + error);
    return { success: false, error: error.toString() };
  }
}

// Search for claims based on criteria
function searchClaims(query) {
  return handleSearchRequest('Claims', query);
}

// LINE Notification function
function sendLineNotification(message, token) {
  try {
    // Get token from settings
    if (!token) {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const settingsSheet = ss.getSheetByName('Settings');
      
      if (settingsSheet) {
        const settings = getSheetData(settingsSheet);
        const lineSetting = settings.find(s => s.key === 'LINE_TOKEN');
        if (lineSetting) {
          token = lineSetting.value;
        }
      }
    }
    
    if (!token) {
      Logger.log('No LINE token found');
      return false;
    }
    
    const options = {
      'method': 'post',
      'payload': {'message': message},
      'headers': {'Authorization': 'Bearer ' + token}
    };
    
    UrlFetchApp.fetch('https://notify-api.line.me/api/notify', options);
    return true;
  } catch (error) {
    Logger.log('LINE notification error: ' + error);
    return false;
  }
}

// Email notification function
function sendEmailNotification(recipient, subject, body) {
  try {
    GmailApp.sendEmail(recipient, subject, body);
    return true;
  } catch (error) {
    Logger.log('Email notification error: ' + error);
    return false;
  }
}

// Send notification about new claim
function sendClaimNotification(claimData) {
  try {
    const message = `
🔔 มีใบตั้งเบิกใหม่
เลขที่: ${claimData.documentNumber}
ประเภท: ${claimData.expenseType}
จ่ายให้: ${claimData.payee}
จำนวนเงิน: ${typeof claimData.totalAmount === 'number' ? claimData.totalAmount.toLocaleString('th-TH') : 0} บาท
ผู้บันทึก: ${claimData.recorder}
`;
    
    sendLineNotification(message);
    
    // Also notify by email to approvers
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const usersSheet = ss.getSheetByName('Users');
    
    if (usersSheet) {
      const users = getSheetData(usersSheet);
      const approvers = users.filter(user => user.role === 'approver' && user.active);
      
      if (approvers.length > 0) {
        const subject = `[ใบตั้งเบิกใหม่] ${claimData.documentNumber}`;
        const body = `
เรียน ผู้มีสิทธิ์อนุมัติ

มีใบตั้งเบิกใหม่รอการอนุมัติ
เลขที่: ${claimData.documentNumber}
ประเภท: ${claimData.expenseType}
จ่ายให้: ${claimData.payee}
จำนวนเงิน: ${typeof claimData.totalAmount === 'number' ? claimData.totalAmount.toLocaleString('th-TH') : 0} บาท
ผู้บันทึก: ${claimData.recorder}
วันที่: ${claimData.recordDate}

กรุณาตรวจสอบและดำเนินการต่อไป
`;
        
        approvers.forEach(approver => {
          if (approver.email) {
            sendEmailNotification(approver.email, subject, body);
          }
        });
      }
    }
    
    return true;
  } catch (error) {
    Logger.log('Error sending claim notification: ' + error);
    return false;
  }
}

// Send notification about claim approval
function sendApprovalNotification(claimData) {
  try {
    const message = `
✅ ใบตั้งเบิกได้รับการอนุมัติแล้ว
เลขที่: ${claimData.documentNumber}
ประเภท: ${claimData.expenseType}
จ่ายให้: ${claimData.payee}
จำนวนเงิน: ${typeof claimData.totalAmount === 'number' ? claimData.totalAmount.toLocaleString('th-TH') : 0} บาท
ผู้อนุมัติ: ${claimData.approver || '-'}
`;
    
    sendLineNotification(message);
    
    // Also notify recorder by email
    if (claimData.recorder) {
      const subject = `[อนุมัติแล้ว] ใบตั้งเบิกเลขที่ ${claimData.documentNumber}`;
      const body = `
เรียน ${claimData.recorder}

ใบตั้งเบิกของคุณได้รับการอนุมัติแล้ว
เลขที่: ${claimData.documentNumber}
ประเภท: ${claimData.expenseType}
จ่ายให้: ${claimData.payee}
จำนวนเงิน: ${typeof claimData.totalAmount === 'number' ? claimData.totalAmount.toLocaleString('th-TH') : 0} บาท
ผู้อนุมัติ: ${claimData.approver || '-'}
วันที่อนุมัติ: ${new Date().toLocaleDateString('th-TH')}

ขอบคุณครับ/ค่ะ
`;
      
      // Get email from users sheet
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const usersSheet = ss.getSheetByName('Users');
      
      if (usersSheet) {
        const users = getSheetData(usersSheet);
        const recorder = users.find(user => user.name === claimData.recorder);
        
        if (recorder && recorder.email) {
          sendEmailNotification(recorder.email, subject, body);
        }
      }
    }
    
    return true;
  } catch (error) {
    Logger.log('Error sending approval notification: ' + error);
    return false;
  }
}

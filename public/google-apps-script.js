/**
 * =========================================================================================
 * CANARA BANK GENERAL CATEGORY STAFF WELFARE ASSOCIATION (REGD) - GOOGLE APPS SCRIPT
 * Regd. No. 99 of 2023 under AP Societies Registration Act 2001 (Jurisdiction: Whole of India)
 * =========================================================================================
 * 
 * COLUMN STRUCTURE (Matches your Google Sheet exactly):
 * Col A (1):  Date
 * Col B (2):  Ref Number
 * Col C (3):  Full Name
 * Col D (4):  Staff ID
 * Col E (5):  Cadre
 * Col F (6):  Branch & DP
 * Col G (7):  Circle/RO
 * Col H (8):  Mobile
 * Col I (9):  Email
 * Col J (10): Payment Mode
 * Col K (11): Address
 * Col L (12): Status (Pending Review / Approved / On Hold)
 * Col M (13): Photo URL (Google Drive direct photo link)
 * =========================================================================================
 */

// RUN ONCE IN APPS SCRIPT EDITOR IF DRIVE PERMISSIONS NEED TO BE RENEWED
function authorizeDrive() {
  var folderName = "CBGCSWA Member Photos";
  var folders = DriveApp.getFoldersByName(folderName);
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
  folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  Logger.log("SUCCESS: Google Drive permissions authorized!");
}

// Helper: Save Base64 photo to Drive and return universal thumbnail embed URL
function savePhotoToDrive(base64Str, staffId, fullName) {
  if (!base64Str || base64Str.indexOf("base64,") === -1) {
    return "";
  }
  try {
    var base64Data = base64Str.split("base64,")[1];
    var decoded = Utilities.base64Decode(base64Data);
    var cleanName = (fullName || "Member").toString().replace(/[^a-zA-Z0-9]/g, "_");
    var fileName = "Photo_" + staffId + "_" + cleanName + ".jpg";
    var blob = Utilities.newBlob(decoded, "image/jpeg", fileName);

    var folderName = "CBGCSWA Member Photos";
    var folders = DriveApp.getFoldersByName(folderName);
    var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    // Direct Google CDN image link that renders natively without 302 redirects
    return "https://lh3.googleusercontent.com/d/" + file.getId();
  } catch (err) {
    Logger.log("Error saving photo: " + err.toString());
    return "";
  }
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];

    // Ensure cell M1 has the header "Photo URL"
    if (sheet.getRange(1, 13).getValue() === "") {
      sheet.getRange(1, 13).setValue("Photo URL");
    }

    // Save photo to Google Drive
    var photoUrl = savePhotoToDrive(data.photoBase64, data.staffId, data.fullName);

    // ACTION: UPDATE PHOTO FOR EXISTING MEMBER
    if (data.action === "updatePhoto") {
      var targetStaffId = (data.staffId || "").toString().trim().toLowerCase();
      var values = sheet.getDataRange().getValues();
      var updated = false;

      // Col D is Staff ID (index 3), Col M is Photo URL (index 12)
      for (var r = values.length - 1; r >= 1; r--) {
        if (values[r][3].toString().trim().toLowerCase() === targetStaffId) {
          sheet.getRange(r + 1, 13).setValue(photoUrl);
          updated = true;
          break;
        }
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: updated ? "success" : "not_found",
        photoUrl: photoUrl
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // ACTION: NEW MEMBERSHIP SUBMISSION
    // Columns match your sheet: Col L = Status, Col M = Photo URL
    var newRow = [
      new Date(),                // A: Date
      data.referenceNumber || "",// B: Ref Number
      data.fullName || "",       // C: Full Name
      data.staffId || "",        // D: Staff ID
      data.cadre || "",          // E: Cadre
      data.branchName || "",     // F: Branch & DP
      data.circleOffice || "",   // G: Circle/RO
      data.mobile || "",         // H: Mobile
      data.email || "",          // I: Email
      data.paymentMode || "",    // J: Payment Mode
      data.address || "",        // K: Address
      "Pending Review",          // L: Status (uses your dropdown!)
      photoUrl                   // M: Photo URL (Drive photo link!)
    ];

    sheet.appendRow(newRow);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      referenceNumber: data.referenceNumber,
      photoUrl: photoUrl
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var staffId = (e.parameter.staffId || "").toString().trim().toLowerCase();
    if (!staffId) {
      return ContentService.createTextOutput(JSON.stringify({
        found: false,
        message: "Please provide a Staff Roll Number."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = sheet.getDataRange().getValues();

    if (data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        found: false,
        message: "No applications found in sheet."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Search from bottom up for latest entry
    for (var i = data.length - 1; i >= 1; i--) {
      var rowStaff = data[i][3] ? data[i][3].toString().trim().toLowerCase() : ""; // Col D
      if (rowStaff === staffId) {
        var statusVal = data[i][11] ? data[i][11].toString().trim() : "Pending Review"; // Col L: Status
        var rawPhoto = data[i][12] ? data[i][12].toString().trim() : "";               // Col M: Photo URL

        // Format photo URL
        var photoUrl = "";
        if (rawPhoto.indexOf("http://") === 0 || rawPhoto.indexOf("https://") === 0 || rawPhoto.indexOf("data:image/") === 0) {
          photoUrl = rawPhoto;
        }

        var dateFormatted = "";
        if (data[i][0]) {
          try {
            dateFormatted = Utilities.formatDate(new Date(data[i][0]), Session.getScriptTimeZone(), "dd-MMM-yyyy");
          } catch (e) {
            dateFormatted = data[i][0].toString();
          }
        }

        return ContentService.createTextOutput(JSON.stringify({
          found: true,
          data: {
            submissionDate: dateFormatted,
            referenceNumber: data[i][1] || "",  // Col B
            fullName: data[i][2] || "",         // Col C
            staffId: data[i][3] || "",          // Col D
            cadre: data[i][4] || "",            // Col E
            branchName: data[i][5] || "",       // Col F
            circleOffice: data[i][6] || "",     // Col G
            mobile: data[i][7] || "",           // Col H
            email: data[i][8] || "",            // Col I
            paymentMode: data[i][9] || "",      // Col J
            address: data[i][10] || "",         // Col K
            status: statusVal,                  // Col L: Status
            photoUrl: photoUrl                  // Col M: Photo URL
          }
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      found: false,
      message: "No application record found for Staff Roll No: " + staffId
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      found: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

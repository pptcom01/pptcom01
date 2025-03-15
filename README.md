<!DOCTYPE html>
<html lang="th">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ใบตั้งเบิก</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        /* General Styles (คงไว้เหมือนเดิม) */
        html {
            box-sizing: border-box;
            font-size: 16px;
        }

        *,
        *:before,
        *:after {
            box-sizing: inherit;
        }

        body {
            font-family: 'Sarabun', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            line-height: 1.5;
        }

        h1,
        h2,
        a {
            font-family: "DBThaiTextX", Helvetica, Arial, sans-serif;
            color: #333;
            line-height: 1.2;
        }

        #info-bar {
            background-color: #f0f0f0;
            padding: 0.5em;
            text-align: right;
            width: 100%;
            font-size: 0.8em;
        }

        /* เพิ่ม CSS สำหรับแบ่งหน้าจอ */
        .container {
            display: flex;
            width: 100%;
            max-width: 1800px;
            margin: 20px auto;
            background-color: white;
            border-radius: 0.5em;
            box-shadow: 0 0.25em 0.625em rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;
        }

        .left-panel {
            width: 50%;
            padding: 1.875em;
            border-right: 1px solid #ddd;
        }

        .right-panel {
            width: 50%;
            padding: 1.875em;
            
        }

        /* Styles สำหรับส่วน "ใบตั้งเบิก" (left-panel) */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 0.3125em;
            margin-bottom: 0.625em;
        }

        .header img {
            width: 9.375em;
        }

        .header .title {
            font-size: 4.375em;
            font-weight: bold;
            color: #1E5631;
            text-align: center;
            line-height: 1;
        }

        .company-info {
            font-size: 1em;
            line-height: 1.2;
            margin-bottom: 0.625em;
        }

        .form-container,
        .section-title {
            font-size: 1em;
            line-height: 1.2;
            margin-bottom: 1.25em;
        }

        .section-title {
            font-size: 1.125em;
            font-weight: bold;
            color: #1E5631;
            border-bottom: 2px solid #1E5631;
            padding-bottom: 0.1875em;
        }

        .form-container {
            display: grid;
            grid-template-columns: 1.5fr 1fr;
            gap: 0.625em;
        }

        .editable-input {
            font-size: 1em;
            padding: 0.125em;
            border: 1px solid #ccc;
            outline: none;
            width: auto;
            min-width: 6.25em;
            max-width: 100%;
        }

        .doc-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 0.3125em;
        }

        .doc-table th,
        .doc-table td {
            padding: 0.375em;
            text-align: center;
            font-size: 1em;
            line-height: 1.2;
            border: 1px solid #ddd;
            color: #333;
        }

        .doc-table th {
            background: #1E5631;
            color: white;
            font-weight: bold;
            text-align: center;
        }

        .doc-table tr:nth-child(even) {
            background: #f9f9f9;
        }

        .total-row {
            font-weight: bold;
            background-color: #e3f2e3;
            line-height: 1.2;
        }

        .signature-box {
            display: inline-block;
            width: 30%;
            border-top: 1px solid #000;
            padding-top: 0.3125em;
            text-align: center;
            margin-top: 1.25em;
            font-size: 1em;
            line-height: 1.2;
        }

        .print-button {
            display: block;
            width: 100%;
            max-width: 18.75em;
            margin: 0.625em auto;
            background: #f39c12;
            color: white;
            padding: 0.5em;
            border: none;
            cursor: pointer;
            border-radius: 0.375em;
            font-size: 1em;
            font-weight: bold;
            transition: background 0.3s;
            line-height: 1.2;
        }

        .print-button:hover {
            background: #e67e22;
        }

        .hidden {
            display: none;
        }

        .amount-input {
            text-align: right !important;
            padding-right: 0.625em !important;
            width: 100% !important;
            border: none;
            outline: none;
            font-size: 1em;
            line-height: 1.2;
        }

        .doc-table th:nth-child(3),
        .doc-table td:nth-child(3) {
            width: 7.5em;
            min-width: 7.5em;
            max-width: 7.5em;
            text-align: right;
            white-space: nowrap;
            font-size: 1em;
            line-height: 1.2;
        }

        .doc-table td:nth-child(2) {
            text-align: left !important;
            padding-left: 0.625em !important;
            white-space: normal !important;
            word-wrap: break-word !important;
            font-size: 1em;
        }

        .signature-container {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin-top: 3.0em;
            text-align: center;
        }

        .editable {
            display: inline-block;
            min-width: 3.125em;
            padding: 0.125em 0.25em;
            border-bottom: 1px dashed #aaa;
            outline: none;
            white-space: nowrap;
            overflow: hidden;
            font-size: 1em;
        }

        .editable:focus {
            border-bottom: 1px solid #000;
        }

        .doc-table td#totalAmount {
            text-align: right !important;
        }

        [contenteditable="true"],
        .input-style {
            border: none !important;
            outline: none !important;
            background: transparent !important;
            font-size: 1em;
        }

        input[type="text"],
        input[type="number"],
        input[type="date"] {
            width: auto;
            min-width: 1.25em;
            max-width: 100%;
            font-size: 1em;
            padding: 0.0625em !important;
            border: none !important;
            outline: none !important;
            background: transparent !important;
        }

        .center-input {
            text-align: center;
        }

        .center-header {
            text-align: center;
        }

        .doc-table.financial-record-table th {
            text-align: center;
        }

        .doc-table.financial-record-table th:nth-child(3),
        .doc-table.financial-record-table td:nth-child(3) {
            width: 150px;
        }

        .doc-table.financial-record-table td:nth-child(3) {
            text-align: center;
        }

        .remove-button {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
        }

        .remove-button:hover {
            background-color: #c0392b;
        }

        .error-message {
            color: red;
            font-size: 0.8em;
            margin-top: 0.2em;
        }

        #qrcode {
            margin-top: 10px;
            text-align: center;
        }

        #qrcode.hidden {
            display: none;
        }

        #transferLink {
            width: 95% !important;
            display: inline-block;
            box-sizing: border-box;
        }

        /* Styles สำหรับส่วน "รายการตั้งเบิกที่บันทึก" (right-panel) */
        #recorded-list {
            width: 100%;
            border-collapse: collapse;
        }

        #recorded-list th,
        #recorded-list td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        #recorded-list th {
            background-color: #f2f2f2;
        }

        #search-box {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            box-sizing: border-box;
        }

      @media print {
    body {
        background-color: #fff;
        display: block;
        font-size: 10px;
        line-height: 1.2;
    }

    /* Ensure #info-bar is hidden */
    #info-bar {
        display: none !important;
        visibility: hidden !important; /* Add visibility: hidden for extra measure */
    }

    .container {
        width: 100% !important;
        max-width: none !important;
        padding: 0.5em !important;
        border: none !important;
        box-shadow: none !important;
        display: block; /* Prevent flexbox layout */
    }

    .left-panel,
    .right-panel {
        width: 100% !important; /* Each panel takes full width */
        border: none !important; /* Remove border between panels */
        padding: 0.5em !important;
    }

    .header {
        display: flex !important;
        margin-bottom: 0.2em;
    }

    .header img {
        width: 10em;
    }

    .header .title {
        font-size: 2em;
    }

    .company-info {
        font-size: 0.8em;
        margin-bottom: 0.3em;
    }

    .section-title {
        font-size: 1em;
        margin-bottom: 0.5em;
        padding-bottom: 0.1em;
    }

    .form-container {
        grid-template-columns: 1.5fr 1fr;
        gap: 0.3em;
    }

    .form-container p {
        margin-bottom: 0.1em;
    }

    .editable-input {
        font-size: 0.8em;
        padding: 0.05em;
    }

    .doc-table {
        margin-top: 0.1em;
    }

    .doc-table th,
    .doc-table td {
        padding: 0.2em;
        font-size: 0.8em;
    }

    .signature-container {
        margin-top: 5em;
    }

    .signature-box {
        width: 30%;
        margin-top: 0.3em;
        font-size: 0.8em;
    }

    .print-button {
        display: none !important;
    }

    .doc-table th:last-child,
    .doc-table td:last-child {
        display: none;
    }

    .doc-table th:last-child:only-child,
    .doc-table td:last-child:only-child {
        display: none;
    }

    .doc-table:has(th:last-child:only-child) {
        display: none;
    }

    /* สไตล์สำหรับพิมพ์ใบตั้งเบิก */
    .printing-baisetberk #financialRecordTitle,
    .printing-baisetberk #financialRecordTable,
    .printing-baisetberk #transferLinkLabel,
    .printing-baisetberk #qrCodeAndInfo,
    .printing-baisetberk #printTransferBtn {
        display: none !important;
    }

    /* สไตล์สำหรับพิมพ์รายการโอน */
    .printing-transfer .header,
    .printing-transfer .company-info,
    .printing-transfer .form-container,
    .printing-transfer .doc-table:not(.financial-record-table),
    .printing-transfer .signature-container,
    .printing-transfer #printBtn,
    .printing-transfer #addRowBtn {
        display: none !important;
    }

    /* แสดงเฉพาะส่วนที่ต้องการพิมพ์ในรายการโอน */
    .printing-transfer .financial-record-table,
    .printing-transfer #qrcode,
    .printing-transfer #transferLink {
        display: block !important;
        page-break-inside: avoid;
    }

    /* ซ่อนส่วนของ "รายการตั้งเบิกที่บันทึก" ในหน้าพิมพ์ */
    .right-panel {
        display: none !important;
    }
}
    </style>
</head>

<body>
    <div id="info-bar">
        Current Date and Time (UTC - YYYY-MM-DD HH:55:51
        | Current User's Login: pptcom01
    </div>
    <div class="container">
        <div class="left-panel">
            <!-- ส่วนของ "ใบตั้งเบิก" -->
            <div class="header">
                <img src="https://i.imgur.com/AcUUbXI.png" alt="BTC Logo">
                <div class="title">ใบตั้งเบิก</div>
            </div>
            <div class="company-info">
                <p><strong>บริษัท บุรีรัมย์ธวัชชัยก่อสร้าง จำกัด</strong></p>
                <p>3/12 ถนนอินจันทร์ณรงค์ ต.ในเมือง อ.เมือง จ.บุรีรัมย์ 31000</p>
                <p>เลขประจำตัวผู้เสียภาษี: 031555900114 โทรศัพท์: 044-611835</p>
            </div>

            <div class="section-title">ข้อมูลการตั้งเบิก</div>
            <div class="form-container">
                <div>
                    <p><strong>ประเภทงาน/รายจ่าย :</strong>
                        <input type="text" value="ค่าโทรศัพท์เคลื่อนที่" class="editable-input input-style"
                            id="expenseType" aria-label="ประเภทงาน/รายจ่าย">
                    </p>
                    <p><strong>จ่ายให้แก่ :</strong>
                        <input type="text" value="102-01-001 แสงสมหมายสื่อสาร" class="editable-input input-style"
                            id="payee" aria-label="จ่ายให้แก่">
                    </p>
                    <p><strong>บัญชีธนาคาร :</strong>
                        <input type="text" value="กรุงไทย เลขที่บัญชี: 643-7-423440" class="editable-input input-style"
                            id="bankAccount" aria-label="บัญชีธนาคาร">
                    </p>
                    <p><strong>โครงการ :</strong>
                        <input type="text" value="(37) โครงการก่อสร้างภายในโกดัง" class="editable-input input-style"
                            id="project" aria-label="โครงการ">
                    </p>
                    <p><strong>รูปแบบการจ่าย :</strong>
                        <input type="text" value="(37) โอน" class="editable-input input-style" id="paymentType"
                            aria-label="รูปแบบการจ่าย">
                    </p>
                </div>
                <div>
                    <p><strong>เลขที่เอกสาร :</strong>
                        <input type="text" value="DBM25030006" class="editable-input input-style"
                            id="documentNumber" aria-label="เลขที่เอกสาร">
                    </p>
                    <p><strong>วันที่เอกสาร :</strong>
                        <input type="date" value="2025-03-03" class="input-style" id="documentDate"
                            aria-label="วันที่เอกสาร">
                    </p>
                    <p><strong>เอกสารอ้างอิง :</strong>
                        <input type="text" value="OE6800066" class="editable-input input-style"
                            id="referenceDocument" aria-label="เอกสารอ้างอิง">
                    </p>
                    <p><strong>วันที่ครบกำหนดจ่าย :</strong>
                        <input type="date" value="2025-03-03" class="input-style" id="dueDate"
                            aria-label="วันที่เอกสาร">
                    </p>
                </div>
            </div>

            <div class="section-title">รายการเอกสาร</div>
            <table class="doc-table">
                <thead>
                    <tr>
                        <th style="text-align:center;">ลำดับที่</th>
                        <th>รายการ / Description</th>
                        <th style="text-align:right;">จำนวนเงิน (บาท)</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody id="docBody"></tbody>
                <tfoot>
                    <tr class="total-row">
                        <td colspan="2" style="text-align:right;">
                            <span id="totalAmountText"></span> ยอดรวมสุทธิ
                        </td>
                        <td id="totalAmount" style="text-align:right;">0.00</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <button class="print-button" id="addRowBtn">เพิ่มรายการ</button>

            <div class="signature-container">
                <div class="signature-box">
                    <p>(_____________________________)</p>
                    <p>ผู้บันทึกรายการเบิก</p>
                </div>
                <div class="signature-box">
                    <p>(_____________________________)</p>
                    <p>ผู้ตรวจสอบ</p>
                </div>
                <div class="signature-box">
                    <p>(_____________________________)</p>
                    <p>ผู้อนุมัติ</p>
                </div>
            </div>

            <button class="print-button" id="printBtn" onclick="printBaisetberk()">พิมพ์ใบตั้งเบิก</button>

            <div class="section-title">บันทึกรายการฝ่ายการเงิน</div>
            <table class="doc-table financial-record-table">
                <thead>
                    <tr>
                        <th class="center-header">เลขที่บัญชี</th>
                        <th class="center-header">เลขที่เช็ค</th>
                        <th class="center-header">วันที่</th>
                        <th class="center-header">จำนวนเงิน</th>
                        <th class="center-header">ค่าธรรมเนียม</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" value="-" class="editable-input input-style center-input"
                                id="accountNumber" aria-label="เลขที่บัญชี"></td>
                        <td><input type="text" value="-" class="editable-input input-style center-input"
                                id="checkNumber" aria-label="เลขที่เช็ค"></td>
                        <td><input type="text" value="-" class="editable-input input-style center-input"
                                id="paymentDate" aria-label="วันที่"></td>
                        <td><input type="text" value="-" class="editable-input input-style center-input"
                                id="paymentAmount" aria-label="จำนวนเงิน"></td>
                        <td><input type="text" value="-" class="editable-input input-style center-input" id="fee"
                                aria-label="ค่าธรรมเนียม"></td>
                    </tr>
                </tbody>
            </table>

            <p>
                <strong>ลิงค์ใบโอน:</strong>
                <input type="text" id="transferLink" class="editable-input input-style" value="-"
                    oninput="generateQRCode()" aria-label="ลิงค์ใบโอน">
            </p>

            <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-top: 0.5em;">
                <div id="qrcode" style="margin-top:10px; text-align: center;"></div>
                <div style="text-align: center;">
                    .................................................<br><br>
                    วันที่....................................<br><br>
                    ผู้บันทึกข้อมูล : น.ส.อุไร นิกูลรัมย์
                </div>
            </div>
            <button class="print-button" id="printTransferBtn" onclick="printTransfer()">พิมพ์รายการโอน</button>
        </div>

        <div class="right-panel">
            <!-- ส่วนของ "รายการตั้งเบิกที่บันทึก" -->
            <h2>รายการตั้งเบิกที่บันทึก</h2>
            <input type="text" id="search-box" placeholder="ค้นหา...">
            <table id="recorded-list">
                <thead>
                    <tr>
                        <th>เลขที่เอกสาร</th>
                        <th>วันที่เอกสาร</th>
                        <th>ประเภทงาน/รายจ่าย</th>
                        <th>จำนวนเงิน</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- รายการจะถูกเพิ่มด้วย JavaScript -->
                </tbody>
            </table>
        </div>
    </div>

    <span id="textWidth" style="visibility: hidden; white-space: pre;"></span>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <script>
        // JavaScript code (will be updated later)
        document.addEventListener('DOMContentLoaded', function () {
            generateQRCode();
            initDynamicTable();
            loadRecordedList(); // Function to load recorded list
        });

        function generateQRCode() {
            const qrcodeDiv = document.getElementById('qrcode');
            const link = document.getElementById('transferLink').value;

            qrcodeDiv.innerHTML = ""; // Clear previous QR code

            if (link) {
                new QRCode(qrcodeDiv, {
                    text: link,
                    width: 128,
                    height: 128,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
            } else {
                qrcodeDiv.innerText = "No link available";
            }
        }

        function initDynamicTable() {
            const docBody = document.getElementById("docBody");
            const addRowBtn = document.getElementById("addRowBtn");
            const totalAmountText = document.getElementById("totalAmountText");
            const totalAmountElement = document.getElementById("totalAmount"); // Changed to element
            const textWidth = document.getElementById("textWidth");

            let rowCount = 0;

            // --- Utility Functions ---
            function adjustInputSize(input) {
                textWidth.innerText = input.value.trim() || input.placeholder;
                const padding = 4;
                const borderWidth = 2;
                input.style.width = textWidth.offsetWidth + padding + borderWidth + 'px';
            }

            function formatAmount(input) {
                let value = input.value.replace(/,/g, '');
                if (!isNaN(value) && value.trim() !== '') {
                    input.value = formatNumber(parseFloat(value).toFixed(2));
                    clearError(input);
                } else {
                    input.value = '';
                    showError(input, 'กรุณาใส่จำนวนเงินที่ถูกต้อง');
                }
                updateTotalAmount();
            }

            function formatNumber(number) {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            function numberToThaiText(number) {
                const numText = ["ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
                const unitText = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];
                let bahtText = "";
                let numberStr = Math.floor(number).toString();
                let decimalPart = Math.round((number - Math.floor(number)) * 100);
                let len = numberStr.length;

                for (let i = 0; i < len; i++) {
                    let digit = parseInt(numberStr[i]);
                    let unit = len - i - 1;
                    if (digit !== 0) {
                        if (unit === 1 && digit === 1) {
                            bahtText += "สิบ";
                        } else if (unit === 1 && digit === 2) {
                            bahtText += "ยี่สิบ";
                        } else {
                            bahtText += numText[digit] + unitText[unit];
                        }
                    }
                }

                bahtText += "บาท";
                if (decimalPart > 0) {
                    bahtText += " " + numText[decimalPart] + "สตางค์";
                } else {
                    bahtText += "ถ้วน";
                }

                return bahtText;
            }

            function showError(inputElement, message) {
                let errorSpan = inputElement.parentNode.querySelector('.error-message');
                if (!errorSpan) {
                    errorSpan = document.createElement('span');
                    errorSpan.className = 'error-message';
                    inputElement.parentNode.appendChild(errorSpan);
                }
                errorSpan.innerText = message;
            }

            function clearError(inputElement) {
                const errorSpan = inputElement.parentNode.querySelector('.error-message');
                if (errorSpan) {
                    errorSpan.remove();
                }
            }

            // --- Row Management ---
            function removeRow(rowId) {
                if (confirm("คุณต้องการลบรายการนี้หรือไม่?")) {
                    const row = document.querySelector(`tr[data-row-id='${rowId}']`);
                    if (row) {
                        row.remove();
                        updateRowNumbers();
                        updateTotalAmount();
                    }
                }
            }

            function updateRowNumbers() {
                const rows = docBody.querySelectorAll("tr");
                rowCount = 0;
                rows.forEach((row, index) => {
                    rowCount = index + 1;
                    row.setAttribute("data-row-id", rowCount);
                    row.cells[0].textContent = rowCount;

                    const descriptionInput = row.querySelector(".description-input");
                    const amountInput = row.querySelector(".amount-input");
                    const removeButton = row.querySelector(".remove-button");

                    descriptionInput.setAttribute("aria-label", `รายการที่ ${rowCount}`);
                    amountInput.setAttribute("aria-label", `จำนวนเงินของรายการที่ ${rowCount}`);

                    removeButton.setAttribute("onclick", `removeRow(${rowCount})`);
                    removeButton.setAttribute("aria-label", `ลบรายการที่ ${rowCount}`);
                });
            }


            function createRow() {
                rowCount++;
                const newRow = document.createElement("tr");
                newRow.setAttribute("data-row-id", rowCount);

                newRow.innerHTML = `
                    <td style="text-align:center;">${rowCount}</td>
                    <td>
                        <input type="text" id="description_${rowCount}" placeholder="ระบุรายการ"
                            class="description-input input-style" aria-label="รายการที่ ${rowCount}">
                            <span class="error-message"></span>
                    </td>
                    <td>
                        <input type="text" id="amount_${rowCount}" placeholder="จำนวนเงิน" class="amount-input input-style" aria-label="จำนวนเงินของรายการที่ ${rowCount}">
                        <span class="error-message"></span>
                    </td>
                    <td><button class="remove-button" onclick="removeRow(${rowCount})" aria-label="ลบรายการที่ ${rowCount}">ลบ</button></td>
                `;

                const descriptionInput = newRow.querySelector(".description-input");
                const amountInput = newRow.querySelector(".amount-input");

                descriptionInput.addEventListener("input", () => adjustInputSize(descriptionInput));
                amountInput.addEventListener("blur", () => formatAmount(amountInput));

                return newRow;
            }


            // --- Total Amount Calculation ---
            function updateTotalAmount() {
                let totalAmountValue = 0;
                docBody.querySelectorAll("tr").forEach(row => {
                    const amountInput = row.querySelector(".amount-input");
                    if (amountInput) {
                        const amount = parseFloat(amountInput.value.replace(/,/g, '')) || 0;
                        totalAmountValue += amount;
                    }
                });

                const formattedTotal = formatNumber(totalAmountValue.toFixed(2));
                totalAmountElement.textContent = formattedTotal;
                totalAmountText.textContent = "(" + numberToThaiText(totalAmountValue) + ")";
            }

            // --- Event Listeners ---
            addRowBtn.addEventListener("click", () => {
                const newRow = createRow();
                docBody.appendChild(newRow);
                updateRowNumbers();
            });

            // --- Initialization ---
            function attachInputListeners(selector) {
                const inputs = document.querySelectorAll(selector);
                inputs.forEach(input => adjustInputSize(input));
            }

            attachInputListeners(".editable-input");

            // Initial row setup (if needed, add some default rows)
            updateTotalAmount();
        }

        // Function to load data from Google Sheet
        function loadRecordedList() {
            const recordedListTable = document.getElementById("recorded-list").getElementsByTagName('tbody')[0];
            const searchBox = document.getElementById("search-box");

            // Replace with your Google Apps Script Web App URL
            const scriptURL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

            fetch(scriptURL)
                .then(response => response.json())
                .then(data => {
                    // Sort data by date (assuming there's a date field)
                    data.sort((a, b) => new Date(b["วันที่เอกสาร"]) - new Date(a["วันที่เอกสาร"]));

                    // Function to display data
                    function displayData(items) {
                        recordedListTable.innerHTML = ""; // Clear existing data
                        items.forEach(item => {
                            let newRow = recordedListTable.insertRow();
                            let documentNumberCell = newRow.insertCell();
                            let documentDateCell = newRow.insertCell();
                            let expenseTypeCell = newRow.insertCell();
                            let amountCell = newRow.insertCell();

                            documentNumberCell.textContent = item["เลขที่เอกสาร"];
                            documentDateCell.textContent = item["วันที่เอกสาร"];
                            expenseTypeCell.textContent = item["ประเภทงาน/รายจ่าย"];
                            amountCell.textContent = item["จำนวนเงิน"]; // Assuming there's an amount field

                            // Add click event to load data into the left panel
                            newRow.addEventListener("click", () => {
                                loadDataToLeftPanel(item);
                            });
                        });
                    }

                    // Initial display
                    displayData(data);

                    // Search functionality
                    searchBox.addEventListener("input", function () {
                        const searchTerm = searchBox.value.toLowerCase();
                        const filteredData = data.filter(item => {
                            return item["เลขที่เอกสาร"].toLowerCase().includes(searchTerm) ||
                                item["วันที่เอกสาร"].toLowerCase().includes(searchTerm) ||
                                item["ประเภทงาน/รายจ่าย"].toLowerCase().includes(searchTerm);
                        });
                        displayData(filteredData);
                    });
                })
                .catch(error => console.error("Error fetching data:", error));
        }

        // Function to load data from recorded list to left panel
        function loadDataToLeftPanel(item) {
            document.getElementById("expenseType").value = item["ประเภทงาน/รายจ่าย"];
            document.getElementById("payee").value = item["จ่ายให้แก่"];
            document.getElementById("bankAccount").value = item["บัญชีธนาคาร"];
            document.getElementById("project").value = item["โครงการ"];
            document.getElementById("paymentType").value = item["รูปแบบการจ่าย"];
            document.getElementById("documentNumber").value = item["เลขที่เอกสาร"];
            document.getElementById("documentDate").value = item["วันที่เอกสาร"];
            document.getElementById("referenceDocument").value = item["เอกสารอ้างอิง"];
            document.getElementById("dueDate").value = item["วันที่ครบกำหนดจ่าย"];
            // Load other fields as needed
        }

        function removeRow(rowId) {
            if (confirm("คุณต้องการลบรายการนี้หรือไม่?")) {
                const row = document.querySelector(`tr[data-row-id='${rowId}']`);
                if (row) {
                    row.remove();
                    updateRowNumbers();
                    updateTotalAmount();
                }
            }
        }

        function printBaisetberk() {
    document.body.classList.add('printing-baisetberk');
    window.print();
    document.body.classList.remove('printing-baisetberk');
}

function printTransfer() {
    document.body.classList.add('printing-transfer');
    window.print();
    document.body.classList.remove('printing-transfer');
}
    </script>
</body>

</html>

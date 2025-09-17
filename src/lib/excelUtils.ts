import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const generateUATExcel = (
  projectName: string,
  ownerName: string,
  machineType: string,
  configData: Record<string, string>,
  checklistData: Record<string, { status: string; comments: string }>,
  specialRequirements: string,
  pmSignature: string,
  qualitySignature: string,
  machineImageUrl: string
) => {
  // Define base styles
  const defaultCellStyle = {
    font: { sz: 12 },
    alignment: { vertical: "top", horizontal: "left", wrapText: true },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
  };

  const boldTitleStyle = {
    font: { sz: 14, bold: true },
    alignment: { vertical: "top", horizontal: "left", wrapText: true },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
  };

  const headerCellStyle = {
    font: { sz: 12, bold: true },
    alignment: { vertical: "top", horizontal: "left", wrapText: true },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
  };

  const urlCellStyle = {
    font: { sz: 10, italic: true, color: { rgb: "0000FF" } },
    alignment: { vertical: "top", horizontal: "left", wrapText: true },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
  };

  const noteCellStyle = {
    font: { sz: 10, italic: true },
    alignment: { vertical: "top", horizontal: "left", wrapText: true },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
  };

  const ws_data_rows: any[][] = [];
  const merges: XLSX.Range[] = [];
  let currentRow = 0; // Keep track of the current row index (0-based)

  // UAT Test Plan
  ws_data_rows.push([{ v: "UAT Test Plan", s: boldTitleStyle }]);
  merges.push(XLSX.utils.decode_range(`A${currentRow + 1}:D${currentRow + 1}`));
  currentRow++;

  ws_data_rows.push([]); // Empty row
  currentRow++;

  // Project, Owner, Machine Type
  ws_data_rows.push([{ v: "Project:", s: defaultCellStyle }, { v: projectName, s: defaultCellStyle }]);
  currentRow++;
  ws_data_rows.push([{ v: "Owner:", s: defaultCellStyle }, { v: ownerName, s: defaultCellStyle }]);
  currentRow++;
  ws_data_rows.push([{ v: "Machine Type:", s: defaultCellStyle }, { v: machineType, s: defaultCellStyle }]);
  currentRow++;

  ws_data_rows.push([]); // Empty row
  currentRow++;

  // Machine Image section
  if (machineImageUrl) {
    ws_data_rows.push([null, null, { v: "Machine Image:", s: boldTitleStyle }]); // C column
    merges.push(XLSX.utils.decode_range(`C${currentRow + 1}:D${currentRow + 1}`));
    currentRow++;
    ws_data_rows.push([
      null, null, { v: "Please insert machine image here manually. Reference URL:", s: noteCellStyle, l: { Target: machineImageUrl, Tooltip: machineImageUrl } } // C column
    ]);
    merges.push(XLSX.utils.decode_range(`C${currentRow + 1}:D${currentRow + 1}`));
    currentRow++;
    ws_data_rows.push([]); // Empty row
    currentRow++;
  }

  // Configuration Fields section
  ws_data_rows.push([{ v: "Configuration Fields:", s: boldTitleStyle }]);
  merges.push(XLSX.utils.decode_range(`A${currentRow + 1}:D${currentRow + 1}`));
  currentRow++;
  for (const key in configData) {
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) + ":";
    const value = configData[key];
    ws_data_rows.push([{ v: label, s: defaultCellStyle }, { v: value, s: defaultCellStyle }]);
    currentRow++;
  }

  ws_data_rows.push([]); // Empty row
  currentRow++;

  // UAT Checklist section
  ws_data_rows.push([{ v: "UAT Checklist:", s: boldTitleStyle }]);
  merges.push(XLSX.utils.decode_range(`A${currentRow + 1}:D${currentRow + 1}`));
  currentRow++;
  ws_data_rows.push([
    { v: "Test Case ID", s: headerCellStyle },
    { v: "Description", s: headerCellStyle },
    { v: "Status (Pass/Fail/N/A)", s: headerCellStyle },
    { v: "Comments", s: headerCellStyle }
  ]);
  currentRow++;

  // Add checklist items
  let testCaseId = 1;
  for (const item in checklistData) {
    ws_data_rows.push([
      { v: testCaseId++, s: defaultCellStyle },
      { v: item, s: defaultCellStyle },
      { v: checklistData[item].status, s: defaultCellStyle },
      { v: checklistData[item].comments, s: defaultCellStyle }
    ]);
    currentRow++;
  }

  ws_data_rows.push([]); // Empty row
  currentRow++;

  // Special Requirements
  ws_data_rows.push([{ v: "Special Requirements:", s: boldTitleStyle }]);
  merges.push(XLSX.utils.decode_range(`A${currentRow + 1}:D${currentRow + 1}`));
  currentRow++;
  ws_data_rows.push([{ v: specialRequirements, s: defaultCellStyle }]);
  merges.push(XLSX.utils.decode_range(`A${currentRow + 1}:D${currentRow + 1}`));
  currentRow++;

  ws_data_rows.push([]); // Empty row
  currentRow++;

  // Signatures
  ws_data_rows.push([{ v: "PM Signature:", s: boldTitleStyle }, { v: pmSignature, s: defaultCellStyle }]);
  currentRow++;
  ws_data_rows.push([{ v: "Quality Signature:", s: boldTitleStyle }, { v: qualitySignature, s: defaultCellStyle }]);
  currentRow++;

  const ws = XLSX.utils.aoa_to_sheet(ws_data_rows);

  // Apply merges
  ws['!merges'] = merges;

  // Set column widths for better readability
  const wscols = [
    { wch: 15 }, // Column A: Test Case ID / Label
    { wch: 60 }, // Column B: Description / Value
    { wch: 20 }, // Column C: Status
    { wch: 50 }  // Column D: Comments
  ];
  ws['!cols'] = wscols;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "UAT Checklist");

  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(data, `UAT_Checklist_${projectName.replace(/\s/g, '_')}_${machineType.replace(/\s/g, '_')}.xlsx`);
};
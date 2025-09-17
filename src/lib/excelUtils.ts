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

  const ws_data_rows: any[][] = [
    [{ v: "UAT Test Plan", s: boldTitleStyle }],
    [],
    [{ v: "Project:", s: defaultCellStyle }, { v: projectName, s: defaultCellStyle }],
    [{ v: "Owner:", s: defaultCellStyle }, { v: ownerName, s: defaultCellStyle }],
    [{ v: "Machine Type:", s: defaultCellStyle }, { v: machineType, s: defaultCellStyle }],
    [],
  ];

  // Add Machine Image section prominently
  if (machineImageUrl) {
    ws_data_rows.push([{ v: "Machine Image (for reference):", s: boldTitleStyle }]);
    ws_data_rows.push([
      { v: machineImageUrl, s: urlCellStyle, l: { Target: machineImageUrl, Tooltip: machineImageUrl } }
    ]);
    ws_data_rows.push([
      { v: "Please insert machine image here manually.", s: noteCellStyle }
    ]);
    ws_data_rows.push([]);
  }

  // Configuration Fields section
  ws_data_rows.push([{ v: "Configuration Fields:", s: boldTitleStyle }]);
  for (const key in configData) {
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) + ":";
    const value = configData[key];
    ws_data_rows.push([{ v: label, s: defaultCellStyle }, { v: value, s: defaultCellStyle }]);
  }

  ws_data_rows.push([]);
  ws_data_rows.push([{ v: "UAT Checklist:", s: boldTitleStyle }]);
  ws_data_rows.push([
    { v: "Test Case ID", s: headerCellStyle },
    { v: "Description", s: headerCellStyle },
    { v: "Status (Pass/Fail/N/A)", s: headerCellStyle },
    { v: "Comments", s: headerCellStyle }
  ]);

  // Add checklist items
  let testCaseId = 1;
  for (const item in checklistData) {
    ws_data_rows.push([
      { v: testCaseId++, s: defaultCellStyle },
      { v: item, s: defaultCellStyle },
      { v: checklistData[item].status, s: defaultCellStyle },
      { v: checklistData[item].comments, s: defaultCellStyle }
    ]);
  }

  ws_data_rows.push([]);
  ws_data_rows.push([{ v: "Special Requirements:", s: boldTitleStyle }]);
  ws_data_rows.push([{ v: specialRequirements, s: defaultCellStyle }]);
  ws_data_rows.push([]);
  ws_data_rows.push([{ v: "PM Signature:", s: boldTitleStyle }, { v: pmSignature, s: defaultCellStyle }]);
  ws_data_rows.push([{ v: "Quality Signature:", s: boldTitleStyle }, { v: qualitySignature, s: defaultCellStyle }]);


  const ws = XLSX.utils.aoa_to_sheet(ws_data_rows);

  // Set column widths for better readability
  const wscols = [
    { wch: 15 }, // Test Case ID / Label
    { wch: 60 }, // Description / Value
    { wch: 20 }, // Status
    { wch: 50 }  // Comments
  ];
  ws['!cols'] = wscols;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "UAT Checklist");

  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(data, `UAT_Checklist_${projectName.replace(/\s/g, '_')}_${machineType.replace(/\s/g, '_')}.xlsx`);
};
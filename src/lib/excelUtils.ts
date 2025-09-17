import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const generateUATExcel = (projectName: string, ownerName: string) => {
  const ws_data = [
    ["UAT Test Plan"],
    [],
    ["Project:", projectName],
    ["Owner:", ownerName],
    [],
    ["Test Case ID", "Description", "Steps", "Expected Result", "Actual Result", "Status (Pass/Fail)", "Comments"]
  ];

  const ws = XLSX.utils.aoa_to_sheet(ws_data);

  // Set column widths for better readability
  const wscols = [
    { wch: 15 }, // Test Case ID
    { wch: 40 }, // Description
    { wch: 50 }, // Steps
    { wch: 40 }, // Expected Result
    { wch: 40 }, // Actual Result
    { wch: 20 }, // Status
    { wch: 50 }  // Comments
  ];
  ws['!cols'] = wscols;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "UAT Checklist");

  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(data, `UAT_Checklist_${projectName.replace(/\s/g, '_')}.xlsx`);
};
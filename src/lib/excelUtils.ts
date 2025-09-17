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
  const ws_data: any[][] = [
    ["UAT Test Plan"],
    [],
    ["Project:", projectName],
    ["Owner:", ownerName],
    ["Machine Type:", machineType],
    [],
    ["Configuration Fields:"],
  ];

  // Add configuration fields
  for (const key in configData) {
    ws_data.push([key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) + ":", configData[key]]);
  }

  ws_data.push([]);
  ws_data.push(["UAT Checklist:"]);
  ws_data.push(["Test Case ID", "Description", "Status (Pass/Fail)", "Comments"]);

  // Add checklist items
  let testCaseId = 1;
  for (const item in checklistData) {
    ws_data.push([
      testCaseId++,
      item,
      checklistData[item].status,
      checklistData[item].comments
    ]);
  }

  ws_data.push([]);
  ws_data.push(["Special Requirements:"]);
  ws_data.push([specialRequirements]);
  ws_data.push([]);
  ws_data.push(["PM Signature:", pmSignature]);
  ws_data.push(["Quality Signature:", qualitySignature]);
  ws_data.push([]);
  ws_data.push(["Machine Image:"]);
  ws_data.push(["Please insert machine image here. Reference URL:", machineImageUrl]);


  const ws = XLSX.utils.aoa_to_sheet(ws_data);

  // Set column widths for better readability
  const wscols = [
    { wch: 15 }, // Test Case ID
    { wch: 60 }, // Description
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
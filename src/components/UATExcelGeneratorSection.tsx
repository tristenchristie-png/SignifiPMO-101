import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { generateUATExcel } from "@/lib/excelUtils";
import { showSuccess, showError } from "@/utils/toast";

interface MachineTemplate {
  name: string;
  configFields: { id: string; label: string; type: 'text' | 'select' | 'textarea'; options?: string[]; placeholder?: string }[];
  checklistItems: string[];
}

const machineTemplates: Record<string, MachineTemplate> = {
  sparkXL: {
    name: "Spark XL",
    configFields: [
      { id: "projectManager", label: "Project Manager", type: "text", placeholder: "e.g., Jane Doe" },
      { id: "so", label: "SO", type: "text", placeholder: "e.g., SO-12345" },
      { id: "customerChannel", label: "Customer/Channel", type: "text", placeholder: "e.g., Acme Corp / Direct" },
      { id: "formFactor", label: "Form Factor", type: "text", placeholder: "e.g., Kiosk" },
      { id: "namingConvention", label: "Naming Convention", type: "text", placeholder: "e.g., KIOSK-001" },
      { id: "qaqcBy", label: "QA/QC by", type: "text", placeholder: "e.g., John Smith" },
      { id: "dateCompleted", label: "Date completed", type: "text", placeholder: "e.g., YYYY-MM-DD" },
      { id: "shippingAddress", label: "Shipping Address", type: "textarea", placeholder: "Full shipping address" },
      { id: "shippingDate", label: "Shipping Date", type: "text", placeholder: "e.g., YYYY-MM-DD" },
      { id: "specialHw", label: "Special HW", type: "text", placeholder: "e.g., Custom Scanner" },
      { id: "frontCamera", label: "Front Camera", type: "text", placeholder: "e.g., Yes / No" },
      { id: "internetConnectivity", label: "Internet Connectivity", type: "text", placeholder: "e.g., LAN, Wi-Fi" },
      { id: "badgeReader", label: "Badge Reader", type: "text", placeholder: "e.g., HID, RFID" },
      { id: "receiptPrinter", label: "Receipt Printer", type: "text", placeholder: "e.g., Yes / No" },
      { id: "paymentMethod", label: "Payment Method", type: "text", placeholder: "e.g., Credit Card, NFC" },
      { id: "uiLanguage", label: "UI Language", type: "text", placeholder: "e.g., English" },
      { id: "keyboard", label: "Keyboard", type: "text", placeholder: "e.g., Yes / No" },
      { id: "serialNo", label: "Serial No.", type: "text", placeholder: "e.g., SN12345" },
      { id: "crateWhiteGlove", label: "Crate/White Glove", type: "text", placeholder: "e.g., Crate" },
      { id: "powerPlugType", label: "Power/Plug Type", type: "text", placeholder: "e.g., 110V / Type B" },
      { id: "plugPicture", label: "Plug Picture", type: "text", placeholder: "e.g., URL or N/A" },
      { id: "powerAndData", label: "Power and Data", type: "text", placeholder: "e.g., Single cable" },
      { id: "keyQuantity", label: "Key Quantity", type: "text", placeholder: "e.g., 2" },
      { id: "keySerialNo", label: "Key Serial No.", type: "text", placeholder: "e.g., KSN1, KSN2" },
    ],
    checklistItems: [
      "Without physical damage",
      "Vinyl correctly done with no scratches (compare with vinyl rendering)",
      "Internal and external camera display correctly",
      "Badge reader reads all provided badges",
      "Barcode reader reads different types of barcodes",
      "Door opens without hinderance",
      "Two Keys functioning well",
      "Side screen displaying correct media (If applicable)",
      "Email receipt is correct (Formatting and content)",
      "Receipt printer prints correctly (If applicable)",
      "All additional external peripherals packed (If applicable)",
      "Product correctly displayed on production UI",
      "Planogram consistent with final approved planogram template",
      "All products dispense successfully",
      "Payment device accepts both debit and credit card (if applicable)",
      "Double-check that the right payment device is installed for the shipping location",
      "Elevator hatch opens after dispensing all products",
      "Client approved UI design",
      "Vinyl on elevator hatch should look good and align with the vinyl on rest of the machine",
      "Touchscreen Responsive",
    ],
  },
  companion: {
    name: "Companion",
    configFields: [
      { id: "projectManager", label: "Project Manager", type: "text", placeholder: "e.g., Jane Doe" },
      { id: "so", label: "SO", type: "text", placeholder: "e.g., SO-12345" },
      { id: "customerChannel", label: "Customer/Channel", type: "text", placeholder: "e.g., Acme Corp / Direct" },
      { id: "formFactor", label: "Form Factor", type: "text", placeholder: "e.g., Kiosk" },
      { id: "namingConvention", label: "Naming Convention", type: "text", placeholder: "e.g., KIOSK-001" },
      { id: "qaqcBy", label: "QA/QC by", type: "text", placeholder: "e.g., John Smith" },
      { id: "dateCompleted", label: "Date completed", type: "text", placeholder: "e.g., YYYY-MM-DD" },
      { id: "shippingAddress", label: "Shipping Address", type: "textarea", placeholder: "Full shipping address" },
      { id: "shippingDate", label: "Shipping Date", type: "text", placeholder: "e.g., YYYY-MM-DD" },
      { id: "specialHw", label: "Special HW", type: "text", placeholder: "e.g., Custom Scanner" },
      { id: "frontCamera", label: "Front Camera", type: "text", placeholder: "e.g., Yes / No" },
      { id: "internetConnectivity", label: "Internet Connectivity", type: "text", placeholder: "e.g., LAN, Wi-Fi" },
      { id: "badgeReader", label: "Badge Reader", type: "text", placeholder: "e.g., HID, RFID" },
      { id: "receiptPrinter", label: "Receipt Printer", type: "text", placeholder: "e.g., Yes / No" },
      { id: "paymentMethod", label: "Payment Method", type: "text", placeholder: "e.g., Credit Card, NFC" },
      { id: "uiLanguage", label: "UI Language", type: "text", placeholder: "e.g., English" },
      { id: "keyboard", label: "Keyboard", type: "text", placeholder: "e.g., Yes / No" },
      { id: "serialNo", label: "Serial No.", type: "text", placeholder: "e.g., SN12345" },
      { id: "crateWhiteGlove", label: "Crate/White Glove", type: "text", placeholder: "e.g., Crate" },
      { id: "powerPlugType", label: "Power/Plug Type", type: "text", placeholder: "e.g., 110V / Type B" },
      { id: "plugPicture", label: "Plug Picture", type: "text", placeholder: "e.g., URL or N/A" },
      { id: "powerAndData", label: "Power and Data", type: "text", placeholder: "e.g., Single cable" },
      { id: "keyQuantity", label: "Key Quantity", type: "text", placeholder: "e.g., 2" },
      { id: "keySerialNo", label: "Key Serial No.", type: "text", placeholder: "e.g., KSN1, KSN2" },
    ],
    checklistItems: [
      "Without physical damage",
      "Vinyl correctly done with no scratches (compare with vinyl rendering)",
      "Internal and external camera display correctly",
      "Door opens without hinderance",
      "Two Keys functioning",
      "Side screen displaying correct media (If applicable)",
      "Receipt printer prints correctly (If applicable)",
      "All additional external peripherals packed (If applicable)",
      "Production UI product template correct",
      "Planogram consistent with final approved planogram template",
      "All products dispense successfully",
      "Elevator hatch opens after dispensing all products",
      "Companion glass is not scratched/cracked/broken",
      "Vinyl on elevator hatch should look good and align with the vinyl on rest of the machine",
    ],
  },
  ted: {
    name: "TED",
    configFields: [
      { id: "projectManager", label: "Project Manager", type: "text", placeholder: "e.g., Jane Doe" },
      { id: "channelPartner", label: "Channel Partner", type: "text", placeholder: "e.g., Acme Corp" },
      { id: "customer", label: "Customer", type: "text", placeholder: "e.g., Client A" },
      { id: "formFactor", label: "Form Factor", type: "text", placeholder: "e.g., Locker" },
      { id: "namingConvention", label: "Naming Convention", type: "text", placeholder: "e.g., LOCKER-001" },
    ],
    checklistItems: [
      "White lights (if applicable)",
      "Plug type in every locker compartment (if applicable)",
      "Ethernet in each locker (if applicable)",
      "Client approved connectivity",
      "Badge reader reads all provided badges",
      "Barcode reader reads different types of barcodes",
      "Network Shelf (if applicable)",
      "Badge reader configured",
      "Add-on locker matched generation on field (if applicable)",
      "KVM switch working (if applicable)",
      "Remote access working",
    ],
  },
  tedSU: {
    name: "TED SU",
    configFields: [
      { id: "projectManager", label: "Project Manager", type: "text", placeholder: "e.g., Jane Doe" },
      { id: "so", label: "SO", type: "text", placeholder: "e.g., SO-12345" },
      { id: "customerChannel", label: "Customer/Channel", type: "text", placeholder: "e.g., Acme Corp / Direct" },
      { id: "formFactor", label: "Form Factor", type: "text", placeholder: "e.g., Kiosk" },
      { id: "namingConvention", label: "Naming Convention", type: "text", placeholder: "e.g., KIOSK-001" },
      { id: "qaqcBy", label: "QA/QC by", type: "text", placeholder: "e.g., John Smith" },
      { id: "dateCompleted", label: "Date completed", type: "text", placeholder: "e.g., YYYY-MM-DD" },
      { id: "shippingAddress", label: "Shipping Address", type: "textarea", placeholder: "Full shipping address" },
      { id: "shippingDate", label: "Shipping Date", type: "text", placeholder: "e.g., YYYY-MM-DD" },
      { id: "specialHw", label: "Special HW", type: "text", placeholder: "e.g., Custom Scanner" },
      { id: "frontCamera", label: "Front Camera", type: "text", placeholder: "e.g., Yes / No" },
      { id: "internetConnectivity", label: "Internet Connectivity", type: "text", placeholder: "e.g., LAN, Wi-Fi" },
      { id: "badgeReader", label: "Badge Reader", type: "text", placeholder: "e.g., HID, RFID" },
      { id: "receiptPrinter", label: "Receipt Printer", type: "text", placeholder: "e.g., Yes / No" },
      { id: "paymentMethod", label: "Payment Method", type: "text", placeholder: "e.g., Credit Card, NFC" },
      { id: "uiLanguage", label: "UI Language", type: "text", placeholder: "e.g., English" },
      { id: "keyboard", label: "Keyboard", type: "text", placeholder: "e.g., Yes / No" },
      { id: "serialNo", label: "Serial No.", type: "text", placeholder: "e.g., SN12345" },
      { id: "crateWhiteGlove", label: "Crate/White Glove", type: "text", placeholder: "e.g., Crate" },
      { id: "powerPlugType", label: "Power/Plug Type", type: "text", placeholder: "e.g., 110V / Type B" },
      { id: "plugPicture", label: "Plug Picture", type: "text", placeholder: "e.g., URL or N/A" },
      { id: "powerAndData", label: "Power and Data", type: "text", placeholder: "e.g., Single cable" },
      { id: "keyQuantity", label: "Key Quantity", type: "text", placeholder: "e.g., 2" },
      { id: "keySerialNo", label: "Key Serial No.", type: "text", placeholder: "e.g., KSN1, KSN2" },
    ],
    checklistItems: [
      "Without physical damage",
      "Vinyl correctly done with no scratches (compare with vinyl rendering)",
      "Client approved configuration",
      "All compartment doors opens without hinderance",
      "Microphone quality",
      "Speaker quality",
      "Video call quality",
      "Front camera working well",
      "Both screens working well",
      "Client approved UI design",
      "Language Translations (if applicable)",
      "Test all approved workflows",
      "Two available keys are working well",
      "White lights (if applicable)",
      "All additional external peripherals packed (If applicable)",
      "Approved plug type in every locker compartment (if applicable)",
      "Ethernet in each locker (if applicable)",
      "Client approved connectivity",
      "Badge reader reads all provided badges",
      "Barcode reader reads different types of barcodes",
      "Network Shelf (if applicable)",
      "Badge reader configured",
      "Add-on locker matched generation on field (if applicable)",
      "KVM switch working (if applicable)",
      "Remote access working",
    ],
  },
  lockers: {
    name: "Lockers",
    configFields: [
      { id: "projectManager", label: "Project Manager", type: "text", placeholder: "e.g., Jane Doe" },
      { id: "so", label: "SO", type: "text", placeholder: "e.g., SO-12345" },
      { id: "customerChannel", label: "Customer/Channel", type: "text", placeholder: "e.g., Acme Corp / Direct" },
      { id: "formFactor", label: "Form Factor", type: "text", placeholder: "e.g., Kiosk" },
      { id: "namingConvention", label: "Naming Convention", type: "text", placeholder: "e.g., KIOSK-001" },
      { id: "qaqcBy", label: "QA/QC by", type: "text", placeholder: "e.g., John Smith" },
      { id: "dateCompleted", label: "Date completed", type: "text", placeholder: "e.g., YYYY-MM-DD" },
      { id: "shippingAddress", label: "Shipping Address", type: "textarea", placeholder: "Full shipping address" },
      { id: "shippingDate", label: "Shipping Date", type: "text", placeholder: "e.g., YYYY-MM-DD" },
      { id: "specialHw", label: "Special HW", type: "text", placeholder: "e.g., Custom Scanner" },
      { id: "frontCamera", label: "Front Camera", type: "text", placeholder: "e.g., Yes / No" },
      { id: "internetConnectivity", label: "Internet Connectivity", type: "text", placeholder: "e.g., LAN, Wi-Fi" },
      { id: "badgeReader", label: "Badge Reader", type: "text", placeholder: "e.g., HID, RFID" },
      { id: "receiptPrinter", label: "Receipt Printer", type: "text", placeholder: "e.g., Yes / No" },
      { id: "paymentMethod", label: "Payment Method", type: "text", placeholder: "e.g., Credit Card, NFC" },
      { id: "uiLanguage", label: "UI Language", type: "text", placeholder: "e.g., English" },
      { id: "keyboard", label: "Keyboard", type: "text", placeholder: "e.g., Yes / No" },
      { id: "serialNo", label: "Serial No.", type: "text", placeholder: "e.g., SN12345" },
      { id: "crateWhiteGlove", label: "Crate/White Glove", type: "text", placeholder: "e.g., Crate" },
      { id: "powerPlugType", label: "Power/Plug Type", type: "text", placeholder: "e.g., 110V / Type B" },
      { id: "plugPicture", label: "Plug Picture", type: "text", placeholder: "e.g., URL or N/A" },
      { id: "powerAndData", label: "Power and Data", type: "text", placeholder: "e.g., Single cable" },
      { id: "keyQuantity", label: "Key Quantity", type: "text", placeholder: "e.g., 2" },
      { id: "keySerialNo", label: "Key Serial No.", type: "text", placeholder: "e.g., KSN1, KSN2" },
    ],
    checklistItems: [
      "Without physical damage",
      "Vinyl correctly done with no scratches (compare with vinyl rendering)",
      "Client approved configuration",
      "All compartment doors opens without hinderance",
      "Client approved UI design",
      "Language Translations (if applicable)",
      "Test all approved workflows",
      "Two available keys are working well",
      "White lights (if applicable)",
      "Approved plug type in every locker compartment (if applicable)",
      "All additional external peripherals packed (If applicable)",
      "Ethernet in each locker (if applicable)",
      "Client approved connectivity",
      "Badge reader reads all provided badges",
      "Barcode reader reads different types of barcodes",
      "Network Shelf (if applicable)",
      "Badge reader configured",
      "Add-on locker matches generation on field (if applicable)",
      "Touchscreen Responsive (if applicable)",
    ],
  },
};

const UATExcelGeneratorSection: React.FC = () => {
  const [uatProject, setUatProject] = useState('');
  const [uatOwner, setUatOwner] = useState('');
  const [selectedMachineType, setSelectedMachineType] = useState<string>('sparkXL');
  const [configData, setConfigData] = useState<Record<string, string>>({});
  const [checklistData, setChecklistData] = useState<Record<string, { status: string; comments: string }>>({});
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [pmSignature, setPmSignature] = useState('');
  const [qualitySignature, setQualitySignature] = useState('');
  const [machineImageUrl, setMachineImageUrl] = useState('');

  useEffect(() => {
    // Reset config and checklist data when machine type changes
    const currentTemplate = machineTemplates[selectedMachineType];
    if (currentTemplate) {
      const initialConfig: Record<string, string> = {};
      currentTemplate.configFields.forEach(field => {
        initialConfig[field.id] = '';
      });
      setConfigData(initialConfig);

      const initialChecklist: Record<string, { status: string; comments: string }> = {};
      currentTemplate.checklistItems.forEach(item => {
        initialChecklist[item] = { status: '', comments: '' };
      });
      setChecklistData(initialChecklist);
    }
    setSpecialRequirements('');
    setPmSignature('');
    setQualitySignature('');
    setMachineImageUrl('');
  }, [selectedMachineType]);

  const handleConfigChange = (fieldId: string, value: string) => {
    setConfigData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleChecklistStatusChange = (item: string, status: string) => {
    setChecklistData(prev => ({
      ...prev,
      [item]: { ...prev[item], status },
    }));
  };

  const handleChecklistCommentChange = (item: string, comments: string) => {
    setChecklistData(prev => ({
      ...prev,
      [item]: { ...prev[item], comments },
    }));
  };

  const handleGenerateExcel = () => {
    if (!uatProject || !uatOwner || !selectedMachineType) {
      showError("Please fill in Project, Owner, and select a Machine Type.");
      return;
    }

    const currentTemplate = machineTemplates[selectedMachineType];
    if (!currentTemplate) {
      showError("Invalid machine type selected.");
      return;
    }

    // Basic validation for config fields
    const allConfigFieldsFilled = currentTemplate.configFields.every(field => configData[field.id]);
    if (!allConfigFieldsFilled) {
      showError("Please fill in all configuration fields.");
      return;
    }

    // Basic validation for checklist items
    const allChecklistItemsStatusFilled = currentTemplate.checklistItems.every(item => checklistData[item]?.status);
    if (!allChecklistItemsStatusFilled) {
      showError("Please set a status (Pass/Fail/N/A) for all checklist items.");
      return;
    }

    generateUATExcel(
      uatProject,
      uatOwner,
      currentTemplate.name,
      configData,
      checklistData,
      specialRequirements,
      pmSignature,
      qualitySignature,
      machineImageUrl
    );
    showSuccess("UAT Excel file generated and downloaded!");
  };

  const currentTemplate = machineTemplates[selectedMachineType];

  return (
    <Card id="uat-generator-section" className="template-section w-full max-w-3xl mx-auto bg-card">
      <CardHeader>
        <CardTitle>UAT Excel Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="uatProject">Project</Label>
            <Input id="uatProject" value={uatProject} onChange={(e) => setUatProject(e.target.value)} placeholder="e.g., Project Alpha" />
          </div>
          <div>
            <Label htmlFor="uatOwner">Owner</Label>
            <Input id="uatOwner" value={uatOwner} onChange={(e) => setUatOwner(e.target.value)} placeholder="e.g., John Doe" />
          </div>
        </div>

        <div>
          <Label htmlFor="machineType">Select Machine Type</Label>
          <Select value={selectedMachineType} onValueChange={setSelectedMachineType}>
            <SelectTrigger id="machineType">
              <SelectValue placeholder="Select a machine type" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(machineTemplates).map(key => (
                <SelectItem key={key} value={key}>
                  {machineTemplates[key].name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {currentTemplate && (
          <>
            <h3 className="text-lg font-semibold mt-4">Configuration Fields for {currentTemplate.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentTemplate.configFields.map(field => (
                <div key={field.id}>
                  <Label htmlFor={field.id}>{field.label}</Label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={field.id}
                      value={configData[field.id] || ''}
                      onChange={(e) => handleConfigChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                    />
                  ) : field.type === 'select' ? (
                    <Select value={configData[field.id] || ''} onValueChange={(value) => handleConfigChange(field.id, value)}>
                      <SelectTrigger id={field.id}>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={field.id}
                      value={configData[field.id] || ''}
                      onChange={(e) => handleConfigChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-6">UAT Checklist for {currentTemplate.name}</h3>
            <div className="space-y-4">
              {currentTemplate.checklistItems.map((item, index) => (
                <div key={index} className="border p-3 rounded-md space-y-2">
                  <Label className="font-medium block">{index + 1}. {item}</Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <Select
                        value={checklistData[item]?.status || ''}
                        onValueChange={(value) => handleChecklistStatusChange(item, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pass">Pass</SelectItem>
                          <SelectItem value="Fail">Fail</SelectItem>
                          <SelectItem value="N/A">N/A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="Comments (Optional)"
                        value={checklistData[item]?.comments || ''}
                        onChange={(e) => handleChecklistCommentChange(item, e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-6">Additional Details</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="specialRequirements">Special Requirements</Label>
                <Textarea id="specialRequirements" value={specialRequirements} onChange={(e) => setSpecialRequirements(e.target.value)} placeholder="Insert any specific callouts" rows={4} />
              </div>
              <div>
                <Label htmlFor="pmSignature">PM Signature</Label>
                <Input id="pmSignature" value={pmSignature} onChange={(e) => setPmSignature(e.target.value)} placeholder="Project Manager's Signature" />
              </div>
              <div>
                <Label htmlFor="qualitySignature">Quality Signature</Label>
                <Input id="qualitySignature" value={qualitySignature} onChange={(e) => setQualitySignature(e.target.value)} placeholder="Quality Assurance Signature" />
              </div>
              <div>
                <Label htmlFor="machineImageUrl">Machine Image URL</Label>
                <Input id="machineImageUrl" value={machineImageUrl} onChange={(e) => setMachineImageUrl(e.target.value)} placeholder="URL of the machine image (for reference in Excel)" />
              </div>
            </div>
          </>
        )}

        <Button onClick={handleGenerateExcel} className="w-full">Generate UAT Excel</Button>
      </CardContent>
    </Card>
  );
};

export default UATExcelGeneratorSection;
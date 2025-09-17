import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";

const UIRequestSection: React.FC = () => {
  const [cp, setCp] = useState('');
  const [cx, setCx] = useState('');
  const [kioskType, setKioskType] = useState('');
  const [vendingUnitElevator, setVendingUnitElevator] = useState('');
  const [screenSize, setScreenSize] = useState('');
  const [smartWorkflows, setSmartWorkflows] = useState('');
  const [authentication, setAuthentication] = useState('');
  const [paymentDevice, setPaymentDevice] = useState('');
  const [language, setLanguage] = useState('English (Default)');
  const [adaKeypad, setAdaKeypad] = useState('');
  const [apiIntegration, setApiIntegration] = useState('');
  const [hosting, setHosting] = useState('');
  const [visionUrl, setVisionUrl] = useState('');
  const [attachments, setAttachments] = useState('');
  const [brandingDocuments, setBrandingDocuments] = useState('');
  const [output, setOutput] = useState('');

  const generateUIEmail = () => {
    if (!cp || !cx || !kioskType || !vendingUnitElevator || !screenSize || !smartWorkflows || !authentication || !paymentDevice || !language || !adaKeypad || !apiIntegration || !hosting || !visionUrl || !attachments || !brandingDocuments) {
      showError("Please fill in all fields to generate the email.");
      return;
    }

    const subject = `UI Request — Kiosk Type: ${kioskType}`;
    const body = `CP: ${cp}
CX: ${cx}
Kiosk Type: ${kioskType}
Vending Unit Elevator: ${vendingUnitElevator}
Screen Size: ${screenSize}
Smart Workflows:
${smartWorkflows}
Authentication: ${authentication}
Payment Device: ${paymentDevice}
Language: ${language}
ADA Keypad: ${adaKeypad}
API Integration: ${apiIntegration}
Hosting: ${hosting}
Vision URL: ${visionUrl}
Attachments: ${attachments}
Branding Documents:
${brandingDocuments}`;

    setOutput(`Subject: ${subject}\n\n${body}`);
    showSuccess("UI request email content generated!");
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output)
        .then(() => showSuccess("Content copied to clipboard!"))
        .catch(() => showError("Failed to copy content."));
    } else {
      showError("No content to copy.");
    }
  };

  return (
    <Card id="ui-request-section" className="template-section w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>UI Request</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="cp">CP</Label>
          <Input id="cp" value={cp} onChange={(e) => setCp(e.target.value)} placeholder="e.g., CP-123" />
        </div>
        <div>
          <Label htmlFor="cx">CX</Label>
          <Input id="cx" value={cx} onChange={(e) => setCx(e.target.value)} placeholder="e.g., CX-456" />
        </div>
        <div>
          <Label htmlFor="kioskType">Kiosk Type</Label>
          <Input id="kioskType" value={kioskType} onChange={(e) => setKioskType(e.target.value)} placeholder="e.g., Standard Kiosk" />
        </div>
        <div>
          <Label htmlFor="vendingUnitElevator">Vending Unit Elevator</Label>
          <Select value={vendingUnitElevator} onValueChange={setVendingUnitElevator}>
            <SelectTrigger id="vendingUnitElevator">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Enhanced">Enhanced</SelectItem>
              <SelectItem value="Standard">Standard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="screenSize">Screen Size</Label>
          <Select value={screenSize} onValueChange={setScreenSize}>
            <SelectTrigger id="screenSize">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10in">10in</SelectItem>
              <SelectItem value="15in">15in</SelectItem>
              <SelectItem value="32in">32in</SelectItem>
              <SelectItem value="43in">43in</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="smartWorkflows">Smart Workflows</Label>
          <Textarea id="smartWorkflows" value={smartWorkflows} onChange={(e) => setSmartWorkflows(e.target.value)} placeholder="List smart workflows (e.g., x, y, z)" rows={3} />
        </div>
        <div>
          <Label htmlFor="authentication">Authentication</Label>
          <Input id="authentication" value={authentication} onChange={(e) => setAuthentication(e.target.value)} placeholder="e.g., RFID, PIN" />
        </div>
        <div>
          <Label htmlFor="paymentDevice">Payment Device</Label>
          <Input id="paymentDevice" value={paymentDevice} onChange={(e) => setPaymentDevice(e.target.value)} placeholder="e.g., Card Reader, NFC" />
        </div>
        <div>
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English (Default)">English (Default)</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="German">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="adaKeypad">ADA Keypad</Label>
          <Select value={adaKeypad} onValueChange={setAdaKeypad}>
            <SelectTrigger id="adaKeypad">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="apiIntegration">API Integration</Label>
          <Select value={apiIntegration} onValueChange={setApiIntegration}>
            <SelectTrigger id="apiIntegration">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="hosting">Hosting</Label>
          <Input id="hosting" value={hosting} onChange={(e) => setHosting(e.target.value)} placeholder="e.g., AWS, On-premise" />
        </div>
        <div>
          <Label htmlFor="visionUrl">Vision URL</Label>
          <Input id="visionUrl" value={visionUrl} onChange={(e) => setVisionUrl(e.target.value)} placeholder="e.g., https://vision.example.com" />
        </div>
        <div>
          <Label htmlFor="attachments">Attachments</Label>
          <Input id="attachments" value={attachments} onChange={(e) => setAttachments(e.target.value)} placeholder="List attachment names or links" />
        </div>
        <div>
          <Label htmlFor="brandingDocuments">Branding Documents</Label>
          <Textarea id="brandingDocuments" value={brandingDocuments} onChange={(e) => setBrandingDocuments(e.target.value)} placeholder="List branding documents (e.g., Logo, Fonts, Color Codes, SOW)" rows={5} />
        </div>
        <div className="flex gap-2">
          <Button onClick={generateUIEmail}>Generate Email</Button>
          <Button variant="outline" onClick={copyToClipboard}>Copy</Button>
        </div>
        {output && (
          <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm font-mono">
            {output}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UIRequestSection;
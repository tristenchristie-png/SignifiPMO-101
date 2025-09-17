import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";

const QAChecklistSection: React.FC = () => {
  const [qaBuild, setQaBuild] = useState('');
  const [qaEnv, setQaEnv] = useState('');
  const [salesOrder, setSalesOrder] = useState('');
  const [shippingDate, setShippingDate] = useState('');
  const [vinylDate, setVinylDate] = useState('');
  const [namingConvention, setNamingConvention] = useState('');
  const [address, setAddress] = useState('');
  const [channelPartner, setChannelPartner] = useState('');
  const [endClient, setEndClient] = useState('');
  const [kioskType, setKioskType] = useState('');
  const [vendingUnitElevator, setVendingUnitElevator] = useState('');
  const [screenSize, setScreenSize] = useState('');
  const [workflow, setWorkflow] = useState('');
  const [authenticationPaymentDevice, setAuthenticationPaymentDevice] = useState('');
  const [paymentDevice, setPaymentDevice] = useState('');
  const [language, setLanguage] = useState('');
  const [adaKeypad, setAdaKeypad] = useState('');
  const [hosting, setHosting] = useState('');
  const [internetConnectivity, setInternetConnectivity] = useState('');
  const [itSiteSurvey, setItSiteSurvey] = useState('');
  const [paymentDeviceConfiguration, setPaymentDeviceConfiguration] = useState('');
  const [productTemplate, setProductTemplate] = useState('');
  const [uiPreviousDeployments, setUiPreviousDeployments] = useState('');
  const [uiTaskLink, setUiTaskLink] = useState('');
  const [orientationVendingLocker, setOrientationVendingLocker] = useState('');
  const [voltage, setVoltage] = useState('');
  const [plugType, setPlugType] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [output, setOutput] = useState('');

  const generateQAEmail = () => {
    if (
      !qaBuild || !qaEnv || !salesOrder || !shippingDate || !vinylDate ||
      !namingConvention || !address || !channelPartner || !endClient ||
      !kioskType || !vendingUnitElevator || !screenSize || !workflow ||
      !authenticationPaymentDevice || !paymentDevice || !language ||
      !adaKeypad || !hosting || !internetConnectivity || !itSiteSurvey ||
      !paymentDeviceConfiguration || !productTemplate || !uiPreviousDeployments ||
      !uiTaskLink || !orientationVendingLocker || !voltage || !plugType ||
      !specialRequirements
    ) {
      showError("Please fill in all fields to generate the email.");
      return;
    }

    const subject = `QA Checklist — Build ${qaBuild}`;
    const body = `Build Version: ${qaBuild}
Environment: ${qaEnv}
Sales Order: ${salesOrder}
Shipping Date: ${shippingDate}
Vinyl Date: ${vinylDate}
Naming Convention: ${namingConvention}
Address: ${address}
Channel Partner (CP): ${channelPartner}
End Client (CX): ${endClient}
Kiosk Type: ${kioskType}
Vending Unit Elevator: ${vendingUnitElevator}
Screen Size: ${screenSize}
Workflow: ${workflow}
Authentication/Payment Device: ${authenticationPaymentDevice}
Payment Device: ${paymentDevice}
Language: ${language}
ADA Keypad: ${adaKeypad}
Hosting: ${hosting}
Internet Connectivity: ${internetConnectivity}
IT Site Survey: ${itSiteSurvey}
Payment Device Configuration: ${paymentDeviceConfiguration}
Product Template: ${productTemplate}
UI for Previous Deployments: ${uiPreviousDeployments}
UI Task Link: ${uiTaskLink}
Orientation of the Vending/Locker: ${orientationVendingLocker}
Voltage: ${voltage}
Plug Type: ${plugType}

Special Requirements:
${specialRequirements}`;

    setOutput(`Subject: ${subject}\n\n${body}`);
    showSuccess("QA email content generated!");
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
    <Card id="qa-checklist-section" className="template-section w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>QA Checklist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="qaBuild">Build Version</Label>
          <Input id="qaBuild" value={qaBuild} onChange={(e) => setQaBuild(e.target.value)} placeholder="e.g., 1.0.0-beta" />
        </div>
        <div>
          <Label htmlFor="qaEnv">Environment</Label>
          <Select value={qaEnv} onValueChange={setQaEnv}>
            <SelectTrigger id="qaEnv">
              <SelectValue placeholder="Select environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DEV">DEV</SelectItem>
              <SelectItem value="QA">QA</SelectItem>
              <SelectItem value="UAT">UAT</SelectItem>
              <SelectItem value="PROD">PROD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="salesOrder">Sales Order</Label>
          <Input id="salesOrder" value={salesOrder} onChange={(e) => setSalesOrder(e.target.value)} placeholder="Insert SO number" />
        </div>
        <div>
          <Label htmlFor="shippingDate">Shipping Date</Label>
          <Input id="shippingDate" value={shippingDate} onChange={(e) => setShippingDate(e.target.value)} placeholder="Insert shipping date" />
        </div>
        <div>
          <Label htmlFor="vinylDate">Vinyl Date</Label>
          <Input id="vinylDate" value={vinylDate} onChange={(e) => setVinylDate(e.target.value)} placeholder="Insert vinyl application date or 'N/A'" />
        </div>
        <div>
          <Label htmlFor="namingConvention">Naming Convention</Label>
          <Input id="namingConvention" value={namingConvention} onChange={(e) => setNamingConvention(e.target.value)} placeholder="Insert Kiosk ID(s)" />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Insert full address, including building name if applicable" rows={2} />
        </div>
        <div>
          <Label htmlFor="channelPartner">Channel Partner (CP)</Label>
          <Input id="channelPartner" value={channelPartner} onChange={(e) => setChannelPartner(e.target.value)} placeholder="Insert Channel Partner or 'Direct'" />
        </div>
        <div>
          <Label htmlFor="endClient">End Client (CX)</Label>
          <Input id="endClient" value={endClient} onChange={(e) => setEndClient(e.target.value)} placeholder="Insert End Client name" />
        </div>
        <div>
          <Label htmlFor="kioskType">Kiosk Type</Label>
          <Input id="kioskType" value={kioskType} onChange={(e) => setKioskType(e.target.value)} placeholder="e.g., SparkXL, Companion, Enclosure, etc." />
        </div>
        <div>
          <Label htmlFor="vendingUnitElevator">Vending Unit Elevator</Label>
          <Input id="vendingUnitElevator" value={vendingUnitElevator} onChange={(e) => setVendingUnitElevator(e.target.value)} placeholder="Insert elevator type or 'N/A'" />
        </div>
        <div>
          <Label htmlFor="screenSize">Screen Size</Label>
          <Input id="screenSize" value={screenSize} onChange={(e) => setScreenSize(e.target.value)} placeholder="e.g., 10”, 15”, 32”, etc." />
        </div>
        <div>
          <Label htmlFor="workflow">Workflow</Label>
          <Input id="workflow" value={workflow} onChange={(e) => setWorkflow(e.target.value)} placeholder="e.g., ITSM Vending, Smart Workflow, GrabnGo, etc." />
        </div>
        <div>
          <Label htmlFor="authenticationPaymentDevice">Authentication/Payment Device</Label>
          <Input id="authenticationPaymentDevice" value={authenticationPaymentDevice} onChange={(e) => setAuthenticationPaymentDevice(e.target.value)} placeholder="e.g., Badge ID, Barcode Scanner, Credit Card, Free Vend, etc." />
        </div>
        <div>
          <Label htmlFor="paymentDevice">Payment Device</Label>
          <Input id="paymentDevice" value={paymentDevice} onChange={(e) => setPaymentDevice(e.target.value)} placeholder="Insert type, e.g. Card Reader, NFC" />
        </div>
        <div>
          <Label htmlFor="language">Language</Label>
          <Input id="language" value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Insert supported language(s)" />
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
          <Label htmlFor="hosting">Hosting</Label>
          <Input id="hosting" value={hosting} onChange={(e) => setHosting(e.target.value)} placeholder="e.g., Multi-Tenant Canada, Default Multi-Tenant, etc." />
        </div>
        <div>
          <Label htmlFor="internetConnectivity">Internet Connectivity</Label>
          <Input id="internetConnectivity" value={internetConnectivity} onChange={(e) => setInternetConnectivity(e.target.value)} placeholder="e.g., LAN, Wi-Fi Backup, Optconnect, etc." />
        </div>
        <div>
          <Label htmlFor="itSiteSurvey">IT Site Survey</Label>
          <Select value={itSiteSurvey} onValueChange={setItSiteSurvey}>
            <SelectTrigger id="itSiteSurvey">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Attached">Attached</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="N/A">N/A</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="paymentDeviceConfiguration">Payment Device Configuration</Label>
          <Input id="paymentDeviceConfiguration" value={paymentDeviceConfiguration} onChange={(e) => setPaymentDeviceConfiguration(e.target.value)} placeholder="Insert configuration details or 'N/A'" />
        </div>
        <div>
          <Label htmlFor="productTemplate">Product Template</Label>
          <Input id="productTemplate" value={productTemplate} onChange={(e) => setProductTemplate(e.target.value)} placeholder="Insert template name or 'N/A'" />
        </div>
        <div>
          <Label htmlFor="uiPreviousDeployments">UI for Previous Deployments</Label>
          <Input id="uiPreviousDeployments" value={uiPreviousDeployments} onChange={(e) => setUiPreviousDeployments(e.target.value)} placeholder="Insert link or 'N/A'" />
        </div>
        <div>
          <Label htmlFor="uiTaskLink">UI Task Link</Label>
          <Input id="uiTaskLink" value={uiTaskLink} onChange={(e) => setUiTaskLink(e.target.value)} placeholder="Insert JIRA link or 'TBD'" />
        </div>
        <div>
          <Label htmlFor="orientationVendingLocker">Orientation of the Vending/Locker</Label>
          <Input id="orientationVendingLocker" value={orientationVendingLocker} onChange={(e) => setOrientationVendingLocker(e.target.value)} placeholder="Insert details or 'N/A'" />
        </div>
        <div>
          <Label htmlFor="voltage">Voltage</Label>
          <Input id="voltage" value={voltage} onChange={(e) => setVoltage(e.target.value)} placeholder="e.g., 110V, 220V" />
        </div>
        <div>
          <Label htmlFor="plugType">Plug Type</Label>
          <Input id="plugType" value={plugType} onChange={(e) => setPlugType(e.target.value)} placeholder="e.g., B, C, E, G, etc." />
        </div>
        <div>
          <Label htmlFor="specialRequirements">Special Requirements</Label>
          <Textarea id="specialRequirements" value={specialRequirements} onChange={(e) => setSpecialRequirements(e.target.value)} placeholder="Insert any specific callouts: tradeshow, demo mode, replanogramming, training, remote support, new hardware, etc." rows={5} />
        </div>
        <div className="flex gap-2">
          <Button onClick={generateQAEmail}>Generate Email</Button>
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

export default QAChecklistSection;
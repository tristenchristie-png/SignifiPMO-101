import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";

const InstallationTicketSection: React.FC = () => {
  const [salesOrder, setSalesOrder] = useState('');
  const [namingConventionAddress, setNamingConventionAddress] = useState('');
  const [channelPartner, setChannelPartner] = useState('');
  const [endClient, setEndClient] = useState('');
  const [shippingDate, setShippingDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [requestedInstallationDate, setRequestedInstallationDate] = useState('');
  const [vinylDate, setVinylDate] = useState('');
  const [kioskType, setKioskType] = useState('');
  const [vendingUnitElevator, setVendingUnitElevator] = useState('');
  const [screenSize, setScreenSize] = useState('');
  const [workflow, setWorkflow] = useState('');
  const [authenticationPaymentDevice, setAuthenticationPaymentDevice] = useState('');
  const [paymentDeviceConfiguration, setPaymentDeviceConfiguration] = useState('');
  const [language, setLanguage] = useState('');
  const [adaKeypad, setAdaKeypad] = useState('');
  const [hosting, setHosting] = useState('');
  const [internetConnectivity, setInternetConnectivity] = useState('');
  const [itSiteSurvey, setItSiteSurvey] = useState('');
  const [productTemplate, setProductTemplate] = useState('');
  const [uiPreviousDeployments, setUiPreviousDeployments] = useState('');
  const [uiTaskLink, setUiTaskLink] = useState('');
  const [orientationVendingLocker, setOrientationVendingLocker] = useState('');
  const [voltage, setVoltage] = useState('');
  const [plugType, setPlugType] = useState('');
  const [pointOfContact, setPointOfContact] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [scopeOfWork, setScopeOfWork] = useState('');
  const [output, setOutput] = useState('');

  const generateInstallationEmail = () => {
    if (
      !salesOrder || !namingConventionAddress || !channelPartner || !endClient ||
      !shippingDate || !deliveryDate || !requestedInstallationDate || !vinylDate ||
      !kioskType || !vendingUnitElevator || !screenSize || !workflow ||
      !authenticationPaymentDevice || !paymentDeviceConfiguration || !language ||
      !adaKeypad || !hosting || !internetConnectivity || !itSiteSurvey ||
      !productTemplate || !uiPreviousDeployments || !uiTaskLink ||
      !orientationVendingLocker || !voltage || !plugType || !pointOfContact ||
      !specialRequirements || !scopeOfWork
    ) {
      showError("Please fill in all fields to generate the email.");
      return;
    }

    const subject = `Installation Ticket — SO: ${salesOrder}`;
    const body = `1. Sales Order (SO): ${salesOrder}
2. Naming Convention and Address: ${namingConventionAddress}
3. Channel Partner (CP): ${channelPartner}
4. End Client (CX): ${endClient}
5. Shipping Date: ${shippingDate}
6. Delivery Date: ${deliveryDate}
7. Requested Installation Date: ${requestedInstallationDate}
8. Vinyl Date: ${vinylDate}
9. Kiosk Type: ${kioskType}
10. Vending Unit Elevator: ${vendingUnitElevator}
11. Screen Size: ${screenSize}
12. Workflow: ${workflow}
13. Authentication/Payment Device: ${authenticationPaymentDevice}
14. Payment Device Configuration: ${paymentDeviceConfiguration}
15. Language: ${language}
16. ADA Keypad: ${adaKeypad}
17. Hosting: ${hosting}
18. Internet Connectivity: ${internetConnectivity}
119. IT Site Survey: ${itSiteSurvey}
20. Product Template: ${productTemplate}
21. UI for Previous Deployments: ${uiPreviousDeployments}
22. UI Task Link: ${uiTaskLink}
23. Orientation of the Vending/Locker: ${orientationVendingLocker}
24. Voltage: ${voltage}
25. Plug Type: ${plugType}
26. Point of Contact (POC): ${pointOfContact}

Special Requirements:
${specialRequirements}

Scope of Work:
${scopeOfWork}`;

    setOutput(`Subject: ${subject}\n\n${body}`);
    showSuccess("Installation email content generated!");
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
    <Card id="installation-ticket-section" className="template-section w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Installation Ticket</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="salesOrder">1. Sales Order (SO)</Label>
          <Input id="salesOrder" value={salesOrder} onChange={(e) => setSalesOrder(e.target.value)} placeholder="Insert SO number" />
        </div>
        <div>
          <Label htmlFor="namingConventionAddress">2. Naming Convention and Address</Label>
          <Textarea id="namingConventionAddress" value={namingConventionAddress} onChange={(e) => setNamingConventionAddress(e.target.value)} placeholder="Insert Kiosk ID(s) and full address" rows={3} />
        </div>
        <div>
          <Label htmlFor="channelPartner">3. Channel Partner (CP)</Label>
          <Input id="channelPartner" value={channelPartner} onChange={(e) => setChannelPartner(e.target.value)} placeholder="Insert Channel Partner or 'Direct'" />
        </div>
        <div>
          <Label htmlFor="endClient">4. End Client (CX)</Label>
          <Input id="endClient" value={endClient} onChange={(e) => setEndClient(e.target.value)} placeholder="Insert End Client name" />
        </div>
        <div>
          <Label htmlFor="shippingDate">5. Shipping Date</Label>
          <Input id="shippingDate" value={shippingDate} onChange={(e) => setShippingDate(e.target.value)} placeholder="Insert shipping date" />
        </div>
        <div>
          <Label htmlFor="deliveryDate">6. Delivery Date</Label>
          <Input id="deliveryDate" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} placeholder="Insert delivery date" />
        </div>
        <div>
          <Label htmlFor="requestedInstallationDate">7. Requested Installation Date</Label>
          <Input id="requestedInstallationDate" value={requestedInstallationDate} onChange={(e) => setRequestedInstallationDate(e.target.value)} placeholder="Insert installation date" />
        </div>
        <div>
          <Label htmlFor="vinylDate">8. Vinyl Date</Label>
          <Input id="vinylDate" value={vinylDate} onChange={(e) => setVinylDate(e.target.value)} placeholder="Insert vinyl application date or 'N/A'" />
        </div>
        <div>
          <Label htmlFor="kioskType">9. Kiosk Type</Label>
          <Input id="kioskType" value={kioskType} onChange={(e) => setKioskType(e.target.value)} placeholder="e.g., SparkXL, Companion, Enclosure, etc." />
        </div>
        <div>
          <Label htmlFor="vendingUnitElevator">10. Vending Unit Elevator</Label>
          <Input id="vendingUnitElevator" value={vendingUnitElevator} onChange={(e) => setVendingUnitElevator(e.target.value)} placeholder="Insert elevator type or 'N/A'" />
        </div>
        <div>
          <Label htmlFor="screenSize">11. Screen Size</Label>
          <Input id="screenSize" value={screenSize} onChange={(e) => setScreenSize(e.target.value)} placeholder="e.g., 10”, 15”, 32”, etc." />
        </div>
        <div>
          <Label htmlFor="workflow">12. Workflow</Label>
          <Input id="workflow" value={workflow} onChange={(e) => setWorkflow(e.target.value)} placeholder="e.g., ITSM Vending, Smart Workflow, GrabnGo, etc." />
        </div>
        <div>
          <Label htmlFor="authenticationPaymentDevice">13. Authentication/Payment Device</Label>
          <Input id="authenticationPaymentDevice" value={authenticationPaymentDevice} onChange={(e) => setAuthenticationPaymentDevice(e.target.value)} placeholder="e.g., Badge ID, Barcode Scanner, Credit Card, Free Vend, etc." />
        </div>
        <div>
          <Label htmlFor="paymentDeviceConfiguration">14. Payment Device Configuration</Label>
          <Input id="paymentDeviceConfiguration" value={paymentDeviceConfiguration} onChange={(e) => setPaymentDeviceConfiguration(e.target.value)} placeholder="Insert configuration details or 'N/A'" />
        </div>
        <div>
          <Label htmlFor="language">15. Language</Label>
          <Input id="language" value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Insert supported language(s)" />
        </div>
        <div>
          <Label htmlFor="adaKeypad">16. ADA Keypad</Label>
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
          <Label htmlFor="hosting">17. Hosting</Label>
          <Input id="hosting" value={hosting} onChange={(e) => setHosting(e.target.value)} placeholder="e.g., Multi-Tenant Canada, Default Multi-Tenant, etc." />
        </div>
        <div>
          <Label htmlFor="internetConnectivity">18. Internet Connectivity</Label>
          <Input id="internetConnectivity" value={internetConnectivity} onChange={(e) => setInternetConnectivity(e.target.value)} placeholder="e.g., LAN, Wi-Fi Backup, Optconnect, etc." />
        </div>
        <div>
          <Label htmlFor="itSiteSurvey">19. IT Site Survey</Label>
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
          <Label htmlFor="productTemplate">20. Product Template</Label>
          <Input id="productTemplate" value={productTemplate} onChange={(e) => setProductTemplate(e.target.value)} placeholder="Insert template name or 'N/A'" />
        </div>
        <div>
          <Label htmlFor="uiPreviousDeployments">21. UI for Previous Deployments</Label>
          <Input id="uiPreviousDeployments" value={uiPreviousDeployments} onChange={(e) => setUiPreviousDeployments(e.target.value)} placeholder="Insert link or 'N/A'" />
        </div>
        <div>
          <Label htmlFor="uiTaskLink">22. UI Task Link</Label>
          <Input id="uiTaskLink" value={uiTaskLink} onChange={(e) => setUiTaskLink(e.target.value)} placeholder="Insert JIRA link or 'TBD'" />
        </div>
        <div>
          <Label htmlFor="orientationVendingLocker">23. Orientation of the Vending/Locker</Label>
          <Input id="orientationVendingLocker" value={orientationVendingLocker} onChange={(e) => setOrientationVendingLocker(e.target.value)} placeholder="Insert details or 'N/A'" />
        </div>
        <div>
          <Label htmlFor="voltage">24. Voltage</Label>
          <Input id="voltage" value={voltage} onChange={(e) => setVoltage(e.target.value)} placeholder="e.g., 110V, 220V" />
        </div>
        <div>
          <Label htmlFor="plugType">25. Plug Type</Label>
          <Input id="plugType" value={plugType} onChange={(e) => setPlugType(e.target.value)} placeholder="e.g., B, C, E, G, etc." />
        </div>
        <div>
          <Label htmlFor="pointOfContact">26. Point of Contact (POC)</Label>
          <Textarea id="pointOfContact" value={pointOfContact} onChange={(e) => setPointOfContact(e.target.value)} placeholder="Insert name(s), phone number(s), and email(s)" rows={4} />
        </div>
        <div>
          <Label htmlFor="specialRequirements">Special Requirements</Label>
          <Textarea id="specialRequirements" value={specialRequirements} onChange={(e) => setSpecialRequirements(e.target.value)} placeholder="Insert any specific callouts: tradeshow, demo mode, replanogramming, training, remote support, new hardware, etc." rows={5} />
        </div>
        <div>
          <Label htmlFor="scopeOfWork">Scope of Work</Label>
          <Textarea id="scopeOfWork" value={scopeOfWork} onChange={(e) => setScopeOfWork(e.target.value)} placeholder="Describe the scope of work" rows={5} />
        </div>
        <div className="flex gap-2">
          <Button onClick={generateInstallationEmail}>Generate Email</Button>
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

export default InstallationTicketSection;
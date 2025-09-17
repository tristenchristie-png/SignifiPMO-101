import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";

const InstallationTicketSection: React.FC = () => {
  const [itProject, setItProject] = useState('');
  const [itSite, setItSite] = useState('');
  const [itDetails, setItDetails] = useState('');
  const [output, setOutput] = useState('');

  const generateInstallationEmail = () => {
    if (!itProject || !itSite || !itDetails) {
      showError("Please fill in all fields to generate the email.");
      return;
    }
    const subject = `Installation Ticket — ${itProject}`;
    const body = `Project: ${itProject}\nSite: ${itSite}\nDetails:\n${itDetails}`;
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
          <Label htmlFor="itProject">Project Name</Label>
          <Input id="itProject" value={itProject} onChange={(e) => setItProject(e.target.value)} placeholder="e.g., New Feature Rollout" />
        </div>
        <div>
          <Label htmlFor="itSite">Site</Label>
          <Input id="itSite" value={itSite} onChange={(e) => setItSite(e.target.value)} placeholder="e.g., Production Server" />
        </div>
        <div>
          <Label htmlFor="itDetails">Details</Label>
          <Textarea id="itDetails" value={itDetails} onChange={(e) => setItDetails(e.target.value)} placeholder="Provide detailed installation steps or information" rows={5} />
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
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
  const [qaNotes, setQaNotes] = useState('');
  const [output, setOutput] = useState('');

  const generateQAEmail = () => {
    if (!qaBuild || !qaEnv || !qaNotes) {
      showError("Please fill in all fields to generate the email.");
      return;
    }
    const subject = `QA Checklist — Build ${qaBuild}`;
    const body = `Build: ${qaBuild}\nEnvironment: ${qaEnv}\nNotes:\n${qaNotes}`;
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
          <Label htmlFor="qaNotes">Notes</Label>
          <Textarea id="qaNotes" value={qaNotes} onChange={(e) => setQaNotes(e.target.value)} placeholder="Any specific QA notes or test cases" rows={5} />
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